var elementStyleObjects = new Array();
var elements = new Array();
var elementObjects = new Array();


Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return i;
        }
    }
    return -1;
}


function getElementStyleObject(elID)
{
    var elePtr = elements.contains(elID);
    if (elePtr >= 0){
        return elementStyleObjects[elePtr];
    }
    
    var retVal = document.getElementById(elID);
    elementObjects.push(retVal);
    
	if (retVal == null){
		return null;
	}
	
	retVal = retVal.style;
    elementStyleObjects.push(retVal);
    
    return retVal;
}


function getElementObject(elID)
{
    var elePtr = elements.contains(elID);
    if (elePtr >= 0){
        return elementObjects[elePtr];
    }
    
    var retVal1 = document.getElementById(elID);
    elementObjects.push(retVal1);
    var retVal = retVal1.style;
    elementStyleObjects.push(retVal);
    
    return retVal1;
}