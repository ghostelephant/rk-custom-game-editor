import materialize from "materialize-css";
import 'materialize-css/dist/css/materialize.css';
import {useReducer} from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Context from "./context/Context";
import {Edit, Home, GameJSON} from "./views";
import {Header} from "./components";
import {gameReducer} from "./reducers";

const urlBase = "/rk-custom-game-editor";

function App() {
  materialize.AutoInit();

  const savedGames = localStorage.getItem("rk_games");
  const [games, dispatch] = useReducer(
    gameReducer,
    savedGames ? JSON.parse(savedGames) : []
  );

  const storeGames = {
    save: () => {
      localStorage.setItem(
        "rk_games",
        JSON.stringify(games)
      );
    },
    unsave: () => {
      localStorage.removeItem("rk_games");
    }
  };

  return (
    <div className="App">
      <Context.Provider value={{
        games,
        dispatch,
        storeGames,
        urlBase
      }}>
        <BrowserRouter>
          <Header urlBase={urlBase} />       

          <Routes>
            <Route
              path={`${urlBase}/`}
              element={<Home />}
            />

            <Route
              path={`${urlBase}/edit/:gameId`}
              element={<Edit />}
            />

            <Route
              path={`${urlBase}/json/:gameId`}
              element={<GameJSON />}
            />

            <Route
              path="*"
              element={<p>Page not found</p>}
            />

          </Routes>  
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
