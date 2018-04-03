console.log('superheroes');

// sets up xhr request. executes. this is where we are starting to request the data.
const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "./db/superheroes.json"); // should this be a file path? open this new method, which is a "get" method
    myRequest.send();
}

// parses xhr response. passes it to buildDomString function. // no ES6 here.  going through data and seeing what it is made of.
function executeThisCodeAfterFileLoaded () { const data = JSON.parse(this.responseText);  // "this" is the "what" that the object is being performed on OR it's the "data" var because it holds the JSON.parse
    buildDomString(data.superheroes); // data is the whole thing
    // call it here. don't add to printToDom because that needs to be generic. it needs to fire at the right time. after those buttons have been created
}

// string creator. loops through input array. accumulates to one big string. calls printToDom. passes string to it. prints in div that has ID 'superheroes-cards'.
// 'superhero' represents one superhero. is placeholder
// fancyArray becomes data.superheroes, then in forEach, superhero represents a single one of those items in fancyArray (which is really data.superheroes) 
const buildDomString = (fancyArray) => {
    let domString = "";
    fancyArray.forEach((superhero) => {
        domString += `<div class="row"`;
        domString += `<div class="col-md-4"`;
        domString += `<div class="panel"`;
        domString += `<div class="panel-body"`;
        domString += `<h3>${superhero.id}</h3>`;
        domString += `<p>${superhero.jobIds}</p>`;
        domString += `<p>${superhero.gender}</p>`;
        domString += `<h1>${superhero.name}</h1>`;
        domString += `<p>${superhero.description}</p>`;
        domString += `<img class="superhero-image" src="${superhero.image}" alt="">`;
        domString += `</div>`;
        domString += `</div>`;
        domString += `</div>`;
        domString += `</div>`;
    })
    printToDom(domString, "superhero-cards"); // this is just writing it, not executing it
}