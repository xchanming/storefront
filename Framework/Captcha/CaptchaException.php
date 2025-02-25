<?php declare(strict_types=1);

namespace Shopware\Storefront\Framework\Captcha;

use Shopware\Core\Framework\HttpException;
use Shopware\Core\Framework\Log\Package;
use Symfony\Component\HttpFoundation\Response;

/**
 * @codeCoverageIgnore
 */
#[Package('framework')]
class CaptchaException extends HttpException
{
    public const INVALID_CAPTCHA_ERROR = 'FRAMEWORK__INVALID_CAPTCHA_VALUE';

    public static function invalid(AbstractCaptcha $captcha): self
    {
        return new self(
            Response::HTTP_FORBIDDEN,
            self::INVALID_CAPTCHA_ERROR,
            'The provided value for captcha "{{ captcha }}" is not valid.',
            [
                'captcha' => $captcha::class,
            ]
        );
    }
}
