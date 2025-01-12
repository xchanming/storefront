<?php declare(strict_types=1);

namespace Cicada\Storefront\Framework\App\Template;

use Cicada\Core\Framework\App\Manifest\Manifest;
use Cicada\Core\Framework\App\Source\SourceResolver;
use Cicada\Core\Framework\App\Template\AbstractTemplateLoader;
use Cicada\Core\Framework\Log\Package;
use Cicada\Storefront\Framework\StorefrontFrameworkException;
use Cicada\Storefront\Theme\StorefrontPluginConfiguration\AbstractStorefrontPluginConfigurationFactory;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

/**
 * @internal
 */
#[Package('core')]
class IconTemplateLoader extends AbstractTemplateLoader
{
    /**
     * @internal
     */
    public function __construct(
        private readonly AbstractTemplateLoader $inner,
        private readonly AbstractStorefrontPluginConfigurationFactory $storefrontPluginConfigurationFactory,
        private readonly SourceResolver $sourceResolver,
    ) {
    }

    public function getTemplatePathsForApp(Manifest $app): array
    {
        $viewPaths = $this->inner->getTemplatePathsForApp($app);

        $fs = $this->sourceResolver->filesystemForManifest($app);

        if (!$fs->has('Resources')) {
            return $viewPaths;
        }

        $storefrontConfig = $this->storefrontPluginConfigurationFactory->createFromApp($app->getMetadata()->getName(), '');

        if (!$storefrontConfig->getIconSets()) {
            return $viewPaths;
        }

        $finder = new Finder();
        $finder->files()
            ->in($fs->path('Resources'))
            ->name(['*.html.twig', '*.svg'])
            ->path(array_values($storefrontConfig->getIconSets()))
            ->ignoreUnreadableDirs();

        // return file paths relative to Resources/views directory
        $iconPaths = array_values(array_map(static function (SplFileInfo $file): string {
            return $file->getRelativePathname();
        }, iterator_to_array($finder)));

        return [
            ...array_values($viewPaths),
            ...$iconPaths,
        ];
    }

    public function getTemplateContent(string $path, Manifest $app): string
    {
        if (strrpos($path, '.svg') !== \strlen($path) - 4) {
            return $this->inner->getTemplateContent($path, $app);
        }

        $fs = $this->sourceResolver->filesystemForManifest($app);

        if (!$fs->has('Resources', $path)) {
            throw StorefrontFrameworkException::appTemplateFileNotReadable($fs->path('Resources', $path));
        }

        return $fs->read('Resources', $path);
    }
}
