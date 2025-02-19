<?php declare(strict_types=1);

namespace Shopware\Storefront\Controller;

use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Validation\Exception\ConstraintViolationException;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Shopware\Storefront\Framework\Twig\ErrorTemplateResolver;
use Shopware\Storefront\Page\Navigation\Error\ErrorPageLoaderInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\FlashBagAwareSessionInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Validator\ConstraintViolationList;

/**
 * @internal
 * Do not use direct or indirect repository calls in a controller. Always use a store-api route to get or put data
 */
#[Package('framework')]
class ErrorController extends StorefrontController
{
    /**
     * @internal
     */
    public function __construct(
        private readonly ErrorTemplateResolver $errorTemplateResolver,
        private readonly SystemConfigService $systemConfigService,
        private readonly ErrorPageLoaderInterface $errorPageLoader,
    ) {
    }

    public function error(\Throwable $exception, Request $request, SalesChannelContext $context): Response
    {
        $session = $request->hasSession() ? $request->getSession() : null;

        try {
            $is404StatusCode = $exception instanceof HttpException
                && $exception->getStatusCode() === Response::HTTP_NOT_FOUND;

            if (!$is404StatusCode && $session !== null && $session instanceof FlashBagAwareSessionInterface && !$session->getFlashBag()->has('danger')) {
                $session->getFlashBag()->add('danger', $this->trans('error.message-default'));
            }

            $request->attributes->set('navigationId', $context->getSalesChannel()->getNavigationCategoryId());

            $salesChannelId = $context->getSalesChannelId();
            $cmsErrorLayoutId = $this->systemConfigService->getString('core.basicInformation.http404Page', $salesChannelId);
            if ($cmsErrorLayoutId !== '' && $is404StatusCode) {
                $errorPage = $this->errorPageLoader->load($cmsErrorLayoutId, $request, $context);

                $response = $this->renderStorefront(
                    '@Storefront/storefront/page/content/index.html.twig',
                    ['page' => $errorPage]
                );
            } else {
                $errorTemplate = $this->errorTemplateResolver->resolve($exception, $request);

                $response = $this->renderStorefront($errorTemplate->getTemplateName(), ['page' => $errorTemplate]);
            }

            if ($exception instanceof HttpException) {
                $response->setStatusCode($exception->getStatusCode());
            }
        } catch (\Exception $e) { // final Fallback
            $response = $this->renderStorefront(
                '@Storefront/storefront/page/error/index.html.twig',
                ['exception' => $exception, 'followingException' => $e]
            );

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // After this controllers content is rendered (even if the flashbag was not used e.g. on a 404 page),
        // clear the existing flashbag messages

        if ($session !== null && $session instanceof FlashBagAwareSessionInterface) {
            $session->getFlashBag()->clear();
        }

        return $response;
    }

    public function onCaptchaFailure(
        ConstraintViolationList $violations,
        Request $request
    ): Response {
        $formViolations = new ConstraintViolationException($violations, []);
        if (!$request->isXmlHttpRequest()) {
            return $this->forwardToRoute($request->get('_route'), ['formViolations' => $formViolations]);
        }

        $response = [];
        $response[] = [
            'type' => 'danger',
            'error' => 'invalid_captcha',
            'alert' => $this->renderView('@Storefront/storefront/utilities/alert.html.twig', [
                'type' => 'danger',
                'list' => [$this->trans('error.' . $formViolations->getViolations()->get(0)->getCode())],
            ]),
        ];

        return new JsonResponse($response);
    }
}
