<?php declare(strict_types=1);

namespace Cicada\Storefront\Theme;

use Cicada\Core\Framework\Log\Package;
use ScssPhp\ScssPhp\Compiler;
use ScssPhp\ScssPhp\OutputStyle;

/**
 * @internal - may be changed in the future
 */
#[Package('framework')]
class ScssPhpCompiler extends AbstractScssCompiler
{
    private Compiler $compiler;

    /**
     * @var array<string, mixed>|null
     */
    private readonly ?array $cacheOptions;

    /**
     * @param array<string, mixed>|null $cacheOptions
     */
    public function __construct(?array $cacheOptions = null)
    {
        $this->compiler = new Compiler($cacheOptions);
        $this->cacheOptions = $cacheOptions;
    }

    public function reset(): void
    {
        $this->compiler = new Compiler($this->cacheOptions);
    }

    public function compileString(AbstractCompilerConfiguration $config, string $scss, ?string $path = null): string
    {
        $outputStyle = $config->getValue('outputStyle');

        if ($outputStyle === OutputStyle::COMPRESSED || $outputStyle === OutputStyle::EXPANDED) {
            $this->compiler->setOutputStyle($outputStyle);
        }

        $importPaths = $config->getValue('importPaths');

        if ($importPaths !== null) {
            $this->compiler->setImportPaths($importPaths);
        }

        $css = $this->compiler->compileString($scss, $path)->getCss();

        $this->reset(); // Reset compiler for multiple usage

        return $css;
    }
}
