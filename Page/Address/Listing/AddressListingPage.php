<?php declare(strict_types=1);

namespace Cicada\Storefront\Page\Address\Listing;

use Cicada\Core\Checkout\Cart\Cart;
use Cicada\Core\Checkout\Customer\Aggregate\CustomerAddress\CustomerAddressCollection;
use Cicada\Core\Checkout\Customer\Aggregate\CustomerAddress\CustomerAddressEntity;
use Cicada\Core\Framework\Log\Package;
use Cicada\Core\System\Country\CountryCollection;
use Cicada\Core\System\Salutation\SalutationCollection;
use Cicada\Storefront\Page\Page;

#[Package('storefront')]
class AddressListingPage extends Page
{
    /**
     * @var CustomerAddressCollection
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $addresses;

    /**
     * @var SalutationCollection
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $salutations;

    /**
     * @var CountryCollection
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $countries;

    /**
     * @var Cart
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $cart;

    /**
     * @var CustomerAddressEntity|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $address;

    public function getAddresses(): CustomerAddressCollection
    {
        return $this->addresses;
    }

    public function setAddresses(CustomerAddressCollection $addresses): void
    {
        $this->addresses = $addresses;
    }

    public function getSalutations(): SalutationCollection
    {
        return $this->salutations;
    }

    public function setSalutations(SalutationCollection $salutations): void
    {
        $this->salutations = $salutations;
    }

    public function getCountries(): CountryCollection
    {
        return $this->countries;
    }

    public function setCountries(CountryCollection $countries): void
    {
        $this->countries = $countries;
    }

    public function getCart(): Cart
    {
        return $this->cart;
    }

    public function setCart(Cart $cart): void
    {
        $this->cart = $cart;
    }

    public function getAddress(): ?CustomerAddressEntity
    {
        return $this->address;
    }

    public function setAddress(?CustomerAddressEntity $address): void
    {
        $this->address = $address;
    }
}
