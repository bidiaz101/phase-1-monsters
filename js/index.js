let pageCounter = 1

document.addEventListener("DOMContentLoaded", () => {
    loadFiftyMonsters()

    const createMonsterForm = document.createElement('form')
    createMonsterForm.innerHTML = "<label for='name'> Name: </label> <input type='text' id='name'></input><label for'age'> Age: </label><input type='number' id='age'></input><label for='description'> Description: </label><input type='text' id='description'></input><input type='submit'></input>"

    document.getElementById("create-monster").appendChild(createMonsterForm)

    const nameInput = document.getElementById("name")
    const ageInput = document.getElementById("age")
    const descripInput = document.getElementById("description")

    createMonsterForm.addEventListener("submit", e => {
        e.preventDefault()
        addMonToDb(nameInput.value, ageInput.value, descripInput.value)
        nameInput.value=""
        ageInput.value=""
        descripInput.value=""
    })

    const monContainer = document.getElementById('monster-container')

    document.getElementById("forward").addEventListener("click", () => {
        monContainer.innerHTML = ""
        pageCounter++
        loadNextFiftyMonsters()
    })

    document.getElementById("back").addEventListener("click", () => {
        monContainer.innerHTML =""
        pageCounter--
        loadLastFiftyMonsters()
    })
});

function loadFiftyMonsters() {
    fetch("http://localhost:3000/monsters/?_limit=50")
    .then(resp => resp.json())
    .then(json => {
        for(const obj of json) {
            createMonsterCard(obj)
        };
    })
};

function loadNextFiftyMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter+1}`)
    .then(resp => resp.json())
    .then(json => {
        for(const obj of json) {
            createMonsterCard(obj)
        }
    })
};

function loadLastFiftyMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter-1}`)
    .then(resp => resp.json())
    .then(json => {
        for(const obj of json) {
            createMonsterCard(obj)
        }
    })
};

function createMonsterCard(obj) {
    const newDiv = document.createElement("div")
    const monsterContainer = document.getElementById("monster-container")
    monsterContainer.prepend(newDiv)
    const name = document.createElement('h2')
    name.innerText= `Name: ${obj.name}`
    const age = document.createElement("h3")
    age.innerText = `Age: ${obj.age}`
    const description = document.createElement("p")
    description.innerText = `Description: ${obj.description}`
    newDiv.appendChild(name)
    newDiv.appendChild(age)
    newDiv.appendChild(description)
}

function addMonToDb(name, age, description) {
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description
        })       
    })
    .then(resp => resp.json())
    .then(json => {
        createMonsterCard(json)
    })
};
