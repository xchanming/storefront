<?php declare(strict_types=1);

namespace Cicada\Storefront\Controller;

use Cicada\Core\Framework\Log\Package;
use Cicada\Core\System\SalesChannel\SalesChannelContext;
use Cicada\Storefront\Page\Navigation\NavigationPageLoadedHook;
use Cicada\Storefront\Page\Navigation\NavigationPageLoaderInterface;
use Cicada\Storefront\Pagelet\Footer\FooterPageletLoaderInterface;
use Cicada\Storefront\Pagelet\Header\HeaderPageletLoaderInterface;
use Cicada\Storefront\Pagelet\Menu\Offcanvas\MenuOffcanvasPageletLoadedHook;
use Cicada\Storefront\Pagelet\Menu\Offcanvas\MenuOffcanvasPageletLoaderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * @internal
 * Do not use direct or indirect repository calls in a controller. Always use a store-api route to get or put data
 */
#[Route(defaults: ['_routeScope' => ['storefront']])]
#[Package('buyers-experience')]
class NavigationController extends StorefrontController
{
    /**
     * @internal
     */
    public function __construct(
        private readonly NavigationPageLoaderInterface $navigationPageLoader,
        private readonly MenuOffcanvasPageletLoaderInterface $offcanvasLoader,
        private readonly HeaderPageletLoaderInterface $headerLoader,
        private readonly FooterPageletLoaderInterface $footerLoader,
    ) {
    }

    #[Route(path: '/', name: 'frontend.home.page', options: ['seo' => true], defaults: ['_httpCache' => true], methods: ['GET'])]
    public function home(Request $request, SalesChannelContext $context): Response
    {
        $page = $this->navigationPageLoader->load($request, $context);

        $this->hook(new NavigationPageLoadedHook($page, $context));

        return $this->renderStorefront('@Storefront/storefront/page/content/index.html.twig', ['page' => $page]);
    }

    #[Route(path: '/navigation/{navigationId}', name: 'frontend.navigation.page', options: ['seo' => true], defaults: ['_httpCache' => true], methods: ['GET'])]
    public function index(SalesChannelContext $context, Request $request): Response
    {
        $page = $this->navigationPageLoader->load($request, $context);

        $this->hook(new NavigationPageLoadedHook($page, $context));

        return $this->renderStorefront('@Storefront/storefront/page/content/index.html.twig', ['page' => $page]);
    }

    #[Route(path: '/widgets/menu/offcanvas', name: 'frontend.menu.offcanvas', defaults: ['XmlHttpRequest' => true, '_httpCache' => true], methods: ['GET'])]
    public function offcanvas(Request $request, SalesChannelContext $context): Response
    {
        $page = $this->offcanvasLoader->load($request, $context);

        $this->hook(new MenuOffcanvasPageletLoadedHook($page, $context));

        $response = $this->renderStorefront(
            '@Storefront/storefront/layout/navigation/offcanvas/navigation-pagelet.html.twig',
            ['page' => $page]
        );

        $response->headers->set('x-robots-tag', 'noindex');

        return $response;
    }

    #[Route(path: '/header', name: 'frontend.header', defaults: ['_httpCache' => true, '_esi' => true], methods: ['GET'])]
    public function header(Request $request, SalesChannelContext $context): Response
    {
        $header = $this->headerLoader->load($request, $context);

        return $this->renderStorefront('@Storefront/storefront/layout/header.html.twig', ['header' => $header]);
    }

    #[Route(path: '/footer', name: 'frontend.footer', defaults: ['_httpCache' => true, '_esi' => true], methods: ['GET'])]
    public function footer(Request $request, SalesChannelContext $context): Response
    {
        $footer = $this->footerLoader->load($request, $context);

        return $this->renderStorefront('@Storefront/storefront/layout/footer.html.twig', ['footer' => $footer]);
    }
}
