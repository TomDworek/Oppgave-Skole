// MODEL: Holder styr på all spill-data
const model = {
  coolness: 50,        // Startverdi for kulhet
  maxCoolness: 100,    // Maks verdi (mål for å vinne)
  minCoolness: 0,      // Minimum verdi (hvis nådd -> tap)

  // Oppdater kulhetsfaktor med gitt endring
  updateCoolness(amount){
    this.coolness += amount;
    if(this.coolness > this.maxCoolness) this.coolness = this.maxCoolness;
    if(this.coolness < this.minCoolness) this.coolness = this.minCoolness;
  },

  // Sjekk om spilleren har vunnet
  isWin(){ return this.coolness >= this.maxCoolness; },

  // Sjekk om spilleren har tapt
  isLose(){ return this.coolness <= this.minCoolness; }
};
