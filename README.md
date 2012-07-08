pluribusGUI
===========

GUI
index.php is the initial file

To add new menu:
Ex: Show Statistics
Inside 
"<ul class="nav">
</ul>"

Place the following
"
<li class="nav-7">
  <a id="showStatistics" href="# showStatisticsRESTAPI">Show <br/> Statictics </a>
</li>
"

Inside       
"<div class="list-wrap">
</div>"

Place the following
"<ul id=" showStatisticsRESTAPI" class="hide">    
   <li>Add the functionality here</li>
</ul>
"
************************************************************************

js/parserAllFlows.js

The following REST API’s are parsed in this file
http://<$controllerIP>:8080/wm/flowtracker/json
http://<$controllerIP>:8080/wm/switchtracker/json
http://<$controllerIP>:8080/wm/protocoltracker/json
http://<$controllerIP>:8080/wm/mactracker/json
http://<$controllerIP>:8080/wm/iptracker/json

************************************************************************
js/parserStats.js

The following REST API’s are parsed in this file
http://<$controllerIP>:8080/ wm/core/switch/<$switchID>/<$statsType>/json 
************************************************************************

