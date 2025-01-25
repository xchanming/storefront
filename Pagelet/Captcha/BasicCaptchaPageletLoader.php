<?php declare(strict_types=1);

namespace Cicada\Storefront\Pagelet\Captcha;

use Cicada\Core\Framework\Log\Package;
use Cicada\Core\System\SalesChannel\SalesChannelContext;
use Cicada\Storefront\Framework\Captcha\BasicCaptcha\AbstractBasicCaptchaGenerator;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Do not use direct or indirect repository calls in a PageletLoader. Always use a store-api route to get or put data.
 */
#[Package('framework')]
class BasicCaptchaPageletLoader extends AbstractBasicCaptchaPageletLoader
{
    /**
     * @internal
     */
    public function __construct(
        private readonly EventDispatcherInterface $eventDispatcher,
        private readonly AbstractBasicCaptchaGenerator $basicCaptchaGenerator
    ) {
    }

    public function load(Request $request, SalesChannelContext $context): BasicCaptchaPagelet
    {
        $pagelet = new BasicCaptchaPagelet();
        $pagelet->setCaptcha($this->basicCaptchaGenerator->generate());

        $this->eventDispatcher->dispatch(
            new BasicCaptchaPageletLoadedEvent($pagelet, $context, $request)
        );

        return $pagelet;
    }
}
