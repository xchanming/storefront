<?php declare(strict_types=1);

namespace Cicada\Storefront\Migration\V6_3;

use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Migration\MigrationStep;
use Doctrine\DBAL\ArrayParameterType;
use Doctrine\DBAL\Connection;

/**
 * @internal
 *
 * @codeCoverageIgnore
 */
#[Package('framework')]
class Migration1604502151AddThemePreviewMediaConstraint extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1604502151;
    }

    public function update(Connection $connection): void
    {
        // Find themes with missing preview media
        $themeIdsWithInvalidMediaId = $connection->fetchFirstColumn(
            'SELECT `theme`.`id` FROM `theme`
            LEFT OUTER JOIN `media` ON `theme`.`preview_media_id` = `media`.`id`
            WHERE `media`.`id` IS NULL;'
        );

        $connection->executeStatement(
            'UPDATE `theme` SET `preview_media_id` = NULL WHERE `id` IN (:theme_ids)',
            [
                'theme_ids' => $themeIdsWithInvalidMediaId,
            ],
            [
                'theme_ids' => ArrayParameterType::BINARY,
            ]
        );

        $connection->executeStatement(
            'ALTER TABLE `theme`
            ADD FOREIGN KEY `fk.theme.preview_media_id`(preview_media_id) REFERENCES media(id)
                ON UPDATE CASCADE
                ON DELETE SET NULL;'
        );
    }

    public function updateDestructive(Connection $connection): void
    {
        // nth
    }
}
