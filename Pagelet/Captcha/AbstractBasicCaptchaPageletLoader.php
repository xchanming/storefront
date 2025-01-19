<?php declare(strict_types=1);

namespace Cicada\Storefront\Pagelet\Captcha;

use Cicada\Core\Framework\Log\Package;
use Cicada\Core\System\SalesChannel\SalesChannelContext;
use Symfony\Component\HttpFoundation\Request;

#[Package('framework')]
abstract class AbstractBasicCaptchaPageletLoader
{
    abstract public function load(Request $request, SalesChannelContext $context): BasicCaptchaPagelet;
}
