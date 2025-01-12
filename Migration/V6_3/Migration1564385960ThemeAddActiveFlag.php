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
#[Package('core')]
class Migration1564385960ThemeAddActiveFlag extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1564385960;
    }

    public function update(Connection $connection): void
    {
        $this->addColumn(
            connection: $connection,
            table: 'theme',
            column: 'active',
            type: 'TINYINT(1)',
            default: '1'
        );

        $connection->executeStatement('
            UPDATE `media_default_folder` SET `association_fields` = \'[\"media\"]\' WHERE `entity` = \'theme\';
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
