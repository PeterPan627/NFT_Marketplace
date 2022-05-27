import React, { useState, useEffect } from "react";

import ItemList from "../../../../components/ItemList";
// import { GraphQueryUrls } from "../../../../constants";
// import {
//   makeGraphQlVariables,
//   sendRequestByGraphQl,
// } from "../../../../utils/fetch";

import { Filter, GeneralFilter, SkillFilter, StatsFilter } from "..";
import { Wrapper, FilterWrapper, ContentsWrapper } from "./styled";
import { fetchAllHeroes } from "../../../../utils/wallet";

const AllHeros: React.FC = () => {
  const [filterCondition, setFilterCondition] = useState<any>({
    recruitCounter: { start: 0, end: 7 },
    pagination: { page: 1, size: 20, total: 1 },
  });
  const [listItems, setListItems] = useState<any[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  const fetchAllElpisHeroes = async () => {
    const allHeroes = await fetchAllHeroes();
    setListItems(allHeroes);
    setTotalItemsCount(allHeroes.length);
  };

  useEffect(() => {
    fetchAllElpisHeroes();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchedData = await sendRequestByGraphQl({
  //       query: GraphQueryUrls.heroList,
  //       variables: makeGraphQlVariables(filterCondition),
  //     });
  //     const items = fetchedData.data?.heroOrders?.items || [];
  //     setListItems(items);
  //     setTotalItemsCount(fetchedData.data?.heroOrders?.total || 0);
  //     // setFilterCondition({
  //     //   ...filterCondition,
  //     //   pagination: {
  //     //     page: fetchedData.data?.heroOrders?.page || 0,
  //     //     size: fetchedData.data?.heroOrders?.size || 20,
  //     //     total: fetchedData.data?.heroOrders?.total || 0,
  //     //   },
  //     // });
  //   };
  //   fetchData();
  // }, [filterCondition]);

  return (
    <Wrapper>
      <FilterWrapper>
        <Filter
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />
        <GeneralFilter
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />
        <SkillFilter
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />
        <StatsFilter
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />
      </FilterWrapper>
      <ContentsWrapper>
        <ItemList
          items={listItems}
          totalItemsCount={totalItemsCount}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />
      </ContentsWrapper>
    </Wrapper>
  );
};

export default AllHeros;
