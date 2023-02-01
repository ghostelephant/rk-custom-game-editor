const validateData = ({entries}) => {
  const errors = [];
  const territoriesAlreadyOwned = [];
  const duplicateTerritories = [];
  const existingDiscordUsers = [];

  entries.forEach(nation => {
    const errorData = {
      hasErrors: false,
      errors: {}
    };
    
    // Must have a name
    if(!nation?.nationName){
      errorData.hasErrors = true;
      errorData.errors.nationName = "Must have a name";
    }

    // Must have a player ID
    if(!nation?.playerId){
      errorData.hasErrors = true;
      errorData.errors.playerId = "Player ID must be included";
    }

    // The same player can't control multiple nations
    if(existingDiscordUsers.includes(nation?.playerId)){
      errorData.hasErrors = true;
      errorData.errors.duplicatePlayerId = "This Discord ID is already assigned to a different nation";
    }

    // Must have color selected
    if(!nation?.color){
      errorData.hasErrors = true;
      errorData.errors.color = "Must be assigned a color";
    }

    // Check for territories owned by multiple nations
    const territories = nation?.territories?.split(" ")?.filter(t => t).map(t => t.toUpperCase());
    territories.forEach(territory => {
      if(territoriesAlreadyOwned.includes(territory)){
        duplicateTerritories.push(territory);
      }
    });

    // Make sure capitals are owned by their nation
    nation?.capitals?.split(" ")?.filter(c => c)?.forEach(cap => {
      if(!territories.includes(cap.toUpperCase())){
        errorData.hasErrors = true;
        errorData.errors.capital = "This nation has a capital that is not in its territory list";
      }
    });

    territoriesAlreadyOwned.push(...territories);
    existingDiscordUsers.push(nation?.playerId);
    errors.push(errorData);

  });

  return {
    errors,
    duplicateTerritories
  };
  
};

export default validateData;