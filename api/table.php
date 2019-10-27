<?php session_start(); ?>

<html>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<head>
	<link rel="icon"       type="image/jpg"       href="/favicon.jpg">
	<title>Generated cards table</title>
	<script type="text/javascript" src="functions.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<style type="text/css">
		table#myTable.odd {
    		background-color: #e9fbef;
			}
		table#myTable.even {
   			 background-color: #f7ffaaba;
			}

	</style>
</head>
<body>
<div id="content">
	<div id="functions">
		<div id="inputs">
		<label for="BIN">BIN</label>
		 <input type="tel" name="BIN" maxlength="6" id="bin" >
		<label for="PAN">PAN</label>
		 <input type="tel" name="PAN" maxlength="5" id="pan" >

		</div>
		<div id="buttons">
		<button id="getBin" onclick="get(this)">GetAllByBin</button>
		<button id="getPan" onclick="get(this)">GetAllByPan</button>
		</div>

	</div>
	<div id="table">
		
	</div>
</div>
</body>
</html>