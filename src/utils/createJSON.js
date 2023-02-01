import buildNation from "../utils/buildNation";

const createJSON = ({entries}) => {
  const entryData = entries.map(entry => ({
    id: entry.playerId,
    color: entry.color,
    name: entry.nationName,
    capital: entry.capitals
      .split(" ")
      .filter(c => c)
      .map(c => c.toUpperCase()),
    territoryNames: entry.territories
      .split(" ")
      .filter(t => t)
      .map(t => t.toUpperCase())
  }));

  const players = [];
  const nations = [];

  entryData.forEach(dataset => {
    const {nation, player} = buildNation(dataset);
    players.push(player);
    nations.push(nation);
  });

  return JSON.stringify(
    {
      players,
      nations
    },
    null,
    2
  );
};

export default createJSON;