import {GameTable, SaveGamesCard} from "../components";

const Home = () => {
  return (
    <div className="row">
      <h3 className="col s12 m11 offset-m1">
        Your games:
      </h3>
      
      <GameTable />

      <SaveGamesCard />
    </div>
  );
};

export default Home;