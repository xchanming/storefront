<?php declare(strict_types=1);

namespace Cicada\Storefront\Theme;

use Cicada\Core\Framework\Log\Package;
use Cicada\Core\Framework\Struct\Struct;

#[Package('storefront')]
class ThemeConfigField extends Struct
{
    /**
     * @var string
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $name;

    /**
     * @var array
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $label;

    /**
     * @var array|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $helpText;

    /**
     * @var string
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $type;

    /**
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $value;

    /**
     * @var bool|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $editable;

    /**
     * @var string|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $block;

    /**
     * @var string|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $section;

    /**
     * @var string|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $tab;

    /**
     * @var int|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $order;

    /**
     * @var int|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $sectionOrder;

    /**
     * @var int|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $blockOrder;

    /**
     * @var int|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $tabOrder;

    /**
     * @var array|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $custom;

    /**
     * @var bool|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $scss;

    /**
     * @var bool|null
     *
     * @deprecated tag:v6.7.0 - Will be natively typed
     */
    protected $fullWidth;

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getLabel(): ?array
    {
        return $this->label;
    }

    public function setLabel(?array $label): void
    {
        $this->label = $label;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }

    public function getValue()
    {
        return $this->value;
    }

    public function setValue($value): void
    {
        $this->value = $value;
    }

    public function getEditable(): ?bool
    {
        return $this->editable;
    }

    public function setEditable(?bool $editable): void
    {
        $this->editable = $editable;
    }

    public function getBlock(): ?string
    {
        return $this->block;
    }

    public function setBlock(?string $block): void
    {
        $this->block = $block;
    }

    public function getSection(): ?string
    {
        return $this->section;
    }

    public function setSection(?string $section): void
    {
        $this->section = $section;
    }

    public function getTab(): ?string
    {
        return $this->tab;
    }

    public function setTab(?string $tab): void
    {
        $this->tab = $tab;
    }

    public function getOrder(): ?int
    {
        return $this->order;
    }

    public function setOrder(?int $order): void
    {
        $this->order = $order;
    }

    public function getTabOrder(): ?int
    {
        return $this->tabOrder;
    }

    public function setTabOrder(?int $tabOrder): void
    {
        $this->tabOrder = $tabOrder;
    }

    public function getSectionOrder(): ?int
    {
        return $this->sectionOrder;
    }

    public function setSectionOrder(?int $sectionOrder): void
    {
        $this->sectionOrder = $sectionOrder;
    }

    public function getBlockOrder(): ?int
    {
        return $this->blockOrder;
    }

    public function setBlockOrder(?int $blockOrder): void
    {
        $this->blockOrder = $blockOrder;
    }

    public function getHelpText(): ?array
    {
        return $this->helpText;
    }

    public function setHelpText(?array $helpText): void
    {
        $this->helpText = $helpText;
    }

    public function getCustom(): ?array
    {
        return $this->custom;
    }

    public function setCustom(?array $custom): void
    {
        $this->custom = $custom;
    }

    public function getScss(): ?bool
    {
        return $this->scss;
    }

    public function setScss(?bool $scss): void
    {
        $this->scss = $scss;
    }

    public function getFullWidth(): ?bool
    {
        return $this->fullWidth;
    }

    public function setFullWidth(?bool $fullWidth): void
    {
        $this->fullWidth = $fullWidth;
    }
}
