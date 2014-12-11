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
    $("#kajVnesujes").html("<span class='label label-default'>'telesna masa'</span>");
    $("#mera1").html("<span class='input-group-addon'>'KG'</span>");
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