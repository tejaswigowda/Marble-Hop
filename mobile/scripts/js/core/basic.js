window.onresize = function() {
	if(chromeOS){
		setZoomWeb();	
	}
	
	return;
}

function setZoomiOS()
{	
	if(iPad){
		zoomPercent = 100;
	}
	else{
		zoomPercent = 45;
		document.getElementsByTagName('html')[0].style.zoom = zoomPercent.toString() + "%";
		document.getElementById('appWrapper').style.left = "-35px";
		//document.getElementById('appWrapper').style.top = "40px";
		contentPos = getOffset(getElementObject('content'));
	}

	return;
}

function setZoomWeb()
{
	screenHeight = window.innerHeight;
	screenWidth = window.innerWidth;
	var realHeight;
	var realWidth;
	
	if (screenHeight < 1.34 * screenWidth){
		realHeight = screenHeight-0;
		realWidth = .75 * realHeight;
	}
	else{
		realWidth = screenWidth-0;
		realHeight = 1.333333 * realWidth;
	}

	var zoom = realHeight/1024;
	
	zoomPercent = zoom * 100;
	document.getElementsByTagName('html')[0].style.zoom = zoomPercent.toString() + "%";
	
	contentPos = getOffset(getElementObject('content'));
	
	return;
}


function setZoom()
{
	/*alert(OSX);
	alert(touchSupport);
	alert(chromeOS);
	alert(iOS);
	alert(iPad);
	alert(android);*/
	
	if(iOS){	
		setZoomiOS();
		return;
	}
	
	setZoomWeb();

}


function hasClass(ele, name) 
{
	var el = getElementObject(ele);
   	return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
}


function addClass(ele, name)
{
	var el = getElementObject(ele);
   	if (!hasClass(ele, name)) { el.className += (el.className ? ' ' : '') +name; }
}

function removeClass(ele,cls) {
	var el = getElementObject(ele);
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		el.className=el.className.replace(reg,' ');
	}
}