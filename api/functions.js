function get(method) {
	$("#myTable").empty();
	
	var today = new Date();
	var yyyy = today.getFullYear();
	var mm = today.getMonth()+1
	var dd = today.getDate();
	var q = new Object();
	q.methodName = method.id;
	q.bin = $("#bin").val();
  q.pan = $("#pan").val();
	q.fromDate = yyyy +'-'+(mm - 1)+'-'+dd;
	q.toDate = yyyy +'-'+mm+'-'+dd;
	
	$.post('getalldetails.php', JSON.stringify(q)).done(function( data ) {
		console.log(data);
  	var items = [];
    var tRow = [];
    var tb = "";
    var subtRow = [];
    var subtb = "";
   

  	 $.each( JSON.parse(data), function( key, val ) {
      tRow +=  "<th>" + key + "</th>" ; 
   		   $.each( val, function( subkey, subval ) {
   				 subtRow +=  "<th>" + subkey + "</th>" ; 
    
    
   				 subtb += "<td>" + subval + "</td>";
 				
				  });
    
    tb += "<table><tr>"+subtRow+"</tr><tr>"+subtb+"</tr></table>";

    var test = "<tr>"+tRow+"</tr><tr id = '"+ key +"'>"+tb+"</tr>";
    if (key % 2 == 0) {
                $( "<table  />", {
          "ID": "myTable",
          "Class": "even",
             html:  "<tr>"+tRow+"</tr><tr>"+tb+"</tr>"
           }).appendTo( "#table" );
              } else {
          $( "<table  />", {
          "ID": "myTable",
          "Class": "odd",
             html:  "<tr>"+tRow+"</tr><tr>"+tb+"</tr>"
           }).appendTo( "#table" );
         }
          $('th').css('border-style', 'groove');
          $('td').css('border-style', 'groove');

     tRow = [];
     tb = "";
     subtRow = [];
     subtb = "";
  });
    /* $( "<table/>", {
          "ID": "myTable",
             html:  "<tr>"+tRow+"</tr><tr>"+tb+"</tr>"
        }).appendTo( "#table" );*/


 
  
    });
 
};