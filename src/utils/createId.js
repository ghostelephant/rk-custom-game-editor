const createId = games => {
  let id = "";
  const options = "abcdefghijklmnopqrstuvwxyz0123456789";
  while(id.length < 16){
    const char = options[Math.floor(Math.random() * options.length)];
    id += (Math.random() < 0.5 ? char : char.toUpperCase());
  }
  const gamesWithThisId = games.filter(game => game.id === id);
  if(gamesWithThisId.length) return createId(games);
  return id;
};

export default createId;