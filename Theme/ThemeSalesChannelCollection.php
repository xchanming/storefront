<?php declare(strict_types=1);

namespace Shopware\Storefront\Theme;

use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Struct\Collection;

/**
 * @extends Collection<ThemeSalesChannel>
 */
#[Package('framework')]
class ThemeSalesChannelCollection extends Collection
{
    /**
     * @var ThemeSalesChannel[]
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $elements = [];

    protected function getExpectedClass(): string
    {
        return ThemeSalesChannel::class;
    }
}
