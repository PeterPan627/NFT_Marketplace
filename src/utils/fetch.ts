const axios = require("axios");

function fetch({
  method,
  url,
  headers = { "content-type": "application/json" },
  data,
}: {
  method: string;
  url: string;
  headers?: any;
  data: any;
}) {
  return axios({
    method: (method || "").toLowerCase(),
    url: url,
    headers: headers,
    data,
  });
}

export async function sendRequestByGraphQl({
  query,
  variables,
}: {
  query: string;
  variables: any;
}) {
  const data = JSON.stringify({
    query,
    variables,
  });
  try {
    const result = await fetch({
      url: "https://api.elpis.game/elpis-be/graphql",
      method: "post",
      data,
    });
    return result.data;
  } catch (err) {
    console.error("graphql error", err);
  }
}

export function makeGraphQlVariables(condition: any) {
  let variables: any = {
    currency: "BNB",
    sortField: "createdAt",
    sortDirection: "desc",
  };
  if (condition.gender)
    variables.gender = Object.keys(condition.gender)
      .map((key) => (condition.gender[key] ? key.toUpperCase() : null))
      .filter((item) => !!item);
  if (condition.races)
    variables.heroRaces = Object.keys(condition.races)
      .map((key) => (condition.races[key] ? key.toUpperCase() : null))
      .filter((item) => !!item);
  if (condition.rarity)
    variables.rarities = Object.keys(condition.rarity)
      .map((key) => (condition.rarity[key] ? key.toUpperCase() : null))
      .filter((item) => !!item);
  if (condition.recruitCounter)
    variables.recruitedCount = [
      condition.recruitCounter.start || 0,
      condition.recruitCounter.end || 7,
    ];
  if (condition.skill)
    variables.normalSkills = condition.skill.map((item: any) => item.label);
  if (condition.stats?.agility)
    variables.agility = [
      condition.stats.agility.start || 0,
      condition.stats.agility.end || 100,
    ];
  if (condition.stats?.strength)
    variables.strength = [
      condition.stats.strength.start || 0,
      condition.stats.strength.end || 100,
    ];
  if (condition.stats?.vitality)
    variables.vitality = [
      condition.stats.vitality.start || 0,
      condition.stats.vitality.end || 100,
    ];
  if (condition.currency) variables.currency = condition.currency;
  if (condition.sort) {
    variables.sortField = condition.sort.sortField;
    variables.sortDirection = condition.sort.sortDirection;
  }
  if (condition.pagination) {
    variables.page = condition.pagination.page;
    variables.size = condition.pagination.size;
  }
  return variables;
}
