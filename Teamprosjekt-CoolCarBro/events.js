// EVENTS: Mulige hendelser langs veien
const events = {
  getRandomEvent(){
    // Liste over mulige hendelser
    const all = [
      {type:"item", name:"spoiler", effect:+5},
      {type:"item", name:"rusten potte", effect:-5},
      {type:"item", name:"wunderbaum", effect:+5},
      {type:"item", name:"neonlys", effect:+5},
      {type:"item", name:"rallystriper", effect:+5},
      {type:"item", name:"felger", effect: Math.floor(Math.random()*16)-5},
      {type:"item", name:"panserdekal", effect: Math.floor(Math.random()*16)-5},
      {type:"item", name:"takboks", effect: Math.floor(Math.random()*16)-5},
      {type:"item", name:"høyttalere", effect: Math.floor(Math.random()*16)-5},
      {type:"friend", choices:["High five","Nikking","Bro fist"], correct:Math.floor(Math.random()*3)},
      {type:"grandma"},
      {type:"police"},
      {type:"gas"},
      {type:"accident"},
      {type:"fight"},
      {type:"rapbattle", choices:["Freestyle","Svar med rim","Roast tilbake"], correct:Math.floor(Math.random()*3), mediuem: 1},
      {type:"streetrace"}
    ];
    // Returner en tilfeldig hendelse
    return all[Math.floor(Math.random()*all.length)];
  }
};
