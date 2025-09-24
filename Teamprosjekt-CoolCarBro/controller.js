// CONTROLLER: Spilllogikk og event-håndtering
const controller = {
  // Starter spillet
  start(){
    view.renderProgress(model.coolness, model.maxCoolness);
    this.nextEvent();
  },

  // Sjekker om spillet er over
  checkGameState(){
    if(model.isWin()){ view.renderWin(); return true; }
    if(model.isLose()){ view.renderLose(); return true; }
    return false;
  },

  // Trekker neste hendelse
  nextEvent(){
    if(this.checkGameState()) return; // Spill slutt
    const event = events.getRandomEvent();
    view.renderGame(event, choice=>this.handleChoice(event,choice));
  },

  // Behandler valgene til spilleren
  handleChoice(event, choice){
    switch(event.type){
      case "item":
        if(choice){ 
          model.updateCoolness(event.effect); 
          view.renderMessage(`Du tok ${event.name}. Kulhetsfaktoren endret med ${event.effect}!`);
        } else { 
          view.renderMessage(`Du lot ${event.name} være.`); 
        }
        break;

      case "friend":
        if(choice===event.correct){ 
          model.updateCoolness(+10); 
          view.renderMessage("Kompisen likte hilsenen din!");
        } else { 
          model.updateCoolness(-5); 
          view.renderMessage("Kompisen ble ikke fornøyd.");
        }
        break;

        case "carjacking":
        if(choice==="stjal"){ 
          model.updateCoolness(+12); 
          view.renderMessage("Yoooo, de lart å stjele bilen- sykt");

        } else if(choice==="fail") { 
          model.updateCoolness(-9); 
          view.renderMessage("de prøvd, men bilen var låst med flere låser.");

           }else if(choice==="likt bilen") { 
          model.updateCoolness(+4); 
          view.renderMessage("kompisene spurt pent om å teste bilen. greit nok");
           }
          else {
             model.updateCoolness(-3); 
            view.renderMessage("Ingen skjønte helt hva som skjedde.");
          }
        

        break;

      case "grandma":
        if(choice==="ignore"){ model.updateCoolness(-10); view.renderMessage("Bestemora slo bilen med veska. Du mistet kulhet.");}
        if(choice==="ride"){ model.updateCoolness(+5); view.renderMessage("Bestemora ble glad for skyssen.");}
        if(choice==="speed"){ model.updateCoolness(-5); view.renderMessage("Du kjørte unna, men det så teit ut.");}
        break;

      case "police":
        if(choice==="papers"){ model.updateCoolness(-2); view.renderMessage("Politiet var fornøyd, men du virket lite kul.");}
        if(choice==="escape"){ model.updateCoolness(-15); view.renderMessage("Du prøvde å rømme. Ikke særlig kult.");}
        if(choice==="bribe"){ model.updateCoolness(+3); view.renderMessage("Du bestakk politiet med en donut.");}
        break;

      case "gas":
        if(choice==="fuel"){ view.renderMessage("Du fylte bensin. Nøytralt valg.");}
        if(choice==="drink"){ model.updateCoolness(+5); view.renderMessage("Energidrikken ga deg litt ekstra boost.");}
        if(choice==="steal"){ model.updateCoolness(-10); view.renderMessage("Du ble tatt for butikktyveri. Ikke kult.");}
        break;

      case "accident":
        if(choice==="help"){ model.updateCoolness(+10); view.renderMessage("Du hjalp dem som krasjet.");}
        if(choice==="bail"){ model.updateCoolness(-10); view.renderMessage("Du stakk fra ulykken.");}
        if(choice==="death"){ model.updateCoolness(-30); view.renderMessage("Det var du som nesten krasjet.");}
        break;

      case "fight":
        if(choice==="solid høyre"){ model.updateCoolness(+10); view.renderMessage("publikum jubler 'again, again'.");}
        if(choice==="løp"){ model.updateCoolness(-5); view.renderMessage("Alle røpte 'feiging'.");}
        if(choice==="crashout"){ model.updateCoolness(-3); view.renderMessage("3 mot 1-noen ropte politet kommer .");}
        break;

      case "rapbattle":
        if(choice===event.correct){ 
          model.updateCoolness(+10); 
          view.renderMessage("Publikum likte stylen din!");
        } else if(choice===event.medium){
          model.updateCoolness(+2)
          view.renderMessage("Publikum klappa litt, men ikke så mye.");
        } else { 
          model.updateCoolness(-5); 
          view.renderMessage("Du hører noen fra publikum sier 'BUUU!!!'");
        }
        break;

      case "streetrace":
        if(choice==="Batmobilen"){ model.updateCoolness(+10); view.renderMessage("publikum skrek 'vroom vroom'.");}
        if(choice==="Snarvei"){ model.updateCoolness(-15); view.renderMessage("Skitten stil.");}
        if(choice==="krash"){ model.updateCoolness(-100); view.renderMessage("Traff et skilt,'GAME OVER'");}
        break;

      
    }

    // Oppdater tall for kulhetsfaktor
    view.renderProgress(model.coolness, model.maxCoolness);

    // Etter 1.5 sekunder -> neste hendelse
    setTimeout(()=>this.nextEvent(),1500);
  }
};

// Starter spillet når siden er lastet
window.onload = ()=>controller.start();
