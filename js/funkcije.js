var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";
var ehrId = "";/*
var ehrPrveOsebe="0c50e172-b324-49b7-8c02-36fbc5b6dbde"; //Jack Falahee
var ehrDrugeOsebe="10135f74-aead-42e1-b739-05d330c7a95a"; // Jensen Ackles
var ehrTretjeOsebe="d4494b2-5234-41b4-b90f-95bab401155"; //Jesse Eisenberg*/
var izbranaKategorija = 0;
var ime = "";
var priimek = "";
var datumRojstva = "";

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
	var sessionId = getSessionId();
	
	ime = $("#kreirajIme").val();
 	priimek = $("#kreirajPriimek").val();
 	datumRojstva = $("#kreirajDatumRojstva").val();
 	
	if (!ime || !priimek || !datumRojstva || ime.trim().length === 0 || priimek.trim().length === 0 || datumRojstva.trim().length === 0) {
		alert("PROSIMO VNESITE PODATKE!");
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        ehrId = data.ehrId;
		        var partyData = {
		            firstNames: ime,
		            lastNames: priimek,
		            dateOfBirth: datumRojstva,
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                	$("#kreirajKljuc").val(ehrId);
		                    console.log("Uspešno kreiran EHR '" + ehrId + "'.");
		                }
		            },
		            error: function(err) {
		            	alert("Napaka " + JSON.parse(err.responseText).userMessage + "'!");
		            	console.log(JSON.parse(err.responseText).userMessage);
		            }
		        });
		    }
		});
	}
}
function naprej() {
	ehrId = $('#kreirajKljuc').val();
	if(ehrId !== "") {
		var	sessionId = getSessionId();	
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				$("#izpisUporabnika").html("<span class='navbar-link'>" + party.firstNames + " " + party.lastNames + "</span>");
				$("#izpisUporabnika2").html("<a href='#'>" + party.firstNames + " " + party.lastNames + "</a>");
	    	},	
	    });
		$("#zacetnaStran").hide();
	    $("#prijavaZac").hide();
	    $("#uporabnikiIzberi").hide();
	    $("#home").show();
	    $("#uporabnikImeInPriimek").show();
	    $("#prikatiSkrij").show();
	    $("#prikaziVajeDIV").show();
    	$("#domov").show();
    	$("#Jesse2").hide();
		$("#Jensen2").hide();
	    document.getElementById("row2").style.display = "none";
	    document.getElementById("map-canvas").style.display = "none";
	    document.getElementById("humanBody").style.display = "none";
	} else
		alert("Napaka");
}
$(document).ready(function() {
	$('#uporabnikiIzberi').change(function() {
		ehrId = $(this).val();
		var	sessionId = getSessionId();	
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				$("#kreirajIme").val(party.firstNames);
				$("#kreirajPriimek").val(party.lastNames);
				$("#kreirajDatumRojstva").val(party.dateOfBirth);
				$("#kreirajKljuc").val(ehrId);
				if(ehrId == "0c50e172-b324-49b7-8c02-36fbc5b6dbde") {
					$("#Jack").show();
					$("#Jesse").hide();
					$("#Jensen").hide();
					$("#Jack2").show();
					$("#Jesse2").hide();
					$("#Jensen2").hide();
				} else if(ehrId == "10135f74-aead-42e1-b739-05d330c7a95a") {
					$("#Jensen").show();
					$("#Jesse").hide();
					$("#Jack").hide();
					$("#Jensen2").show();
					$("#Jesse2").hide();
					$("#Jack2").hide();
				} else if(ehrId == "bbc7659c-43ca-4482-8f08-1fd0568f515a") {
					$("#Jesse").show();
					$("#Jensen").hide();
					$("#Jack").hide();
					$("#Jesse2").show();
					$("#Jensen2").hide();
					$("#Jack2").hide();
				}
	    	},	
	    });
	});
});
function shraniPodatke() {
	var sessionId = getSessionId();
	var polje1 = $("#dodaj").val();
	var polje2 = $("#dodaj2").val();
	var datumInUra = $("#datum").val();
	$("#dodaj").val("");
	$("#dodaj2").val("");
	var zahteva={};
	var podatki = {};
	if(polje1 !== "") {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		if(izbranaKategorija == 1 && polje1 !== "") {
			podatki = {
			    "ctx/language": "en",
			    "ctx/territory": "SI",
			    "ctx/time": datumInUra,
			    "vital_signs/body_weight/any_event/body_weight": polje1
			};
		} else if(izbranaKategorija == 2 && polje1 !== "") {
			podatki = {
			    "ctx/language": "en",
			    "ctx/territory": "SI",
			    "ctx/time": datumInUra,
			    "vital_signs/height_length/any_event/body_height_length": polje1
			};
		} else if(izbranaKategorija == 3 && polje1 !== "") {
			podatki = {
			    "ctx/language": "en",
			    "ctx/territory": "SI",
			    "ctx/time": datumInUra,
			    "vital_signs/body_temperature/any_event/temperature|magnitude": polje1,
			    "vital_signs/body_temperature/any_event/temperature|unit": "°C"
			};
		} else if(izbranaKategorija == 4 && polje1 !== "" && polje2 !== "") {
			podatki = {
			    "ctx/language": "en",
			    "ctx/territory": "SI",
			    "ctx/time": datumInUra,
			    "vital_signs/blood_pressure/any_event/systolic": polje1,
		    	"vital_signs/blood_pressure/any_event/diastolic": polje2
			};
		} else if(izbranaKategorija == 5 && polje1 !== "") {
			podatki = {
			    "ctx/language": "en",
			    "ctx/territory": "SI",
			    "ctx/time": datumInUra,
			    "vital_signs/indirect_oximetry:0/spo2|numerator": polje1
			};
		} 
		zahteva = {
		    "ehrId": ehrId,
		    templateId: 'Vital Signs',
		    format: 'FLAT'
		};
		$.ajax({
		    url: baseUrl + "/composition?" + $.param(zahteva),
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(podatki),
		    success: function (res) {
		    	console.log(res.meta.href);
		    	$("#izpis").show();
		    },
		    error: function(err) {
		    	alert("Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});
	} else {
		alert("Vnesi podatke!" + polje1);
	}
}

function prikaziGraf() {
	var	poodatki = [];
	$("#diagram").show();
	var sessionId = getSessionId();
	if(izbranaKategorija == 1) {
		$.ajax({
		    url: baseUrl + "/view/" + ehrId + "/" + "weight",
		    type: 'GET',
		    headers: {"Ehr-Session": sessionId},
		    success: function (res) {
			  	if (res.length > 0) {
			        var j = 0;
			       	for (var i in res) {
			        	poodatki[j] = res[i].weight;
			        	j++;	
			        }
			     
			        var x = d3.scale.linear()
    					.domain([0, d3.max(poodatki)])
    					.range([0, 420]);

					d3.select("#diagram")
			  			.selectAll("div")
			    		.data(poodatki)
			  			.enter().append("div")
			    		.style("width", function(d) { return x(d) + "px"; })
			    		.text(function(d) { return d; });
		    	}
		    	else
			     	alert("napaka");
		    },
		    error: function(err) {
		    	alert("Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});	
		$("#izpis").show();
		var visina=1.8;
		var min = 20 * visina * visina;
		var max = 24.9 * visina * visina;
		var AQL = 
				"select " +
    				"w/data[at0002]/events[at0003]/data[at0001]/items[at0004, 'Body weight']/value/magnitude as teza " +
				"from EHR e[e/ehr_id/value='" + ehrId + "'] " +
				"contains OBSERVATION w[openEHR-EHR-OBSERVATION.body_weight.v1] " +
				"where " +
					"w/data[at0002]/events[at0003]/data[at0001]/items[at0004, 'Body weight']/value/magnitude<"+max+" and " +
    				"w/data[at0002]/events[at0003]/data[at0001]/items[at0004, 'Body weight']/value/magnitude>"+min+" " +
				"order by " +
    				"w/data[at0002]/events[at0003]/data[at0001]/items[at0004, 'Body weight']/value/magnitude desc " +
    			"limit 10";
				$.ajax({
				    url: baseUrl + "/query?" + $.param({"aql": AQL}),
				    type: 'GET',
					headers: {"Ehr-Session": sessionId},
				    success: function (res) {
				    	if (res) {
				        	$("#izpis").html("<h1>ste v meji normalne telesne teže, glede na vašo višino.</h1>");
				    	} else
			    			$("#izpis").html("<h1>Vaša telesna teža ni v mejah normalne. Več o tem si lahko preberete na <a href='http://www.smsdieta.si/indeks-telesne-mase/'>ITM</a>.</h1>");
					 },
				    error: function(err) {
			    		alert("Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
						console.log(JSON.parse(err.responseText).userMessage);
					}
				});
	} else if(izbranaKategorija == 2) {
		$.ajax({
		    url: baseUrl + "/view/" + ehrId + "/" + "height",
		    type: 'GET',
		    headers: {"Ehr-Session": sessionId},
		    success: function (res) {
			  	if (res.length > 0) {
				   	var j = 0;
			       	for (var i in res) {
			        	poodatki[j] = res[i].height;
			        	j++;	
			        }
			     
			        var x = d3.scale.linear()
    					.domain([0, d3.max(poodatki)])
    					.range([0, 420]);

					d3.select("#diagram")
			  			.selectAll("div")
			    		.data(poodatki)
			  			.enter().append("div")
			    		.style("width", function(d) { return x(d) + "px"; })
			    		.text(function(d) { return d; });
		    	}
		    	else
			     	alert("napaka");
		    },
		    error: function(err) {
		    	alert("Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});	
	} else if(izbranaKategorija == 3) {
		$.ajax({
		    url: baseUrl + "/view/" + ehrId + "/" + "body_temperature",
		    type: 'GET',
		    headers: {"Ehr-Session": sessionId},
		    success: function (res) {
			  	if (res.length > 0) {
				   	var j = 0;
			       	for (var i in res) {
			        	poodatki[j] = res[i].tempetaure;
			        	j++;	
			        }
			     
			        var x = d3.scale.linear()
    					.domain([0, d3.max(poodatki)])
    					.range([0, 420]);

					d3.select("#diagram")
			  			.selectAll("div")
			    		.data(poodatki)
			  			.enter().append("div")
			    		.style("width", function(d) { return x(d) + "px"; })
			    		.text(function(d) { return d; });
		    	}
		    	else
			     	alert("napaka");
		    },
		    error: function(err) {
		    	alert("Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});	
	} else if(izbranaKategorija == 4) {
		$("#diagram").hide();
		$.ajax({
		    url: baseUrl + "/view/" + ehrId + "/" + "blood_pressure",
		    type: 'GET',
		    headers: {"Ehr-Session": sessionId},
		    success: function (res) {
			  	if (res.length > 0) {
				   	var podatki = "<table class='table table-striped table-hover'><tr><th>Datum in ura</th><th>Sistolični krvni tlak ["+ res[0].unit +"]</th><th>Distolični krvni tlak ["+ res[0].unit +"]</th></tr>";
			        for (var i in res) {
			            podatki += "<tr><td>" + res[i].time + "</td><td>" +  res[i].systolic + "</td><td>" + res[i].diastolic + "</td>";
			        }
			        podatki += "</table>";
			        $("#izpis").append(podatki);
		    	} else {
		  			$("#izpis").html("Ni podatkov!");
			  	}
		    },
		    error: function(err) {
		    	alert("Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});	
	} else if(izbranaKategorija == 5) {
		$.ajax({
		    url: baseUrl + "/view/" + ehrId + "/" + "spO2",
		    type: 'GET',
		    headers: {"Ehr-Session": sessionId},
		    success: function (res) {
			  	if (res.length > 0) {
				   	var j = 0;
			       	for (var i in res) {
			        	poodatki[j] = res[i].spO2;
			        	j++;	
			        }
			     
			        var x = d3.scale.linear()
    					.domain([0, d3.max(poodatki)])
    					.range([0, 420]);

					d3.select("#diagram")
			  			.selectAll("div")
			    		.data(poodatki)
			  			.enter().append("div")
			    		.style("width", function(d) { return x(d) + "px"; })
			    		.text(function(d) { return d; });
		    	}
		    	else
			     	alert("napaka");
		    },
		    error: function(err) {
		    	alert("Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});	
	}
}
function odjava() {
    $("#zacetnaStran").show();
    $("#prijavaZac").show();
    $("#uporabnikiIzberi").show();
    $("#home").hide();
    $("#uporabnikImeInPriimek").hide();
    $("#prikatiSkrij").hide();
    $("#nazaj").hide();
    izbranaKategorija=0;
}

function prikaziTeza() {
	$("#diagram").html("");
    $("#polje2").hide();
    $("#row2").show();
    $("#kajVnesujes").html("<span>telesna masa</span>");
    $("#mera1").html("<span>kg</span>");
    $("#kategorija").html("<a>Teža</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").html("");
    $("#prikaziVajeDIV").hide();
    $("#nazaj").hide();
    izbranaKategorija=1;
}
function prikaziVis() {
	$("#diagram").html("");
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>telesna višina</span>");
    $("#mera1").html("<span>cm</span>");
    $("#kategorija").html("<a>Višina</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").html("");
    $("#prikaziVajeDIV").hide();
    $("#nazaj").hide();
    izbranaKategorija=2;
}
function prikaziTem() {
	$("#diagram").html("");
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>telesna temperatura</span>");
    $("#mera1").html("<span>°C</span>");
    $("#kategorija").html("<a>Temperatura</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").html("");
    $("#prikaziVajeDIV").hide();
    $("#nazaj").hide();
    izbranaKategorija=3;
}
function prikaziTlak() {
	$("#diagram").html("");
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
    $("#izpis").html("");
    $("#prikaziVajeDIV").hide();
    $("#nazaj").hide();
    izbranaKategorija=4;
}
function prikaziKisik() {
	$("#diagram").html("");
    $("#polje2").hide();
    $("#row2").show();
    $("#vitalniZnakiPlosca").show();
    $("#kajVnesujes").html("<span>nasičenost krvi s kisikom</span>");
    $("#mera1").html("<span>%</span>");
    $("#kategorija").html("<a>Kisik</a>");
    $("#humanBody").hide();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").html("");
    $("#prikaziVajeDIV").hide();
    $("#nazaj").hide();
    izbranaKategorija=5;
}
function prikaziVaje() {
	$("#diagram").html("");
    $("#row2").hide();
    $("#humanBody").show();
    $("#map-canvas").hide();
    $("#diagram").hide();
    $("#izpis").html("");
    $("#prikaziVajeDIV").hide();
    $("#nazaj").show();
    izbranaKategorija=8;
}
function prikaziTel() {
	$("#diagram").html("");
    $("#row2").hide();
    $("#humanBody").hide();
    $("#map-canvas").show();
    $("#diagram").hide();
    $("#izpis").html("");
    $("#prikaziVajeDIV").hide();
    $("#nazaj").hide();
    izbranaKategorija=9;
}
function domov() {
    $("#row2").hide();
    $("#map-canvas").hide();
    $("#humanBody").hide();
    $("#diagram").hide();
    $("#izpis").html("");
    $("#diagram").html("");
    $("#prikaziVajeDIV").show();
    $("#nazaj").hide();
    $("#domov").show();
	$("#vajeRoke").hide();
	$("#vajeTrebuh").hide();
	$("#vajeNoge").hide();
	$("#humanBody").hide();
    izbranaKategorija=0;
}
function nazaj() {
	$("#prikaziVajeDIV").hide();
	$("#humanBody").show();
}

function prikaziVajeRoke() {
	$("#prikaziVajeDIV").show();
	$("#vajeRoke").show();
	$("#vajeTrebuh").hide();
	$("#domov").hide();
	$("#vajeNoge").hide();
	$("#humanBody").hide();
}
function prikaziVajeTrebuh() {
	$("#prikaziVajeDIV").show();
	$("#vajeRoke").hide();
	$("#vajeTrebuh").show();
	$("#vajeNoge").hide();
	$("#domov").hide();
	$("#humanBody").hide();
}
function prikaziVajeNoge() {
	$("#prikaziVajeDIV").show();
	$("#vajeRoke").hide();
	$("#vajeTrebuh").hide();
	$("#vajeNoge").show();
	$("#humanBody").hide();
	$("#domov").hide();
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
