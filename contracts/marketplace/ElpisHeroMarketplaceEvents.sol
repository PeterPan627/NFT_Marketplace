pragma solidity ^0.8.0;

contract ElpisHeroMarketplaceEvents {
    event ElpisHeroOwnershipChanged(
        uint256 tokenId,
        address ownerBeforeOwnershipTransferred,
        address ownerAfterOwnershipTransferred
    );
}
