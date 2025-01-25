<?php declare(strict_types=1);

namespace Cicada\Storefront\Migration\V6_3;

use Cicada\Core\Defaults;
use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Migration\MigrationStep;
use Cicada\Core\Framework\Uuid\Uuid;
use Cicada\Storefront\Framework\Seo\SeoUrlRoute\NavigationPageSeoUrlRoute;
use Cicada\Storefront\Framework\Seo\SeoUrlRoute\ProductPageSeoUrlRoute;
use Doctrine\DBAL\Connection;

/**
 * @internal
 *
 * @codeCoverageIgnore
 */
#[Package('framework')]
class Migration1595492054SeoUrlTemplateData extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1595492054;
    }

    public function update(Connection $connection): void
    {
        $stmt = $connection->prepare('SELECT count(`id`) FROM seo_url_template WHERE `entity_name` = ? AND `route_name` = ?');
        $result = $stmt->executeQuery([
            'product',
            ProductPageSeoUrlRoute::ROUTE_NAME,
        ]);

        if ((int) $result->fetchOne() === 0) {
            $connection->insert('seo_url_template', [
                'id' => Uuid::randomBytes(),
                'sales_channel_id' => null,
                'route_name' => ProductPageSeoUrlRoute::ROUTE_NAME,
                'entity_name' => 'product',
                'template' => ProductPageSeoUrlRoute::DEFAULT_TEMPLATE,
                'created_at' => (new \DateTimeImmutable())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
            ]);
        }

        $result = $stmt->executeQuery([
            'category',
            NavigationPageSeoUrlRoute::ROUTE_NAME,
        ]);

        if ((int) $result->fetchOne() === 0) {
            $connection->insert('seo_url_template', [
                'id' => Uuid::randomBytes(),
                'sales_channel_id' => null,
                'route_name' => NavigationPageSeoUrlRoute::ROUTE_NAME,
                'entity_name' => 'category',
                'template' => NavigationPageSeoUrlRoute::DEFAULT_TEMPLATE,
                'created_at' => (new \DateTimeImmutable())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
            ]);
        }
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
