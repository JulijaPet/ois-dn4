
function odjava() {
    $("#zacetnaStran").show();
    $("#prijavaZac").show();
    $("#preberiPredlogoBolnika").show();
    $("#home").hide();
    $("#uporabnikImeInPriimek").hide();
    $("#prikatiSkrij").hide();
}

function prikaziTeza() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>telesna masa</span>");
    $("#mera1").html("<span>kg</span>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
}
function prikaziVis() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>telesna višina</span>");
    $("#mera1").html("<span>cm</span>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
}
function prikaziTem() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>telesna temperatura</span>");
    $("#mera1").html("<span>°C</span>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
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
    $("#map-canvas").hide();
}
function prikaziKisik() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>nasičenost krvi s kisikom</span>");
    $("#mera1").html("<span>%</span>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
}
function prikaziVoda() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>voda</span>");
    $("#mera1").html("<span>dl</span>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
}
function prikaziVaje() {
    $("#row2").hide();
    $("#humanBody").show();
    $("#map-canvas").hide();
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
    $("#map-canvas").hide();
}
function prikaziTel() {
    $("#row2").hide();
    $("#humanBody").hide();
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

var x = document.getElementById("map");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	
    alert("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude	);
   // $("#map").html("<object data='https://www.google.com/maps/search/fitness/@'" + position.coords.latitude +"," + position.coords.longitude+"',12z'/>");
}
