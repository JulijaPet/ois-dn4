var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";
var ehrId = "";
var ehrPrveOsebe="0c50e172-b324-49b7-8c02-36fbc5b6dbde"; //Jack Falahee
var ehrDrugeOsebe="10135f74-aead-42e1-b739-05d330c7a95a"; // Jensen Ackles
var ehrTretjeOsebe="d4494b2-5234-41b4-b90f-95bab401155"; //Jesse Eisenberg

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
	    	},	
	    });
	});
});
function shraniPodatke() {
	var sessionId = getSessionId();
	alert($("#kreirajKljuc").val());
}