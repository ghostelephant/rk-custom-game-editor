const ErrorCard = ({errors, duplicateTerritories, clearErrors}) => {

  const nationErrorCount = errors?.filter(errorData => errorData.hasErrors)?.length || 0;
  
  return (
    <div className="col s12 m10 l6 offset-m1 offset-l3 card">
      <div className="card-content row">
        <p className="card-title center">
          Some errors were found:
        </p>

        {nationErrorCount ?
          <p>
            {nationErrorCount} {nationErrorCount === 1 ? "nation has" : "nations have"} errors
          </p>
          :
          <></>
        }

        {duplicateTerritories?.length ?
          <>
            <p>
              The following territories are owned by more than one nation:
            </p>

            <ul>
              {duplicateTerritories.map(territory =>
                <li
                  key={territory}
                  className="col s12"
                >
                  <i className="material-icons left">chevron_right</i>
                  {territory}
                </li>
              )}
            </ul>
          </>
          :
          <></>
        }
      </div>

      <div className="card-action">
        <button
          className="btn purple darken-2 waves-effect waves-light"
          onClick={clearErrors}
        >
          <i className="material-icons left">visibility_off</i>
          Hide error messages
        </button>
      </div>
    </div>
  );
};

export default ErrorCard;