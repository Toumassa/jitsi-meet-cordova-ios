
var rtcReady = false;
var domReady = false;
var onDOMReady = null;
var onRTCReady = null;
var isiOSRTC = false;


function injectPage(theURL)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			var loadedPage = null;
			loadedPage = xmlhttp.responseText;
			
			document.write(loadedPage);
		 	document.close();
		}
	}
	xmlhttp.open("GET", theURL, false);
	xmlhttp.send();
}

window.addEventListener("load", function () {
	  console.log("run.js >>> DOM loaded");
      domReady = true;
      if(onDOMReady != null)
      {
           onDOMReady();                 
      }
		if (navigator.userAgent.match(/iOSRTC/)){
		 isiOSRTC = true;	
		 document.addEventListener("deviceready", function () {

			console.log("run.js >>> deviceready event");
			
			  rtcReady = true;
			  if(onRTCReady != null)
			  {
				   onRTCReady();                 
			  }
		 });  // End of ondeviceready.*/
		}		
});  // End of onload.


