import {useContext} from "react";

import Context from "../context/Context";
import NationForm from "./NationForm";
import {emptyNation} from "../static/data";

const GameForm = ({game, handleSubmit}) => {
  const {dispatch} = useContext(Context);
  const handleChangeText = e => {
    dispatch({
      type: "updateGame",
      gameId: game.id,
      updatedGame: {...game,
        [e.target.name]: e.target.value
      }
    });
  };

  const nationCardClasses = "col s12 m10 l5 offset-m1 offset-l0 card";

  const nationFormArray = game?.entries?.map((entry, idx) =>
    <NationForm
      key={idx}
      idx={idx}
      game={game}
      nation={entry}
      errors={game?.errors ? game.errors[idx] : null}
      cardClasses={nationCardClasses}
    />
  ) || [];

  const newNationCard = game?.entries?.length < 16 ?
  <div className={nationCardClasses}>
    <div className="card-content center">
      <p className="card-title">
        Add New Nation
      </p>
      <button
        onClick={e => {
          e.preventDefault();
          dispatch({
            type: "updateGame",
            gameId: game.id,
            updatedGame: {
              ...game,
              entries: [
                ...game.entries,
                JSON.parse(JSON.stringify(
                  emptyNation
                ))
              ]
            }
          });
        }}
        className="btn waves-effect waves-light purple darken-2 center"
      >
        <i className="material-icons left">add</i>
        Add
      </button>
    </div>
  </div>
  :
  <></>;

  if(nationFormArray?.length < 16){
    nationFormArray.push(newNationCard);
  }

  const nationPairs = [];
  nationFormArray.forEach((nationCard, idx) => {
    if(idx % 2 === 0){
      nationPairs.push([nationCard]);
    }
    else{
      nationPairs[nationPairs.length - 1].push(nationCard);
    }
  });

  return (
    <form
      className="col s10 offset-s1 row"
      onSubmit={handleSubmit}
    >
      <div className="input-field col s12">
        <input
          type="text"
          id="name"
          name="name"
          value={game.name}
          onChange={handleChangeText}
        />
        <label
          htmlFor="name"
          className={game.name ? "active" : ""}
        >
          Game name
        </label>
      </div>
      
      {nationPairs.map((nationPair, idx) => 
        <div key={idx} className="row">
          {nationPair.map((nationCard, idx) =>
            <div key={idx}>
              {nationCard}
            </div>
          )}
        </div>
      )}

      <div className="row center">
        <button
          type="submit"
          className="btn waves-effect waves-light purple darken-2"
        >
          <i className="material-icons left">code</i>
          Create JSON
        </button>
      </div>
    </form>
  );
};

export default GameForm;