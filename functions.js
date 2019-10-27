var counter = 1;
function apirecord(cardnumber, counter, bin, pan) {
	var a  = {};
	a["cardnumber"] = cardnumber;
	a["counter"] = counter;
	a["bin"] = bin;
	a["pan"] = pan;
	var json = JSON.stringify(a);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/CardGenerator/api/record.php?", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	xhttp.send(json);
}

function copyToClipBoard() {
  /* Get the text field */
  var copyText = document.getElementById("CCNumber");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");

}
function valid_credit_card(value) {
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
};
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
};

		
//*

		function getpan() {
			var brand = '';
			var pan = document.getElementById("pan");
			var bin = document.getElementById("bin");
			
			switch (bin.value.length) {
				case 6:
					if (pan.value.length == 5) {
						var leadn = bin.value;
						var lastfour = pan.value.substring(1,5);
						var filler = getRndInteger(100000, 1000000);
						var cardnumber = leadn.concat(filler,lastfour);
						var ccc = valid_credit_card(cardnumber);
						if (ccc === true) {
							if (pan.value.substring(0,1) === bin.value.substring(0,1)){
								document.getElementById("CCNumber").value = cardnumber;
								document.getElementById("length").innerHTML = cardnumber.length;
								console.log("Attempts: " + counter);
								apirecord(cardnumber, counter, bin.value, pan.value);
								 counter = 1; brand = cardBrand(cardnumber);
								document.getElementById("brand").setAttribute("class", brand);
								
							} else {
								document.getElementById("length").innerHTML = "BIN and PAN not compatible"
							}
						} else {
							counter	= counter + 1;
							getpan();
							
						};	
					};			

				break;
				default:
					if (pan.value.length == 5) {
						if (bin.value.length > 0) {
							var leadn = bin.value
						} else {
							var leadn = pan.value.substring(0,1);
						}
						var lastfour = pan.value.substring(1,5);
						var filler = getRndInteger(Math.pow(10,(10-bin.value.length)), Math.pow(10,(10-bin.value.length)+1));
						var cardnumber = leadn.concat(filler,lastfour);
						var ccc = valid_credit_card(cardnumber);
					if (ccc === true) {
								document.getElementById("CCNumber").value = cardnumber;
								document.getElementById("length").innerHTML = cardnumber.length;
								console.log("Attempts: " + counter); 
								apirecord(cardnumber, counter, bin.value, pan.value);	
								counter = 1; brand = cardBrand(cardnumber);
								document.getElementById("brand").setAttribute("class", brand);
										
						} else {
						counter	= counter + 1;
						getpan();
						
					};
				break;


					}
			}
		}
		function getbin(){
			var brand = '';
			var bin = document.getElementById("bin");
			var pan = document.getElementById("pan");
			switch (pan.value.length) {

			default:
			if (bin.value.length == 6) {
				var filler = getRndInteger(Math.pow(10,9), Math.pow(10,10));
				var cardnumber = bin.value.concat(filler);
				var ccc = valid_credit_card(cardnumber);
				if (ccc === true) {

								document.getElementById("CCNumber").value = cardnumber;
								document.getElementById("length").innerHTML = cardnumber.length;
								console.log("Attempts: " + counter);
								apirecord(cardnumber, counter, bin.value, pan.value);
								 counter = 1; brand = cardBrand(cardnumber);
								document.getElementById("brand").setAttribute("class", brand);
								
						} else {
					counter	= counter + 1;
					getbin();
					
				}
				}
			break;
			case 5:
					if (bin.value.length == 6) {
						var leadn = bin.value;
						var lastfour = pan.value.substring(1,5);
						var filler = getRndInteger(100000, 1000000);
						var cardnumber = leadn.concat(filler,lastfour);
						var ccc = valid_credit_card(cardnumber);
						if (ccc === true) {
							if (pan.value.substring(0,1) === bin.value.substring(0,1)){
								document.getElementById("CCNumber").value = cardnumber;
								document.getElementById("length").innerHTML = cardnumber.length;
								console.log("Attempts: " + counter);
								apirecord(cardnumber, counter, bin.value, pan.value);
								 counter = 1; brand = cardBrand(cardnumber);
								document.getElementById("brand").setAttribute("class", brand);
								
							} else {
								document.getElementById("length").innerHTML = "BIN and PAN not compatible"
							}						
						} else {
							counter	= counter + 1;
							getbin();
							
						};	
					};					
			};
		};
function cardBrand(el){
	var leadn = parseInt(el.substring(0,1));
	var iin = parseInt(el.substring(0,4));
	var bin = parseInt(el.substring(0,6));
	switch (leadn) {
		case 4:
			return "VISA";
		break;
		case 5:
			if ( iin > 5100 && iin < 5599) {
				return "MasterCard"
			} else {
				if ( bin > 5060998 && bin < 50619) { 
					return "Verve"
				}
				else 
				{
				return "Maestro"
				}
			}
		break;
		case 2:
			return "MasterCard";
		break;
		case 6:
			if (bin > 650002 && bin < 650027) {
				return "Verve";
			} else {
				return "Maestro";
			}
		break;
		case 3:
			if (bin > 300000 && bin < 305000) {
				return "Diners";
			} else {
				if (iin > 3800 && iin < 3899) {
					return "Diners";
				};
				if (iin > 3528 && iin < 3589) {
					return "JCB"
				} else {
					return "AMEX"
				}				
			}

	}
}