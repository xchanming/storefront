<?php declare(strict_types=1);

namespace Cicada\Storefront\Theme;

use Cicada\Core\Framework\Log\Package;
use Cicada\Core\PlatformRequest;
use Cicada\Core\SalesChannelRequest;
use Cicada\Core\System\SalesChannel\SalesChannelContext;
use Cicada\Storefront\Theme\ConfigLoader\AbstractConfigLoader;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\ItemInterface;

/**
 * @internal
 */
#[Package('framework')]
readonly class ThemeScripts
{
    /**
     * @internal
     */
    public function __construct(
        private StorefrontPluginRegistryInterface $pluginRegistry,
        private ThemeFileResolver $themeFileResolver,
        private RequestStack $requestStack,
        private AbstractThemePathBuilder $themePathBuilder,
        private CacheInterface $cache,
        private AbstractConfigLoader $configLoader,
    ) {
    }

    /**
     * @return array<int, string>
     */
    public function getThemeScripts(): array
    {
        $request = $this->requestStack->getMainRequest();

        if ($request === null) {
            return [];
        }

        $themeName = $request->attributes->get(SalesChannelRequest::ATTRIBUTE_THEME_NAME, SalesChannelRequest::ATTRIBUTE_THEME_BASE_NAME)
            ?? $request->attributes->get(SalesChannelRequest::ATTRIBUTE_THEME_BASE_NAME);

        $themeId = $request->attributes->get(SalesChannelRequest::ATTRIBUTE_THEME_ID);

        if ($themeName === null || $themeId === null) {
            return [];
        }

        $salesChannelId = $request->attributes->get(PlatformRequest::ATTRIBUTE_SALES_CHANNEL_ID);
        $path = $this->themePathBuilder->assemblePath($salesChannelId, $themeId);

        $salesChannelContext = $request->attributes->get(PlatformRequest::ATTRIBUTE_SALES_CHANNEL_CONTEXT_OBJECT);

        if (!$salesChannelContext instanceof SalesChannelContext) {
            return [];
        }

        return $this->cache->get('theme_scripts_' . $path, function (ItemInterface $item) use ($themeId, $salesChannelContext) {
            $themeConfig = $this->configLoader->load($themeId, $salesChannelContext->getContext());

            $resolvedFiles = $this->themeFileResolver->resolveFiles(
                $themeConfig,
                $this->pluginRegistry->getConfigurations(),
                false
            );

            return $resolvedFiles[ThemeFileResolver::SCRIPT_FILES]->getPublicPaths('js');
        });
    }
}
