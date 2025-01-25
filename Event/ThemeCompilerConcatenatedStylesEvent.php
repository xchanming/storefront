<?php declare(strict_types=1);

namespace Cicada\Storefront\Event;

use Cicada\Core\Framework\Log\Package;
use Symfony\Contracts\EventDispatcher\Event;

#[Package('framework')]
class ThemeCompilerConcatenatedStylesEvent extends Event
{
    public function __construct(
        private string $concatenatedStyles,
        private readonly string $salesChannelId
    ) {
    }

    public function getConcatenatedStyles(): string
    {
        return $this->concatenatedStyles;
    }

    public function setConcatenatedStyles(string $concatenatedStyles): void
    {
        $this->concatenatedStyles = $concatenatedStyles;
    }

    public function getSalesChannelId(): string
    {
        return $this->salesChannelId;
    }
}
