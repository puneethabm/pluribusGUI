$(document).ready(function(){

	
	//Table Entries
	
	var port = '';
	
	var byteCount = '';
	var packetCount = '';
	var durationSeconds = '';
	var length = '';
	var priority = '';
	var tableID = '';
	 
	//Packet Data 
	var dataLayerDestination = '';	
	var dataLayerSource = '';	
	var dataLayerType = '';	
	var dataLayerVirtualLan = '';		
	var dataLayerVirtualLanPriorityCodePoint = '';	
	var inputSwitch	= '';
	var inputPort = '';	
	var networkDestination = '';	
	var networkDestinationMaskLen = '';	
	var networkProtocol = '';	
	var networkSource = '';	
	var networkSourceMaskLen = '';		
	var networkTypeOfService = '';	
	var transportDestination = '';	
	var transportSource = '';	
	var wildcards = '';	
	
	//**************************************************************************************************//
	//**************************************************************************************************//
	
	//Table Header
	function tableHeader(){
		var flowTable = "<table id='flowTable' class='tableColl' border size='2' cellspacing='1'>" +
		"<tr>" +
        "<thead>"+
        "<th>Port</th>" +
        "<th>Byte Count</th>" +
        "<th>Packet Count</th>" +
        "<th>Duration Seconds</th>" +
        "<th>Packet Length</th>" +
        "<th>Priority</th>" +
        "<th>Table ID</th>" +
        "<th>Input Switch</th>" +	
        "<th>In Port</th>" +
        "<th>Source MAC</th>" +
        "<th>Destination MAC</th>" +						        
        "<th>Ether Type</th>" +
        "<th>VLAN Id</th>" +
        "<th>Source IP</th>" +
        "<th>Source MaskLen</th>" +
        "<th>Destination IP</th>" +
        "<th>Destination MaskLen</th>" +
        "<th>Protocol</th>" +
        "<th>TCP Src</th>" +
        "<th>TCP Dst</th>" +						        
        "</thead></tr>"+
        "<tbody>";
		return flowTable;
	}
	
	function tableContents(){
		 var flowTable = "<td>"+inputSwitch+"</td>";
		 flowTable += "<td>"+inputPort+"</td>";
		 flowTable += "<td>"+dataLayerSource+"</td>";
		 flowTable += "<td>"+dataLayerDestination+"</td>";
		 flowTable += "<td>"+dataLayerType+"</td>";
		 flowTable += "<td>"+dataLayerVirtualLan+"</td>";
		 flowTable += "<td>"+networkSource+"</td>";
		 flowTable += "<td>"+networkSourceMaskLen+"</td>";
		 flowTable += "<td>"+networkDestination+"</td>";
		 flowTable += "<td>"+networkDestinationMaskLen+"</td>";
		 flowTable += "<td>"+networkProtocol+"</td>";
		 flowTable += "<td>"+transportSource+"</td>";
		 flowTable += "<td>"+transportDestination+"</td>";
		 flowTable += "</tr>";
		 return flowTable;
	}
	
	function flowEntries(l,vall){
		if (l == 'dataLayerDestination'){
			dataLayerDestination = vall;
		}
		if (l == 'dataLayerSource'){
			dataLayerSource = vall;
		}
		if (l == 'dataLayerType'){
			 if (vall == '0x0000'){
				 dataLayerType = '*';
			 }else{
				 dataLayerType = vall;
			 }	
		}
		if (l == 'dataLayerVirtualLan'){
			 if (vall == -1){
				 dataLayerVirtualLan = "*";
    		  }else{
    			  dataLayerVirtualLan = vall;
    		  }
		}
		if (l == 'dataLayerVirtualLanPriorityCodePoint'){
			dataLayerVirtualLanPriorityCodePoint = vall;
		}
		if (l == 'inputSwitch'){
			 if (vall == '00:00:00:00:00:00:00:00'){
				 inputSwitch = '*';
			 }else{
				inputSwitch = vall;
			 }																	
		}
		if (l == 'inputPort'){
			inputPort = vall;
		}
		if (l == 'networkDestination'){
			 if (vall == '0.0.0.0'){
				 networkDestination = '*';
			 }else{
				 networkDestination = vall;
			 }	
		}
		if (l == 'networkDestinationMaskLen'){
			if (vall == '0'){
				networkDestinationMaskLen = '*';
			 }else{
				 networkDestinationMaskLen = vall;
			 }
		}
		if (l == 'networkProtocol'){
			if (vall == '0'){
				networkProtocol = '*';
			 }else{
				 if(dataLayerType == '0x806' && vall == 1){
					 networkProtocol = 'arp-request';
	    		  }else if(dataLayerType == '0x806' &&  vall == 2){
	    			  networkProtocol = 'arp-reply';
	    		  }else if(dataLayerType == '0x800' && vall == 1){
	    			  networkProtocol = 'icmp';
	    		  }else if(transportSource == 80 && transportDestination == 80){
	    			  networkProtocol = 'http';
	    		  }else if(vall == 6){
	    			  networkProtocol = 'tcp';
	    		  }else if(vall == 17){
	    			  networkProtocol = 'udp';
	    		  }else{
	    			  networkProtocol = 'unknown';
	    		  }	
			 }
		}
		if (l == 'networkSource'){
			 if (vall == '0.0.0.0'){
				 networkSource = '*';
			 }else{
				 networkSource = vall;
			 }	
		}
		if (l == 'networkSourceMaskLen'){
			if (vall == '0'){
				networkSourceMaskLen = '*';
			 }else{
				 networkSourceMaskLen = vall;
			 }
		}
		if (l == 'networkTypeOfService'){
			networkTypeOfService = vall;
		}
		if (l == 'transportDestination'){
		  if(vall == 0){
			  transportDestination = "*";
   		  }else{
   			transportDestination = vall;
   		  }
		}
		if (l == 'transportSource'){
			 if(vall == 0){
				 transportSource = "*";
	   		  }else{
	   			transportSource = vall;
	   		  }
		}
		if (l == 'wildcards'){
			wildcards = vall;
		}
	}
	
	
	//**************************************************************************************************//
	//**************************************************************************************************//
	//**************************************************************************************************//
	//**************************************************************************************************//
		//**************************************************************************************************//
		//Invoking Customized REST API's

		// 1-> Shows Flows Stats Button
		$('#showFlowStats').click(function() {
			getAllSwitchID();
		 });
	
		
		function getAllSwitchID(){
			// AJAX query 	
			var controllerIP = $("#controllerIP").val();			
			var switchID = "all";
			var stats = "flow";
			
			$.ajax({
				type: "GET",	
				url: "./statistics.php?controllerIP="+controllerIP+"&switchID="+switchID+"&stats="+stats,
				async: false,
				   		 
				beforeSend: function() {
						
			    },
			    error: function(data){
				   alert('Ajax Error....:');
				},
				
			    success: function(data) {	
					$('#showFlowStatsRESTAPIdiv').html('');
					$("#selectFlowStatsSwitchID").html('');
					$('#showFlowStatsRESTAPIdiv').append("<strong>Controller IP=>"+controllerIP+"</strong><br /><br />");
									
					var SwitchID ="";
					SwitchID +=	"<option value='0' selected='selected'>--Select Switch ID--</option>";
					SwitchID +=	"<option value='all'>all</option>";
					var obj = jQuery.parseJSON(data);
					jQuery.each(obj, function(i, val) {
						SwitchID +=	"<option value='"+i+"'>"+i+"</option>";
					});
					$("#selectFlowStatsSwitchID").append(SwitchID);
			    }
			});	
		}			
		
	
	 
		// Form submit handler
		$("form:#flowStatsForm").submit(function () { 
		     var selectSwitchIDVal = $("#selectFlowStatsSwitchID").val();
		     if(selectSwitchIDVal!='0'){
		    	 showAllFlowStats(selectSwitchIDVal);
		     }
		     return false; // submit
		});
		
		
		
		// 1-> Shows Flows Stats--REST API
			function showAllFlowStats(selectSwitchIDVal){
				var controllerIP = $("#controllerIP").val();			
				var switchID = selectSwitchIDVal;
				var stats = "flow";
				
				$.ajax({
					type: "GET",	
					url: "./statistics.php?controllerIP="+controllerIP+"&switchID="+switchID+"&stats="+stats,
					async: false,
					   		 
					beforeSend: function() {
							$('#contentFlowStatsRESTAPIdiv').html("<img src='./images/ajax-loader.gif' />");
				    },
				    error: function(data){
					   alert('Ajax Error....:');
					},
					
				    success: function(data) {	
						$('#contentFlowStatsRESTAPIdiv').html('');
						var obj = jQuery.parseJSON(data);
						
						if (selectSwitchIDVal == 'all'){	
							jQuery.each(obj, function(i, vali) {
								$("#contentFlowStatsRESTAPIdiv").append("<br />"+"<strong>Switch ID=>"+i+"<strong>");
								var flowTable = tableHeader();
								
								if(vali){
							    	flowTable += "<tr>";
									      jQuery.each(vali, function(j, valj) {	
									    	  jQuery.each(valj.actions, function(k, valk) {		
									    		  	port = valk.port;
													flowTable += "<td>"+port+"</td>";
													
											  }); 
									    	  
									    	 byteCount = valj.byteCount;
									    	 packetCount = valj.packetCount;
									    	 durationSeconds = valj.durationSeconds;
									    	 length = valj.length;
											 priority = valj.priority;
											 tableID = valj.tableID;
											 
									    	 flowTable += "<td>"+byteCount+"</td>";
									    	 flowTable += "<td>"+packetCount+"</td>";
									    	 flowTable += "<td>"+durationSeconds+"</td>";
									    	 flowTable += "<td>"+length+"</td>";
									    	 flowTable += "<td>"+priority+"</td>";
									    	 flowTable += "<td>"+tableID+"</td>";
									    	 
									    	
										    	 if(valj){
												    	 jQuery.each(valj.match, function(l, vall) {
												    		 flowEntries(l,vall);
													      });
												    	 flowTable += tableContents();					    	 
												 }
										    	 
									      });
									      flowTable += "</tbody></table>"+
									      $("#contentFlowStatsRESTAPIdiv").append(flowTable);
									     
								    }else{
								    	
								    	$("#contentFlowStatsRESTAPIdiv").append('No Flows');
								    }
								 });
						}//if ends
						else{
							var flowTable = tableHeader();
														
							jQuery.each(obj, function(i, vali) {
								$("#contentFlowStatsRESTAPIdiv").append("<br />"+"<strong>Switch ID=>"+i+"<strong>");
							    if(vali){
							    	flowTable += "<tr>";
									      jQuery.each(vali, function(j, valj) {	
									    	  jQuery.each(valj.actions, function(k, valk) {		
									    		  	port = valk.port;
													flowTable += "<td>"+port+"</td>";
											  }); 
									    	  
									    	 byteCount = valj.byteCount;
									    	 packetCount = valj.packetCount;
									    	 durationSeconds = valj.durationSeconds;
									    	 length = valj.length;
											 priority = valj.priority;
											 tableID = valj.tableID;
									    	 
									    	 flowTable += "<td>"+byteCount+"</td>";
									    	 flowTable += "<td>"+packetCount+"</td>";
									    	 flowTable += "<td>"+durationSeconds+"</td>";
									    	 flowTable += "<td>"+length+"</td>";
									    	 flowTable += "<td>"+priority+"</td>";
									    	 flowTable += "<td>"+tableID+"</td>";
									    	 
									    	
										     if(valj){
												    	 jQuery.each(valj.match, function(l, vall) {
												    		 flowEntries(l,vall);
													      });
												    	 flowTable += tableContents();
											  } 
									      });
									      flowTable += "</tbody></table>"+
									      $("#contentFlowStatsRESTAPIdiv").append(flowTable);
									      
								    }else{
								    	
								    	$("#contentFlowStatsRESTAPIdiv").append('No Flows');
								    }
								 });
						}//else ends
				    }
				});						
		}
		
		//**************************************************************************************************//	
});
		
	