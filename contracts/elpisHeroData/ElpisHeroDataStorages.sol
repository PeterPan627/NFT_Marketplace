pragma solidity ^0.8.0;

import "./ElpisHeroDataObjects.sol";

// shared storage
contract ElpisHeroDataStorages is ElpisHeroDataObjects {
    ElpisHeroData[] public elpisHeroesData;
}
