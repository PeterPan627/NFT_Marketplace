pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./elpisHeroData/ElpisHeroDataStorages.sol";
import "./ElpisHeroes.sol";

/**
 * @notice - This is the storage contract for elpisHeroesData
 */
contract ElpisHeroesData is ElpisHeroDataStorages {
    uint256[] public elpisHeroIds;

    // constructor() public {}

    /**
     * @notice - Save metadata of a elpisHero
     */
    function saveMetadataOfElpisHero(
        uint256 _elpisHeroId,
        string memory _elpisHeroName,
        address _ownerAddress,
        uint256 _heroPrice
    ) public {
        /// Save metadata of a elpisHero
        ElpisHeroData memory elpisHeroData = ElpisHeroData({
            elpisHeroId: _elpisHeroId,
            elpisHeroName: _elpisHeroName,
            ownerAddress: _ownerAddress,
            heroPrice: _heroPrice,
            status: "Open",
            reputation: 0
        });
        elpisHeroesData.push(elpisHeroData);

        /// Update elpisHeroIds
        elpisHeroIds.push(_elpisHeroId);
    }

    /**
     * @notice - Update owner address of a elpisHero by transferring ownership
     */
    function updateOwnerOfELpisHero(uint256 _elpisHeroId, address _newOwner)
        public
        returns (bool)
    {
        require(
            _newOwner != address(0),
            "A new owner address should be not empty"
        );
        /// Identify elpisHero's index. It is the same as tokenId
        uint256 elpisHeroIndex = _elpisHeroId;

        /// Update metadata of a elpisHero
        ElpisHeroData storage elpisHeroData = elpisHeroesData[elpisHeroIndex];
        elpisHeroData.ownerAddress = _newOwner;
    }

    /**
     * @notice - Update status ("Open" or "Cancelled")
     */
    function updateStatus(uint256 _elpisHeroId, string memory _newStatus)
        public
        returns (bool)
    {
        /// Identify elpisHero's index. It is the same as tokenId
        uint256 elpisHeroIndex = _elpisHeroId;

        /// Update metadata of a elpisHero
        ElpisHeroData storage elpisHeroData = elpisHeroesData[elpisHeroIndex];
        elpisHeroData.status = _newStatus;
    }

    ///-----------------
    /// Getter methods
    ///-----------------
    function getElpiHeroData(uint256 elpisHeroId)
        public
        view
        returns (ElpisHeroData memory _elpisHeroData)
    {
        /// [note]: index is the same as elpisHero token id
        ElpisHeroData memory elpisHeroData = elpisHeroesData[elpisHeroId];
        return elpisHeroData;
    }

    function getAllElpisData()
        public
        view
        returns (ElpisHeroData[] memory _elpisHeroesData)
    {
        return elpisHeroesData;
    }
}
