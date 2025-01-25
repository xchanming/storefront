<?php declare(strict_types=1);

namespace Cicada\Storefront\Theme\StorefrontPluginConfiguration;

use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Struct\Struct;

#[Package('framework')]
class File extends Struct
{
    /**
     * @var string
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $filepath;

    /**
     * @var array<string, string>
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $resolveMapping;

    /**
     * @param array<string, string> $resolveMapping
     */
    public function __construct(
        string $filepath,
        array $resolveMapping = [],
        public ?string $assetName = null
    ) {
        $this->filepath = $filepath;
        $this->resolveMapping = $resolveMapping;
    }

    public function getFilepath(): string
    {
        return $this->filepath;
    }

    public function setFilepath(string $filepath): void
    {
        $this->filepath = $filepath;
    }

    /**
     * @return array<string, string>
     */
    public function getResolveMapping(): array
    {
        return $this->resolveMapping;
    }

    /**
     * @param array<string, string> $resolveMapping
     */
    public function setResolveMapping(array $resolveMapping): void
    {
        $this->resolveMapping = $resolveMapping;
    }
}
