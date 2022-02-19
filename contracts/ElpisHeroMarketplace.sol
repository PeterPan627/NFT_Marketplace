// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./ElpisMetaverseHeroes.sol";
import "./ElpisHeroesData.sol";
import "./marketplace/ElpisHeroMarketplaceEvents.sol";
import "./marketplace/ElpisHeroTradable.sol";
import "./utils/math/SafeMath.sol";

contract ElpisHeroMarketplace is ElpisHeroTradable, ElpisHeroMarketplaceEvents {
    using SafeMath for uint256;

    address public ELPISHERO_MARKETPLACE;
    ElpisHeroesData public elpisHeroesDataContract;
    ElpisMetaverseHeroes public elpisHeroes;

    constructor(
        ElpisHeroesData _elpisHeroesData,
        ElpisMetaverseHeroes _elpisHeroes
    ) ElpisHeroTradable(_elpisHeroesData) {
        elpisHeroesDataContract = _elpisHeroesData;
        elpisHeroes = _elpisHeroes;
        ELPISHERO_MARKETPLACE = address(uint160(address(this)));
    }

    /**
     * @notice - Buy function is that buy NFT token and ownership transfer. (Reference from IERC721.sol)
     * @notice - msg.sender buy NFT with ETH (msg.value)
     */

    function buyElpisHero(uint256 _tokenId) public payable {
        ElpisHeroesData.ElpisHeroData
            memory elpisHeroData = elpisHeroesDataContract.getElpiHeroData(
                _tokenId
            );
        address _seller = elpisHeroData.ownerAddress; /// Owner
        // address payable seller = address(uint160(_seller)); /// Convert owner address with payable
        address payable seller = payable(_seller); /// Convert owner address with payable
        uint256 buyAmount = elpisHeroData.heroPrice;
        require(
            msg.value == buyAmount,
            "msg.value should be equal to the buyAmount"
        );

        /// Bought-amount is transferred into a seller wallet
        seller.transfer(buyAmount);

        /// Approve a buyer address as a receiver before NFT's transferFrom method is executed
        address buyer = msg.sender;
        // uint256 photoId = 1; /// [Note]: PhotoID is always 1. Because each photoNFT is unique.
        uint256 elpisHeroId = elpisHeroData.elpisHeroId;
        elpisHeroes.approve(buyer, elpisHeroId);

        address ownerBeforeOwnershipTransferred = elpisHeroes.ownerOf(
            elpisHeroId
        );

        /// Transfer Ownership of the ElpisHero from a seller to a buyer
        transferOwnershipOfPhotoNFT(elpisHeroId, buyer);
        elpisHeroesDataContract.updateOwnerOfELpisHero(elpisHeroId, buyer);
        elpisHeroesDataContract.updateStatus(elpisHeroId, "Cancelled");

        /// Event for checking result of transferring ownership of a photoNFT
        address ownerAfterOwnershipTransferred = elpisHeroes.ownerOf(
            elpisHeroId
        );
        emit ElpisHeroOwnershipChanged(
            elpisHeroId,
            ownerBeforeOwnershipTransferred,
            ownerAfterOwnershipTransferred
        );

        /// Mint a photo with a new photoId
        //string memory tokenURI = photoNFTFactory.getTokenURI(photoData.ipfsHashOfPhoto);  /// [Note]: IPFS hash + URL
        //photoNFT.mint(msg.sender, tokenURI);
    }
}
