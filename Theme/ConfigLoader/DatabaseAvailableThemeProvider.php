<?php
declare(strict_types=1);

namespace Cicada\Storefront\Theme\ConfigLoader;

use Cicada\Core\Defaults;
use Cicada\Core\Framework\Context;
use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Plugin\Exception\DecorationPatternException;
use Cicada\Core\Framework\Uuid\Uuid;
use Doctrine\DBAL\Connection;

#[Package('framework')]
class DatabaseAvailableThemeProvider extends AbstractAvailableThemeProvider
{
    /**
     * @internal
     */
    public function __construct(private readonly Connection $connection)
    {
    }

    public function getDecorated(): AbstractAvailableThemeProvider
    {
        throw new DecorationPatternException(self::class);
    }

    public function load(Context $context, bool $activeOnly): array
    {
        $qb = $this->connection->createQueryBuilder()
            ->from('theme_sales_channel')
            ->select(['LOWER(HEX(sales_channel_id))', 'LOWER(HEX(theme_id))'])
            ->leftJoin('theme_sales_channel', 'sales_channel', 'sales_channel', 'sales_channel.id = theme_sales_channel.sales_channel_id')
            ->where('sales_channel.type_id = :typeId')
            ->setParameter('typeId', Uuid::fromHexToBytes(Defaults::SALES_CHANNEL_TYPE_STOREFRONT));

        if ($activeOnly) {
            $qb->andWhere('sales_channel.active = 1');
        }

        /** @var array<string, string> $keyValue */
        $keyValue = $qb->executeQuery()->fetchAllKeyValue();

        return $keyValue;
    }
}
