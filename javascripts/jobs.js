let selectedHero = "";

console.log('jobs');

// have a flow/order
// printToDom, buildDomString (because you call printToDom inside of it), execute if fails and execute after loads come next in either order, then actual XHR request, then call it

// sets up xhr request. executes. this is where we are starting to request the data.
const genericHeroRequest = (successFunction) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", successFunction);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "../db/superheroes.json"); // should this be a file path? open this new method, which is a "get" method
    myRequest.send();
}

const startApplication = () => {
    genericHeroRequest(executeThisCodeAfterFileLoaded);
};


function executeThisCodeIfXHRFails() {
    console.log("something broke");
} 

// parses xhr response. passes it to buildDomString function. // no ES6 here.  going through data and seeing what it is made of.
function executeThisCodeAfterFileLoaded () { const data = JSON.parse(this.responseText);  // "this" is the "what" that the object is being performed on OR it's the "data" var because it holds the JSON.parse
    buildDomString(data.superheroes); // data is the whole thing
    // call it here. don't add to printToDom because that needs to be generic. it needs to fire at the right time. after those buttons have been created
    addheroSelectionEventListeners();
}

// string creator. loops through input array. accumulates to one big string. calls printToDom. passes string to it. prints in div that has ID 'superheroes-cards'.
// 'superhero' represents one superhero. is placeholder
// fancyArray becomes data.superheroes, then in forEach, superhero represents a single one of those items in fancyArray (which is really data.superheroes) 
const buildDomString = (fancyArray) => {
    let domString = "";
    fancyArray.forEach((superhero) => {
        domString += `<li>`;
        domString +=    `<a class="hero-name" data-hero-id="${superhero.id}">${superhero.name}</a>`;
        domString += `</li>`;
    })
    console.log(domString);
    printToDom(domString, "awesome-dropdown"); // this is just writing it, not executing it
}

const selectHero = e => {
    selectedHero = e.target.dataset.heroId;
    document.getElementById('awesome-button').classList.add('hide');
    genericHeroRequest(loadFileforSingleHero);
}

// gets called after buildDomString
const addheroSelectionEventListeners = () => {
    const heroNames = document.getElementsByClassName('hero-name');
    for(let i = 0; i<heroNames.length; i++) {
        heroNames[i].addEventListener('click', selectHero);
    }
};

const displaySuperhero = heroes => {
    let domString = "";
    heroes.forEach(hero => {
      if (hero.id === selectedHero) {
        domString += `<div class="row">`;
        domString += `<div class="col-sm-4">`;
        if (hero.gender === "Male") {
          domString += `<img class="charImage maleImage" src="${
            hero.image
          }">`;
        } else {
          domString += `<img class="charImage femaleImage" src="${
            hero.image
          }">`;
        }
        domString += `</div>`;
        domString += `<div class="col-sm-6">`;
        domString += `<h2>Selected Hero: ${hero.name}</h2>`;
        domString +=     `<p class='charDescription'>${hero.description}</p>`;
        domString += `</div>`;
      }
    });
    printToDom(domString, "selected-hero");
  };

function loadFileforSingleHero() {
    const data = JSON.parse(this.responseText);
    displaySuperhero(data.superheroes);
}

// write printToDom function that takes a string and an id and writes the string to the id
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}
startApplication();