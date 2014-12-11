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
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>telesna masa</span>");
    $("#mera1").html("<span>kg</span>");
    $("#humanBody").hide();
    $("#telovadnice").hide();
}
function prikaziVis() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>telesna višina</span>");
    $("#mera1").html("<span>cm</span>");
    $("#humanBody").hide();
    $("#telovadnice").hide();
}
function prikaziTem() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>telesna temperatura</span>");
    $("#mera1").html("<span>°C</span>");
    $("#humanBody").hide();
    $("#telovadnice").hide();
}
function prikaziTlak() {
    $("#polje2").show();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>sistolični krvni tlak</span>");
    $("#mera1").html("<span>mm Hg</span>");
    $("#kajVnesujes2").html("<span>diastolični krvni tlak</span>");
    $("#mera2").html("<span>mm Hg</span>");
    $("#humanBody").hide();
    $("#telovadnice").hide();
}
function prikaziKisik() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>nasičenost krvi s kisikom</span>");
    $("#mera1").html("<span>%</span>");
    $("#humanBody").hide();
    $("#telovadnice").hide();
}
function prikaziVoda() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>voda</span>");
    $("#mera1").html("<span>dl</span>");
    $("#humanBody").hide();
    $("#telovadnice").hide();
}
function prikaziVaje() {
    $("#row2").hide();
    $("#humanBody").show();
    $("#telovadnice").hide();
}
function prikaziDan() {
    $("#vitalniZnakiPlosca").show();
    $("#polje2").show();
    $("#row2").show();
    $("#kajVnesujes").html("<span>sadje/zelenjava</span>");
    $("#mera1").hide();
    $("#kajVnesujes2").html("<span>kolicina</span>");
    $("#mera2").html("<span>kos-ov</span>");
    $("#humanBody").hide();
    $("#telovadnice").hide();
}
function prikaziTel() {
    $("#row2").hide();
    $("#humanBody").hide();
    $("#telovadnice").show();
    $("#map-canvas").show();
}
function domov() {
    $("#row2").hide();
    $("#telovadnice").hide();
    $("#humanBody").hide();
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