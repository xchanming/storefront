<?php declare(strict_types=1);

namespace Cicada\Storefront\Theme\Controller;

use Cicada\Core\Framework\Context;
use Cicada\Core\Framework\Log\Package;
use Cicada\Storefront\Theme\AbstractScssCompiler;
use Cicada\Storefront\Theme\ThemeService;
use Cicada\Storefront\Theme\Validator\SCSSValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route(defaults: ['_routeScope' => ['api']])]
#[Package('framework')]
class ThemeController extends AbstractController
{
    /**
     * @internal
     *
     * @param array<int, string> $customAllowedRegex
     */
    public function __construct(
        private readonly ThemeService $themeService,
        private readonly AbstractScssCompiler $scssCompiler,
        private readonly array $customAllowedRegex = []
    ) {
    }

    #[Route(path: '/api/_action/theme/{themeId}/configuration', name: 'api.action.theme.configuration', methods: ['GET'])]
    public function configuration(string $themeId, Context $context): JsonResponse
    {
        $themeConfiguration = $this->themeService->getThemeConfiguration($themeId, true, $context);

        return new JsonResponse($themeConfiguration);
    }

    #[Route(path: '/api/_action/theme/{themeId}', name: 'api.action.theme.update', methods: ['PATCH'])]
    public function updateTheme(string $themeId, Request $request, Context $context): JsonResponse
    {
        $config = $request->request->all('config');

        $this->themeService->updateTheme(
            $themeId,
            $config,
            (string) $request->request->get('parentThemeId'),
            $context
        );

        return new JsonResponse([]);
    }

    #[Route(path: '/api/_action/theme/{themeId}/assign/{salesChannelId}', name: 'api.action.theme.assign', methods: ['POST'])]
    public function assignTheme(string $themeId, string $salesChannelId, Context $context): JsonResponse
    {
        $this->themeService->assignTheme($themeId, $salesChannelId, $context);

        return new JsonResponse([]);
    }

    #[Route(path: '/api/_action/theme/{themeId}/reset', name: 'api.action.theme.reset', methods: ['PATCH'])]
    public function resetTheme(string $themeId, Context $context): JsonResponse
    {
        $this->themeService->resetTheme($themeId, $context);

        return new JsonResponse([]);
    }

    #[Route(path: '/api/_action/theme/{themeId}/structured-fields', name: 'api.action.theme.structuredFields', methods: ['GET'])]
    public function structuredFields(string $themeId, Context $context): JsonResponse
    {
        $themeConfiguration = $this->themeService->getThemeConfigurationStructuredFields($themeId, true, $context);

        return new JsonResponse($themeConfiguration);
    }

    #[Route(path: '/api/_action/theme/validate-fields', name: 'api.action.theme.validate', methods: ['POST'])]
    public function validateVariables(Request $request): JsonResponse
    {
        $fields = $request->request->all('fields');

        foreach ($fields as $key => $data) {
            // if no type is set just use the value and continue
            if (!isset($data['type'])) {
                continue;
            }

            $data['value'] = SCSSValidator::validate($this->scssCompiler, $data, $this->customAllowedRegex);
        }

        return new JsonResponse([]);
    }
}
