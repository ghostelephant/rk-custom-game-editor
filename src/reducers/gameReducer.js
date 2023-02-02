import {createId} from "../utils";
import {colorData} from "../static/data";

const gameReducer = (state, action) => {
  const game = action.gameId ?
    state.games.filter(game => game.id === action.gameId)[0]
    :
    null;

  switch(action.type){
    case "addGame":
      const newGame = {
        id: createId(state.games),
        name: "Untitled Game",
        entries: [],
        colors: colorData.map(color => ({
          name: color.name,
          hex: color.hex,
          selected: false,
        }))
      };
      return {...state,
        games: [
          ...state.games,
          newGame
        ],
        saved: false
      };

    case "updateGame":
      return {...state,
        games: [
          action.updatedGame,
          ...state.games.filter(game => game.id !== action.gameId)
        ],
        saved: false
      };
    
    case "gameErrors":
      if(action.clear){
        delete game.errors;
        delete game.duplicateTerritories;
        return {...state,
          games: [
            game,
            ...state.games.filter(game => game.id !== action.gameId)
          ]
        };
      }
      game.errors = action.errors;
      game.duplicateTerritories = action.duplicateTerritories;
      return {...state,
        games: [
          game,
          ...state.games.filter(game => game.id !== action.gameId)
        ],
        saved: false
      };

    case "deleteGame":
      return {...state,
        games: state.games.filter(game => game.id !== action.gameId),
        saved: false
      };

    case "updateNation":
      if(!game) return state;
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
      return {...state,
        games: [
          game,
          ...state.games.filter(game => game.id !== action.gameId)
        ],
        saved: false
      };
    
    case "deleteNation":
      if(!game) return state;
      if(game.entries[action.idx].color){
        for(let i=0; i<game.colors.length; i++){
          if(game.colors[i].name === game.entries[action.idx].color){
            game.colors[i].selected = false;
          }
        }
      }
      delete game.errors;
      delete game.duplicateTerritories;
      return {...state,
        games: [
          {...game,
            entries: [
              ...game.entries.slice(0, action.idx),
              ...game.entries.slice(action.idx+1)
            ]
          },
          ...state.games.filter(game => game.id !== action.gameId)
        ],
        saved: false
      };

    case "saveGames":
      localStorage.setItem(
        "rk_games",
        JSON.stringify(state.games)
      );
      return {...state,
        saved: true
      };

    case "unsaveGames":
      localStorage.removeItem("rk_games");
      return {...state,
        saved: false
      };
      
    default:
      return state;
  }
};

export default gameReducer;