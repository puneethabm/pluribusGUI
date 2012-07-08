<?php
$controllerIP=$_GET["controllerIP"];
$tracker = $_GET["tracker"];

#$controllerIP = '192.168.1.235';
$restAPI = "http://$controllerIP:8080/wm/$tracker/json";
#echo $restAPI;
$homepage = file_get_contents($restAPI);

#$homepage = file_get_contents('http://'+$controllerIP+':8080/wm/flowtracker/json');
echo $homepage;
?>
