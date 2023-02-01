import {useContext} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";

import Context from "../context/Context";
import {
  ErrorCard,
  GameEditTips,
  GameForm,
  SaveGamesCard,
} from "../components";
import {validateData} from "../utils";

const Edit = () => {
  const {
    urlBase, games, dispatch
  } = useContext(Context);
  const navigate = useNavigate();
  const {gameId} = useParams();
  const game = games ?
    games.filter(game => game.id === gameId)[0]
    :
    null;

  const handleSubmit = e => {
    e.preventDefault();
    const game = games.filter(g => g.id === gameId)[0];
    const {
      errors, duplicateTerritories
    } = validateData(game);
    if(errors.some(errorData => errorData.hasErrors) || duplicateTerritories.length){
      dispatch({
        type: "gameErrors",
        gameId,
        errors,
        duplicateTerritories
      });
      window.scrollTo({
        top: 100,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    // if no errors:
    dispatch({
      type: "gameErrors",
      gameId,
      clear: true
    });
    navigate(`${urlBase}/json/${gameId}`);
    window.scrollTo(0, 0);
  };

  const clearErrors = () => {
    dispatch({
      type: "gameErrors",
      gameId,
      clear: true
    });
  };

  return (
    <div className="row">
      <p className="col s12">
        <Link
          to={`${urlBase}/`}
        >
          « Back to home
        </Link>
      </p>
      <h3
        className="col s11 offset-s1"
      >
        Editing Game
      </h3>

      {game?.errors?.some(errorData => errorData.hasErrors) || game?.duplicateTerritories?.length ?
        <ErrorCard
          errors={game.errors}
          duplicateTerritories={game.duplicateTerritories}
          clearErrors={clearErrors}
        />
        :
        <></>
      }

      <GameEditTips />

      {game ?
        <>
          <GameForm
            game={game}
            dispatch={dispatch}
            handleSubmit={handleSubmit}
          />

          <SaveGamesCard />
        </>
        :
        <p className="center">
          Could not find this game.
        </p>
      }
    </div>
  );
};

export default Edit;