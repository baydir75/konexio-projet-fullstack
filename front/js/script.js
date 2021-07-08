/* fonction pour afficher tous les pays */
function getAllCountries() {
    fetch("http://localhost:8000/all") /* recupere les données dans l'API */
        .then((res) => res.json()) /* change les données en JSON */
        .then((res) => {
            $(document).ready(() => {
                $("#btnShowData").click(() => {
                    for (i = 0; i < res.length; i++) { /* parcourt la reponse de la recherche API */
                        $("#showData").append("<li>" + res[i].name + "</li>");
                        $('#btnShowData').prop('disabled', true); /* désactive le bouton */
                    }
                })
            })
        })
}
/* Diviser cette fonction en plusiers fonctions */
async function search() {
    let userInput = $("#userInput").val() /* Prend la valeur de l'input User  */
    $("#searchResult").empty(); /* Efface l'ancienne recherche sur la page web */
    let capitalCheck = $("#capitale")[0].checked; /* Valeur de l'input radio */
    let countryCheck = $("#nom")[0].checked; /* Valeur de l'input radio */
    let regionCheck = $("#region")[0].checked; /* Valeur de l'input radio */
    let regionValue = $("#regionChoice")[0].value; /* Valeur de l'input list */
    if (countryCheck === true) { /* compare si l'input a été cliqué */
        const res = await fetch(`http://localhost:8000/${userInput}/`);
        const resJSON = await res.json();
        $("#searchResult").append(`
                <li> Nom de la capitale : ${resJSON.capital}</li>
                <li>Appartenant à la région : ${resJSON.region} </li>
            `);
        $("#showData").empty(); /* Supprime le résultat de la fonction getAllCountries */
        $('#btnShowData').prop('disabled', false); /* réactive le bouton pour afficher le résultat de getAllCountries */
    } else if (capitalCheck === true) {
        const res = await fetch(`http://localhost:8000/capital/${userInput}/`);
        const resJSON = await res.json()
        $("#searchResult").append(`
                <li> Nom du pays : ${resJSON.name}</li>
                <li>Appartenant à la région : ${resJSON.region} </li>
            `);
        $("#showData").empty(); /* Supprime le résultat de la fonction getAllCountries */
        $('#btnShowData').prop('disabled', false); /* réactive le bouton pour afficher le résultat de getAllCountries */
    } else if (regionCheck === true) {
        const res = await fetch(`http://localhost:8000/region/${regionValue}/`);
        const resJSON = await res.json()
        console.log(resJSON.data);
        for (i = 0; i < resJSON.data.length; i++) {
        $("#searchResult").append(`
                <li> Nom du pays : ${resJSON.data[i].name}</li>
                <li>Appartenant à la région : ${resJSON.data[i].region} </li>
                <li>Capital : ${resJSON.data[i].capital}</li><br>
            `);
        }
        $("#showData").empty(); /* Supprime le résultat de la fonction getAllCountries */
        $('#btnShowData').prop('disabled', false); /* réactive le bouton pour afficher le résultat de getAllCountries */
    }
}

$(document).ready(() => {
    $("#searchData").click(search)
})

getAllCountries();
