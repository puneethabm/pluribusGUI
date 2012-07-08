$(document).ready(function(){
	
	var flowSeqID = '';	
	var input_switch_id = '';	
	var in_port = '';	
	var src_mac = '';	
	var dst_mac = '';	
	var data_layer_type = '';		
	var vlan_id = '';	
	var vlan_priority = '';	
	var src_ip = '';	
	var src_masklen = '';	
	var dst_ip = '';	
	var dst_masklen = '';	
	var protocolName = '';	
	var tos = '';	
	var tcp_src = '';	
	var tcp_dst = '';	
	var wildcards = '';		
	
	//Timestamp
	var start_timestamp = '';
	var end_timestamp = '';
	var diffSeconds = '';
	var diffMinutes = '';
	var diffHours = '';
	var diffDays = '';
	    //**************************************************************************************************//
		//Decimal to Hexadecimal -- Switch ID
		function decimalToHexSwitchID(d, padding) {			 
		    var hex = Number(d).toString(16);
		    padding = typeof (padding) === "undefined" || padding === null ? 
		                 padding = 16 : padding;
	
		    while (hex.length < padding) {
		        hex = "0" + hex;
		    }
		    var hexNew = '';
		    var i = 0;  
		    while(i <= 14){ 
		       if(i<13){
		    	   hexNew += hex.substr(i, 2)+ ":";
		       }else{
		    	   hexNew += hex.substr(i, 2);
		       }
		       i = i + 2;
		    }
	        return hexNew;
		  }
		
		
		//Table Header
		function tableHeader(){
			var flowTable = "<table class='tableColl' border size='2' cellspacing='1'>" +
	        "<tr>" +
	        "<thead>"+				     
	        "<th>Switch ID</th>" +
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
	        "<th>Duration- Minutes</th>" +
	        "<th>Duration- Secs</th>" +	
	        "</thead></tr>"+
	        "<tbody>";
			return flowTable;
		}
		
		function tableContents(){
			 var flowTable = "<td>"+input_switch_id+"</td>";
	    	  flowTable += "<td>"+in_port+"</td>";	
	    	  flowTable += "<td>"+src_mac+"</td>";	
	    	  flowTable += "<td>"+dst_mac+"</td>";	
	    	  flowTable += "<td>"+data_layer_type+"</td>";	
	    	  flowTable += "<td>"+vlan_id+"</td>";					    	 
	    	  flowTable += "<td>"+src_ip+"</td>";	
	    	  flowTable += "<td>"+src_masklen+"</td>";	
	    	  flowTable += "<td>"+dst_ip+"</td>";	
	    	  flowTable += "<td>"+dst_masklen+"</td>";	
	    	  flowTable += "<td>"+protocolName+"</td>";					    	  
	    	  flowTable += "<td>"+tcp_src+"</td>";	
	    	  flowTable += "<td>"+tcp_dst+"</td>";
	    	  flowTable += "<td>"+diffMinutes+"</td>";	
	    	  flowTable += "<td>"+diffSeconds+"</td>";
		      flowTable += "</tr>";
		      return flowTable;
		}
		
		function flowEntries(j,valj){
			  if (j == 'flowSeqID'){
	    		  flowSeqID = valj;
	    	  }
	    	  if (j == 'input_switch_id'){
	    		  input_switch_id = decimalToHexSwitchID(valj);
	    	  }	
	    	  if (j == 'in_port'){
	    		  in_port = valj;
	    	  }	
	    	  if (j == 'src_mac'){
	    		  src_mac = valj;
	    	  }	
	    	  if (j == 'dst_mac'){
	    		  dst_mac = valj;
	    	  }	
	    	  if (j == 'data_layer_type'){
	    		  if (valj == 2048){
	    			  data_layer_type = '0x800'; 
	    		  }else if (valj == 2054){
	    			  data_layer_type = '0x806';  
	    		  }else{
	    			  data_layer_type = valj;  
	    		  }
	    	  }	
	    	  if (j == 'vlan_id'){
	    		  if (valj == -1){
	    			  vlan_id = "*";
	    		  }else{
	    			  vlan_id = valj;
	    		  }
	    	  }	
	    	  if (j == 'vlan_priority'){
	    		  vlan_priority = valj;
	    	  }	
	    	  if (j == 'src_ip'){
	    		  src_ip = valj;
	    	  }	
	    	  if (j == 'src_masklen'){
	    		  src_masklen = valj;
	    	  }	
	    	  if (j == 'dst_ip'){
	    		  dst_ip = valj;
	    	  }	
	    	  if (j == 'dst_masklen'){
	    		  dst_masklen = valj;
	    	  }	
	    	  if (j == 'protocol'){
	    		  if(data_layer_type == 2054 && valj == 1){
	    			  protocolName = 'arp-request';
	    		  }else if(data_layer_type == 2054 && valj == 2){
	    			  protocolName = 'arp-reply';
	    		  }else if(data_layer_type == 2048 && valj == 1){
	    			  protocolName = 'icmp';
	    		  }else if(tcp_src == 80 && tcp_dst == 80){
	    			  protocolName = 'http';
	    		  }else if(valj == 6){
	    			  protocolName = 'tcp';
	    		  }else if(valj == 17){
	    			  protocolName = 'udp';
	    		  }else{
	    			  protocolName = 'unknown';
	    		  }
	    	  }	
	    	  if (j == 'tos'){
	    		  tos = valj;
	    	  }	
	    	  if (j == 'tcp_src'){
	    		  if(valj == 0){
	    			  tcp_src = "*";
	    		  }else{
	    			  tcp_src = valj;
	    		  }
	    	  }	
	    	  if (j == 'tcp_dst'){
	    		  if(valj == 0){
	    			  tcp_dst = "*";
	    		  }else{
	    			  tcp_dst = valj;
	    		  }
	    	  }	
	    	  if (j == 'wildcards'){
	    		  wildcards = valj;
	    	  }	
	    	  
	    	  //Duration
	    	  if (j == 'start_timestamp'){
	    		  var date = new Date(valj);
	    		  var formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
	    		  var hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
	    		  var minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
	    		  var seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
	    		  var formattedTime = hours + ":" + minutes + ":" + seconds;
	    		  start_timestamp = formattedDate + " " + formattedTime;
	    	  }
	    	  if (j == 'end_timestamp'){
	    		  end_timestamp = valj;
	    	  }
	    	  if (j == 'diffSeconds'){
	    		  diffSeconds = valj;
	    	  }
	    	  if (j == 'diffMinutes'){
	    		  diffMinutes = valj;
	    	  }
	    	  if (j == 'diffHours'){
	    		  diffHours = valj;
	    	  }
	    	  if (j == 'diffDays'){
	    		  diffDays = valj;
	    	  }
		}
		//**************************************************************************************************//
		//**************************************************************************************************//
		//**************************************************************************************************//
		//**************************************************************************************************//
		//Invoking Customized REST API's

		// 1-> Shows All Flows Button
		$('#showFlows').click(function() {
			showAllFlows();
		});
	
		
		// 1-> Shows All Flows--REST API
			function showAllFlows(){
				var controllerIP = $("#controllerIP").val();			
				var tracker = "flowtracker";
				$.ajax({
					type: "GET",	
					url: "./showFlows.php?controllerIP="+controllerIP+"&tracker="+tracker,
					async: false,
					   		 
					beforeSend: function() {
							$('#showFlowsRESTAPI').html("<img src='./images/ajax-loader.gif' />");
				    },
				    error: function(data){
					   alert('Ajax Error....:');
					},
					
				    success: function(data) {	
						$('#showFlowsRESTAPI').html('');
						$("#showFlowsRESTAPI").append("<strong>Controller IP=>"+controllerIP+"</strong><br /><br />");
						var flowTable = tableHeader();
						var obj = jQuery.parseJSON(data);
						jQuery.each(obj, function(i, val) {
							flowTable += "<tr>";						
						      jQuery.each(val, function(j, valj) {
						    	 //Prints all values into Table
						    	  flowEntries(j,valj);
						      });						      
						      flowTable += tableContents();
						  });
						  flowTable += "</tbody></table>";
					    $("#showFlowsRESTAPI").append(flowTable);
				    }
				});						
		}
			
		//**************************************************************************************************//	
			// 2-> Shows All Switches Button
			$('#showSwitches').click(function() {
				showAllSwitches();
			 });
			
			
			// 2-> Shows All Switches--REST API
			function showAllSwitches(){
				// AJAX query 	
				var controllerIP = $("#controllerIP").val();			
				var tracker = "switchtracker";
				$.ajax({
					type: "GET",	
					url: "./showFlows.php?controllerIP="+controllerIP+"&tracker="+tracker,
					async: false,
					   		 
					beforeSend: function() {
							//$('#showFlowsRESTAPI').html("<img src='./images/ajax-loader.gif' />");
				    },
				    error: function(data){
					   alert('Ajax Error....:');
					},
					
				    success: function(data) {	
						$('#showPerSwitchRESTAPIdiv').html('');
						$("#selectSwitchID").html('');
						$('#showPerSwitchRESTAPIdiv').append("<strong>Controller IP=>"+controllerIP+"</strong><br /><br />");
						var SwitchID ="";
						SwitchID +=	"<option value='0' selected='selected'>--Select Switch ID--</option>";
						SwitchID +=	"<option value='all'>all</option>";
						var obj = jQuery.parseJSON(data);
						jQuery.each(obj, function(i, val) {
							SwitchID += "<option value='"+i+"'>"+decimalToHexSwitchID(i)+"</option>";
						});
						$("#selectSwitchID").append(SwitchID);						 
				    }
				});	
			}			
			
		
		 
			// Form submit handler
			$("form:#perSwitchForm").submit(function () { 
			     var selectSwitchIDVal = $("#selectSwitchID").val();
			     if(selectSwitchIDVal!='0'){
			    		// alert(selectSwitchIDVal);
			    	 displayPerSwitchID(selectSwitchIDVal);
			     }			    
			     return false; // submit
			});	
			
			function displayPerSwitchID(selectSwitchIDVal){
				//alert(selectSwitchIDVal);
				var controllerIP = $("#controllerIP").val();			
				var tracker = "switchtracker";
				$.ajax({
					type: "GET",	
					url: "./showFlows.php?controllerIP="+controllerIP+"&tracker="+tracker,
					async: false,
					   		 
					beforeSend: function() {
							$('#contentPerSwitchRESTAPIdiv').html("<img src='./images/ajax-loader.gif' />");
				    },
				    error: function(data){
					   alert('Ajax Error....:');
					},
					
				    success: function(data) {	
						$('#contentPerSwitchRESTAPIdiv').html('');						
						
						var obj = jQuery.parseJSON(data);
						if (selectSwitchIDVal == 'all'){							
							jQuery.each(obj, function(i, vali) {
								$("#contentPerSwitchRESTAPIdiv").append("<br />"+"<strong>Switch ID=>"+decimalToHexSwitchID(i)+"<strong>");
								
								var flowTable = tableHeader();
								
								 jQuery.each(vali, function(j, valj) {
									
									 jQuery.each(valj, function(k, valk) {
									
										  jQuery.each(valk, function(m, valm) {						    				 
											  //Prints all values into Table
											  flowEntries(m,valm);											
									      }); 
								      }); 
									 flowTable += tableContents();				 
							      }); 
								 flowTable += "</table>";
							      $("#contentPerSwitchRESTAPIdiv").append(flowTable);
								  
							  });
							
						}
						
						else{
							
						 $("#contentPerSwitchRESTAPIdiv").append("<br />"+"<strong>Switch ID=>"+decimalToHexSwitchID(selectSwitchIDVal)+"<strong>");										
				    	
						 var flowTable = tableHeader();
							
							
						 jQuery.each(obj, function(i, vali) {
								
								 jQuery.each(vali, function(j, valj) {
									
									 jQuery.each(valj, function(k, valk) {
										
										  jQuery.each(valk, function(m, valm) {
								    			  if(i == selectSwitchIDVal){							    				 
										    				  //Prints all values into Table
								    				  flowEntries(m,valm);
												  }								    			  
									      }); 	
										  
										  // updated
										  if(i == selectSwitchIDVal){	
											  flowTable += tableContents();
										  }										 
								      }); 							    	  		
							      }); 								 
							  });							
							 flowTable += "</table>";
						    $("#contentPerSwitchRESTAPIdiv").append(flowTable);
						}	
				    }
				});		
			}
			
	    //**************************************************************************************************//	
			
			// 3-> Shows All Protocols Button
			$('#showProtocols').click(function() {
				showAllProtocols();
			 });
		
			
			// 3-> Shows All Protocols--REST API
			function showAllProtocols(){
				// AJAX query 	
				var controllerIP = $("#controllerIP").val();			
				var tracker = "protocoltracker";
				$.ajax({
					type: "GET",	
					url: "./showFlows.php?controllerIP="+controllerIP+"&tracker="+tracker,
					async: false,
					   		 
					beforeSend: function() {
							//$('#showFlowsRESTAPI').html("<img src='./images/ajax-loader.gif' />");
				    },
				    error: function(data){
					   alert('Ajax Error....:');
					},
					
				    success: function(data) {	
						$('#showPerProtocolRESTAPIdiv').html('');
						$("#selectProtocol").html('');
						$('#showPerProtocolRESTAPIdiv').append("<strong>Controller IP=>"+controllerIP+"</strong><br /><br />");
										
						var protocol ="";
						protocol +=	"<option value='0' selected='selected'>--Select Protocol--</option>";
						protocol +=	"<option value='all'>all</option>";
						var obj = jQuery.parseJSON(data);
						jQuery.each(obj, function(i, val) {
							protocol +=	"<option value='"+i+"'>"+i+"</option>";
						});
						
						
						$("#selectProtocol").append(protocol);
						 
				    }
				});	
			}			
			
		
		 
			// Form submit handler
			$("form:#perProtocolForm").submit(function () { 
			     var selectProtocolVal = $("#selectProtocol").val();
			     if(selectProtocolVal!='0'){
			    	// alert(selectProtocolValVal);
			    	 getProtocol(selectProtocolVal);
			     }
			    
			     return false; // submit
			});
			
			
			
			function getProtocol(selectProtocolVal){
				//alert(selectProtocolVal);
				var controllerIP = $("#controllerIP").val();			
				var tracker = "protocoltracker";
				$.ajax({
					type: "GET",	
					url: "./showFlows.php?controllerIP="+controllerIP+"&tracker="+tracker,
					async: false,
					   		 
					beforeSend: function() {
							$('#contentPerProtocolRESTAPIdiv').html("<img src='./images/ajax-loader.gif' />");
				    },
				    error: function(data){
					   alert('Ajax Error....:');
					},
					
				    success: function(data) {	
						$('#contentPerProtocolRESTAPIdiv').html('');
						
						var obj = jQuery.parseJSON(data);
						if(selectProtocolVal == 'all'){
								jQuery.each(obj, function(i, vali) {
									 $("#contentPerProtocolRESTAPIdiv").append("<br />"+"<strong>Protocol=>"+i+"<strong>");
									 var flowTable = tableHeader();
										
										 jQuery.each(vali, function(j, valj) {
											 flowTable += "<tr>";
											 jQuery.each(valj, function(k, valk) {
												  jQuery.each(valk, function(m, valm) {						    				 
													  //Prints all values into Table
													  flowEntries(m,valm);												
											      }); 	
												  
										      }); 
											 flowTable += tableContents();
									      }); 
										 flowTable += "</table>";
									      $("#contentPerProtocolRESTAPIdiv").append(flowTable);
									
								  });
						}
						
						else{
							 $("#contentPerProtocolRESTAPIdiv").append("<br />"+"<strong>Protocol=>"+selectProtocolVal+"<strong>");
							 var flowTable = tableHeader();
								
								jQuery.each(obj, function(i, vali) {
									 jQuery.each(vali, function(j, valj) {
										 flowTable += "<tr>";
										 jQuery.each(valj, function(k, valk) {
											  jQuery.each(valk, function(m, valm) {
												  
									    			  if(i == selectProtocolVal ){
									    				  //Prints all values into Table
									    				  flowEntries(m,valm);
													  }
										      }); 	
											  if(i == selectProtocolVal ){
												  flowTable += tableContents();
											  }
									      });						 
								      }); 
									
									  
								  });
								flowTable += "</table>";
							      $("#contentPerProtocolRESTAPIdiv").append(flowTable);
						}
						
				    }
				});		
			}
			
	    //**************************************************************************************************//	
			
			
			// 4-> Shows All MAC Button
			$('#showMACs').click(function() {
				showAllMACs();
			 });
			
			
			// 4-> Shows All MAC--REST API
			function showAllMACs(){
				// AJAX query 	
				var controllerIP = $("#controllerIP").val();			
				var tracker = "mactracker";
				$.ajax({
					type: "GET",	
					url: "./showFlows.php?controllerIP="+controllerIP+"&tracker="+tracker,
					async: false,
					   		 
					beforeSend: function() {
							//$('#showFlowsRESTAPI').html("<img src='./images/ajax-loader.gif' />");
				    },
				    error: function(data){
					   alert('Ajax Error....:');
					},
					
				    success: function(data) {	
						$('#showPerMACRESTAPIdiv').html('');
						$("#selectMacAddr").html('');
						$('#showPerMACRESTAPIdiv').append("<strong>Controller IP=>"+controllerIP+"</strong><br /><br />");
										
						var MACAddress ="";
						MACAddress +=	"<option value='0' selected='selected'>--Select MAC--</option>";
						MACAddress +=	"<option value='all'>all</option>";
						var obj = jQuery.parseJSON(data);
						jQuery.each(obj, function(i, val) {
							    MACAddress +=	"<option value='"+i+"'>"+i+"</option>";
						});	
						$("#selectMacAddr").append(MACAddress);
				    }
				});	
			}			
			
		
		 
			// Form submit handler
			$("form:#perMacForm").submit(function () { 
			     var selectMacAddrVal = $("#selectMacAddr").val();
			     if(selectMacAddrVal!='0'){
			    	// alert(selectMacAddrVal);
			    	 getMAC(selectMacAddrVal);
			     }
			     return false; // submit
			});
			
			
			
			function getMAC(selectMacAddrVal){
				//alert(selectMacAddrVal);
				var controllerIP = $("#controllerIP").val();			
				var tracker = "mactracker";
				$.ajax({
					type: "GET",	
					url: "./showFlows.php?controllerIP="+controllerIP+"&tracker="+tracker,
					async: false,
					   		 
					beforeSend: function() {
							$('#contentPerMACRESTAPIdiv').html("<img src='./images/ajax-loader.gif' />");
				    },
				    error: function(data){
					   alert('Ajax Error....:');
					},
					
				    success: function(data) {	
						$('#contentPerMACRESTAPIdiv').html('');
						
						var obj = jQuery.parseJSON(data);
						if(selectMacAddrVal == 'all'){
								jQuery.each(obj, function(i, vali) {
									 $("#contentPerMACRESTAPIdiv").append("<br />"+"<strong>MAC=>"+i+"<strong>");
									 var flowTable = tableHeader();
										
									 jQuery.each(vali, function(j, valj) {
										 flowTable += "<tr>";
										 jQuery.each(valj, function(k, valk) {
											  jQuery.each(valk, function(m, valm) {
												//Prints all values into Table
												  flowEntries(m,valm);
										      }); 	
											  
									      }); 
										 flowTable += tableContents();
								      }); 
									
									 flowTable += "</table>";
								      $("#contentPerMACRESTAPIdiv").append(flowTable);
								  });
								
						}
						
						else{
							 $("#contentPerMACRESTAPIdiv").append("<br />"+"<strong>MAC=>"+selectMacAddrVal+"<strong>");
							 var flowTable = tableHeader();
								
								jQuery.each(obj, function(i, vali) {
									 jQuery.each(vali, function(j, valj) {
										 flowTable += "<tr>";
										 jQuery.each(valj, function(k, valk) {
											  jQuery.each(valk, function(m, valm) {
												  
									    			  if(i == selectMacAddrVal ){
									    				 
									    				  //Prints all values into Table
									    				  flowEntries(m,valm);
													  }
										      }); 	
											  if(i == selectMacAddrVal){
												  flowTable += tableContents();
											  }
									      }); 						 
								      }); 
								  });
								flowTable += "</table>";
							      $("#contentPerMACRESTAPIdiv").append(flowTable);
						}
	
						
				    }
				});		
			}
	    //**************************************************************************************************//	
		
		
			
			// 5-> Shows All IP Button
			$('#showIPs').click(function() {
				showAllIPs();
			 });
			
			
			// 5-> Shows All IP--REST API
			function showAllIPs(){
				// AJAX query 	
				var controllerIP = $("#controllerIP").val();			
				var tracker = "iptracker";
				$.ajax({
					type: "GET",	
					url: "./showFlows.php?controllerIP="+controllerIP+"&tracker="+tracker,
					async: false,
					   		 
					beforeSend: function() {
					//	$('#showFlowsRESTAPI').html("<img src='./images/ajax-loader.gif' />");
				    },
				    error: function(data){
					   alert('Ajax Error....:');
					},
					
				    success: function(data) {	
						$('#showPerIPRESTAPIdiv').html('');
						$("#selectIPAddr").html('');
						$('#showPerIPRESTAPIdiv').append("<strong>Controller IP=>"+controllerIP+"</strong><br /><br />");
										
						var IPAddress ="";
						IPAddress +=	"<option value='0' selected='selected'>--Select IP--</option>";
						IPAddress +=	"<option value='all'>all</option>";
						var obj = jQuery.parseJSON(data);
						jQuery.each(obj, function(i, val) {
							IPAddress +=	"<option value='"+i+"'>"+i+"</option>";
						});
						
						$("#selectIPAddr").append(IPAddress);
						 
				    }
				});	
			}			
			
		
		 
			// Form submit handler
			$("form:#perIPForm").submit(function () { 
			     var selectIPAddrVal = $("#selectIPAddr").val();
			     if(selectIPAddrVal!='0'){
			    	// alert(selectMacAddrVal);
			    	 getIP(selectIPAddrVal);
			     }
			    
			     return false; // submit
			});
			
			
			
			function getIP(selectIPAddrVal){
				//alert(selectIPAddrVal);
				var controllerIP = $("#controllerIP").val();			
				var tracker = "iptracker";
				$.ajax({
					type: "GET",	
					url: "./showFlows.php?controllerIP="+controllerIP+"&tracker="+tracker,
					async: false,
					   		 
					beforeSend: function() {
							$('#contentPerIPRESTAPIdiv').html("<img src='./images/ajax-loader.gif' />");
				    },
				    error: function(data){
					   alert('Ajax Error....:');
					},
					
				    success: function(data) {	
						$('#contentPerIPRESTAPIdiv').html('');
						
						var obj = jQuery.parseJSON(data);
						if(selectIPAddrVal == 'all'){
								
								jQuery.each(obj, function(i, vali) {
									 $("#contentPerIPRESTAPIdiv").append("<br />"+"<strong>MAC=>"+i+"<strong>");
									 var flowTable = tableHeader();
										
									 jQuery.each(vali, function(j, valj) {
										 flowTable += "<tr>";
										 jQuery.each(valj, function(k, valk) {
											  jQuery.each(valk, function(m, valm) {
												//Prints all values into Table
												  flowEntries(m,valm);
										      }); 	
											  
									      }); 
										 flowTable += tableContents();				 
								      }); 
									 flowTable += "</table>";
								      $("#contentPerIPRESTAPIdiv").append(flowTable);
									  
								  });
								
						}
						
						else{
							 $("#contentPerIPRESTAPIdiv").append("<br />"+"<strong>MAC=>"+selectIPAddrVal+"<strong>");
							 var flowTable = tableHeader();
								
								jQuery.each(obj, function(i, vali) {
									 jQuery.each(vali, function(j, valj) {
										 flowTable += "<tr>";
										 jQuery.each(valj, function(k, valk) {
											  jQuery.each(valk, function(m, valm) {
												  
									    			  if(i == selectIPAddrVal ){
									    				  //Prints all values into Table
									    				  flowEntries(m,valm);
													  }
										      }); 	
											  if (i == selectIPAddrVal){
												  flowTable += tableContents();
											  }
									      }); 					 
								      }); 
								  });
								flowTable += "</table>";
							      $("#contentPerIPRESTAPIdiv").append(flowTable);
						}
						
				    }
				});		
			}
			
	    //**************************************************************************************************//	
});
		
	