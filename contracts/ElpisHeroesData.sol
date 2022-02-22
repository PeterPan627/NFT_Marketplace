pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./elpisHeroData/ElpisHeroDataStorages.sol";
import "./ElpisMetaverseHeroes.sol";

/**
 * @notice - This is the storage contract for elpisHeroesData
 */
contract ElpisHeroesData is ElpisHeroDataStorages {
    address private owner;

    uint256[] public elpisHeroIds;

    ElpisMetaverseHeroes private elpisHeroes;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Must be owner");
        _;
    }

    modifier isApproved(uint256 tokenId) {
        address tokenOwner = elpisHeroes.ownerOf(tokenId);
        require(
            msg.sender == tokenOwner ||
                elpisHeroes.getApproved(tokenId) == msg.sender ||
                elpisHeroes.isApprovedForAll(tokenOwner, msg.sender),
            "Must be owner or approved"
        );
        _;
    }

    /**
     * @notice - Setting ElpisMetaversHeroContract
     */
    function setElpisHeroContract(ElpisMetaverseHeroes _elpisHeroes)
        public
        isOwner
    {
        elpisHeroes = _elpisHeroes;
    }

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
            status: "Cancelled",
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
    isApproved(_elpisHeroId)
    {
        /// Identify elpisHero's index. It is the same as tokenId
        uint256 elpisHeroIndex = _elpisHeroId;

        /// Update metadata of a elpisHero
        ElpisHeroData storage elpisHeroData = elpisHeroesData[elpisHeroIndex];
        elpisHeroData.status = _newStatus;
    }

    /**
     * @notice - Update price
     */
    function updatePrice(uint256 _elpisHeroId, uint256 _newPrice)
        public
    isApproved(_elpisHeroId)
    {
        require(_newPrice > 0, "Price should be greater than zero");

        /// Identify elpisHero's index. It is the same as tokenId
        uint256 elpisHeroIndex = _elpisHeroId;

        /// Update metadata of a elpisHero
        ElpisHeroData storage elpisHeroData = elpisHeroesData[elpisHeroIndex];
        elpisHeroData.heroPrice = _newPrice;
    }

    ///-----------------
    /// Getter methods
    ///-----------------
    function getElpisHeroData(uint256 elpisHeroId)
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
