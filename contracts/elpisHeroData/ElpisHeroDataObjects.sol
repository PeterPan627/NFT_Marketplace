pragma solidity ^0.8.0;

import "../ElpisHeroes.sol";

contract ElpisHeroDataObjects {
    struct ElpisHeroData {
        /// [Key]: index of array
        uint256 elpisHeroId;
        string elpisHeroName;
        address ownerAddress;
        uint256 heroPrice;
        string status; /// "Open" or "Cancelled"
        uint256 reputation;
    }
}
