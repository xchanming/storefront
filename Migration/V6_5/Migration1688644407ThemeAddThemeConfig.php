<?php declare(strict_types=1);

namespace Cicada\Storefront\Migration\V6_5;

use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Migration\MigrationStep;
use Doctrine\DBAL\Connection;

/**
 * @internal
 */
#[Package('framework')]
class Migration1688644407ThemeAddThemeConfig extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1688644407;
    }

    public function update(Connection $connection): void
    {
        $this->addColumn(
            connection: $connection,
            table: 'theme',
            column: 'theme_json',
            type: 'JSON',
        );
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
