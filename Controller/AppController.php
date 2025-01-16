<?php declare(strict_types=1);

namespace Cicada\Storefront\Controller;

use Cicada\Core\Framework\App\Api\AppJWTGenerateRoute;
use Cicada\Core\Framework\App\AppException;
use Cicada\Core\Framework\Log\Package;
use Cicada\Core\System\SalesChannel\SalesChannelContext;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * @internal
 */
#[Route(defaults: ['_routeScope' => ['storefront']])]
#[Package('framework')]
final class AppController
{
    public function __construct(private readonly AppJWTGenerateRoute $appJWTGenerateRoute)
    {
    }

    #[Route(path: '/app-system/{name}/generate-token', name: 'frontend.app-system.generate-token', defaults: ['_noStore' => true], methods: ['POST'])]
    public function generateToken(string $name, SalesChannelContext $context): Response
    {
        try {
            return $this->appJWTGenerateRoute->generate($name, $context);
        } catch (AppException $e) {
            return new JsonResponse(['message' => $e->getMessage()], $e->getStatusCode());
        }
    }
}
