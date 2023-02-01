const GameEditTips = () => 
  <div className="row">
    <ul className="col s10 offset-s1 purple-text text-darken-2">
      <li className="col s12">
        <i className="material-icons left">chevron_right</i>
        Discord IDs can be found by right-clicking on a user's profile
      </li>

      <li className="col s12">
        <i className="material-icons left">chevron_right</i>
        Separate territory names with spaces, no punctuation
      </li>

      <li className="col s12">
        <i className="material-icons left">chevron_right</i>
        Territory names are not case sensitive
      </li>

      <li className="col s12">
        <i className="material-icons left">chevron_right</i>
        If a nation has a capital or capitals, include them in the territories list as well (if you forget though, you'll get an error message and it'll be easy to fix)
      </li>

      <li className="col s12">
        <i className="material-icons left">chevron_right</i>
        When you have finished editing, click the "Create JSON" button at the bottom
      </li>
      <li>&nbsp;</li>
    </ul>
  </div>;

  export default GameEditTips;