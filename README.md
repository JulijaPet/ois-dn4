
<!DOCTYPE html>
<html>
	<head>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	    <title>EhrScape - Vnos in poizvedovanje po EHR podatkih</title>
	    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
	    <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet">
	    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
	    <script src="demo.js"></script>
	    <style>
	  		body {padding: 10px;}
	  		.btn {margin-top: 10px;}
	  		.obvestilo {margin-left:10px;}
	  	</style>
	  	<style type="text/css">
			svg {
				font-family: "Helvetica Neue", Helvetica;
			}

			.line {
  				fill: none;
  				stroke: #000;
  				stroke-width: 2px;
			}
		</style>
	</head>
	<body>
		<div class="page-header"><h2>Vnos in poizvedovanje po EHR podatkih <small>EhrScape platforma</small></h2></div>
		<div class="row">
			<div class="col-lg-6 col-md-6 col-sm-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="row">
							<div class="col-lg-8 col-md-8 col-sm-8"><b>Kreiraj EHR zapis</b> za novega bolnika</div>
							<div class="col-lg-4 col-md-4 col-sm-4"><select class="form-control input-sm" id="preberiPredlogoBolnika"><option value=""></option><option value="Pujsa,Pepa,1938-10-30T14:58">Pujsa Pepa</option></select></div>
						</div>
					</div>
					<div class="panel-body">
						<span class="label label-default">Ime</span><input id="kreirajIme" type="text" class="form-control input-mini" placeholder="Osama">
						<span class="label label-default">Priimek</span><input id="kreirajPriimek" type="text" class="form-control" placeholder="Bin Laden">
						<span class="label label-default">Datum rojstva</span><input id="kreirajDatumRojstva" type="text" class="form-control" placeholder="1957-03-10T09:08">
						<button type="button" class="btn btn-primary btn-xs" onclick="kreirajEHRzaBolnika()">Dodaj osnovne podatke o bolniku</button><span id="kreirajSporocilo"></span>
				  	</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="row">
							<div class="col-lg-8 col-md-8 col-sm-8"><b>Preberi EHR zapis</b> obstoječega bolnika</div>
							<div class="col-lg-4 col-md-4 col-sm-4"><select class="form-control input-sm" id="preberiObstojeciEHR"><option value=""></option><option value="254f791d-2e7c-49d9-b646-376f62d6ead5">Dejan Lavbič</option><option value="d564c6a3-5a43-4fcc-bfa7-9ac76e9673bd">Pujsa Pepa</option><option value="b931580f-2b05-488b-985b-8d9ffb08ad02">Ata Smrk</option></select></div>
						</div>
					</div>
					<div class="panel-body">
						<span class="label label-default">EHR ID</span><input id="preberiEHRid" type="text" class="form-control input-mini" placeholder="7b661e12-3a98-21ad-c29e-2dc9f5a3d885">
						<button type="button" class="btn btn-primary btn-xs" onclick="preberiEHRodBolnika()">Preberi osnovne podatke o bolniku</button><span id="preberiSporocilo"></span>
				  	</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6 col-md-6 col-sm-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="row">
							<div class="col-lg-8 col-md-8 col-sm-8"><b>Vnos</b> meritve <b>vitalnih znakov</b> bolnika</div>
							<div class="col-lg-4 col-md-4 col-sm-4"><select class="form-control input-sm" id="preberiObstojeciVitalniZnak"><option value=""></option><option value="b931580f-2b05-488b-985b-8d9ffb08ad02|2014-11-21T11:40Z|185|80.0|36.50|118|92|98|medicinska sestra Smrketa">Ata Smrk</option></select></div>
						</div>
					</div>				
					<div class="panel-body">
						<span class="label label-default">EHR ID</span><input id="dodajVitalnoEHR" type="text" class="form-control input-mini" placeholder="7b661e12-3a98-21ad-c29e-2dc9f5a3d885">
						<span class="label label-default">Datum in ura</span><input id="dodajVitalnoDatumInUra" type="text" class="form-control input-mini" placeholder="2014-11-21T11:40Z">
						<span class="label label-default">Telesna višina</span><div class="input-group"><input id="dodajVitalnoTelesnaVisina" type="text" class="form-control input-mini" placeholder="185"><span class="input-group-addon">cm</span></div>
						<span class="label label-default">Telesna teža</span><div class="input-group"><input id="dodajVitalnoTelesnaTeza" type="text" class="form-control input-mini" placeholder="80.00"><span class="input-group-addon">kg</span></div>
						<span class="label label-default">Telesna temperatura</span><div class="input-group"><input id="dodajVitalnoTelesnaTemperatura" type="text" class="form-control input-mini" placeholder="36.50"><span class="input-group-addon">°C</span></div>
						<span class="label label-default">Sistolični krvni tlak</span><div class="input-group"><input id="dodajVitalnoKrvniTlakSistolicni" type="text" class="form-control input-mini" placeholder="118"><span class="input-group-addon">mm Hg</span></div>
						<span class="label label-default">Diastolični krvni tlak</span><div class="input-group"><input id="dodajVitalnoKrvniTlakDiastolicni" type="text" class="form-control input-mini" placeholder="92"><span class="input-group-addon">mm Hg</span></div>
						<span class="label label-default">Nasičenost krvi s kisikom</span><div class="input-group"><input id="dodajVitalnoNasicenostKrviSKisikom" type="text" class="form-control input-mini" placeholder="98"><span class="input-group-addon">%</span></div>
						<span class="label label-default">Merilec</span><input id="dodajVitalnoMerilec" type="text" class="form-control input-mini" placeholder="medicinska sestra Hrastova Micka">
						<button type="button" class="btn btn-primary btn-xs" onclick="dodajMeritveVitalnihZnakov()">Dodaj meritve vitalnih znakov</button><span id="dodajMeritveVitalnihZnakovSporocilo"></span>
				  	</div>
				</div>
			</div>	
			<div class="col-lg-6 col-md-6 col-sm-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="row">
							<div class="col-lg-6 col-md-6 col-sm-6"><b>Pregled</b> meritev <b>vitalnih znakov</b> bolnika</div>
							<div class="col-lg-3 col-md-3 col-sm-3"><select class="form-control input-sm" id="preberiTipZaVitalneZnake"><option value="telesna temperatura">telesna temperatura</option><option value="telesna temperatura AQL">telesna temperatura (filter na podhladitev)</option><option value="telesna teža">telesna teža</option></select></div>
							<div class="col-lg-3 col-md-3 col-sm-3"><select class="form-control input-sm" id="preberiEhrIdZaVitalneZnake"><option value=""></option><option value="b931580f-2b05-488b-985b-8d9ffb08ad02">Ata Smrk</option><option value="d564c6a3-5a43-4fcc-bfa7-9ac76e9673bd">Pujsa Pepa</option></select></div>
						</div>
					</div>				
					<div class="panel-body">
						<span class="label label-default">EHR ID</span><input id="meritveVitalnihZnakovEHRid" type="text" class="form-control input-mini" placeholder="7b661e12-3a98-21ad-c29e-2dc9f5a3d885">
						<button type="button" class="btn btn-primary btn-xs" onclick="preberiMeritveVitalnihZnakov('telesna temperatura')">Preberi meritve vitalnih znakov</button><span id="preberiMeritveVitalnihZnakovSporocilo"></span>
						<div id="rezultatMeritveVitalnihZnakov"></div>
				  	</div>
				</div>			
			</div>
		</div>
	</body>
</html>