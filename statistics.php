<?php
$controllerIP = $_GET["controllerIP"];
$switchID = $_GET["switchID"];
$stats = $_GET["stats"];

/*
$controllerIP = '192.168.1.235';
$switchID = '1';
$stats = 'flow';*/



$flowStatsrestAPI = "http://$controllerIP:8080/wm/core/switch/$switchID/$stats/json";
$flowStatsrestAPIPage = file_get_contents($flowStatsrestAPI);
echo $flowStatsrestAPIPage;
?>
