$(document).ready(function(){

	
	var ip1 = "(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}" +
	"(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))";
	
	function isValidIP() {
		  var ip = /^(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
		var ipReturnVal = true;
		var ipCodeVal = $("#controllerIP").val();
		
		
		if(ipReturnVal == '') {	
			$("#controllerIP_err").html('<span class="error">Please enter the IP address</span>');
			ipReturnVal = false;
		}
		else if(!ip.test(ipCodeVal)) {
			$("#controllerIP_err").html('<span class="error">Please Enter Valid IP Address</span>');
			ipReturnVal = false;
		}		
		else{
			$("#controllerIP_err").html('');
			ipReturnVal = true;
		}
		return ipReturnVal;
	}
	
	
	
	
	/* On Blur Validate Input */
	$('#controllerIP').blur(function() {
		if(isValidIP()){ }
	});
	

	
	

	
	//Reset Button 
	
	 $('#restAPIResetButton').click(function() {
		// $(this).attr("src", "./images/ResetOnClick.png");
		
		 myResetHandler();	     
		 
	 });
	 
	
	//Reset Handler
		function myResetHandler() {
			$("#controllerIP_err").html('');
			$("#tab-view").css("display","none");
		}
		
		
		
	

	// Form submit handler
	$("form:#restAPIForm").submit(function() { 
		
		var apiHasError = false;
		
		//Validations
		if(!isValidIP()){ apiHasError = true;}
		
		if(apiHasError == true) { 
			return false; 
		}
		else{	
			$("#tab-view").css("display","block");
			
			return false; 
		}
		return true;
	});

	
	
			
});



