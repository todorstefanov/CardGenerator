var counter = 1;
function addSpaces(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{4})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
};
function expMonthexpYear() {
  var now = new Date();
  var year = now.getFullYear() - 2000 + getRndInteger(2,10);
  var month = appendtonumber(getRndInteger(1,12), 2) ; ///now.getMonth() + 1
  return month + " / " + year;
};
function appendtonumber(number, length) {
  var res = '';
  var l = String(length);
  var n = String(number);
  if (n.length < length) {
    for (var i = 0; i < l.length; i++) {
      res += '0';
    }
  }
  res += n;
  return res;
}

function apirecord(cardnumber, counter, bin, pan, brand) {
	var a  = {};
	a["cardnumber"] = cardnumber;
	a["counter"] = counter;
	a["bin"] = bin;
	a["pan"] = pan;
	a["isBin"] = 2;
	a["brand"] = cardBrand(cardnumber);

if (a.bin == "") {
	a.bin = cardnumber.substring(0,6);
	a.isBin = 0;
};
if (a.pan == "") {
	var subs = '';
	subs = cardnumber.substring(0,1);
	a.pan = subs.concat(cardnumber.substring(12,16));
	a.isBin = 1;
};
	var json = JSON.stringify(a);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/CardGenerator/api/record.php?", true);
	xhttp.setRequestHeader("Content-type", "application/json");

	xhttp.send(json);
	if (a.brand === "MasterCard" || a.brand === "Maestro") {
		getBinDetails(a.cardnumber);
	};
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
			document.getElementById("IssuerBank").innerHTML = "";
			document.getElementById("Country").innerHTML = "";
			document.getElementById("BRAND_PRODUCT_NAME").innerHTML = "";
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
								$("#card").removeClass("d-none");
                document.getElementById("validity").innerHTML = expMonthexpYear();

								document.getElementById("CCNumber").value = addSpaces(cardnumber);
								document.getElementById("length").innerHTML = cardnumber.length;
								console.log("Attempts: " + counter);
								apirecord(cardnumber, counter, bin.value, pan.value, brand);
								 counter = 1; brand = cardBrand(cardnumber);
								document.getElementById("brand").setAttribute("class", brand);
                if (brand === "AMEX") {
                  document.getElementById("cvv2").innerHTML = getRndInteger(1000, 9999);
                } else {
                  document.getElementById("cvv2").innerHTML = getRndInteger(100, 999);
                };
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
								$("#card").removeClass("d-none");
                document.getElementById("validity").innerHTML = expMonthexpYear();

								document.getElementById("CCNumber").value = addSpaces(cardnumber);
								document.getElementById("length").innerHTML = cardnumber.length;
								console.log("Attempts: " + counter);
								apirecord(cardnumber, counter, bin.value, pan.value, brand);
								counter = 1; brand = cardBrand(cardnumber);
								document.getElementById("brand").setAttribute("class", brand);
                if (brand === "AMEX") {
                  document.getElementById("cvv2").innerHTML = getRndInteger(1000, 9999);
                } else {
                  document.getElementById("cvv2").innerHTML = getRndInteger(100, 999);
                };

						} else {
						counter	= counter + 1;
						getpan();

					};
				break;


					}
			}
		}
		function getbin(){
			document.getElementById("IssuerBank").innerHTML = "";
			document.getElementById("Country").innerHTML = "";
			document.getElementById("BRAND_PRODUCT_NAME").innerHTML = "";

			var brand = '';
			var bin = document.getElementById("bin");
			var pan = document.getElementById("pan");
			if (bin.value.length == 6) {
				if ((bin.value > 340000 && bin.value < 349999) || (bin.value > 370000 && bin.value < 379999)) {
					var filler = getRndInteger(Math.pow(10,8), Math.pow(10,9));
					brand = 'AMEX';
				} else {
					if (pan.value.length == 0){
					var filler = getRndInteger(Math.pow(10,9), Math.pow(10,10));
				} else {
					var lastfour = pan.value.substring(1,5);
					var filler = getRndInteger(Math.pow(10,5), Math.pow(10,6));
				}
				};
				if (lastfour == undefined) {
						var cardnumber = bin.value.concat(filler);
				} else {
				var cardnumber = bin.value.concat(filler, lastfour);
			};
				var ccc = valid_credit_card(cardnumber);
				if (ccc === true) {
								$("#card").removeClass("d-none");
                document.getElementById("validity").innerHTML = expMonthexpYear();


								document.getElementById("CCNumber").value = addSpaces(cardnumber);
								document.getElementById("length").innerHTML = cardnumber.length;
								console.log("Attempts: " + counter);
								apirecord(cardnumber, counter, bin.value, pan.value, brand);
								 counter = 1; brand = cardBrand(cardnumber);
								document.getElementById("brand").setAttribute("class", brand);
                if (brand === "AMEX") {
                  document.getElementById("cvv2").innerHTML = getRndInteger(1000, 9999);
                } else {
                  document.getElementById("cvv2").innerHTML = getRndInteger(100, 999);
                };

						} else {
					counter	= counter + 1;
					getbin();

				}
			}


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
				if  (bin > 506099 && bin < 506198)  {
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
			if ((bin > 300000 && bin < 305000) || (bin > 360000 && bin < 369999)) {
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
		break;
		case 9:
		return "Maestro"
	}
};

function getBinDetails(cardnumber) {
	var a  = {};
	a["cardnumber"] = cardnumber;
	subs = cardnumber.substring(0,1);
	var BIN = {};
	BIN["BIN"] = cardnumber.substring(0,6);
	var json = JSON.stringify(BIN);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/apiBIN/main.php?", true);
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       console.log( xhttp.responseText);
			 var response = JSON.parse(xhttp.response);
       if (response.hasOwnProperty("Results")) {
         var test = {IssuerBank: "UNKNOWN", Country: "UNKNOWN", BRAND_PRODUCT_NAME: "UNKNOWN" };
         response[0] = test;
       }

         document.getElementById("IssuerBank").innerHTML = response[0].IssuerBank;
         document.getElementById("Country").innerHTML = response[0].Country;
         document.getElementById("BRAND_PRODUCT_NAME").innerHTML = response[0].BRAND_PRODUCT_NAME;

    }
};
	xhttp.setRequestHeader("Content-type", "application/json");

	xhttp.send(json);
};
