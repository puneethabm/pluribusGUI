$(document).ready(function(){

	var switchID = '';
	var name = '';
	var actions = '';
	var priority = '';
	var active = '';
	var wildcards = '';	  	 
	var ingress_port = '';
	var src_mac = '';
	var dst_mac = '';
	var vlan_id = '';
	var vlan_priority = '';
	var ether_type = '';
	var tos_bits = '';
	var protocol = '';
	var src_ip = '';
	var dst_ip = '';
	var src_port = '';
	var dst_port = '';
	
	//Actions
	var output = '';
	var enqueue = '';
	var strip_vlan = '';	  	 
	var set_vlan_id = '';
	var set_vlan_priority = '';
	var set_src_mac = '';
	var set_dst_mac = '';
	var set_tos_bits = ''; 
	var set_src_ip = '';
	var set_dst_ip = '';
	var set_src_port = '';
	var set_dst_port = '';
	
	//**************************************************************************************************//
	// 1-> Add Flows --Static Flow Pusher
	$('#showStaticFlowPusher').click(function() {
		addFlow();
	 });
	
	function addFlow(){
		/*$('#contentshowStaticFlowPusherRESTAPIdiv1').html('');
		$('#contentshowStaticFlowPusherRESTAPIdiv1').append('Static Flow Pusher--Add--1');
		*/
		//var flowTable = "<table id='flowTable' class='tableColl' border size='2' cellspacing='1'>" +
		
		/*$('#contentshowStaticFlowPusherRESTAPIdiv2').html('');
		$('#contentshowStaticFlowPusherRESTAPIdiv2').append('Static Flow Pusher--Add--2');
	*/
	}	
	
	$('#actions').click(function() {
		if($('#actions').val() == 'output'){
			$('#actionDiv1').show();
			//$('#actionDiv1').html('');
			
			$('#outputActions').html('');
			$('#outputActions').append("<option value='normal' selected='selected'>normal</option>"+
								  "<option value='flood'>flood</option>"+
								  "<option value='all'>all</option>"+
								  "<option value='controller'>controller</option>"+
								  "<option value='local'>local</option>"+
								  "<option value='ingress-port'>ingress-port</option>"+
								  "<option value='number'>number</option>");			
		}
//		/$('#actionDiv1').hide();
	 });
	
	$('#outputActions').click(function() {
		if($('#outputActions').val() == 'number'){
		
			$('#actionDiv2').append("<input type='text' id='numberInput' name='numberInput' value='' size='10' maxlength='5'>");
		}
	});
	
});