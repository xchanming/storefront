<?php declare(strict_types=1);

namespace Cicada\Storefront\Framework\Twig;

use Cicada\Core\Framework\Context;
use Cicada\Core\Framework\DataAbstractionLayer\Search\Term\Filter\AbstractTokenFilter;
use Cicada\Core\Framework\Feature;
use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Uuid\Uuid;
use Cicada\Core\PlatformRequest;
use Cicada\Core\SalesChannelRequest;
use Cicada\Core\System\SalesChannel\Context\LanguageInfo;
use Cicada\Core\System\SalesChannel\SalesChannelContext;
use Doctrine\DBAL\Connection;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;

#[Package('framework')]
class TemplateDataExtension extends AbstractExtension implements GlobalsInterface
{
    /**
     * @internal
     */
    public function __construct(
        private readonly RequestStack $requestStack,
        private readonly bool $showStagingBanner,
        private readonly Connection $connection,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function getGlobals(): array
    {
        $request = $this->requestStack->getCurrentRequest();
        if (!$request instanceof Request) {
            return [];
        }

        $context = $request->attributes->get(PlatformRequest::ATTRIBUTE_SALES_CHANNEL_CONTEXT_OBJECT);
        if (!$context instanceof SalesChannelContext) {
            return [];
        }

        /** @deprecated tag:v6.7.0 - Remove the if condition and the private method as the value is always set */
        if ($context->getLanguageInfo() === null) {
            $context->setLanguageInfo($this->getLanguageInfo($context->getContext()));
        }

        [$controllerName, $controllerAction] = $this->getControllerInfo($request);

        $themeId = $request->attributes->get(SalesChannelRequest::ATTRIBUTE_THEME_ID);

        $activeNavigationId = (string) $request->get('navigationId', $context->getSalesChannel()->getNavigationCategoryId());
        $navigationPathIdList = $this->getNavigationPath($activeNavigationId, $context);
        $navigationInfo = new NavigationInfo(
            $activeNavigationId,
            $navigationPathIdList,
        );

        $globalTemplateData = [
            'cicada' => [
                'dateFormat' => \DATE_ATOM,
                'navigation' => $navigationInfo,
                'minSearchLength' => $this->minSearchLength($context),
                'showStagingBanner' => $this->showStagingBanner,
            ],
            'themeId' => $themeId, /** Not used in Twig template directly, but in @see \Cicada\Storefront\Framework\Twig\Extension\ConfigExtension::getThemeId */
            'controllerName' => $controllerName,
            'controllerAction' => $controllerAction,
            'context' => $context,
            'activeRoute' => $request->attributes->get('_route'),
            'formViolations' => $request->attributes->get('formViolations'),
        ];

        if (!Feature::isActive('v6.7.0.0')) {
            /** @deprecated tag:v6.7.0 - Will be removed, use shopware.showStagingBanner instead */
            $globalTemplateData['showStagingBanner'] = $this->showStagingBanner;
        }

        return $globalTemplateData;
    }

    /**
     * @return array{0: string, 1: string}
     */
    private function getControllerInfo(Request $request): array
    {
        $controller = $request->attributes->getString('_controller');
        if ($controller === '') {
            return ['', ''];
        }

        $matches = [];
        preg_match('/Controller\\\\(\w+)Controller::?(\w+)$/', $controller, $matches);
        if ($matches) {
            return [$matches[1], $matches[2]];
        }

        return ['', ''];
    }

    private function minSearchLength(SalesChannelContext $context): int
    {
        $query = $this->connection->createQueryBuilder();

        $query->select('min_search_length')
            ->from('product_search_config')
            ->where('language_id = :id')
            ->setParameter('id', Uuid::fromHexToBytes($context->getLanguageId()));

        $min = (int) $query->executeQuery()->fetchOne();

        return $min ?: AbstractTokenFilter::DEFAULT_MIN_SEARCH_TERM_LENGTH;
    }

    /**
     * @return list<string>
     */
    private function getNavigationPath(string $activeNavigationId, SalesChannelContext $context): array
    {
        $path = $this->connection->fetchOne(
            'SELECT path FROM category WHERE id = :id',
            ['id' => Uuid::fromHexToBytes($activeNavigationId)]
        ) ?: '';

        $navigationPathIdList = array_filter(explode('|', $path));
        if (Feature::isActive('cache_rework')) {
            $navigationPathIdList = array_diff($navigationPathIdList, [$context->getSalesChannel()->getNavigationCategoryId()]);
        }

        return array_values($navigationPathIdList);
    }

    private function getLanguageInfo(Context $context): LanguageInfo
    {
        $data = $this->connection->createQueryBuilder()
            ->select(['language.name', 'locale.code as localeCode'])
            ->from('language')
            ->innerJoin('language', 'locale', 'locale', 'language.translation_code_id = locale.id')
            ->where('language.id = :id')
            ->setParameter('id', Uuid::fromHexToBytes($context->getLanguageId()))
            ->executeQuery()
            ->fetchAssociative() ?: [];

        return new LanguageInfo(
            $data['name'],
            $data['localeCode'],
        );
    }
}
