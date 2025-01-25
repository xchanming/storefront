<?php declare(strict_types=1);

namespace Cicada\Storefront\Theme;

use Cicada\Core\Framework\Adapter\Asset\FallbackUrlPackage;
use Cicada\Core\Framework\Log\Package;
use Cicada\Core\PlatformRequest;
use Cicada\Core\SalesChannelRequest;
use Symfony\Component\Asset\VersionStrategy\VersionStrategyInterface;
use Symfony\Component\HttpFoundation\RequestStack;

#[Package('framework')]
class ThemeAssetPackage extends FallbackUrlPackage
{
    /**
     * @internal
     *
     * @param string|list<string> $baseUrls
     */
    public function __construct(
        string|array $baseUrls,
        VersionStrategyInterface $versionStrategy,
        private readonly RequestStack $requestStack,
        private readonly AbstractThemePathBuilder $themePathBuilder
    ) {
        parent::__construct($baseUrls, $versionStrategy);
    }

    public function getUrl(string $path): string
    {
        if ($this->isAbsoluteUrl($path)) {
            return $path;
        }

        $url = $path;
        if ($url && $url[0] !== '/') {
            $url = '/' . $url;
        }

        $url = $this->getVersionStrategy()->applyVersion($this->appendThemePath($url) . $url);

        if ($this->isAbsoluteUrl($url)) {
            return $url;
        }

        return $this->getBaseUrl($path) . $url;
    }

    private function appendThemePath(string $url): string
    {
        $currentRequest = $this->requestStack->getMainRequest();

        if ($currentRequest === null) {
            return '';
        }

        $salesChannelId = $currentRequest->attributes->get(PlatformRequest::ATTRIBUTE_SALES_CHANNEL_ID);
        $themeId = $currentRequest->attributes->get(SalesChannelRequest::ATTRIBUTE_THEME_ID);

        if ($themeId === null || $salesChannelId === null) {
            return '';
        }

        if (str_starts_with($url, '/assets')) {
            return '/theme/' . $themeId;
        }

        return '/theme/' . $this->themePathBuilder->assemblePath($salesChannelId, $themeId);
    }
}
