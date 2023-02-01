import {useContext} from "react";
import Context from "../context/Context";

const SaveGamesCard = () => {
  const {storeGames} = useContext(Context);
  return (
    <div className="col s12 m10 l6 offset-m1 offset-l3">
      <div className="card purple lighten-4">
        <div className="card-content">

          <div className="card-title center">
            Data Storage
          </div>

          <p
            className="red-text text-darken-3"
            style={{fontWeight: "bold"}}
          >
            Warning: If you refresh the page without saving, your game data will reset to the last time you saved.
          </p>
          
          <p style={{marginTop: "10px"}}>
            Clicking the "Save Progress" button will store your game data locally in your browser.  If you save, your data will still be there if you refresh or navigate away from this page.
          </p>

          <p style={{marginTop: "10px"}}>
            In any case, this site's server will only ever store your data on your own device.  Because of this, you will not be able to view your game data from any other device.
          </p>

          <div className="card-action center">
          
            <span
              className="purple darken-2 btn waves-effect waves-light"
              style={{marginBottom: "5px"}}
              onClick={storeGames.save}
            >
              <i className="material-icons left">save</i>
              Save Progress
            </span>
            &nbsp; &nbsp;
            <span
              className="red darken-2 btn waves-effect waves-light"
              style={{marginBottom: "5px"}}
              onClick={storeGames.unsave}
            >
              <i className="material-icons left">eject</i>
              Clear Memory
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveGamesCard;