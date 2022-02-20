pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "../ElpisMetaverseHeroes.sol";
import "../ElpisHeroesData.sol";

/**
 * @title - ElpisHeroTradable contract
 * @notice - This contract has role that put on sale of elpisHero
 */
contract ElpisHeroTradable {
    event TradeStatusChange(uint256 ad, bytes32 status);

    ElpisMetaverseHeroes private elpisMetaverseHeroes;
    ElpisHeroesData public elpisHeroesData;

    //TODO make set function of elpisMetaverseHeroes and elpisHeroesData

    struct Trade {
        address seller;
        uint256 tokenId;
        uint256 tokenPrice;
        bytes32 status; /// Open, Executed, Cancelled
    }
    mapping(uint256 => Trade) public trades; /// [Key]: ElpisHeroes's token ID

    uint256 tradeCounter;

    constructor(ElpisHeroesData _elpisHeroesData) {
        elpisHeroesData = _elpisHeroesData;
        tradeCounter = 0;
    }

    /**
     * @notice - This method is only executed when ElpisHero is created
     * @dev Opens a new trade. Puts _tokenId in escrow.
     * @param _tokenId The id for the tokenId to trade.
     * @param _tokenPrice The amount of currency for which to trade the tokenId.
     */
    function openTradeWhenCreateNewPhotoNFT(
        uint256 _tokenId,
        uint256 _tokenPrice
    ) public {
        elpisMetaverseHeroes.transferFrom(msg.sender, address(this), _tokenId);

        trades[tradeCounter] = Trade({
            seller: msg.sender,
            tokenId: _tokenId,
            tokenPrice: _tokenPrice,
            status: "Open"
        });
        tradeCounter += 1; /// [Note]: Original
    }

    /**
     * @dev Opens a trade by the seller.
     */
    function openTrade(uint256 _tokenId) public {
        Trade storage trade = trades[_tokenId];
        require(
            msg.sender == trade.seller,
            "Trade can be open only by seller."
        );
        elpisHeroesData.updateStatus(_tokenId, "Open");
        elpisMetaverseHeroes.transferFrom(
            msg.sender,
            address(this),
            trade.tokenId
        );
        trades[_tokenId].status = "Open";
        emit TradeStatusChange(_tokenId, "Open");
    }

    /**
     * @dev Cancels a trade by the seller.
     */
    function cancelTrade(uint256 _tokenId) public {
        Trade storage trade = trades[_tokenId];
        require(
            msg.sender == trade.seller,
            "Trade can be cancelled only by seller."
        );
        require(trade.status == "Open", "Trade is not Open.");

        elpisHeroesData.updateStatus(_tokenId, "Cancelled");
        elpisMetaverseHeroes.transferFrom(
            address(this),
            trade.seller,
            trade.tokenId
        );
        trades[_tokenId].status = "Cancelled";
        emit TradeStatusChange(_tokenId, "Cancelled");
    }

    /**
     * @dev Executes a trade. Must have approved this contract to transfer the amount of currency specified to the seller. Transfers ownership of the elpisHero to the filler.
     */
    function transferOwnershipOfElpisHero(uint256 _tokenId, address _buyer)
        public
    {
        // Trade memory trade = getTrade(_tokenId);
        Trade storage trade = trades[_tokenId];
        require(trade.status == "Open", "Trade is not Open.");

        _updateSeller(_tokenId, _buyer);

        elpisMetaverseHeroes.transferFrom(address(this), _buyer, trade.tokenId);
        getTrade(_tokenId).status = "Cancelled";
        emit TradeStatusChange(_tokenId, "Cancelled");
    }

    function _updateSeller(uint256 _tokenId, address _newSeller) internal {
        Trade storage trade = trades[_tokenId];
        trade.seller = _newSeller;
    }

    /**
     * @dev - Returns the details for a trade.
     */
    function getTrade(uint256 _tokenId)
        public
        view
        returns (Trade memory trade_)
    {
        Trade memory trade = trades[_tokenId];
        return trade;
        //return (trade.seller, trade.tokenId, trade.tokenPrice, trade.status);
    }
}
