<?php declare(strict_types=1);

namespace Cicada\Storefront\Migration\V6_3;

use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Migration\MigrationStep;
use Doctrine\DBAL\Connection;

/**
 * @internal
 *
 * @codeCoverageIgnore
 */
#[Package('framework')]
class Migration1555406153SalesChannelTheme extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1555406153;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('
            CREATE TABLE `sales_channel_theme` (
              `sales_channel_id`    BINARY(16)      NOT NULL,
              `theme_name`          VARCHAR(255)    NOT NULL,
              `created_at`          DATETIME(3)     NOT NULL,
              `updated_at`          DATETIME(3)     NULL,
              PRIMARY KEY (`sales_channel_id`, `theme_name`),
              UNIQUE `uniq.sales_channel_theme.sales_channel_id` (`sales_channel_id`),
              CONSTRAINT `fk.sales_channel_theme.sales_channel_id` FOREIGN KEY (`sales_channel_id`)
                REFERENCES `sales_channel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            )
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
