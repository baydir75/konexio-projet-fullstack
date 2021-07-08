
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
function searchCountry() {
    let userInput = $("#userInput").val() /* Prend la valeur de l'input User  */
    $("#searchResult").empty(); /* Efface l'ancienne recherche sur la page web */
        fetch(`http://localhost:8000/${userInput}/`)
            .then((res) => res.json())
            .then((res) => $("#searchResult").append("<li>" + res.Capital + "</li><li>" + res.Region + "</li>"))
            $("#showData").empty(); /* Supprime le résultat de la fonction getAllCountries */
            $('#btnShowData').prop('disabled', false); /* réactive le bouton pour afficher le résultat de getAllCountries */
}

$(document).ready(() => {
    $("#searchData").click(searchCountry)
})

getAllCountries();
