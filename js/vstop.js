var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";

var index = 0;
var trenutnozbrano="";

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
    if(index === 0) {
        $("#teza1").show();
        $("#visina1").show();
        $("#temperatura1").show();
        $("#krvniTlak1").show();
        $("#kisik1").show();
        index = 1;
    } else {
        $("#teza1").hide();
        $("#visina1").hide();
        $("#temperatura1").hide();
        $("#krvniTlak1").hide();
        $("#kisik1").hide();
        index = 0;
    }
}/*
function prikaziTeza() {
    $("#mt").show();
    $("#mv").hide();
    $("#mtem").hide();
    $("#mk").hide();
    $("#mkis").hide();
    $("#vodaP").hide();
    $("#vajeP").hide();
    $("#danP").hide();
    $("#telP").hide();
}
function prikaziVis() {
    $("#mt").hide();
    $("#mv").show();
    $("#mtem").hide();
    $("#mk").hide();
    $("#mkis").hide();
    $("#vodaP").hide();
    $("#vajeP").hide();
    $("#danP").hide();
    $("#telP").hide();
}
function prikaziTem() {
    $("#mt").hide();
    $("#mv").hide();
    $("#mtem").show();
    $("#mk").hide();
    $("#mkis").hide();
    $("#vodaP").hide();
    $("#vajeP").hide();
    $("#danP").hide();
    $("#telP").hide();
}
function prikaziTlak() {
    $("#mt").hide();
    $("#mv").hide();
    $("#mtem").hide();
    $("#mk").show();
    $("#mkis").hide();
    $("#vodaP").hide();
    $("#vajeP").hide();
    $("#danP").hide();
    $("#telP").hide();
}
function prikaziKisik() {
    $("#mt").hide();
    $("#mv").hide();
    $("#mtem").hide();
    $("#mk").hide();
    $("#mkis").show();
    $("#vodaP").hide();
    $("#vajeP").hide();
    $("#danP").hide();
    $("#telP").hide();
}
*/
function prikazovanje(clicked_id) {
    if(trenutnozbrano !== "")
        $("#trenutnozbrano").hide();
    $("#mt").show();
    trenutnozbrano = clicked_id;
}