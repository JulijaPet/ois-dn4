var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";
var ehrId = "";
var ehrPrveOsebe="0c50e172-b324-49b7-8c02-36fbc5b6dbde"; //Jack Falahee
var ehrDrugeOsebe="10135f74-aead-42e1-b739-05d330c7a95a"; // Jensen Ackles
var ehrTretjeOsebe="d4494b2-5234-41b4-b90f-95bab401155"; //Jesse Eisenberg
var izbranaKategorija = 0;
var ime = "";
var priimek = "";
var datumRojstva = "";
var index=0;

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
					document.getElementById("slikaUporabnik").style.display = "none";
					document.getElementById("slikaUporabnik2").style.display = "none";
					$("#Jack").show();
					$("#Jesse").hide();
					$("#Jensen").hide();
					$("#Jack2").show();
					$("#Jesse2").hide();
					$("#Jensen2").hide();
				} else if(ehrId == "10135f74-aead-42e1-b739-05d330c7a95a") {
					document.getElementById("slikaUporabnik").style.display = "none";
					document.getElementById("slikaUporabnik2").style.display = "none";
					$("#Jensen").show();
					$("#Jesse").hide();
					$("#Jack").hide();
					$("#Jensen2").show();
					$("#Jesse2").hide();
					$("#Jack2").hide();
				} else if(ehrId == "bbc7659c-43ca-4482-8f08-1fd0568f515a") {
					document.getElementById("slikaUporabnik").style.display = "none";
					document.getElementById("slikaUporabnik2").style.display = "none";
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
	var parametriZahteve={};
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
		
		parametriZahteve = {
		    "ehrId": ehrId,
		    templateId: 'Vital Signs',
		    format: 'FLAT'
		};
		$.ajax({
		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(podatki),
		    success: function (res) {
		    	console.log(res.meta.href);
		    	prikaaziPodatkeTabela();
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

function prikaaziPodatkeTabela() {

	var sessionId = getSessionId();
	if(izbranaKategorija == 1) {
		$.ajax({
		    url: baseUrl + "/view/" + ehrId + "/" + "weight",
		    type: 'GET',
		    headers: {"Ehr-Session": sessionId},
		    success: function (res) {
			  	if (res.length > 0) {
				   //	var results = "<table class='table table-striped table-hover'><tr><th>Datum in ura</th><th class='text-right'>Telesna teža</th></tr>";
			        for (var i in res) {
			            //results += "<tr><td>" + res[i].time + "</td><td class='text-right'>" + res[i].weight + " " 	+ res[i].unit + "</td>";
			      	
			        }
			      //  results += "</table>";
			      //  $("#izpis").append(results);
		    	} else {
		  			$("#izpis").html("Ni podatkov!");
			  	}
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
				   	var results = "<table class='table table-striped table-hover'><tr><th>Datum in ura</th><th class='text-right'>Telesna višina</th></tr>";
			        for (var i in res) {
			            results += "<tr><td>" + res[i].time + "</td><td class='text-right'>" + res[i].height + " " 	+ res[i].unit + "</td>";
			        }
			        results += "</table>";
			        $("#izpis").append(results);
		    	} else {
		  			$("#izpis").html("Ni podatkov!");
			  	}
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
				   	var results = "<table class='table table-striped table-hover'><tr><th>Datum in ura</th><th class='text-right'>Telesna temperatura</th></tr>";
			        for (var i in res) {
			            results += "<tr><td>" + res[i].time + "</td><td class='text-right'>" + res[i].temperature + " %"+ "</td>";
			        }
			        results += "</table>";
			        $("#izpis").append(results);
		    	} else {
		  			$("#izpis").html("Ni podatkov!");
			  	}
		    },
		    error: function(err) {
		    	alert("Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});	
	} else if(izbranaKategorija == 4) {
		$.ajax({
		    url: baseUrl + "/view/" + ehrId + "/" + "blood_pressure",
		    type: 'GET',
		    headers: {"Ehr-Session": sessionId},
		    success: function (res) {
			  	if (res.length > 0) {
				   	var results = "<table class='table table-striped table-hover'><tr><th>Datum in ura</th><th class='text-right'>Krvni tlak</th></tr>";
			        for (var i in res) {
			            results += "<tr><td>" + res[i].time + "</td><td class='text-right'>" + "sistolicni: " + res[i].systolic + " distolicni: " + res[i].diastolic  + " " 	+ res[i].unit + "</td>";
			        }
			        results += "</table>";
			        $("#izpis").append(results);
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
				   	var results = "<table class='table table-striped table-hover'><tr><th>Datum in ura</th><th class='text-right'>Nasičenost krvi s kisikom</th></tr>";
			        for (var i in res) {
			            results += "<tr><td>" + res[i].time + "</td><td class='text-right'>" + res[i].spO2 + " " 	+ res[i].unit + "</td>";
			        }
			        results += "</table>";
			        $("#izpis").append(results);
		    	} else {
		  			$("#izpis").html("Ni podatkov!");
			  	}
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
    $("#izpis").html("");
    $("#prikaziVajeDIV").hide();
    $("#nazaj").hide();
    izbranaKategorija=6;
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
    $("#izpis").html("");
    $("#prikaziVajeDIV").hide();
    $("#nazaj").hide();
    izbranaKategorija=7;
}
function prikaziVaje() {
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
function prikaziGraf() {
	if(index === 0) {
		neki();
		$("#diagram").show();
 		$("#izpis").hide();
 		index=1;
	} else {
		$("#diagram").hide();
    	$("#izpis").show();
    	index=0;
	}
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



function neki() {
	var data = [];
	var sessionId = getSessionId();
		$.ajax({
		    url: baseUrl + "/view/" + ehrId + "/" + "weight",
		    type: 'GET',
		    headers: {"Ehr-Session": sessionId},
		    success: function (res) {
			  	if (res.length > 0) {
			       	for (var i in res) {
			        	data[i] = res[i].weight;
			        		
			        }
		    	}
		    },
		    error: function(err) {
		    	alert("Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});	

										/*	var letters = [
																  {letter: "A", frequency: .1},
																  {letter: "B", frequency: .10},
																  {letter: "C", frequency: .20},
																  {letter: "D", frequency: .30},
																  {letter: "E", frequency: .40}
																];*/
											
											var margin = {top: 40, right: 20, bottom: 30, left: 40},
											    width = 960 - margin.left - margin.right,
											    height = 500 - margin.top - margin.bottom;
											
											var formatPercent = d3.format(".0%");
											
											var x = d3.scale.ordinal()
											    .rangeRoundBands([0, width], .1);
											
											var y = d3.scale.linear()
											    .range([height, 0]);
											
											var xAxis = d3.svg.axis()
											    .scale(x)
											    .orient("bottom");
											
											var yAxis = d3.svg.axis()
											    .scale(y)
											    .orient("left")
											    .tickFormat(formatPercent);
											
											var tip = d3.tip()
											  .attr('class', 'd3-tip')
											  .offset([-10, 0])
											  .html(function(d) {
											    return "<strong>Frequency:</strong> <span style='color:red'>" + d + "</span>";
											  });
											var div = d3.select("#diagram").append("div")   
							                        .attr("class", "tooltip")               
							                        .style("opacity", 0);  
							                        
											var svg = d3.select("#diagram").append("svg")
											    .attr("width", width + margin.left + margin.right)
											    .attr("height", height + margin.top + margin.bottom)
											  .append("g")
											    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
											
											svg.call(tip);
											
											drawMainGraph();
											function drawMainGraph() { 
											  type(data);
											  y.domain([0, d3.max(data, function(d) { return d; })]);
											
											  svg.append("g")
											      .attr("class", "x axis")
											      .attr("transform", "translate(0," + height + ")")
											      .call(xAxis);
											
											  svg.append("g")
											      .attr("class", "y axis")
											      .call(yAxis)
											    .append("text")
											      .attr("transform", "rotate(-90)")
											      .attr("y", 6)
											      .attr("dy", ".71em")
											      .style("text-anchor", "end")
											      .text("Frequency");
											
											  svg.selectAll(".bar")
											      .data(data)
											    .enter().append("rect")
											      .attr("class", "bar")
											      .attr("width", x.rangeBand())
											      .attr("y", function(d) { return y(d); })
											      .attr("height", function(d) { return height - y(d); })
											      .on('mouseover', tip.show)
											      .on('mouseout', tip.hide);
											
											}
											function type(d) {
											  d = +d;
											  return d;
											}
/*	var m = [80, 80, 80, 80]; 
		var w = 1000 - m[1] - m[3]; 
		var h = 400 - m[0] - m[2]; 
		var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
		// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
		var y = d3.scale.linear().domain([0, 10]).range([h, 0]);
			// automatically determining max range can work something like this
			// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

		// create a line function that can convert data[] into x and y points
		var line = d3.svg.line()
			// assign the X function to plot our line as we wish
			.x(function(d,i) { 
				// verbose logging to show what's actually being done
				console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
				// return the X coordinate where we want to plot this datapoint
				return x(i); 
			})
			.y(function(d) { 
				// verbose logging to show what's actually being done
				console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
				// return the Y coordinate where we want to plot this datapoint
				return y(d); 
			})

			// Add an SVG element with the desired dimensions and margin.
			var graph = d3.select("#diagram").append("svg:svg")
			      .attr("width", w + m[1] + m[3])
			      .attr("height", h + m[0] + m[2])
			    .append("svg:g")
			      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

			// create yAxis
			var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
			// Add the x-axis.
			graph.append("svg:g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + h + ")")
			      .call(xAxis);


			// create left yAxis
			var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
			// Add the y-axis to the left
			graph.append("svg:g")
			      .attr("class", "y axis")
			      .attr("transform", "translate(-25,0)")
			      .call(yAxisLeft);
			
  			// Add the line by appending an svg:path element with the data line we created above
			// do this AFTER the axes above so that the line is above the tick-lines
  			graph.append("svg:path").attr("d", line(data));*/
}
