var index = 0;
var id = 0;

function odjava() {
    $("#zacetnaStran").show();
    $("#prijavaZac").show();
    $("#preberiPredlogoBolnika").show();
    $("#home").hide();
    $("#uporabnikImeInPriimek").hide();
    $("#prikatiSkrij").hide();
}
function uporabnik() {
    $("#zacetnaStran").hide();
    $("#prijavaZac").hide();
    $("#preberiPredlogoBolnika").hide();
    $("#home").show();
    $("#uporabnikImeInPriimek").show();
    $("#prikatiSkrij").show();
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
    $("#polje2").hide();
    $("#row2").show();
    $("#kajVnesujes").html("<span>telesna masa</span>");
    $("#mera1").html("<span>kg</span>");
}
function prikaziVis() {
    $("#polje2").hide();
    $("#row2").show();
    $("#kajVnesujes").html("<span>telesna višina</span>");
    $("#mera1").html("<span>cm</span>");
}
function prikaziTem() {
    $("#polje2").hide();
    $("#row2").show();
    $("#kajVnesujes").html("<span>telesna temperatura</span>");
    $("#mera1").html("<span>°C</span>");
}
function prikaziTlak() {
    $("#polje2").show();
    $("#row2").show();
    $("#kajVnesujes").html("<span>sistolični krvni tlak</span>");
    $("#mera1").html("<span>mm Hg</span>");
    $("#kajVnesujes2").html("<span>diastolični krvni tlak</span>");
    $("#mera2").html("<span>mm Hg</span>");
}
function prikaziKisik() {
    $("#polje2").hide();
    $("#row2").show();
    $("#kajVnesujes").html("<span>nasičenost krvi s kisikom</span>");
    $("#mera1").html("<span>%</span>");
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
function prikaziGraf() {
    $("#graf").show();
    $("#danc").hide(); 
}
function shraniPokaziDanes() {
    $("#graf").hide();
    $("#danc").show(); 
}
function prikaziGrafDAN() {
    $("#graf").show();
    $("#danc").hide(); 
}
function shraniPokaziDanesDAN() {
    $("#grafDAN").hide();
    $("#dancDAN").show(); 
}