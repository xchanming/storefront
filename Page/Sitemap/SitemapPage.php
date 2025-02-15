<?php declare(strict_types=1);

namespace Shopware\Storefront\Page\Sitemap;

use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Struct\Struct;

#[Package('discovery')]
class SitemapPage extends Struct
{
    /**
     * @var array
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $sitemaps;

    public function getSitemaps(): array
    {
        return $this->sitemaps;
    }

    public function setSitemaps(array $sitemaps): void
    {
        $this->sitemaps = $sitemaps;
    }
}
