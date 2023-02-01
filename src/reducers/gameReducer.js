import {createId} from "../utils";
import {colorData} from "../static/data";

const gameReducer = (games, action) => {
  const game = action.gameId ?
    games.filter(game => game.id === action.gameId)[0]
    :
    null;

  switch(action.type){
    case "addGame":
      const newGame = {
        id: createId(games),
        name: "Untitled Game",
        entries: [],
        colors: colorData.map(color => ({
          name: color.name,
          hex: color.hex,
          selected: false,
        }))
      };
      return [
        ...games,
        newGame
      ];

    case "updateGame":
      return [
        action.updatedGame,
        ...games.filter(game => game.id !== action.gameId)
      ];
    
    case "gameErrors":
      if(action.clear){
        delete game.errors;
        delete game.duplicateTerritories;
        return [
          game,
          ...games.filter(game => game.id !== action.gameId)
        ];
      }
      game.errors = action.errors;
      game.duplicateTerritories = action.duplicateTerritories;
      return [
        game,
        ...games.filter(game => game.id !== action.gameId)
      ];

    case "deleteGame":
      return games.filter(game => game.id !== action.gameId);

    case "updateNation":
      if(!game) return games;
      if(action.colors){
        for(let i=0; i<game.colors.length; i++){
          if(game.colors[i].name === action.colors.old){
            game.colors[i].selected = false;
          }
          if(game.colors[i].name === action.colors.new){
            game.colors[i].selected = true;
          }
        }
      }
      game.entries[action.idx] = action.updatedNation;
      return [
        game,
        ...games.filter(game => game.id !== action.gameId)
      ];
    
    case "deleteNation":
      if(!game) return games;
      if(game.entries[action.idx].color){
        for(let i=0; i<game.colors.length; i++){
          if(game.colors[i].name === game.entries[action.idx].color){
            game.colors[i].selected = false;
          }
        }
      }
      delete game.errors;
      delete game.duplicateTerritories;
      return [
        {...game,
          entries: [
            ...game.entries.slice(0, action.idx),
            ...game.entries.slice(action.idx+1)
          ]
        },
        ...games.filter(game => game.id !== action.gameId)
      ];
      
    default:
      return games;
  }
};

export default gameReducer;