import {useContext} from "react";

import Context from "../context/Context";
import {textColorFromHex} from "../utils";

const NationForm = ({idx, game, nation, errors, cardClasses}) => {
  const {dispatch} = useContext(Context);
  const handleChange = e => {
    const updatedNation = {...nation,
      [e.target.name]: e.target.value
    };
    const colors = e.target.name === "color" ?
      {old: nation.color, new: e.target.value}
      :
      null;
    dispatch({
      type: "updateNation",
      gameId: game.id,
      idx,
      updatedNation,
      colors
    });
  };

  const deleteNation = e => {
    e.preventDefault();
    dispatch({
      type: "deleteNation",
      gameId: game.id,
      idx
    });
  };

  const nationStyle = {};
  if(nation.color){
    const hex = game.colors.filter(
      color => color.name === nation.color
    )[0]?.hex;
    nationStyle.backgroundColor = hex;
    nationStyle.color = textColorFromHex(hex)?.textColor;
  }
  
  return (
    <>
      <div
        className={cardClasses}
        style={nationStyle}
      >
        <div className="card-content row">
          {errors?.hasErrors ?
            <>
              <p className="col s12">
                Please correct the following errors:
              </p>
              <ul>
                {Object.entries(errors.errors)
                  .map(([category, error]) => 
                    <li
                      key={category}
                      className="col s12"
                    >
                      <i className="material-icons left">chevron_right</i>
                      {error}
                    </li>
                )}
                <li>&nbsp;</li>
              </ul>
            </>
            :
            <></>
          }

          <div className="browser-default col s12 white">
            <label
              htmlFor="nationName"
              className="active black-text"
            >
              Nation Name
            </label>
            <textarea
              className="materialize-textarea"
              type="text"
              id={`nationName${idx}`}
              name={"nationName"}
              value={nation?.nationName}
              onChange={handleChange}
            />
            
          </div>

          <div className="browser-default col s12 white">
            <label
              htmlFor="playerId"
              className="active black-text"
            >
              Player Discord ID
            </label>
            <textarea
              className="materialize-textarea"
              type="text"
              id={`playerId${idx}`}
              name={"playerId"}
              value={nation?.playerId}
              onChange={handleChange}
            />
            
          </div>

          <div className="browser-default col s12 white">
            <label
              htmlFor="capitals"
              className="active black-text"
            >
              Capital(s)
            </label>
            <textarea
              className="materialize-textarea"
              type="text"
              id={`capitals${idx}`}
              name="capitals"
              onChange={handleChange}
              value={nation?.capitals}
            />
            
          </div>

          <div className="browser-default col s12 white">
          <label
              htmlFor="territories"
              className="active black-text"
            >
              Territories
            </label>
            <textarea
              className="materialize-textarea"
              type="text"
              id={`territories${idx}`}
              name={"territories"}
              value={nation?.territories}
              onChange={handleChange}
            />
            
          </div>


          <p
            className="col s3 m2 l3"
            style={{
              height: "100%"
            }}
          >
            Color
          </p>
          <select
            className="browser-default col s9 m10 l9"
            id="color"
            name="color"
            value={nation.color || "placeholder"}
            onChange={handleChange}
          >
            <option
              disabled
              value="placeholder"
            >
              Select color:
            </option>
            {game.colors
              .filter(color =>
                !color.selected || color.name === nation.color
              )
              .map(color => {
              
                return (
                  <option
                    key={color.name}
                    value={color.name}
                    className="black-text"
                  >
                    {color.name}
                  </option>
                );
              })
            }
          </select>

        </div>

        <div
          className="card-action"
        >
          <button
            className="btn red darken-2 waves-effect waves-light"
            onClick={deleteNation}
          >
            <i className="material-icons left">delete</i>
            Delete nation
          </button>
        </div>
      </div>
      {idx % 2 ?
        <></>
        :
        <div className="col l2" />
      }
    </>
  )
};

export default NationForm;