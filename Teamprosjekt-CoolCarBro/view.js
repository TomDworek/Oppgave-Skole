// VIEW: Alt som vises på skjermen
const view = {
  // Viser tall for kulhet (ingen progress bar)
  renderProgress(value, max){
    let label = document.getElementById("coolness-label");
    if(!label){
      label = document.createElement("div");
      label.id = "coolness-label";
      document.getElementById("app").appendChild(label);
    }
    label.innerText = `Kulhet: ${value}/${max}`;
  },

  // Lager knapper ut fra mulige valg
  renderChoices(options, onChoice, parent){
    options.forEach(opt=>{
      const btn = document.createElement("button");
      btn.innerText = opt.text;
      btn.onclick = ()=>{
        // Deaktiver knappene så spilleren ikke kan spamme
        parent.querySelectorAll("button").forEach(b=>b.disabled = true);
        onChoice(opt.value);
      };
      parent.appendChild(btn);
    });
  },

  // Viser en melding på skjermen
  renderMessage(msg){
    let msgContainer = document.querySelector("#message-container");
    if(!msgContainer){
      msgContainer = document.createElement("div");
      msgContainer.id = "message-container";
      document.getElementById("app").appendChild(msgContainer);
    }
    msgContainer.innerHTML = ""; // Fjern gammel melding
    const p = document.createElement("p");
    p.innerText = msg;
    msgContainer.appendChild(p);
  },

  // Tegner selve hendelsen og alternativene på skjermen
  renderGame(event, onChoice){
    const app = document.getElementById("app");

    // Finn eller lag #choices-container
    let choiceDiv = document.getElementById("choices");
    if(!choiceDiv){
      choiceDiv = document.createElement("div");
      choiceDiv.id = "choices";
      app.appendChild(choiceDiv);
    }

    // Fjern gamle knapper hver gang
    choiceDiv.innerHTML = "";

    // Hvilken type hendelse skal vises?
    if(event.type === "item"){
      this.renderMessage(`Du fant ${event.name}. Vil du ta det med?`);
      this.renderChoices([
        {text:"Ja", value:true},
        {text:"Nei", value:false}
      ], onChoice, choiceDiv);

    } else if(event.type === "friend"){
      this.renderMessage("Du møter en kompis. Hvordan hilser du?");
      this.renderChoices(event.choices.map((c,i)=>({text:c, value:i})), onChoice, choiceDiv);

    } else if(event.type === "grandma"){
      this.renderMessage("En aggressiv bestemor dukker opp!");
      this.renderChoices([
        {text:"Ignorer", value:"ignore"},
        {text:"Gi skyss", value:"ride"},
        {text:"Kjør unna", value:"speed"}
      ], onChoice, choiceDiv);

    } else if(event.type === "police"){
      this.renderMessage("Politiet stopper deg.");
      this.renderChoices([
        {text:"Vis papirer", value:"papers"},
        {text:"Stikk av", value:"escape"},
        {text:"Prøv bestikkelse", value:"bribe"}
      ], onChoice, choiceDiv);

    } else if(event.type === "accident"){
      this.renderMessage("Du kom til en ulykke.");
      this.renderChoices([
        {text:"Hjelp til", value:"help"},
        {text:"Stikk av", value:"bail"},
        {text:"Du so døden i øyne", value:"death"}
      ], onChoice, choiceDiv);

    } else if(event.type === "gas"){
      this.renderMessage("Du stopper på en bensinstasjon.");
      this.renderChoices([
        {text:"Fyll bensin", value:"fuel"},
        {text:"Kjøp energidrikk", value:"drink"},
        {text:"Stjel snacks", value:"steal"}
      ], onChoice, choiceDiv);

    } else if(event.type === "fight"){
      this.renderMessage("Du begynner å slåss med noen.");
      this.renderChoices([
        {text:"Slå med høyre", value:"solid høyre"},
        {text:"Stikk", value:"løp"},
        {text:"Du vs 3", value:"crashout"}
      ], onChoice, choiceDiv);

    } else if(event.type === "rapbattle"){
      this.renderMessage("Du havna i en rapbattle!");
      this.renderChoices(event.choices.map((c,i)=>({text:c, value:i})), onChoice, choiceDiv);

    } else if(event.type === "streetrace"){
      this.renderMessage("Noen inventerer deg til råning!");
      this.renderChoices([
        {text:"Bruk en annen bil", value:"Batmobilen"},
        {text:"Ta en snarvei", value:"Snarvei"},
        {text:"Litt mer gass!", value:"krash"}
      ], onChoice, choiceDiv);
    }
    

    
  },

  // Når du vinner
  renderWin(){
    this.renderMessage("Gratulerer! Du er maks kul!");
  },

  // Når du taper
  renderLose(){
    this.renderMessage("Spillet er over. Kulheten forsvant.");
  }
};
