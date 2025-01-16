<?php declare(strict_types=1);

namespace Cicada\Storefront\Framework\Captcha\Exception;

use Cicada\Core\Framework\Log\Package;
use Cicada\Storefront\Framework\Captcha\AbstractCaptcha;
use Cicada\Storefront\Framework\Captcha\CaptchaException;
use Symfony\Component\HttpFoundation\Response;

/**
 * @deprecated tag:v6.7.0 - Will be removed, use CaptchaException::invalid instead
 */
#[Package('framework')]
class CaptchaInvalidException extends CaptchaException
{
    public function __construct(AbstractCaptcha $captcha)
    {
        parent::__construct(
            Response::HTTP_FORBIDDEN,
            'FRAMEWORK__INVALID_CAPTCHA_VALUE',
            'The provided value for captcha "{{ captcha }}" is not valid.',
            [
                'captcha' => $captcha::class,
            ]
        );
    }
}
