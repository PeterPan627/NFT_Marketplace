import React, { useState, useEffect } from "react";

import { GraphQueryUrls } from "../../../../Constants";
import {
  makeGraphQlVariables,
  sendRequestByGraphQl,
} from "../../../../utils/fetch";

import {
  Filter,
  GeneralFilter,
  SkillFilter,
  StatsFilter,
  ItemList,
} from "../../components";
import { FilterWrapper, ContentsWrapper } from "./styled";

const AllHeros: React.FC = () => {
  const [filterCondition, setFilterCondition] = useState<any>({
    recruitCounter: { start: 0, end: 7 },
    pagination: { page: 1, size: 20, total: 1 },
  });
  const [listItems, setListItems] = useState<any[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await sendRequestByGraphQl({
        query: GraphQueryUrls.heroList,
        variables: makeGraphQlVariables(filterCondition),
      });
      const items = fetchedData.data?.heroOrders?.items || [];
      setListItems(items);
      setTotalItemsCount(fetchedData.data?.heroOrders?.total || 0);
      // setFilterCondition({
      //   ...filterCondition,
      //   pagination: {
      //     page: fetchedData.data?.heroOrders?.page || 0,
      //     size: fetchedData.data?.heroOrders?.size || 20,
      //     total: fetchedData.data?.heroOrders?.total || 0,
      //   },
      // });
    };
    fetchData();
  }, [filterCondition]);
  return (
    <>
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
    </>
  );
};

export default AllHeros;
