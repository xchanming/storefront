<?php declare(strict_types=1);

namespace Cicada\Storefront\Page\Checkout\Finish;

use Cicada\Core\Checkout\Order\OrderEntity;
use Cicada\Core\Framework\Log\Package;
use Cicada\Storefront\Page\Page;

#[Package('framework')]
class CheckoutFinishPage extends Page
{
    /**
     * @var OrderEntity
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $order;

    /**
     * @var bool
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $changedPayment = false;

    /**
     * @var bool
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $paymentFailed = false;

    public function getOrder(): OrderEntity
    {
        return $this->order;
    }

    public function setOrder(OrderEntity $order): void
    {
        $this->order = $order;
    }

    public function isChangedPayment(): bool
    {
        return $this->changedPayment;
    }

    public function setChangedPayment(bool $changedPayment): void
    {
        $this->changedPayment = $changedPayment;
    }

    public function isPaymentFailed(): bool
    {
        return $this->paymentFailed;
    }

    public function setPaymentFailed(bool $paymentFailed): void
    {
        $this->paymentFailed = $paymentFailed;
    }
}
