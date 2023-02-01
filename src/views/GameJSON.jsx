import {useContext} from "react";
import {Link, useParams} from "react-router-dom";

import Context from "../context/Context";
import {createJSON} from "../utils";
import { SaveGamesCard } from "../components";

const GameJSON = () => {
  const {gameId} = useParams();
  const {games, urlBase} = useContext(Context);
  const game = games.filter(game => game.id === gameId)[0];
  const jsonString = createJSON(game);

  return (
    <div className="row">
      <p className="col s12">
        <Link
          to={`${urlBase}/edit/${gameId}`}
        >
          « Back to edit
        </Link>
        <br />
        <Link
          to={`${urlBase}/`}
        >
          « Back to home
        </Link>
      </p>
      <div className="col s12 m10 offset-m1 card">
        <div className="card-title center">
          Game Data
        </div>
      
        <p className="center">
          Copy the following and send it to your bot's owner:
        </p>

        <pre className="grey lighten-3">
          {jsonString}
        </pre>
      </div>

      <SaveGamesCard />
    </div>
  );
};

export default GameJSON;