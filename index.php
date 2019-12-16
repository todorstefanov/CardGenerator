<?php session_start(); ?>
<!DOCTYPE html>
<html>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<head>
	<link rel="icon"       type="image/jpg"       href="/favicon.jpg">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
	<title>	Card Generator</title>
<link rel="stylesheet" type="text/css" href="style.css">
	<script type="text/javascript" src="functions.js"></script>
</head>
<body>
<h1 class="h1" style="text-align: center">Todor's card generator</h1>
	<div id="container" class="container-fluid">
		<div class="table-responsive">
		<div class=" form-control col-md-4">
			<label for="BIN">BIN</label>
		 <input type="tel" name="BIN" maxlength="6" id="bin" onkeyup="getbin(this)">
	 </div>
	 <div class=" form-control col-md-4">
		 	<label for="PAN">PAN</label>
		 <input type="tel" name="PAN" maxlength="5" id="pan" onkeyup="getpan(this)">
	</div>

    <div id="card" class="container-fluid d-none">
    	<div id="brand">
    		<div id="brandholder"></div>
    	</div>
    	<div class="chip" id="chip"></div>
			<div class="rounded-pill bg-dark">
			<div class="fixed text-white bg-transparent" id="IssuerBank">

			</div>
			<div class="fixed text-warning bg-transparent" id="BRAND_PRODUCT_NAME">

			</div>
			<div class="fixed text-white bg-transparent" id="Country">

			</div>
			</div>
		<div class="input-group mb-3" id="cardnumber">
			<label for="cardnumber"></label>
		 <input class="text-white text-center" type="tel" name="cardnumber" maxlength="20" id="CCNumber" readonly >
		 	<div>
   				 <button onclick="copyToClipBoard()">Copy to clipboard</button>
      		</div>
		</div>
		<div class="text-uppercase text-white font-weight-bold" id="validity">
			11 / 25
		</div>
		<div id="cvvtext" class="text-uppercase text-white font-weight-bold">CVV2/CVC: <div class="text-uppercase text-white font-weight-bold" id="cvv2">123</div>
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
