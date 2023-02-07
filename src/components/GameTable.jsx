import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";

import Context from "../context/Context";
import {createId} from "../utils";

const GameTable = () => {
  const {
    state: {games},
    dispatch,
    urlBase
  } = useContext(Context);
  const navigate = useNavigate();

  return (
    <table className="col s12 m10 offset-m1 highlight purple-highlight">
      <thead>
        <tr>
          <th>Game (click to edit)</th>
          <th>Nations</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>

        {games?.map(game => 
          <tr key={game.id}>
            <td
              onClick={() => {
                navigate(`${urlBase}/edit/${game.id}`);
              }}
              style={{cursor: "pointer"}}
            >
              <Link
                to={`${urlBase}/edit/${game.id}`}
                tabIndex={0}
              >
                {game?.name || `Untitled game (${game.id})`}    
              </Link>
            </td>
            <td>
              {game.entries?.length}
            </td>
            <td>
              <button
                className="btn waves-effect waves-dark red darken-2 grey-text text-lighten-2"
                onClick={() => dispatch({
                  type: "deleteGame",
                  gameId: game.id
                })}
                onFocus={e => e.target.className="btn waves-effect waves-dark red"}
                onBlur={e => e.target.className="btn waves-effect waves-dark red darken-2 grey-text text-lighten-2"}
              >
                <i className="material-icons">delete</i>
              </button>
            </td>
          </tr>
        )}

        <tr>
          <td>
            <button
              className="btn waves-effect waves-light purple darken-2"
              onClick={() => {
                const newGameId = createId(games);
                dispatch({
                  type: "addGame",
                  gameId: newGameId
                });
                navigate(`${urlBase}/edit/${newGameId}`);
              }}
              onFocus={e => e.target.className="btn waves-effect waves-light purple"}
              onBlur={e => e.target.className="btn waves-effect waves-light purple darken-2"}
            >
              <i className="material-icons right">add_box</i>
              Create New Game
              {/* New Game From Scratch */}
            </button>
            {/* &nbsp; &nbsp;
            <button
              className="btn waves-effect waves-light purple darken-2"
              onClick={e => console.log(e)}
              onFocus={e => e.target.className="btn waves-effect waves-light purple"}
              onBlur={e => e.target.className="btn waves-effect waves-light purple darken-2"}
            >
              <i className="material-icons right">add_box</i>
              New Game From JSON
            </button> */}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default GameTable;