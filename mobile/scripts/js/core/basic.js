window.onresize = function() {
	setZoom();	
	return;
}

function setZoom()
{
	screenHeight = window.innerHeight;
	screenWidth = window.innerWidth;
	var realHeight;
	var realWidth;
	
	if (screenHeight < 1.34 * screenWidth){
		realHeight = screenHeight-10;
		realWidth = .75 * realHeight;
	}
	else{
		realWidth = screenWidth-10;
		realHeight = 1.33333 * realWidth;
	}

	var zoom = realHeight/1024;
	
	zoomPercent = zoom * 100;
	document.getElementsByTagName('html')[0].style.zoom = zoomPercent.toString() + "%";
	
	contentPos = getOffset(getElementObject('content'));
	
	return;
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