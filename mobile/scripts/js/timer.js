var running = false
var endTime = null
var timerID = null
function startTimer() {
    running = true
    now = new Date()
    now = now.getTime()
    // change last multiple for the number of minutes
    endTime = now + (1000 * 60 * 3)
    showCountDown()
}
function showCountDown() {
    var now = new Date()
    now = now.getTime()
    if (endTime - now <= 0) {
        stopTimer();
        puzzleFailed_1();

    } else {
        var delta = new Date(endTime - now)
        var theMin = delta.getMinutes()
        var theSec = delta.getSeconds()
        var theTime = theMin
        theTime += ((theSec < 10) ? ":0" : ":") + theSec
        getElementObject("timerText").innerHTML = theTime
        
		if (theMin == 0){
			getElementStyleObject("timerText").color = "rgba(240,76,62,1)";  // red
        }
		else{
			getElementStyleObject("timerText").color = 'rgba(185,225,213,1)'; // light blue
		}
		
		if (running) {
            timerID = setTimeout("showCountDown()",1000)
        }
    }
}
function stopTimer() {
    clearTimeout(timerID)
    running = false
        getElementObject("timerText").innerHTML = "3:00";
		getElementStyleObject("timerText").color = 'rgba(185,225,213,1)'; // light blue
}