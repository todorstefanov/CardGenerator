<?php session_start(); ?>
<!DOCTYPE html>
<html>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<head>
	<link rel="icon"       type="image/jpg"       href="/favicon.jpg">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
	<title>	Card Generator</title>
<link rel="stylesheet" type="text/css" href="style.css">
	<script type="text/javascript" src="functions.js"></script>
</head>
<body>
<h1 class="h1" style="text-align: center">Todor's card generator</h1>
	<div id="container" class="container-fluid">
		<div class="table-responsive">
		<div class="input-group mb-3">
			<label for="BIN">BIN</label>
		 <input type="tel" name="BIN" maxlength="6" id="bin" onkeyup="getbin(this)">
		 	<label for="PAN">PAN</label>
		 <input type="tel" name="PAN" maxlength="5" id="pan" onkeyup="getpan(this)">
		</div>

    <div id="card" class="container-fluid">
    	<div id="brand">
    		<div id="brandholder"></div>
    	</div>
    	<div class="chip" id="chip"></div>
		<div class="input-group mb-3" id="cardnumber">
			<label for="cardnumber"></label>
		 <input type="tel" name="cardnumber" maxlength="20" id="CCNumber" readonly >
		 	<div>
   				 <button onclick="copyToClipBoard()">Copy to clipboard</button>
      		</div>
		</div>

		</div>
      		<div>Card Number Length:
		 <div id="length"></div>
		</div>
		<div id="hint">
			<p>
			You can either use BIN or PAN to generate a 16 digit card number. In case both are filled, the generator will try to use them both in the final result
			</p>
		</div>
		</div>
	</div>
</body>
</html>
