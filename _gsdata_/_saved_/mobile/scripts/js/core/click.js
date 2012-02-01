

var buttonElements = new Array();
var buttonElementsStatus = new Array();
var buttonElementsTarget = new Array();


function initializeButtonClicks()
{
	document.getElementById("appWrapper").addEventListener('touchstart', appWrapperTouchStart, false);
	document.getElementById("appWrapper").addEventListener('touchmove', appWrapperTouchMove, false);
	document.getElementById("appWrapper").addEventListener('touchend', appWrapperTouchEnd, false);
	document.getElementById("appWrapper").addEventListener('touchcancel', appWrapperTouchCancel, false);

	return;
}

function addButtonElement(divID, targetFunction)
{
	if (buttonElements.contains(divID) >= 0){
		return;
	}
	
	buttonElements[buttonElements.length] = divID +'__eventListener';
	buttonElementsStatus[buttonElementsStatus.length] = "none";
	buttonElementsTarget[buttonElementsTarget.length] = targetFunction;
	
	getElementObject(divID).innerHTML =	getElementObject(divID).innerHTML + '<div id="' + divID + '__eventListener"' + ' class="eventListener"></div>';
	
	if (chromeOS){
		document.getElementById(divID + "__eventListener").addEventListener('click', targetFunction, false);
	}
	
	//else{	}
	
}


function addTapElement(divID, targetFunction)
{
	if(chromeOS){
		document.getElementById(divID).addEventListener('click', targetFunction, false);
	}
	else{
		document.getElementById(divID).addEventListener('touchstart', targetFunction, false);
	}

	getElementStyleObject(divID).cursor = "pointer";
	
	return;
}



function appWrapperTouchStart(event)
{
	var divID = event.target.id;
	var divPos = buttonElements.contains(divID);
	
	//alert(divPos)
	if (divPos < 0){
		return;
	}
	
	buttonElementsStatus[divPos] = "touched";
	
	
	
}



function appWrapperTouchMove()
{
	
}


function appWrapperTouchEnd(event)
{
	var divID = event.target.id;
	var divPos = buttonElements.contains(divID);
	
	
	if (divPos >= 0){
		if (buttonElementsStatus[divPos] === "touched"){			
			buttonElementsTarget[divPos]();
		}
	}
	
	for (var j = 0; j < buttonElementsStatus.length; j++){
		buttonElementsStatus[j] = "none";
	}
	
}


function appWrapperTouchCancel()
{
	
}