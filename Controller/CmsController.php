<?php declare(strict_types=1);

namespace Cicada\Storefront\Controller;

use Cicada\Core\Content\Category\SalesChannel\AbstractCategoryRoute;
use Cicada\Core\Content\Cms\CmsException;
use Cicada\Core\Content\Cms\SalesChannel\AbstractCmsRoute;
use Cicada\Core\Content\Product\SalesChannel\Detail\AbstractProductDetailRoute;
use Cicada\Core\Content\Product\SalesChannel\FindVariant\AbstractFindProductVariantRoute;
use Cicada\Core\Content\Product\SalesChannel\Listing\AbstractProductListingRoute;
use Cicada\Core\Content\Product\SalesChannel\Review\AbstractProductReviewLoader;
use Cicada\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Routing\RoutingException;
use Cicada\Core\System\SalesChannel\SalesChannelContext;
use Cicada\Storefront\Event\SwitchBuyBoxVariantEvent;
use Cicada\Storefront\Page\Cms\CmsPageLoadedHook;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * @internal
 * Do not use direct or indirect repository calls in a controller. Always use a store-api route to get or put data
 */
#[Route(defaults: ['_routeScope' => ['storefront']])]
#[Package('discovery')]
class CmsController extends StorefrontController
{
    /**
     * @internal
     */
    public function __construct(
        private readonly AbstractCmsRoute $cmsRoute,
        private readonly AbstractCategoryRoute $categoryRoute,
        private readonly AbstractProductListingRoute $listingRoute,
        private readonly AbstractProductDetailRoute $productRoute,
        private readonly AbstractProductReviewLoader $productReviewLoader,
        private readonly AbstractFindProductVariantRoute $findVariantRoute,
        private readonly EventDispatcherInterface $eventDispatcher
    ) {
    }

    #[Route(path: '/widgets/cms/{id}', name: 'frontend.cms.page', defaults: ['id' => null, 'XmlHttpRequest' => true, '_httpCache' => true], methods: ['GET', 'POST'])]
    public function page(?string $id, Request $request, SalesChannelContext $salesChannelContext): Response
    {
        if (!$id) {
            throw RoutingException::missingRequestParameter('id');
        }

        $page = $this->cmsRoute->load($id, $request, $salesChannelContext)->getCmsPage();

        $this->hook(new CmsPageLoadedHook($page, $salesChannelContext));

        $response = $this->renderStorefront('@Storefront/storefront/page/content/detail.html.twig', ['cmsPage' => $page]);
        $response->headers->set('x-robots-tag', 'noindex');

        return $response;
    }

    /**
     * Navigation id is required to load the slot config for the navigation
     */
    #[Route(
        path: '/widgets/cms/navigation/{navigationId}',
        name: 'frontend.cms.navigation.page',
        defaults: ['navigationId' => null, 'XmlHttpRequest' => true, '_httpCache' => true],
        methods: ['GET', 'POST']
    )]
    public function category(?string $navigationId, Request $request, SalesChannelContext $salesChannelContext): Response
    {
        if (!$navigationId) {
            throw RoutingException::missingRequestParameter('navigationId');
        }

        $category = $this->categoryRoute->load($navigationId, $request, $salesChannelContext)->getCategory();

        $page = $category->getCmsPage();
        if (!$page) {
            throw CmsException::pageNotFound('navigationId: ' . $navigationId);
        }

        $this->hook(new CmsPageLoadedHook($page, $salesChannelContext));

        $response = $this->renderStorefront('@Storefront/storefront/page/content/detail.html.twig', ['cmsPage' => $page]);
        $response->headers->set('x-robots-tag', 'noindex');

        return $response;
    }

    /**
     * Route to load the listing filters
     */
    #[Route(
        path: '/widgets/cms/navigation/{navigationId}/filter',
        name: 'frontend.cms.navigation.filter',
        defaults: ['XmlHttpRequest' => true, '_routeScope' => ['storefront'], '_httpCache' => true],
        methods: ['GET', 'POST']
    )]
    public function filter(string $navigationId, Request $request, SalesChannelContext $context): Response
    {
        // Allows to fetch only aggregations over the gateway.
        $request->request->set('only-aggregations', true);

        // Allows to convert all post-filters to filters. This leads to the fact that only aggregation values are returned, which are combinable with the previous applied filters.
        $request->request->set('reduce-aggregations', true);

        $listing = $this->listingRoute
            ->load($navigationId, $request, $context, new Criteria())
            ->getResult();

        $mapped = [];
        foreach ($listing->getAggregations() as $aggregation) {
            $mapped[$aggregation->getName()] = $aggregation;
        }

        $response = new JsonResponse($mapped);

        $response->headers->set('x-robots-tag', 'noindex');

        return $response;
    }

    /**
     * Route to load the cms element buy box product config which assigned to the provided product id.
     * Product id is required to load the slot config for the buy box
     */
    #[Route(
        path: '/widgets/cms/buybox/{productId}/switch',
        name: 'frontend.cms.buybox.switch',
        defaults: ['productId' => null, 'XmlHttpRequest' => true, '_routeScope' => ['storefront'], '_httpCache' => true],
        methods: ['GET']
    )]
    public function switchBuyBoxVariant(string $productId, Request $request, SalesChannelContext $context): Response
    {
        /** @var string $elementId */
        $elementId = $request->query->get('elementId');

        /** @var string[]|null $options */
        $options = json_decode($request->query->get('options', ''), true);

        $variantRequestData = [
            'switchedGroup' => $request->query->get('switched'),
            'options' => $options ?? [],
        ];
        $variantRequest = $request->duplicate($variantRequestData);

        $variantResponse = $this->findVariantRoute->load(
            $productId,
            $variantRequest,
            $context
        );

        $newProductId = $variantResponse->getFoundCombination()->getVariantId();

        $result = $this->productRoute->load($newProductId, $request, $context, new Criteria());
        $product = $result->getProduct();
        $configurator = $result->getConfigurator();

        $reviews = $this->productReviewLoader->load($request, $context, $product->getId(), $product->getParentId());

        $event = new SwitchBuyBoxVariantEvent($elementId, $product, $configurator, $request, $context);
        $this->eventDispatcher->dispatch($event);

        $response = $this->renderStorefront('@Storefront/storefront/component/buy-widget/buy-widget.html.twig', [
            'product' => $product,
            'configuratorSettings' => $configurator,
            'totalReviews' => $reviews->getTotal(),
            'elementId' => $elementId,
        ]);
        $response->headers->set('x-robots-tag', 'noindex');

        return $response;
    }
}
