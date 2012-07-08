<html>
<head>
	<title>CLI for floodlight controller--Pluribus Networks</title>

	<!-- Favicon -->
	<link rel="icon" type="image/jpg" href="./images/favicon.jpg">

	<!-- Include Jquery Library -->
	<script src="./js/jquery.js"></script>	
	
	<!-- Layout Stylesheet -->
	<link href="./css/layout.css" rel="stylesheet" type="text/css" />
	
	<!-- Validation Scripts -->
	<script src="./js/validate.js" type="text/javascript"></script>
	<script src="./js/parserAllFlows.js" type="text/javascript"></script>
	<script src="./js/parserStats.js" type="text/javascript"></script>	
	
	<!-- Responsive Table Stylesheet -->
	<link href="./css/resp_table.css" rel="stylesheet" type="text/css" />
	
	<!-- Include ToolTip script -->
	<link href="./css/jtip.css" rel="stylesheet" type="text/css" />
	<script src="./js/jtip.js" type="text/javascript"></script>
	
	
	<!-- Tab View Starts -->
	<script type="text/javascript" src="js/organictabs.jquery.js"></script>
	<link href="./css/organictabs.css" rel="stylesheet" type="text/css" />
	
	<script type='text/javascript'>
	    $(function() {
	        $("#tab-view").organicTabs({
	            "speed": 200
	        });
	
	    });
	</script>
	<!-- Tab View Ends -->
	
	
</head>
<body>
	<img alt="Pluribus Networks" src="./images/PluribusNetworks.jpg">
	<br/><br/>
      <form id="restAPIForm" name="restAPIForm" action="#" method="post">
		<table class="tablePad">
		    <tr>
			     <td>Enter the Controller IP:<span class="mndtry">*</span></td>
				 <td><div class="text-input"><input type="text" id="controllerIP" name="controllerIP" value="" maxlength="15"></div></td>
				 <td>
				 	<a href="./hints/h_controllerIP.php?width=375" class="jTip" id="controllerIP_h" name="Hint: Please enter a valid Controller IP">
						<img src="./images/hint-icon.jpg">
					</a>
				 </td>
				 <td><span id="controllerIP_err"></span></td>
			</tr>
			
			<tr>
			   	<td>
			   	</td>
			   	<td>	
			   			<input type="reset" id="restAPIResetButton" class="button" value="Reset!">	
			  	</td>
			  	
			  
			  	<td>			   	
			   		<input type="submit" name="restAPISubmitButton" id="restAPISubmitButton" class="button" value="Submit!"> 
			   	</td>  
			</tr>
			
		</table>
	
	 </form>
	 
	 
	 
	 
	 
	 
		
	<div id="tab-view" style="display:none;">
	 <h3>Show Flows</h3>
	    <ul class="nav">
	                <li class="nav-1"><a id="showFlows" href="#showFlowsRESTAPI" class="current">Show All <br/>Flows</a></li>
	                <li class="nav-2"><a id="showSwitches" href="#showSwitchesRESTAPI">Show All <br/>Switches</a></li>
	                <li class="nav-3"><a id="showProtocols" href="#showProtocolsRESTAPI">Show All <br/>Protocols</a></li>
	                <li class="nav-4"><a id="showMACs" href="#showMACsRESTAPI">Show All<br/> MAC's</a></li>
					<li class="nav-5"><a id="showIPs" href="#showIPsRESTAPI">Show All <br/>IP's</a></li>
					
					<li class="nav-6"><a id="showFlowStats" href="#showFlowStatsRESTAPI">Show Flow<br/>Stats</a></li>	
	    </ul>
	
	
	    <div class="list-wrap">
	
			<ul id="showFlowsRESTAPI">
				<li></li>
			</ul>
	
			 <ul id="showSwitchesRESTAPI" class="hide">
				<li>
					
					<form id='perSwitchForm' name='perSwitchForm' action='#'>
						<div id="showPerSwitchRESTAPIdiv">
						
						</div>
						<select id='selectSwitchID' name='selectSwitchID' style='width: 180px'>
						
						</select>
					<input type='submit' name='restAPIPerSwitchButton' id='restAPIPerSwitchButton' class='button' value='Submit!'>
					</form>
					<div id="contentPerSwitchRESTAPIdiv">
						
				    </div>
				</li>
			 </ul>
	
			 <ul id="showProtocolsRESTAPI" class="hide">
				<li>
					
					<form id='perProtocolForm' name='perProtocolForm' action='#'>
						<div id="showPerProtocolRESTAPIdiv">
						
						</div>
						<select id='selectProtocol' name='selectProtocol' style='width: 180px'>
						
						</select>
					<input type='submit' name='restAPIPerProtocolButton' id='restAPIPerProtocolButton' class='button' value='Submit!'>
					</form>
					<div id="contentPerProtocolRESTAPIdiv">
						
				    </div>
				</li>
			 </ul>
	
			 <ul id="showMACsRESTAPI" class="hide">
				<li>
					
					<form id='perMacForm' name='perMacForm' action='#'>
						<div id="showPerMACRESTAPIdiv">
						
						</div>
						<select id='selectMacAddr' name='selectMacAddr' style='width: 180px'>
						
						</select>
					<input type='submit' name='restAPIPerMACButton' id='restAPIPerMACButton' class='button' value='Submit!'>
					</form>
					<div id="contentPerMACRESTAPIdiv">
						
				    </div>
				</li>
			 </ul>
			 
			 <ul id="showIPsRESTAPI" class="hide">
				<li>
					
					<form id='perIPForm' name='perIPForm' action='#'>
						<div id="showPerIPRESTAPIdiv">
						
						</div>
						<select id='selectIPAddr' name='selectIPAddr' style='width: 180px'>
						
						</select>
					<input type='submit' name='restAPIPerIPButton' id='restAPIPerIPButton' class='button' value='Submit!'>
					</form>
					<div id="contentPerIPRESTAPIdiv">
						
				    </div>
				</li>
			 </ul>
			 
			<ul id="showFlowStatsRESTAPI" class="hide">
				<li>
					
					<form id='flowStatsForm' name='flowStatsForm' action='#'>
						<div id="showFlowStatsRESTAPIdiv">
						
						</div>
						<select id='selectFlowStatsSwitchID' name='selectFlowStatsSwitchID' style='width: 180px'>
						
						</select>
					<input type='submit' name='restAPIFlowStatsButton' id='restAPIFlowStatsButton' class='button' value='Submit!'>
					</form>
					<div id="contentFlowStatsRESTAPIdiv">
						
				    </div>
				</li>
			 </ul>
			 
			
			 
	    </div> <!-- END List Wrap -->
	
	 </div> <!-- END Organic Tabs -->
	 
	 
	 
</body>
</html>