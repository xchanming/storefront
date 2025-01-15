<?php declare(strict_types=1);

namespace Cicada\Storefront\Page\Account\Order;

use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Script\Execution\Awareness\SalesChannelContextAwareTrait;
use Cicada\Core\System\SalesChannel\SalesChannelContext;
use Cicada\Storefront\Page\PageLoadedHook;

/**
 * Triggered when the AccountOrderPage is loaded
 *
 * @hook-use-case data_loading
 *
 * @since 6.4.8.0
 *
 * @final
 */
#[Package('checkout')]
class AccountOrderPageLoadedHook extends PageLoadedHook
{
    use SalesChannelContextAwareTrait;

    final public const HOOK_NAME = 'account-order-page-loaded';

    public function __construct(
        private readonly AccountOrderPage $page,
        SalesChannelContext $context
    ) {
        parent::__construct($context->getContext());
        $this->salesChannelContext = $context;
    }

    public function getName(): string
    {
        return self::HOOK_NAME;
    }

    public function getPage(): AccountOrderPage
    {
        return $this->page;
    }
}
