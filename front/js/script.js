
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
/* Function search */
function search() {
    let userInput = $("#userInput").val() /* Prend la valeur de l'input User  */
    $("#searchResult").empty(); /* Efface l'ancienne recherche sur la page web */
    let capitalCheck = $("#capitale")[0].checked; /* Valeur de l'input radio */
    let countryCheck = $("#nom")[0].checked; /* Valeur de l'input radio */
    if (countryCheck === true) { /* compare si l'input a été cliqué */
        fetch(`http://localhost:8000/${userInput}/`)
            .then((res) => res.json())
            .then((res) => $("#searchResult").append(`
                <li> Nom de la capitale : ${res.Capital}</li>
                <li>Appartenant à la région : ${res.Region} </li>
            `))
            .catch(() => { /* En cas d'erreur */
                console.log("Erreur");
            })
            $("#showData").empty(); /* Supprime le résultat de la fonction getAllCountries */
            $('#btnShowData').prop('disabled', false); /* réactive le bouton pour afficher le résultat de getAllCountries */
    } else if (capitalCheck === true) {
        fetch(`http://localhost:8000/capital/${userInput}/`)
            .then((res) => res.json())
            .then((res) => $("#searchResult").append(`
                <li> Nom du pays : ${res.Name}</li>
                <li>Appartenant à la région : ${res.Region} </li>
            `))
            $("#showData").empty(); /* Supprime le résultat de la fonction getAllCountries */
            $('#btnShowData').prop('disabled', false); /* réactive le bouton pour afficher le résultat de getAllCountries */
    }
}

$(document).ready(() => {
    $("#searchData").click(search)
})

getAllCountries();
