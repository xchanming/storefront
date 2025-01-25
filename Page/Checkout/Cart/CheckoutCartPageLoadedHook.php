<?php declare(strict_types=1);

namespace Cicada\Storefront\Page\Checkout\Cart;

use Cicada\Core\Checkout\Cart\Cart;
use Cicada\Core\Checkout\Cart\Hook\CartAware;
use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Script\Execution\Awareness\SalesChannelContextAwareTrait;
use Cicada\Core\System\SalesChannel\SalesChannelContext;
use Cicada\Storefront\Page\PageLoadedHook;

/**
 * Triggered when the CheckoutCartPage is loaded
 *
 * @hook-use-case data_loading
 *
 * @since 6.4.8.0
 *
 * @final
 */
#[Package('framework')]
class CheckoutCartPageLoadedHook extends PageLoadedHook implements CartAware
{
    use SalesChannelContextAwareTrait;

    final public const HOOK_NAME = 'checkout-cart-page-loaded';

    public function __construct(
        private readonly CheckoutCartPage $page,
        SalesChannelContext $context
    ) {
        parent::__construct($context->getContext());
        $this->salesChannelContext = $context;
    }

    public function getName(): string
    {
        if ($this->getCart()->getSource()) {
            return self::HOOK_NAME . '-' . $this->getCart()->getSource();
        }

        return self::HOOK_NAME;
    }

    public function getPage(): CheckoutCartPage
    {
        return $this->page;
    }

    public function getCart(): Cart
    {
        return $this->page->getCart();
    }
}
