import {useContext} from "react";
import {useNavigate} from "react-router-dom";

import Context from "../context/Context";

const GameTable = () => {
  const {
    state, dispatch, urlBase
  } = useContext(Context);
  const navigate = useNavigate();

  return (
    <table className="col s12 m10 offset-m1 highlight purple-highlight">
      <thead>
        <tr>
          <th>Game (click to edit)</th>
          <th>Nations</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

        {state?.games?.map(game => 
          <tr key={game.id}>
            <td
              onClick={() => {
                navigate(`${urlBase}/edit/${game.id}`);
              }}
              style={{cursor: "pointer"}}
            >
              {game?.name || `Untitled game (${game.id})`}
            </td>
            <td>
              {game.entries?.length}
            </td>
            <td>
              <button
                className="btn waves-effect waves-dark red darken-2"
                onClick={() => dispatch({
                  type: "deleteGame",
                  gameId: game.id
                })}
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
              onClick={() => dispatch({type: "addGame"})}
            >
              <i className="material-icons right">add_box</i>
              Create Game
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default GameTable;