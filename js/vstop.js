var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";

var index = 0;
var id = 0;

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
    $("#mobi").show
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
}
function prikaziTeza() {
    $("#1").show();
    prikazovanje(id);
    if(id == 1)
        id = 0;
    else
        id = 1;
}
function prikaziVis() {
    $("#2").show();
    prikazovanje(id);
    if(id == 2)
        id = 0;
    else
        id = 2;
}
function prikaziTem() {
    $("#3").show();
    prikazovanje(id);
    if(id == 3)
        id = 0;
    else
        id = 3;
}
function prikaziTlak() {
    $("#4").show();
    prikazovanje(id);
    if(id == 4)
        id = 0;
    else
        id = 4;
}
function prikaziKisik() {
    $("#5").show();
    prikazovanje(id);
    if(id == 5)
        id = 0;
    else
        id = 5;
}
function prikaziVoda() {
    $("#6").show();
    prikazovanje(id);
    if(id == 6)
        id = 0;
    else
        id = 6;
}
function prikaziVaje() {
    $("#7").show();
    prikazovanje(id);
    if(id == 7)
        id = 0;
    else
        id = 7;
}
function prikaziDan() {
    $("#8").show();
    prikazovanje(id);
    if(id == 8)
        id = 0;
    else
        id = 8;
}
function prikaziTel() {
    $("#9").show();
    prikazovanje(id);
    if(id == 9)
        id = 0;
    else
        id = 9;
}
function prikazovanje(id) {
    if(id == 1) $("#1").hide();
    else if(id == 2) $("#2").hide();
    else if(id == 3) $("#3").hide();
    else if(id == 4) $("#4").hide();
    else if(id == 5) $("#5").hide();
    else if(id == 6) $("#6").hide();
    else if(id == 7) $("#7").hide();
    else if(id == 8) $("#8").hide();
    else if(id == 9) $("#9").hide();
}