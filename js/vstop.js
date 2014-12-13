
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
    $("#kajVnesujes").html("<span>telesna masa</span>");
    $("#mera1").html("<span>kg</span>");
    $("#kategorija").html("<a>Teža</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").hide();
}
function prikaziVis() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>telesna višina</span>");
    $("#mera1").html("<span>cm</span>");
    $("#kategorija").html("<a>Višina</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").hide();
}
function prikaziTem() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>telesna temperatura</span>");
    $("#mera1").html("<span>°C</span>");
    $("#kategorija").html("<a>Temperatura</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").hide();
}
function prikaziTlak() {
    $("#polje2").show();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>sistolični krvni tlak</span>");
    $("#mera1").html("<span>mm Hg</span>");
    $("#kajVnesujes2").html("<span>diastolični krvni tlak</span>");
    $("#mera2").html("<span>mm Hg</span>");
    $("#kategorija").html("<a>Krvni tlak</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").hide();
}
function prikaziKisik() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>nasičenost krvi s kisikom</span>");
    $("#mera1").html("<span>%</span>");
    $("#kategorija").html("<a>Kisik</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").hide();
}
function prikaziVoda() {
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>voda</span>");
    $("#mera1").html("<span>dl</span>");
    $("#kategorija").html("<a>Voda</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").hide();
}
function prikaziVaje() {
    $("#row2").hide();
    $("#humanBody").show();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").hide();
}
function prikaziDan() {
    $("#vitalniZnakiPlosca").show();
    $("#polje2").show();
    $("#row2").show();
    $("#kajVnesujes").html("<span>sadje/zelenjava</span>");
    $("#mera1").hide();
    $("#kajVnesujes2").html("<span>kolicina</span>");
    $("#mera2").html("<span>kos-ov</span>");
    $("#kategorija").html("<a>Sadje/zelenjava</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").hide();
}
function prikaziTel() {
    $("#row2").hide();
    $("#humanBody").hide();
    $("#map-canvas").show();
    $("#diagram").hide();
    $("#izpis").hide();
}
function domov() {
    $("#row2").hide();
    $("#map-canvas").hide();
    $("#humanBody").hide();
    $("#diagram").hide();
    $("#izpis").hide();
}
function prikaziGraf() {
    $("#diagram").show();
    $("#izpis").show();
}

function getLocation() {
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		alert("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    var urlMap = "https://www.google.com/maps/embed/v1/search?key=AIzaSyD8umGxn8T3ZdVh5OY6w75p5g7EPw7qic0&q=fitness&center=" + latlon + "&zoom=12";
    document.getElementById("map-canvas").innerHTML = "<iframe src='"+ urlMap +"' style='width:100%;height:100%;margin:auto;'></iframe>";
}
