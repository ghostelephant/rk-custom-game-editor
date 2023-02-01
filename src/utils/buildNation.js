import {colorData} from "../static/data";


const buildNation = ({id, capital, territoryNames, color, name}) => {
  const colorNames = colorData.map(color => color.name);

  const capitalArray = typeof capital === "string" ?
    [capital]
    :
    capital;
  const identity = {id};
  const territories = territoryNames.map(value =>
     ({
      id: {value},
      type: capitalArray.includes(value) ? "CAPITAL" : "NORMAL"
    })
  );
  const nation = {
    identity,
    territories,
    allies: []
  };

  const player = {
    colorId: {value: colorNames.indexOf(color)},
    identity: {id},
    name
  };

  return {
    nation,
    player
  };
};

export default buildNation;