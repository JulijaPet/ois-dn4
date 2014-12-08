var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";

function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}
function uporabnik() {
    $("#zacetnaStran").hide();
    $("#home").show();
}
function skrij() {
    $("#slide").hide();
    $("#mobi").show();
}
function prikazi() {
    $("#mobi").hide();
    $("#slide").show();
}
function moznosti() {
    if($("#slide").css('display') == 'none') {
        $("#slide").show();
        $("#teza1").show();
        $("#visina1").show();
        $("#temperatura1")();
        $("#krvniTlak1").show();
        $("#kisik1").show();
    } else {
        $("#slide").hide();
        $("#teza1").hide();
        $("#visina1").hide();
        $("#temperatura1").hide();
        $("#krvniTlak1").hide();
        $("#kisik1").hide();
    }
}