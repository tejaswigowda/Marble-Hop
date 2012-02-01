var solnSliderValue = 0;
var contentPos;

if (!OSX){
//	google.load('payments', '1.0', {    'packages': ['production_config'] });
}

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

String.prototype.splitCSV = function(sep) {
	for (var foo = this.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
		if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
						   if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
			foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
		} else if (x) {
			foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
		} else foo = foo.shift().split(sep).concat(foo);
    } else foo[x].replace(/""/g, '"');
} return foo;
};


function getstringafterus(str)
{
    for (i=0; i< str.length; i++){
        if (str[i] === "_"){
            return str.substring(i+1);
        }
    }
    return "";
}


function getstringbeforeus(str)
{
    var retS = "";
    for (i=0; i< str.length; i++){
        if (str[i] === "_"){
            break;
        }
        retS = retS + str[i];
    }
    
    return retS;
}

var emailSubject = "Marble Hop by Foxy Ninja Studios";
var emailText = "I have been playing Marble Hop and I wanted to tell you about it. Learn more at foxyninjastudios.com/marblehop";
var socialText = "I have been playing Marble Hop and I wanted to tell you about it. Learn more at foxyninjastudios.com/marblehop";

var SLTransitionTime = 0;
var SLTransitionTimeMS = 0;
var boardListiScroll;
var puzzleListiScroll;
var bgMusicObj  = new Media('Sounds/bg.mp3');

if (chromeOS){
    bgMusicObj  = new Audio('Sounds/bg.mp3');
    bgMusicObj.addEventListener('ended', function(){
    this.currentTime = 0;
    }, false);
}

var currentSelectedSavedBoard = "1";

var currentSelectedPuzzleCat = "info";
var currentSelectedPuzzleBoard = "none";

var lastSolvedPuzzleCat = "1";
var lastSolvedPuzzleBoard = "0";

var emptyGame = ['13', '14', '15', '23', '24', '25', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '45', '46', '47', '51', '52', '53', '54', '55', '56', '57', '63', '64', '65', '73', '74', '75'];
var fullGame = ['44'];


localStorage.setItem("SB_1" + "_GAME", fullGame);
localStorage.setItem("SB_1" + "_DATE", "Wed Dec 15 2010");
localStorage.setItem("SB_1" + "_MARB", "1");
localStorage.setItem("SB_1" + "_NOTE", "Full Board!");

localStorage.setItem("SB_2" + "_GAME", emptyGame);
localStorage.setItem("SB_2" + "_DATE", "Wed Dec 15 2010");
localStorage.setItem("SB_2" + "_MARB", "32");
localStorage.setItem("SB_2" + "_NOTE", "Empty Board!");


var noOfTouchesOnScreen;

var puzzleStart;
var puzzleEnd;

document.addEventListener('touchstart', function(event) {
						  noOfTouchesOnScreen = event.touches.length;
						  }, false);

var backgroundImageOpacity;
var backgroundOpacityBarLength;
var isFullScreen = false;
var fullScreenScaleRatio = 1.75;

var targetPegState;
var hintsState;
var animationState = "false";

var newGameType = "fullBoard";

var theBoardSlots = ['13', '14', '15', '23', '24', '25', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '47', '51', '52', '53', '54', '55', '56', '57', '63', '64', '65', '73', '74', '75'];

var standardGameTemplete = ["44"];

/* the currentgame is a list of empty slots*/

var currentGame = [];
var currentPreviewGame = [];

var marbleHandles = ['Blue', 'Red', 'Green', 'Gold', 'Silver', 'Sepia'];
var noofBgs = 21;

var RGBAColor = [];

RGBAColor['Black'] = "rgba(19,19,19,.9)";
RGBAColor['Green'] = "rgba(55,205,88,.9)";
RGBAColor['Purple'] = "rgba(155,116,255,.9)";
RGBAColor['Blue'] = "rgba(105,113,246,.9)";
RGBAColor['Red'] = "rgba(212,42,0,.9)";
RGBAColor['Orange'] = "rgba(235,115,40,.9)";


var validMovesDict = [];

var startNewGameAfterSave = false;


function getRoman(dec){
	if (dec == 0){
		return "0";
	}
	if (dec == 1){
		return "i";
	}
	if (dec == 2){
		return "ii";
	}
	if (dec == 3){
		return "iii";
	}
	if (dec == 4){
		return "iv";
	}
	if (dec == 5){
		return "v";
	}
	if (dec == 6){
		return "vi";
	}
	if (dec == 7){
		return "vii";
	}
	if (dec == 8){
		return "viii";
	}
	if (dec == 9){
		return "ix";
	}

	return "error";
	
}

function makeArrayCopy(orgArray)
{
    var retArr = [];
    for (i = 0; i < orgArray.length; i++){
        retArr[i] = orgArray[i];
    }
    return retArr;
}


function getAllValidMoves(sourceCoods)
{
    var returnArr = [];
    
    var sourceX = parseInt(sourceCoods[0]);
    var sourceY = parseInt(sourceCoods[1]);
    var destX;
    var destY;
    
    destX = sourceX;
    destY = sourceY + 2;
    if (isMoveValid(sourceX, sourceY, destX, destY)){
        returnArr[returnArr.length] = destX.toString() + destY.toString();
    }
	
    destX = sourceX;
    destY = sourceY - 2;
    if (isMoveValid(sourceX, sourceY, destX, destY)){
        returnArr[returnArr.length] = destX.toString() + destY.toString();
    }
    
    destX = sourceX + 2;
    destY = sourceY;
    if (isMoveValid(sourceX, sourceY, destX, destY)){
        returnArr[returnArr.length] = destX.toString() + destY.toString();
    }
    
    destX = sourceX - 2;
    destY = sourceY;
    if (isMoveValid(sourceX, sourceY, destX, destY)){
        returnArr[returnArr.length] = destX.toString() + destY.toString();
    }
    
    return returnArr;
}

function playSound(theSound)
{
    if (isSoundOn === "false"){
        return;
    }
    
    new Media('mobile/Sounds/'+ theSound + '.wav').play();
    
    if (chromeOS){
        new Audio('Sounds/'+ theSound + '.mp3').play();
    }
    
    return;
}


function hintsHide()
{
    hintsState = "hide";
    localStorage.removeItem("hintsState");
    localStorage.setItem("hintsState", "hide");
 
    document.getElementById("hintsareOnButtonN").style.display = "none";
    document.getElementById("hintsareOffButtonN").style.display = "block";
    
    $(".boardTableTD").removeClass("nextMovePegClass");

	setInfoText("hints hidden");

    //flashMessage("Hints Hidden", 5000);
        
    return;
}


function hintsShow()
{
    hintsState = "show";
    localStorage.removeItem("hintsState");
    localStorage.setItem("hintsState", "show");
 
    document.getElementById("hintsareOnButtonN").style.display = "block";
    document.getElementById("hintsareOffButtonN").style.display = "none";
    
    updateHints();
    
	setInfoText("hints visible");

    //flashMessage("Hints Visible", 5000);
    
    return;
}




function toggleHowToStartUp()
{
    if (howToStartupState === "show"){
        howtoHide();
    }
    else{
        howtoShow();
    }
}



function howtoHide()
{
    howToStartupState = "hide";
    localStorage.removeItem("howToStartupState");
    localStorage.setItem("howToStartupState", "hide");
 
    document.getElementById("howtoStartupOnButton").style.display = "none";
    document.getElementById("howtoStartupOffButton").style.display = "block";
    
    //flashMessage("", 5000);
        
    return;
}


function howtoShow()
{
    howToStartupState = "show";
    localStorage.removeItem("howToStartupState");
    localStorage.setItem("howToStartupState", "show");
 
    document.getElementById("howtoStartupOnButton").style.display = "block";
    document.getElementById("howtoStartupOffButton").style.display = "none";
    
    //flashMessage("", 5000);
    
    return;
}








function toggleHints()
{
	playSound("tink");
	
    if (hintsState === "show"){
        hintsHide();
    }
    else{
        hintsShow();
    }
}



function targetPegHide()
{
    targetPegState = "hide";
    localStorage.removeItem("targetPegState");
    localStorage.setItem("targetPegState", "hide");
 
    document.getElementById("tpOnButtonN").style.display = "none";
    document.getElementById("tpOffButtonN").style.display = "block";
    
	setInfoText("target pegs hidden");

    //flashMessage("Target Pegs Hidden", 5000);
        
    return;
}


function targetPegShow()
{
    targetPegState = "show";
    localStorage.removeItem("targetPegState");
    localStorage.setItem("targetPegState", "show");
 
    document.getElementById("tpOnButtonN").style.display = "block";
    document.getElementById("tpOffButtonN").style.display = "none";
    
	setInfoText("target pegs visible");

    //flashMessage("Target Pegs Visible", 5000);
    
    return;
}

function toggleTargetPeg()
{
	playSound("tink");
	
    if (targetPegState === "show"){
        targetPegHide();
    }
    else{
        targetPegShow();
    }
}


function turnSoundOff()
{
    isSoundOn = "false";
    localStorage.removeItem("isSoundOn");
    localStorage.setItem("isSoundOn", "false");
 
    document.getElementById("soundisOnButtonN").style.display = "none";
    document.getElementById("soundisOffButtonN").style.display = "block";
    
	setInfoText("sound effects off");

    //flashMessage("Sound Effects Off", 2000);
        
    return;
}


function turnSoundOn()
{
    isSoundOn = "true";
    localStorage.removeItem("isSoundOn");
    localStorage.setItem("isSoundOn", "true");
 
    document.getElementById("soundisOnButtonN").style.display = "block";
    document.getElementById("soundisOffButtonN").style.display = "none";
    
	setInfoText("sound effects on");

    //flashMessage("Sound Effects On", 2000);
    
	playSound('viewChange');
    
	return;
}

function toggleSound()
{
	playSound("tink");
	
    if (isSoundOn === "false"){
        turnSoundOn();
    }
    else{
        turnSoundOff();
    }
}




function turnMusicOff()
{
    isMusicOn = "false";
    localStorage.removeItem("isMusicOn");
    localStorage.setItem("isMusicOn", "false");
 
    document.getElementById("musicisOnButtonN").style.display = "none";
    document.getElementById("musicisOffButtonN").style.display = "block";
    if (bgMusicObj){
        bgMusicObj.pause();
    }
    
	setInfoText("music is off");

    //flashMessage("Music is Off", 2000);
    return;
}


function turnMusicOn()
{
    isMusicOn = "true";
    localStorage.removeItem("isMusicOn");
    localStorage.setItem("isMusicOn", "true");
 
    document.getElementById("musicisOnButtonN").style.display = "block";
    document.getElementById("musicisOffButtonN").style.display = "none";
    if (bgMusicObj){
        bgMusicObj.play({numberOfLoops:10000});
    }
    
	setInfoText("music is on");

    //flashMessage("Music is On", 2000);

    return;
}

function toggleMusic()
{
	playSound("tink");
	
    if (isMusicOn === "false"){
        turnMusicOn();
    }
    else{
        turnMusicOff();
    }
}



function decreaseOpacity()
{
    if(backgroundImageOpacity >= 7){
        return;
    }
    
    backgroundImageOpacity = backgroundImageOpacity + 1;
    document.getElementById("mainAreaBackCover").style.opacity = "0." + backgroundImageOpacity.toString();
    backgroundOpacityBarLength = backgroundOpacityBarLength - 10;
	
    animateOpacityBar();
    
    return;
}

function increaseOpacity()
{
    if(backgroundImageOpacity <= 0){
        return;
    }
    
    backgroundImageOpacity = backgroundImageOpacity - 1;
    backgroundOpacityBarLength = backgroundOpacityBarLength + 10;
    document.getElementById("mainAreaBackCover").style.opacity = "0." + backgroundImageOpacity.toString();
    
        
    animateOpacityBar();
    return;
}

function animateOpacityBar()
{
	document.getElementById("opacityBar").style.width = backgroundOpacityBarLength.toString() + "px";
    
    localStorage.removeItem("backgroundImageOpacity");
    localStorage.setItem("backgroundImageOpacity", backgroundImageOpacity);

    localStorage.removeItem("backgroundOpacityBarLength");
    localStorage.setItem("backgroundOpacityBarLength", backgroundOpacityBarLength);
    
	return;
}

function auxMarbleWasClicked(e)
{
	playSound('tink');
    var coodsInt = parseInt(e.target.id.substring(10));
	var coods = coodsInt.toString();

	if (isAMemberof(coods, currentPreviewGame)){
        if (currentPreviewGame.length > 1){
            addMarbleToPreviewBoard(coods);
        }
        else{
            flashMessage("Board is full...", 1500);
        }
    }
    
    
    else{
        if (currentPreviewGame.length < 32){
            removeMarbleFromPreviewBoard(coods);
        }
        else{
            flashMessage("Board is empty...", 1500);
        }
    }
    
    return;
}


function debug()
{
    //alert("here");
}

function startNewFullBoardGame()
{ 
    $("#puzzleTools").fadeOut('fast');
    exercizeMode = false;
    flashLoadingBox("Setting up New Board", 800);
    
    newGameType = "fullBoard";
    
    Stack.empty();
    setupNewGame(standardGameTemplete);
	
    hideFullBoardOptionsScreen()

    if(hintsState === "show"){
        updateHints();
    }
    
    return;
}


function startNewFullBoardGame_Alt()
{    
    $("#puzzleTools").fadeOut('fast');
    exercizeMode = false;
    
    flashLoadingBox("Setting up New Board", 800);
    
    newGameType = "fullBoard";
    
    Stack.empty();
    setupNewGame(standardGameTemplete);
	
    hideEndGameScreen();

    if(hintsState === "show"){
        updateHints();
    }
    
    return;
}


function newGameButtonWasClicked()
{
	
    $("#miniPreviewBoard").fadeOut('fast');
    
    newGameType = "fullBoard";
    $("#newFullBoardGameTitle").fadeIn('fast');
    $("#loadSavedBoardGameButton").fadeIn('fast');
    $("#createNewBoardGameButton").fadeIn('fast');
    $("#newFullBoardGameDescDiv").fadeIn('fast');
    
    $("#newFullBoardGameButton").fadeOut('fast');
    $("#loadSavedBoardGameTitle").fadeOut('fast');
    $("#createNewBoardGameTitle").fadeOut('fast');
    $("#loadSavedBoardGameDescDiv").fadeOut('fast');
    $("#customBoardGameDescDiv").fadeOut('fast');
	
	
    $("#miniPreviewBoard").fadeIn('fast');
    
    return;
} 

function LoadSavedGameButtonWasClicked()
{
	
    $("#miniPreviewBoard").fadeOut('fast');
    
    newGameType = "savedBoard";
    $("#loadSavedBoardGameTitle").fadeIn('fast');
    $("#newFullBoardGameButton").fadeIn('fast');
    $("#createNewBoardGameButton").fadeIn('fast');
    $("#loadSavedBoardGameDescDiv").fadeIn('fast');
    
    $("#loadSavedBoardGameButton").fadeOut('fast');
    $("#newFullBoardGameTitle").fadeOut('fast');
    $("#createNewBoardGameTitle").fadeOut('fast');
    $("#customBoardGameDescDiv").fadeOut('fast');
    $("#newFullBoardGameDescDiv").fadeOut('fast');
	
	
    $("#miniPreviewBoard").fadeIn('fast');
    
    return;
} 

function createNewBoardGameButtonWasClicked()
{
	
    $("#miniPreviewBoard").fadeOut('fast');
    
    newGameType = "customBoard";
    $("#createNewBoardGameTitle").fadeIn('fast');
    $("#newFullBoardGameButton").fadeIn('fast');
    $("#loadSavedBoardGameButton").fadeIn('fast');
    $("#customBoardGameDescDiv").fadeIn('fast');
    
    $("#createNewBoardGameButton").fadeOut('fast');
    $("#newFullBoardGameTitle").fadeOut('fast');
    $("#loadSavedBoardGameTitle").fadeOut('fast');
    $("#loadSavedBoardGameDescDiv").fadeOut('fast');
    $("#newFullBoardGameDescDiv").fadeOut('fast');
	
	
    $("#miniPreviewBoard").fadeIn('fast');
    
    return;
} 




function flashMessage(theMessage, flashTime){
    messageText.textContent = theMessage;
    showMessageTextDiv();
    setTimeout('hideMessageTextDiv()', flashTime);
    return;
}

function changeMarbleColor()
{
	var cssColor;
    theColor = marbleColor;
    var marbleRegFile = "marble" + theColor;
    var marbleSelFile = "marble" + theColor + "selected";
    var temp = "url(Images/" + marbleRegFile + ".png)";
    var temp1 = "url(Images/" + marbleSelFile + ".png)";    
    
    localStorage.removeItem("marbleColor");
    localStorage.setItem("marbleColor", marbleColor);
    
    $(".aMarble").css("background-image", temp);
    $(".theMovingMarble").css("background-image", temp1);
	
	
	//alert(theColor);
	
	if (theColor === "Gold"){
		cssColor = "rgba(255,223,0"
	}
	
	if (theColor === "Silver"){
		cssColor = "rgba(185,225,213"
	}
    
	if (theColor === "Sepia"){
		cssColor = "rgba(249,160,27"
	}

	if (theColor === "Blue"){
		cssColor = "rgba(0,98,158"
	}
	
	if (theColor === "Red"){
		cssColor = "rgba(240,76,62"
	}
	
	if (theColor === "Green"){
		cssColor = "rgba(190,215,48"
	}
	
	cssColor = cssColor + ",1)";
	
	getElementStyleObject("colorsWrapper").borderColor = cssColor;
	getElementStyleObject("backgroundWrapper").borderColor = cssColor;
	getElementStyleObject("soundSettingsWrapper").borderColor = cssColor;
	getElementStyleObject("gameSettingsWrapper").borderColor = cssColor;


	getElementStyleObject("puzzleLibraryBodyWrapper").borderColor = cssColor;
	getElementStyleObject("puzzlesWrapperN").borderColor = cssColor;
	
	return;
}


function changeBackground()
{
    localStorage.removeItem("bgImageID");
    localStorage.setItem("bgImageID", bgImageID);

	var cmp = parseInt(bgImageID);
	for(var i=1; i <= noofBgs; i++){
		if (i<cmp){
			goLeft("bg" + i.toString());
		}
		if (i == cmp){
			goCenter("bg" + i.toString());
		}
		if (i>cmp){
			goRight("bg" + i.toString());
		}
	}
	
	
    return;
}



function removeElementFromPreviewBoardSet(aMember)
{
    var pos = 0;
    for (i = 0; i < currentPreviewGame.length; i++){
        if(currentPreviewGame[i] === aMember){
            pos = i;
            break;
        }
    }
    
    currentPreviewGame.remove(pos);
    return;
} 

function removeElementFromBoardSet(aMember)
{
    var pos = 0;
    for (i = 0; i < currentGame.length; i++){
        if(currentGame[i] === aMember){
            pos = i;
            break;
        }
    }
    
    currentGame.remove(pos);

    
    return;
}    

function removeMarbleFromBoard(coods)
{
	
    document.getElementById("marble" + coods).style.opacity = "0.01"; 
    document.getElementById("movingMarble" + coods).style.opacity = "0.01"; 
	
    currentGame[currentGame.length] = coods;
    
    updateValidMovesDict();
    return;
}




function removeMarbleFromBoard_x(coods)
{	
    document.getElementById("marble" + coods).style.opacity = "0.01"; 
    document.getElementById("movingMarble" + coods).style.opacity = "0.01";
        
    return;
}

function removeMarbleFromBoard_xAux(coods){

}

function removeMarbleFromBoardAux(coods)
{
	
    //$("#movingMarble" + coods).show();
	
    return;
}


function removeMarbleFromBoard_Middle(coods)
{
    var outofBoardAnimationTime = 300;
    $("#marble" + coods).hide(outofBoardAnimationTime);
	
    setTimeout('removeMarbleFromBoard_MiddleAux(' + coods + ')', outofBoardAnimationTime);
    
    currentGame[currentGame.length] = coods;
    return;
}


function removeMarbleFromBoard_MiddleAux(coods)
{
    $("#marble" + coods).show();
    document.getElementById("marble" + coods).style.opacity = "0.01"; 
    document.getElementById("movingMarble" + coods).style.opacity = "0.01";  
	
    return;
}



function removeMarbleFromPreviewBoard(coods)
{
	
    document.getElementById("Aux_marble" + coods).style.opacity = "0.01"; 
    document.getElementById("Aux_movingMarble" + coods).style.opacity = "0.01"; 
	
    currentPreviewGame[currentPreviewGame.length] = coods;
    return;
}



function removeMarbleFromEndBoard(coods)
{
    document.getElementById("End_marble" + coods).style.opacity = "0.01"; 
    document.getElementById("End_movingMarble" + coods).style.opacity = "0.01"; 
    return;
}


function addMarbleToPreviewBoard(coods)
{
    document.getElementById("Aux_marble" + coods).style.opacity = "1";
    removeElementFromPreviewBoardSet(coods);
    return;
}

function addMarbleToBoard(coods)
{
    document.getElementById("marble" + coods).style.opacity = "1";
    removeElementFromBoardSet(coods);
    return;
}


function updateNextMovePegs()
{
	
	
}


function marbleWasTouched(e)
{
	//alert("here");
	
    if (noOfTouchesOnScreen > 1){
        return;
    }
    
    var theMarbleSelected = e.target.id;
    currentlyDraggedMarble = theMarbleSelected;
    var theMarble = "marble" + theMarbleSelected.substring(12);
    var theMarbleWrapper = "marbleWrapper" + theMarbleSelected.substring(12);
    if (isNOTaMemberof(theMarbleSelected.substring(12), currentGame)){
        playSound('lift');
        document.getElementById(theMarbleSelected).style.opacity = '1';
        document.getElementById(theMarble).style.opacity = '0';
		
        if(targetPegState === "show"){
            var validPegs = validMovesDict[theMarbleSelected.substring(12)];
            for (var i = 0; i < validPegs.length ; i++){
                $("#peg" + validPegs[i]).addClass("validPegClass");
            }
        }
        
    }
    
    return;
}


function putTheMarbleBackCOS(coods)
{

    var animationDuration = 250;
    var theMarbleSelected =   "movingMarble" + coods;
    var theMarble = "marble" +  + coods;
    
	
    if (isAMemberof(coods, currentGame)){
        $("#" + theMarbleSelected).animate({left: 0, top: 0}, 0);
        document.getElementById("marble" + coods).style.opacity = "0.01";
        document.getElementById("movingMarble" + coods).style.opacity = "0.01";    }
    else{
        $("#" + theMarbleSelected).animate({left: [0, 'easeInCirc'], top: [0, 'easeOutCirc']}, animationDuration);

		var temp = getOffset(getElementObject("marble" + coods));
		var l = parseInt(temp.left * 100/zoomPercent);
		var t = parseInt(temp.top * 100/zoomPercent);

        $("movingMarblezIndex").animate({left: [l, 'easeInCirc'], top: [t, 'easeOutCirc']}, animationDuration);


        setTimeout('putTheMarbleBack_aux("' + coods + '")', animationDuration + 50);
    }    
	
    return;
}


function putTheMarbleBack(coods)
{
    
    var animationDuration = 250;
    var theMarbleSelected =   "movingMarble" + coods;
    var theMarble = "marble" +  + coods;
    
	
    if (isAMemberof(coods, currentGame)){
        $("#" + theMarbleSelected).animate({left: 0, top: 0}, 0);
        document.getElementById("marble" + coods).style.opacity = "0.01";
        document.getElementById("movingMarble" + coods).style.opacity = "0.01";    }
    else{
        $("#" + theMarbleSelected).animate({left: [0, 'easeInCirc'], top: [0, 'easeOutCirc']}, animationDuration);
        setTimeout('putTheMarbleBack_aux("' + coods + '")', animationDuration + 50);
    }    
	
    return;
}

function marbleWasReleased(e)
{
    $(".boardTableTD").removeClass("validPegClass");
    var coods = e.target.id.substring(12);
    if (isNOTaMemberof(coods, currentGame)){
        setTimeout("playSound('fallback')", 250);
    }
    putTheMarbleBack(coods);
    return;
}





function putTheMarbleBack_aux(coods)
{
    getElementStyleObject("marble" + coods).opacity = "1";
    getElementStyleObject("movingMarble" + coods).opacity = "0.01";

    getElementStyleObject("movingMarblezIndex").opacity = "0";
    getElementStyleObject("movingMarblezIndex").top = "-100px";
    getElementStyleObject("movingMarblezIndex").left = "-100px";
}

function isNOTaMemberof(aMember, theSet){
    for (i=0; i< theSet.length; i++){
        if(theSet[i] === aMember){
            return false;
        }
    }
    return true;
}


function isAMemberof(aMember, theSet){
    for (i=0; i< theSet.length; i++){
        if(theSet[i] === aMember){
            return true;
        }
    }
    return false;
}


function isMoveValid(sX, sY, dX, dY)
{
    var sourcePegSt = sX.toString() + sY.toString();
    var dest = dX.toString() + dY.toString();
	
    if (isNOTaMemberof(sourcePegSt, theBoardSlots)){
        return false;
    }
	
    if (isNOTaMemberof(dest, theBoardSlots)){
        return false;
    }
    
    if (isAMemberof(sourcePegSt, currentGame)){
        return false;
    }
    
    if (isNOTaMemberof(dest, currentGame)){
        return false;
    }
    
    if ( (Math.abs(sX - dX) == 2 && sY == dY) || (Math.abs(sY - dY) == 2 && sX == dX) ){
        if ( isNOTaMemberof(getAvgOfCoods(sX, sY, dX, dY), currentGame) ){
            return true;
        }
        else{
            return false;
        }
    }
    
    else{
        return false;
    }
}

function getAvgOfCoods(sX, sY, dX, dY)
{
    var retS = "";
    if (sX == dX){
        retS = sX.toString();
        if (dY > sY){
            retS = retS + (sY+1).toString();
        }
        else{
            retS = retS + (dY+1).toString();
        }
    }
    
    else{
        if (dX > sX){
            retS = (sX+1).toString();
        }
        else{
            retS = (dX+1).toString();
        }        
        retS = retS + sY.toString();
    }
    
    return retS;
}

function isOdd(n){
    if (n%2 == 0){
        return false;
    }
    else{
        return true;
    }
}


function isEven(n){
    if (n%2 == 1){
        return false;
    }
    else{
        return true;
    }
}


function isRight(n){
    if (n > 3){
        return true;
    }
    else{
        return false;
    }
}


function isTop(n){
    if (n > 3){
        return false;
    }
    else{
        return true;
    }
}

function animateAwayMarbleCOS(coods)
{
    var x = parseInt(coods[0]);
    var y = parseInt(coods[1]);
    
	var temp = getOffset(getElementObject("marble" + coods));
	var l = parseInt(temp.left);
	var t = parseInt(temp.top);
	
 	console.log(l +', '+ t);


//	getElementStyleObject('movingMarblezIndexA').top = t;
//	getElementStyleObject('movingMarblezIndexA').left = l;
	

    //$("#movingMarblezIndexA").animate({left: [l, 'easeInCirc'], top: [t, 'easeOutCirc']}, animationDuration);
	//var pos = 

    if(isTop(x) && isRight(y)){ 
        $("#movingMarblezIndexA").stop().animate({top: t.toString() + "px", left: l.toString() + "px", opacity: "1"},0).animate({top: ['-350px', 'easeOutCirc'], left: ['350px','easeInCirc']}, 700).animate({top: "-100px", left: "-100px", opacity: "0"},0);
        return;
    }
	
    if(isTop(x) && !isRight(y)){ 
        $("#movingMarblezIndexA").stop().animate({top: t.toString() + "px", left: l.toString() + "px", opacity: "1"},0).animate({top: ['-350px', 'easeOutCirc'], left: ['-350px','easeInCirc']}, 700).animate({top: "-100px", left: "-100px", opacity: "0"},0);
        return;
    }
    
    if(!isTop(x) && isRight(y)){ 
        $("#movingMarblezIndexA").stop().animate({top: t.toString() + "px", left: l.toString() + "px", opacity: "1"},0).animate({top: ['350px', 'easeOutCirc'], left: ['350px','easeInCirc']}, 700).animate({top: "-100px", left: "-100px", opacity: "0"},0);
        return;
    }
    
    if(!isTop(x) && !isRight(y)){ 
        $("#movingMarblezIndexA").stop().animate({top: t.toString() + "px", left: l.toString() + "px", opacity: "1"},0).animate({top: ['350px', 'easeOutCirc'], left: ['-350px','easeInCirc']}, 700).animate({top: "-100px", left: "-100px", opacity: "0"},0);
        return;
    }
    
}

function animateAwayMarble(coods)
{
    var x = parseInt(coods[0]);
    var y = parseInt(coods[1]);
    
    if(isTop(x) && isRight(y)){ 
        $("#movingMarble" + coods).animate({top: "0px", left: "0px"},0).animate({top: ['-350px', 'easeOutCirc'], left: ['350px','easeInCirc']}, 500).animate({top: "0px", left: "0px"},0);
        return;
    }
	
    if(isTop(x) && !isRight(y)){ 
        $("#movingMarble" + coods).animate({top: "0px", left: "0px"},0).animate({top: ['-350px', 'easeOutCirc'], left: ['-350px','easeInCirc']}, 500).animate({top: "0px", left: "0px"},0);
        return;
    }
    
    if(!isTop(x) && isRight(y)){ 
        $("#movingMarble" + coods).animate({top: "0px", left: "0px"},0).animate({top: ['350px', 'easeOutCirc'], left: ['350px','easeInCirc']}, 500).animate({top: "0px", left: "0px"},0);
        return;
    }
    
    if(!isTop(x) && !isRight(y)){ 
        $("#movingMarble" + coods).animate({top: "0px", left: "0px"},0).animate({top: ['350px', 'easeOutCirc'], left: ['-350px','easeInCirc']}, 500).animate({top: "0px", left: "0px"},0);
        return;
    }
    
}

function updateValidMovesDict()
{
    for(var a = 0; a < theBoardSlots.length; a++){
        validMovesDict[theBoardSlots[a]] = getAllValidMoves(theBoardSlots[a]);
    }
    
    return;
}

function updateHints()
{

    $(".boardTableTD").removeClass("nextMovePegClass");
    
    for(var a = 0; a < theBoardSlots.length; a++){

        if(hintsState === "show"){
            if (validMovesDict[theBoardSlots[a]].length > 0){
                    $("#peg" + theBoardSlots[a]).addClass("nextMovePegClass");
            }
        }
    }
    return;
}

function isGameOver()
{
    for(var a = 0; a < theBoardSlots.length; a++){
        if ((validMovesDict[theBoardSlots[a]]).length > 0){
            return false;
        }
    }
    return true;
}


function marbleWasDropped(e, destPeg)
{
    var sourcePeg = e.target.id;
	
    var sourceCoods = sourcePeg.substring(12);
    var destCoods = destPeg.substring(3);
    sourceX = parseInt(sourceCoods[0]);
    sourceY = parseInt(sourceCoods[1]);
    destX = parseInt(destCoods[0]);
    destY = parseInt(destCoods[1]);
    if (isMoveValid(sourceX, sourceY, destX, destY)){
        
        $("#" + destPeg).removeClass("validPegClass");
        playSound('drop');
		
		
        addMarbleToBoard(destCoods);
        removeMarbleFromBoard(sourceCoods);
        var midMarbleCoods = getAvgOfCoods(sourceX, sourceY, destX, destY);
        setTimeout('setInterimOpacity("'+ midMarbleCoods +'")', 250);

        setTimeout('animateAwayMarble("'+ midMarbleCoods +'")', 400);
        
        currentGame[currentGame.length] = midMarbleCoods;
        updateValidMovesDict();
        updateHints();
        

        setTimeout('removeMarbleFromBoard_x("'+ midMarbleCoods +'"); ', 700);
        setTimeout('document.getElementById("marble'+ destCoods +'").style.opacity = "1"; ', 300);
		

        if (isGameOver()){
            setTimeout("goToEndGameScreen();", 200);
        }

        Stack.push(makeArrayCopy(currentGame));
		
    }
    else{
        document.getElementById("movingMarble" + sourceCoods).style.opacity = '.01';
        document.getElementById("marble" + sourceCoods).style.opacity = '1';
    }
    
    putTheMarbleBack(sourceCoods);
	
    return;
}




function setInterimOpacity(midMarbleCoods)
{
    document.getElementById("marble" + midMarbleCoods).style.opacity = "0.01"; 
    document.getElementById("movingMarble" + midMarbleCoods).style.opacity = "1"; 
}

function setupNewGame(currentGameTemplate)
{
    oneMoreGamePlayed();
    manageTrial();
    
    currentGame = [];
    var coods;
    for (var j = 0; j< theBoardSlots.length; j++){
        coods = theBoardSlots[j];
        document.getElementById("marble" + coods).style.opacity = "1";
        document.getElementById("movingMarble" + coods).style.opacity = "0.01";
    }
    for(var i = 0; i < currentGameTemplate.length; i++){
		removeMarbleFromBoard(currentGameTemplate[i]);
    }
    
    Stack.push(currentGameTemplate);

	updateValidMovesDict();
    
    if(hintsState === "show"){
        updateHints();
    }

    return;
}


function undoMove()
{
    playSound("tink");
	
    if (Stack.size() <= 1){
        flashMessage("No Moves to Undo", 2000);
        return;
    }
    
    flashMessage("Move Undone", 1000);
    
    Stack.pop();
    var currentGameTemplete = Stack.pop();
    
    setupNewGame(currentGameTemplete);
    updateHints();
    return;
}

function undoFinalMove()
{
	playSound("tink");
	
    hideEndGameScreen();
    flashMessage("Last Move Undone", 1000);

    Stack.pop();
    var currentGameTemplete = Stack.pop();
    
    setupNewGame(currentGameTemplete);
    updateHints();
    return;
}

function startNewBoard()
{
	hideEndGameScreen();
	flashMessage("New Board Ready", 1000);
    
    setupNewGame(standardGameTemplete);
    updateHints();
	playButtonWasClicked();
}

function resetBoard()
{
	playSound("tink");
	
    $("#startGameOverButton").addClass('headerButtonActive');
    setTimeout("$('#startGameOverButton').removeClass('headerButtonActive');", 500);

    oneMoreGamePlayed();
    manageTrial();
    flashMessage("Board Reset", 700);
    var currentGameTemplete;
    
    while (Stack.size() > 0){
        currentGameTemplete = Stack.pop();
    }
    
    setupNewGame(currentGameTemplete);
    updateHints();
    return;
}


function setupFullBoardPreviewGame()
{
    setupNewPreviewGame(fullGame);
}

function setupEmptyBoardPreviewGame()
{
    setupNewPreviewGame(emptyGame);
}

function setupNewPreviewGame(currentGameTemplate)
{
	playSound("tink");
	
    currentPreviewGame = [];
    var coods;
    for (var j = 0; j< theBoardSlots.length; j++){
        coods = theBoardSlots[j];
        document.getElementById("Aux_marble" + coods).style.opacity = "1";
        document.getElementById("Aux_movingMarble" + coods).style.opacity = "0.01";
    }
    for(var i = 0; i < currentGameTemplate.length; i++){
        removeMarbleFromPreviewBoard(currentGameTemplate[i]);
    }
    return;
}


function setupEndGameBoard()
{
    var coods;
    for (var j = 0; j< theBoardSlots.length; j++){
        coods = theBoardSlots[j];
        document.getElementById("End_marble" + coods).style.opacity = "1";
        document.getElementById("End_movingMarble" + coods).style.opacity = "0.01";
    }
    for(var i = 0; i < currentGame.length; i++){
        removeMarbleFromEndBoard(currentGame[i]);
    }
    return;
}



function marbleIsOver(e, destPeg){
    var sourcePeg = e.target.id;
    var sourceCoods = sourcePeg.substring(12);
    var destCoods = destPeg.substring(3);
    sourceX = parseInt(sourceCoods[0]);
    sourceY = parseInt(sourceCoods[1]);
    destX = parseInt(destCoods[0]);
    destY = parseInt(destCoods[1]);
    
    if (isMoveValid(sourceX, sourceY, destX, destY)){
        $("#" + destPeg).addClass("validPegClass");
    }
}



function marbleIsOut(e, destPeg){
    var sourcePeg = e.target.id;
    var sourceCoods = sourcePeg.substring(12);
    var destCoods = destPeg.substring(3);
    sourceX = parseInt(sourceCoods[0]);
    sourceY = parseInt(sourceCoods[1]);
    destX = parseInt(destCoods[0]);
    destY = parseInt(destCoods[1]);
    
    if (isMoveValid(sourceX, sourceY, destX, destY)){
        $("#" + destPeg).removeClass("validPegClass");
    }
}


function startUpAnime()
{
	
	
    setTimeout('$("#foxy").animate({"opacity":"1", "z-index": "10003"}, 500); $("#ninja").animate({"opacity":".2", "z-index": "10002"}, 500); $("#studios").animate({"opacity":".2", "z-index": "10001"}, 500); ', 0);   
	
	setTimeout('$("#foxy").animate({"opacity":".2", "z-index": "10001"}, 500); $("#ninja").animate({"opacity":"1", "z-index": "10003"}, 500); $("#studios").animate({"opacity":".2", "z-index": "10002"}, 500); ', 1000); 
	
	setTimeout('$("#foxy").animate({"opacity":".2", "z-index": "10001"}, 500); $("#ninja").animate({"opacity":".2", "z-index": "10002"}, 500); $("#studios").animate({"opacity":"1", "z-index": "10003"}, 500); ', 2000); 
	
	setTimeout('$("#foxy").animate({"opacity":"1", "z-index": "10002"}, 500); $("#ninja").animate({"opacity":"1", "z-index": "10001"}, 500); $("#studios").animate({"opacity":"1", "z-index": "10003"}, 500); ', 3000); 
	
	//setTimeout('$("#foxy").animate({"opacity":"1", "z-index": "10002"}, 1000); $("#ninja").animate({"opacity":"1", "z-index": "10001"}, 1000); $("#studios").animate({"opacity":"1", "z-index": "10003"}, 1000); ', 3500); 
	
    return;
}

function setAnimation(flag){
	var theDivs = ["about", "endGame", "solnScreen", "endGame", "puzzleResults", "mainMenuScreenWrapper", "puzzleScreen", "settingScreen", "newGameScreen", "howToPlay", "theBoard", "loadGameScreen", "headerDiv", "helpSlide1", "helpSlide2", "helpSlide3", "helpSlide4", "helpSlide5", "helpSlide6", "bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8", "bg9", "bg10", "bg11", "bg12", "bg13", "bg14", "bg15", "bg16", "bg17", "bg18", "bg19", "bg20", "bg21", "pzcat0", "pzcat1", "pzcat2", "pzcat3", "pzcat4", "pzcat5", "pzcat6"];
	for (var i=0; i < theDivs.length; i++){
		if (flag){
			getElementStyleObject(theDivs[i]).webkitTransitionProperty = "all";

		}
		else{
			getElementStyleObject(theDivs[i]).webkitTransitionProperty = "none";
		}
	}
	if (flag){
		document.getElementById("anareOnButtonN").style.display = "block";
        document.getElementById("anareOffButtonN").style.display = "none";
	}
	else{
		document.getElementById("anareOnButtonN").style.display = "none";
    	document.getElementById("anareOffButtonN").style.display = "block";
	}
}

function initializeWebkitDragDrop(){
    for(var i = 0; i < 33; i++){
        new webkit_draggable("movingMarble" + theBoardSlots[i], {revert : false, onStart : function() {marbleWasTouched(event);}, onEnd : function() {marbleWasReleased(event);} });
       //new webkit_draggable("movingMarble" + theBoardSlots[i]);
    
        addTapElement("Aux_movingMarble" + theBoardSlots[i], auxMarbleWasClicked);
    }

    webkit_drop.add('peg13', {onDrop : function(){ marbleWasDropped(event, 'peg13')}});
    webkit_drop.add('peg14', {onDrop : function(){ marbleWasDropped(event, 'peg14')}});
    webkit_drop.add('peg15', {onDrop : function(){ marbleWasDropped(event, 'peg15')}});
    
    webkit_drop.add('peg23', {onDrop : function(){ marbleWasDropped(event, 'peg23')}});
    webkit_drop.add('peg24', {onDrop : function(){ marbleWasDropped(event, 'peg24')}});
    webkit_drop.add('peg25', {onDrop : function(){ marbleWasDropped(event, 'peg25')}});

    webkit_drop.add('peg31', {onDrop : function(){ marbleWasDropped(event, 'peg31')}});
    webkit_drop.add('peg32', {onDrop : function(){ marbleWasDropped(event, 'peg32')}});
    webkit_drop.add('peg33', {onDrop : function(){ marbleWasDropped(event, 'peg33')}});
    webkit_drop.add('peg33', {onDrop : function(){ marbleWasDropped(event, 'peg33')}});
    webkit_drop.add('peg34', {onDrop : function(){ marbleWasDropped(event, 'peg34')}});
    webkit_drop.add('peg35', {onDrop : function(){ marbleWasDropped(event, 'peg35')}});
    webkit_drop.add('peg34', {onDrop : function(){ marbleWasDropped(event, 'peg34')}});
    webkit_drop.add('peg36', {onDrop : function(){ marbleWasDropped(event, 'peg36')}});
    webkit_drop.add('peg37', {onDrop : function(){ marbleWasDropped(event, 'peg37')}});    

    webkit_drop.add('peg41', {onDrop : function(){ marbleWasDropped(event, 'peg41')}});
    webkit_drop.add('peg42', {onDrop : function(){ marbleWasDropped(event, 'peg42')}});
    webkit_drop.add('peg43', {onDrop : function(){ marbleWasDropped(event, 'peg43')}});
    webkit_drop.add('peg44', {onDrop : function(){ marbleWasDropped(event, 'peg44')}});
    webkit_drop.add('peg43', {onDrop : function(){ marbleWasDropped(event, 'peg43')}});
    webkit_drop.add('peg44', {onDrop : function(){ marbleWasDropped(event, 'peg44')}});
    webkit_drop.add('peg45', {onDrop : function(){ marbleWasDropped(event, 'peg45')}});
    webkit_drop.add('peg46', {onDrop : function(){ marbleWasDropped(event, 'peg46')}});
    webkit_drop.add('peg47', {onDrop : function(){ marbleWasDropped(event, 'peg47')}});

    webkit_drop.add('peg51', {onDrop : function(){ marbleWasDropped(event, 'peg51')}});
    webkit_drop.add('peg52', {onDrop : function(){ marbleWasDropped(event, 'peg52')}});
    webkit_drop.add('peg53', {onDrop : function(){ marbleWasDropped(event, 'peg53')}});
    webkit_drop.add('peg54', {onDrop : function(){ marbleWasDropped(event, 'peg54')}});
    webkit_drop.add('peg53', {onDrop : function(){ marbleWasDropped(event, 'peg53')}});
    webkit_drop.add('peg54', {onDrop : function(){ marbleWasDropped(event, 'peg54')}});
    webkit_drop.add('peg55', {onDrop : function(){ marbleWasDropped(event, 'peg55')}});
    webkit_drop.add('peg56', {onDrop : function(){ marbleWasDropped(event, 'peg56')}});
    webkit_drop.add('peg57', {onDrop : function(){ marbleWasDropped(event, 'peg57')}});

    webkit_drop.add('peg63', {onDrop : function(){ marbleWasDropped(event, 'peg63')}});
    webkit_drop.add('peg64', {onDrop : function(){ marbleWasDropped(event, 'peg64')}});
    webkit_drop.add('peg65', {onDrop : function(){ marbleWasDropped(event, 'peg65')}});

    webkit_drop.add('peg73', {onDrop : function(){ marbleWasDropped(event, 'peg73')}});
    webkit_drop.add('peg74', {onDrop : function(){ marbleWasDropped(event, 'peg74')}});
    webkit_drop.add('peg75', {onDrop : function(){ marbleWasDropped(event, 'peg75')}});
		
	return;
}

function startUp()
{   
    setTimeout('document.getElementById("startUpScreen").style.display = "none";', 1800);
    setTimeout('document.getElementById("startUpScreen").style.opacity = "0";', 1200);

	if (!lite){
		getElementStyleObject("goToUpgrade").display = "none";
	}
	
	/*
	if(touchSupport){  
    	boardListiScroll = new iScroll(document.getElementById('boardLibraryBody')); 
    	//puzzleListiScroll = new iScroll(document.getElementById('puzzleLibraryBody')); 
	}*/
	
    changeBackground();
    changeMarbleColor();

	contentPos = getOffset(getElementObject('content'));

    document.getElementById("opacityBar").style.width = backgroundOpacityBarLength.toString() + "px";

	flashLoadingBox("", 100);
	
    document.getElementById("theBoard").style.display = "block";

    if (isMusicOn === "true"){
        bgMusicObj.play({numberOfLoops:10000});
    }
    	
	if(touchSupport){ initializeWebkitDragDrop();}    
	
    if(chromeOS){

    
		$("#movingMarble13").draggable({   start: function() {marbleWasTouchedCOS("13");}, drag: function() {marbleIsDraggedCOS(event, "13");}, stop: function() {				marbleWasReleasedCOS('13');}   });


		$("#movingMarble14").draggable({   start: function() {marbleWasTouchedCOS("14");}, drag: function() {marbleIsDraggedCOS(event, "14");}, stop: function() {				marbleWasReleasedCOS('14');}   });


		$("#movingMarble15").draggable({   start: function() {marbleWasTouchedCOS("15");},drag: function() {marbleIsDraggedCOS(event, "15");}, stop: function() {				marbleWasReleasedCOS('15');}   });



		$("#movingMarble23").draggable({   start: function() {marbleWasTouchedCOS("23");},  drag: function() {marbleIsDraggedCOS(event, "23");}, stop: function() {				marbleWasReleasedCOS('23');}   });

		$("#movingMarble24").draggable({   start: function() {marbleWasTouchedCOS("24");},  drag: function() {marbleIsDraggedCOS(event, "24");}, stop: function() {				marbleWasReleasedCOS('24');}   });

		$("#movingMarble25").draggable({   start: function() {marbleWasTouchedCOS("25");},  drag: function() {marbleIsDraggedCOS(event, "25");}, stop: function() {				marbleWasReleasedCOS('25');}   });



		$("#movingMarble31").draggable({   start: function() {marbleWasTouchedCOS("31");},  drag: function() {marbleIsDraggedCOS(event, "31");}, stop: function() {				marbleWasReleasedCOS('31');}   });

		$("#movingMarble32").draggable({   start: function() {marbleWasTouchedCOS("32");}, drag: function() {marbleIsDraggedCOS(event, "32");}, stop: function() {				marbleWasReleasedCOS('32');}   });

		$("#movingMarble33").draggable({   start: function() {marbleWasTouchedCOS("33");},   drag: function() {marbleIsDraggedCOS(event, "33");}, stop: function() {				marbleWasReleasedCOS('33');}   });

		$("#movingMarble34").draggable({   start: function() {marbleWasTouchedCOS("34");},  drag: function() {marbleIsDraggedCOS(event, "34");}, stop: function() {				marbleWasReleasedCOS('34');}   });

		$("#movingMarble35").draggable({   start: function() {marbleWasTouchedCOS("35");},  drag: function() {marbleIsDraggedCOS(event, "35");}, stop: function() {				marbleWasReleasedCOS('35');}   });

		$("#movingMarble36").draggable({   start: function() {marbleWasTouchedCOS("36");},  drag: function() {marbleIsDraggedCOS(event, "36");}, stop: function() {				marbleWasReleasedCOS('36');}   });

		$("#movingMarble37").draggable({   start: function() {marbleWasTouchedCOS("37");},   drag: function() {marbleIsDraggedCOS(event, "37");}, stop: function() {				marbleWasReleasedCOS('37');}   });



		$("#movingMarble41").draggable({   start: function() {marbleWasTouchedCOS("41");}, drag: function() {marbleIsDraggedCOS(event, "41");}, stop: function() {				marbleWasReleasedCOS('41');}   });

		$("#movingMarble42").draggable({   start: function() {marbleWasTouchedCOS("42");},  drag: function() {marbleIsDraggedCOS(event, "42");}, stop: function() {				marbleWasReleasedCOS('42');}   });

		$("#movingMarble43").draggable({   start: function() {marbleWasTouchedCOS("43");},  drag: function() {marbleIsDraggedCOS(event, "43");}, stop: function() {				marbleWasReleasedCOS('43');}   });

		$("#movingMarble44").draggable({   start: function() {marbleWasTouchedCOS("44");},  drag: function() {marbleIsDraggedCOS(event, "44");}, stop: function() {				marbleWasReleasedCOS('44');}   });

		$("#movingMarble45").draggable({   start: function() {marbleWasTouchedCOS("45");}, drag: function() {marbleIsDraggedCOS(event, "45");}, stop: function() {				marbleWasReleasedCOS('45');}   });

		$("#movingMarble46").draggable({   start: function() {marbleWasTouchedCOS("46");},    drag: function() {marbleIsDraggedCOS(event, "46");}, stop: function() {				marbleWasReleasedCOS('46');}   });

		$("#movingMarble47").draggable({   start: function() {marbleWasTouchedCOS("47");},  drag: function() {marbleIsDraggedCOS(event, "47");}, stop: function() {				marbleWasReleasedCOS('47');}   });


		$("#movingMarble51").draggable({   start: function() {marbleWasTouchedCOS("51");},   drag: function() {marbleIsDraggedCOS(event, "51");}, stop: function() {				marbleWasReleasedCOS('51');}   });

		$("#movingMarble52").draggable({   start: function() {marbleWasTouchedCOS("52");},   drag: function() {marbleIsDraggedCOS(event, "52");}, stop: function() {				marbleWasReleasedCOS('52');}   });

		$("#movingMarble53").draggable({   start: function() {marbleWasTouchedCOS("53");},  drag: function() {marbleIsDraggedCOS(event, "53");}, stop: function() {				marbleWasReleasedCOS('53');}   });

		$("#movingMarble54").draggable({   start: function() {marbleWasTouchedCOS("54");},   drag: function() {marbleIsDraggedCOS(event, "54");}, stop: function() {				marbleWasReleasedCOS('54');}   });

		$("#movingMarble55").draggable({   start: function() {marbleWasTouchedCOS("55");}, drag: function() {marbleIsDraggedCOS(event, "55");}, stop: function() {				marbleWasReleasedCOS('55');}   });

		$("#movingMarble56").draggable({   start: function() {marbleWasTouchedCOS("56");}, drag: function() {marbleIsDraggedCOS(event, "56");}, stop: function() {				marbleWasReleasedCOS('56');}   });

		$("#movingMarble57").draggable({  start: function() {marbleWasTouchedCOS("57");}, drag: function() {marbleIsDraggedCOS(event, "57");}, stop: function() {				marbleWasReleasedCOS('57');}   });



		$("#movingMarble63").draggable({  start: function() {marbleWasTouchedCOS("63");}, drag: function() {marbleIsDraggedCOS(event, "63");},stop: function() {				marbleWasReleasedCOS('63');}   });

		$("#movingMarble64").draggable({   start: function() {marbleWasTouchedCOS("64");}, drag: function() {marbleIsDraggedCOS(event, "64");},stop: function() {				marbleWasReleasedCOS('64');}   });

		$("#movingMarble65").draggable({   start: function() {marbleWasTouchedCOS("65");},   drag: function() {marbleIsDraggedCOS(event, "65");}, stop: function() {				marbleWasReleasedCOS('65');}   });



		$("#movingMarble73").draggable({   start: function() {marbleWasTouchedCOS("73");}, drag: function() {marbleIsDraggedCOS(event, "73");}, stop: function() {				marbleWasReleasedCOS('73');}   });

		$("#movingMarble74").draggable({   start: function() {marbleWasTouchedCOS("74");},  drag: function() {marbleIsDraggedCOS(event, "74");}, stop: function() {				marbleWasReleasedCOS('74');}   });

		$("#movingMarble75").draggable({   start: function() {marbleWasTouchedCOS("75");},  drag: function() {marbleIsDraggedCOS(event, "75");}, stop: function() {				marbleWasReleasedCOS('75');}   });





		


        for(var i = 0; i < 33; i++){
		//	addButtonElement("Aux_movingMarble" + theBoardSlots[i], auxMarbleWasClicked);

				$("#peg" + theBoardSlots[i]).droppable({
					drop: function(event) {marbleWasDroppedCOS(event)}
				});

        }

	//	$("#solnSliderKnobMoving").draggable({   start: function() {},  drag: function() {solnSliderDrag();}, stop: function() {solnSliderStop();}   });

	
		

	}
	
    
    Stack.empty();
    setupNewGame(standardGameTemplete);    
	
	
	
    
    populateSavedBoardList();
    populatePuzzleBoardList();

    $(".saved_board_wrapper_list").removeClass("saved_board_wrapper_list_selected");
	
    
    updateValidMovesDict();
    
    if(hintsState === "show"){
        updateHints();
    }


    
    $("#peg33").addClass("validPegClass");
    setTimeout('$("#peg33").removeClass("validPegClass");', 600);

    //setTimeout('document.getElementById("startUpScreen").style.display = "none";', 1000);

    //var cb = ChildBrowser.install();


	if (chromeOS){


		$('.mainMenuButton').mouseover(function(){
			$(this).css('color','rgba(240,76,62,1)'); //  ! red	        
	    });

	    $('.mainMenuButton').mouseout(function(){
		    $(this).css('color','rgba(0,98,158,1)'); // ! dark blue
	    });
	
	
		$('.mainBottomButton').mouseover(function(){
		    $(this).css('border-color','rgba(249,160,27,1)');  // ! orange
	    });

	    $('.mainBottomButton').mouseout(function(){
		    $(this).css('border-color','transparent');  
	    });

	
		$('.helpButton').mouseover(function(){
			$(this).css('color','rgba(240,76,62,1)'); //  ! red	        
	    });

	    $('.helpButton').mouseout(function(){
		    $(this).css('color','rgba(0,98,158,1)'); // ! dark blue
	    });


		$('.puzzle_wrapper_list').mouseover(function(){
			$(this).css('border-color','rgba(190,215,48,1)'); //  ! green        
	    });

	    $('.puzzle_wrapper_list').mouseout(function(){
			$(this).css('border-color','transparent'); //  ! red	        
	    });
	
	
		$('.saved_board_wrapper_list').mouseover(function(){
			$(this).css('border-color','rgba(190,215,48,1)'); //  ! green        
	    });

	    $('.saved_board_wrapper_list').mouseout(function(){
			$(this).css('border-color','transparent'); //  ! red	        
	    });
	
	
	
	$('.headerButton').mouseover(function(){
		$(this).css('color','rgba(185,225,213,1)'); //  ! light blue
		$(this).css('background-image',"url('../Images/buttonbgDB.png')"); 
    });

    $('.headerButton').mouseout(function(){
	    $(this).css('color','rgba(0,98,158,1)'); // ! dark blue
		$(this).css('background-image',"url('../Images/buttonbgLB.png')");
    });
	
	}
	

	for(var i=0; i <= 6; i++){
		goRight("pzcat" + i.toString());
	}
	
	var helpPage = 1;

	for(var i=1; i <= 6; i++){
		if (i<helpPage){
			goLeft("helpSlide" + i.toString());
		}
		if (i == helpPage){
			goCenter("helpSlide" + i.toString());
		}
		if (i>helpPage){
			goRight("helpSlide" + i.toString());
		}
		getElementStyleObject("helpSlide" + i.toString()).backgroundImage = "url(Images/helpPage" + i.toString() + ".png)";
		
	}
	
	
	menuButtonWasClicked();
	
	//document.getElementById("appWrapper").addEventListener('mouseup', setZoom, false);
	setZoom();
    manageTrial();
	


}

var currentlyDraggedMarble = "NONE";

function marbleWasTouchedCLICK(e)
{
    var theMarbleSelected = e.target.id;
    marbleWasReleasedCLICK(currentlyDraggedMarble);

    if ( isAMemberof(theMarbleSelected.substring(12), currentGame)){
        if (currentlyDraggedMarble != "NONE"){
            marbleWasDroppedCLICK(currentlyDraggedMarble.substring(12), theMarbleSelected.substring(12));
            return;
        }
        else{
            currentlyDraggedMarble = "NONE";
            return;
        }
    }


    if (currentlyDraggedMarble == theMarbleSelected){
        currentlyDraggedMarble = "NONE";
        return;
    }

    currentlyDraggedMarble = theMarbleSelected;
    var theMarble = "marble" + theMarbleSelected.substring(12);
    var theMarbleWrapper = "marbleWrapper" + theMarbleSelected.substring(12);
    if (isNOTaMemberof(theMarbleSelected.substring(12), currentGame)){
        playSound('lift');
        document.getElementById(theMarbleSelected).style.opacity = '1';
        $("#" + theMarbleSelected).addClass("theSelectedMarble");
        document.getElementById(theMarble).style.opacity = '0';

        if(targetPegState === "show"){
            var validPegs = validMovesDict[theMarbleSelected.substring(12)];
            for (var i = 0; i < validPegs.length ; i++){
                $("#peg" + validPegs[i]).addClass("validPegClass");
            }
        }

    }
    return;
}

function marbleWasReleasedCLICK(draggedMarble)
{
    $("#" + draggedMarble).removeClass("theSelectedMarble");
    $(".boardTableTD").removeClass("validPegClass");
    var coods = draggedMarble.substring(12);
    putTheMarbleBackCLICK(coods);

    return;
}

function putTheMarbleBackCLICK(coods)
{

    var animationDuration = 250;
    var theMarbleSelected =   "movingMarble" + coods;
    var theMarble = "marble" +  + coods;


    if (isAMemberof(coods, currentGame)){
        $("#" + theMarbleSelected).animate({left: 0, top: 0}, 0);
        document.getElementById("marble" + coods).style.opacity = "0.01";
        document.getElementById("movingMarble" + coods).style.opacity = "0.01";    }
    else{
        $("#" + theMarbleSelected).animate({left: [0, 'easeInCirc'], top: [0, 'easeOutCirc']}, 0);
        setTimeout('putTheMarbleBack_auxCLICK("' + coods + '")', 50);
    } 

    return;
}

function putTheMarbleBack_auxCLICK(coods)
{
    document.getElementById("marble" + coods).style.opacity = "1";
    document.getElementById("movingMarble" + coods).style.opacity = "0.01";
}



function marbleWasDroppedCLICK(sourceCoods, destCoods)
{
    sourceX = parseInt(sourceCoods[0]);
    sourceY = parseInt(sourceCoods[1]);
    destX = parseInt(destCoods[0]);
    destY = parseInt(destCoods[1]);
    if (isMoveValid(sourceX, sourceY, destX, destY)){


        var destPeg = "peg" + destCoods;

        $("#" + destPeg).removeClass("validPegClass");
        playSound('fallback');

        document.getElementById("movingMarble" + sourceCoods).style.opacity = ".01";
        document.getElementById("marble" + sourceCoods).style.opacity = ".01";

        addMarbleToBoard(destCoods);
        removeMarbleFromBoard(sourceCoods);
        var midMarbleCoods = getAvgOfCoods(sourceX, sourceY, destX, destY);
        setTimeout('setInterimOpacity("'+ midMarbleCoods +'")', 250);

        setTimeout('animateAwayMarble("'+ midMarbleCoods +'")', 400);

        currentGame[currentGame.length] = midMarbleCoods;
        updateValidMovesDict();
        updateHints();


        setTimeout('removeMarbleFromBoard_x("'+ midMarbleCoods +'"); ', 700);
        setTimeout('document.getElementById("marble'+ destCoods +'").style.opacity = "1"; ', 300);


        if (isGameOver()){
            setTimeout("goToEndGameScreen();", 200);
        }

        Stack.push(makeArrayCopy(currentGame));

        setTimeout("marbDropAux('" + sourceCoods + "')", 200);


    }
    else{
        document.getElementById("movingMarble" + sourceCoods).style.opacity = '.01';
        document.getElementById("marble" + sourceCoods).style.opacity = '1';
    }



    currentlyDraggedMarble = "NONE";
    
    return;
}

function marbDropAux(sourceCoods){
    document.getElementById("movingMarble" + sourceCoods).style.opacity = ".01";
    document.getElementById("marble" + sourceCoods).style.opacity = ".01";
}



function playPreviewBoard()
{

	playSound("tink");

	backtoSavedBoards();
	menuButtonWasClicked();	
	
    exercizeMode = false;
    
        
	
    $(".saved_board_wrapper_list").removeClass("saved_board_wrapper_list_selected");
	
    Stack.empty();
    setupNewGame(currentPreviewGame);
    
    //saveTabButtonWasClicked();

    if(hintsState === "show"){
        updateHints();
    }

	newGameType = "";
	if(getAnimationStateBool()){
		setTimeout('flashMessage("Board Setup", 1400); playButtonWasClicked_Aux()', 700);
	}
	else{
		flashMessage("Board Setup", 1400); playButtonWasClicked_Aux();
	}
	return;
}

/*function newGameFullBoard(){
    setupNewGame(standardGameTemplete);
    backToBoard();
    return;
}*/

function loadGameButtonWasClicked()
{

    //document.getElementById("playPuzzleN").style.display = "none";   
    document.getElementById("playPreviewBoard").style.display = "block";   

    document.getElementById('mainAreaCoverAlt').style.display = "block";
    $("#loadGameButton").addClass('headerButtonActive');
    
    $("#savedGamesTabButton").addClass('tabButtonActive');
    $("#customGamesTabButton").removeClass('tabButtonActive ');
    $("#puzzleGamesTabButton").removeClass('tabButtonActive ');
	
    currentSelectedSavedBoard = "1";
	
    $("#saved_board_wrapper_list_SB_1").addClass("saved_board_wrapper_list_selected");
	
    var savedGameKey = "SB_1";
    
    var currentGameTemplate = localStorage.getItem(savedGameKey + "_GAME").splitCSV();
	
    Stack.empty();
    setupNewPreviewGame(currentGameTemplate);
	
    return;
}

function goFullScreen()
{
    isFullScreen = true;
    document.getElementById("mainAreaWrapper").style.webkitTransform = "scale(" + fullScreenScaleRatio.toString() + ")";
    ovalShape.style.borderStyle = "none";
    setTimeout("$('#regularScreen').fadeIn('slow');", 700);
    return;
}

function goRegularScreen()
{
    isFullScreen = false;
    document.getElementById("mainAreaWrapper").style.webkitTransform = "scale(1)";
    ovalShape.style.borderStyle = "groove";
    $("#regularScreen").fadeOut();
    return;
}

function editBoardButtonWasClicked()
{
	playSound("tink");

	if(lite){
		flashMessage("upgrade to use this..", 2000);
		return;
	}
		
	$("#loadSavedBoardGameWrapper").fadeOut();
	$("#createNewBoardGameWrapper").fadeIn();
	
    $("#miniPreviewBoard").animate({"opacity": "1", "left":"245px", "top":"300px"}, 400);
    return;
}

function backtoSavedBoards()
{
	playSound("tink");
	
	$("#loadSavedBoardGameWrapper").fadeIn();
	$("#createNewBoardGameWrapper").fadeOut();

    $("#miniPreviewBoard").animate({"opacity": "1", "left":"360px", "top":"40px"}, 400);
    return;
	
}
function saveTabButtonWasClicked()
{
    //document.getElementById("playPuzzleN").style.display = "none";   
    //document.getElementById("playPreviewBoard").style.display = "block";   

    $("#savedGamesTabButton").addClass('tabButtonActive');
    $("#customGamesTabButton").removeClass('tabButtonActive');
    $("#puzzleGamesTabButton").removeClass('tabButtonActive');
    document.getElementById("loadSavedBoardGameWrapper").style.display = "block";
    document.getElementById("createNewBoardGameWrapper").style.display = "none";
    document.getElementById("loadPuzzlesGameWrapper").style.display = "none";
    $("#miniPreviewBoard").animate({"opacity": "1", "left":"360px"}, "fast");

    var currentGameTemplate = localStorage.getItem("SB_" + currentSelectedSavedBoard + "_GAME").splitCSV();
    setupNewPreviewGame(currentGameTemplate);
	
    return;
}



function puzzleTabButtonWasClicked()
{
    document.getElementById("playPreviewBoard").style.display = "none";   


    $("#savedGamesTabButton").removeClass('tabButtonActive');
    $("#customGamesTabButton").removeClass('tabButtonActive');
    $("#puzzleGamesTabButton").addClass('tabButtonActive');
 
    document.getElementById("loadSavedBoardGameWrapper").style.display = "none";
    document.getElementById("loadPuzzlesGameWrapper").style.display = "block";
    document.getElementById("createNewBoardGameWrapper").style.display = "none";
    
    document.getElementById("puzzlePreviewDiv").style.display = "none"; 
    document.getElementById("puzzlesWrapper").style.display = "block";   
    document.getElementById("puzzleLibraryBodyWrapper").style.display = "block";  
    
    $("#miniPreviewBoard").animate({"opacity": "0"}, "fast");
    
    //setTimeout('document.getElementById("PuzzleStackLayout").object.setCurrentViewWithTransition("' + currentSelectedPuzzleCat + '", showPuzzlesForwardTransition, false);', 600);

    
    return;
}

function goToSettingsScreen()
{
    flashMessage("Some setting need internet connection to work.", 5000);
    document.getElementById('mainAreaCoverAlt').style.display = "block";
    $("#settingsButton").addClass('headerButtonActive');


    $("#marbleColor" + marbleColor).addClass('currentMarbleClass');
    $("#background" + bgImageID).addClass('currentBGClass');
    getElementStyleObject("marbleColor" + marbleColor).borderColor = 'rgba(240,76,62,1)';
    getElementStyleObject("background" + bgImageID).borderColor = 'rgba(240,76,62,1)';
	
    return;
}

function goToSettingsScreen_Aux()
{
    $("#marbleColor" + marbleColor).addClass('currentMarbleClass');
    $("#background" + bgImageID).addClass('currentBGClass');
    return;
}



function goToAboutScreen()
{    
	playSound("tink");

    emailText = "I have been playing Marble Hop and I wanted to tell you about it. Learn more at foxyninjastudios.com/marblehop";
    socialText = "I have been playing Marble Hop and I wanted to tell you about it. Learn more at foxyninjastudios.com/marblehop";

    goUp('about'); 
    
    return;
}

function goUp(divID)
{
	getElementStyleObject(divID).webkitTransform = "translate3d(0px,0px,0)";	
}

function goDown(divID)
{
	//console.log(divID)
	getElementStyleObject(divID).webkitTransform = "translate3d(0px,1040px,0)";	
}


function doneWithAbout()
{
	playSound("tink");
	
    goDown('about'); 

    return;
}
function goToHowToScreen()
{    
//    flashLoadingBox("Loading", 1000);
    document.getElementById('mainAreaCoverAlt').style.display = "block";
    $("#howToPlayButton").addClass('headerButtonActive');
    
    return;
}


function goToEndGameScreen()
{   	 
	playSound("tink");
    
	hideSolutionScreen();
	
    if (exercizeMode){
        goToPuzzleEndScreen()
        return;
    }

    var noofMarblesLeft = 33 - currentGame.length;

    noofMarbles.textContent = noofMarblesLeft.toString() + " marbles left";


    if (noofMarblesLeft == 1){
        noofMarbles.textContent = "1 marble left";
        document.getElementById("starsBox").style.backgroundImage = "url(../Images/stars5.png)";
        emailText = "I played Marble Hop and scored 5/5 stars! Learn more at foxyninjastudios.com/marblehop";
        socialText = "I played Marble Hop and scored 5/5 stars! Learn more at foxyninjastudios.com/marblehop";
    }
    
    if (noofMarblesLeft >= 2 && noofMarblesLeft < 4){
        document.getElementById("starsBox").style.backgroundImage = "url(../Images/stars4.png)";
        emailText = "I played Marble Hop and scored 4/5 stars! Learn more at foxyninjastudios.com/marblehop";
        socialText = "I played Marble Hop and scored 4/5 stars! Learn more at foxyninjastudios.com/marblehop";
    }

    if (noofMarblesLeft >= 4 && noofMarblesLeft < 7){
        document.getElementById("starsBox").style.backgroundImage = "url(../Images/stars3.png)";
        emailText = "I played Marble Hop and scored 3/5 stars! Learn more at foxyninjastudios.com/marblehop";
        socialText = "I played Marble Hop and scored 3/5 stars! Learn more at foxyninjastudios.com/marblehop";
    }
    
    if (noofMarblesLeft >= 7 && noofMarblesLeft < 10){
        document.getElementById("starsBox").style.backgroundImage = "url(../Images/stars2.png)";
        emailText = "I played Marble Hop and scored 2/5 stars! Learn more at foxyninjastudios.com/marblehop";
        socialText = "I played Marble Hop and scored 2/5 stars! Learn more at foxyninjastudios.com/marblehop";
    }
    
    if (noofMarblesLeft > 10 && noofMarblesLeft < 15){
        document.getElementById("starsBox").style.backgroundImage = "url(../Images/stars1.png)";
        emailText = "I played Marble Hop. Learn more at foxyninjastudios.com/marblehop";
        socialText = "I played Marble Hop. Learn more at foxyninjastudios.com/marblehop";
    }

    if (noofMarblesLeft >=15 ){
        document.getElementById("starsBox").style.backgroundImage = "url(../Images/stars0.png)";
        emailText = "I played Marble Hop. Learn more at foxyninjastudios.com/marblehop";
        socialText = "I played Marble Hop. Learn more at foxyninjastudios.com/marblehop";
    }

    
    //flashLoadingBox("Loading", 1000);
    setupEndGameBoard();
   // document.getElementById('mainAreaCoverAlt').style.display = "block";
    
	goUp("endGame");

    return;
}



function goToFullBoardOptionsScreen()
{
//    flashLoadingBox("Loading", 1000);
    document.getElementById('mainAreaCoverAlt').style.display = "block";
    $("#newGameButton").addClass('headerButtonActive');
	
    return;
}

function hideFullBoardOptionsScreen()
{

//    flashLoadingBox("Wait", 400);
    document.getElementById("mainAreaCoverAlt").style.display = "none";    
    $("#newGameButton").removeClass('headerButtonActive');
	
    return;
}


function goToSaveBoardOptionsScreen()
{
//    flashLoadingBox("Loading", 1000);

    $("#saveGameButton").addClass('headerButtonActive');
	
    document.getElementById('mainAreaCoverAlt').style.display = "block";
    
    commentTextArea.value = "";
    var noofMarblesLeft = 33 - currentGame.length;
    noOfMarblesLeftText.textContent = noofMarblesLeft.toString() + " marbles left";
    if (noofMarblesLeft == 1){
        noOfMarblesLeftText.textContent = "1 marble left";
    }
    
	
    
    savedGameNameText.textContent =  (noofSavedGames + 1).toString();
    
    setTimeout("commentTextArea.focus();", 1000);
	
    return;
}

function hideSaveBoardOptionsScreen()
{
//    flashLoadingBox("Wait", 400);
    commentTextArea.blur();
         	
    document.getElementById("mainAreaCoverAlt").style.display = "none";    
    $("#saveGameButton").removeClass('headerButtonActive');
    return;
}

function hideAboutScreen()
{
//    flashLoadingBox("Wait", 400);
         	
    document.getElementById("mainAreaCoverAlt").style.display = "none";    
    
    $("#aboutButton").removeClass('headerButtonActive');
	
	
    return;
}

function hideHowToScreen()
{
//    flashLoadingBox("Wait", 400);
         	
    document.getElementById("mainAreaCoverAlt").style.display = "none";    
    
    $("#howToPlayButton").removeClass('headerButtonActive');
	
	
    return;
}

function hideEndGameScreen()
{        	
	playSound("tink");
	goDown("endGame");
	
	menuButtonWasClicked();
	
    return;
}


function hideLoadGameScreen()
{

         	
    document.getElementById("mainAreaCoverAlt").style.display = "none";    
    
    $("#loadGameButton").removeClass('headerButtonActive');
    
	
	
    $(".saved_board_wrapper_list").removeClass("saved_board_wrapper_list_selected");
	
    currentSelectedSavedBoard = "1";

    setTimeout("saveTabButtonWasClicked();", 3000);
    
    return;
}


function hideSettingsScreen()
{	
//    flashLoadingBox("Wait", 400);

         	
    document.getElementById("mainAreaCoverAlt").style.display = "none";    
    
    $("#settingsButton").removeClass('headerButtonActive');

	
    return;
}

function flashLoadingBox(message, duration)
{
    loadingText.textContent = message;
    document.getElementById("loadingBox").style.display = "block";
    setTimeout('document.getElementById("loadingBox").style.display = "none";', duration);
    return;
}

function showMessageTextDiv()
{
    getElementStyleObject("messageBox").display = "block";
	//$("#messageBox").fadeIn('fast');
}

function hideMessageTextDiv()
{
    getElementStyleObject("messageBox").display = "none";
	//$("#messageBox").fadeOut('fast');
}


function boardWasSelectedInLibrary(event)
{	
    var targetDivID = event.target.id;
	
	var boardNoInt = parseInt(targetDivID.substring(28));
    var boardNo = boardNoInt.toString();
	    
    if (boardNo === currentSelectedSavedBoard){
        return;
    }

    if (boardNoInt < 3){
		getElementStyleObject('deleteBoard').display = "none";
	}
	else{
		getElementStyleObject('deleteBoard').display = "block";
	}
    
    $("#saved_board_wrapper_list_SB_" + currentSelectedSavedBoard).removeClass("saved_board_wrapper_list_selected");
    
    currentSelectedSavedBoard = boardNo;
    
    $("#saved_board_wrapper_list_SB_" + currentSelectedSavedBoard).addClass("saved_board_wrapper_list_selected");
    
    var savedGameKey = "SB_" + boardNo;
    
    var currentGameTemplate = localStorage.getItem(savedGameKey + "_GAME").splitCSV();
    SavedBoardDescText.textContent = localStorage.getItem(savedGameKey + "_NOTE");
	
    setupNewPreviewGame(currentGameTemplate);
    
    document.getElementById("miniPreviewBoard").style.display = "block";
}
    
function deleteSavedBoard()
{
	playSound("tink");
	
	flashMessage("board deleted...", 1500);
	
	$("#saved_board_wrapper_list_SB_" + currentSelectedSavedBoard).fadeOut('fast');
	
	var boardtoDel = currentSelectedSavedBoard;
	currentSelectedSavedBoard = 1;
	
	$("#saved_board_wrapper_list_SB_" + currentSelectedSavedBoard).addClass("saved_board_wrapper_list_selected");
    
    var savedGameKey = "SB_" + currentSelectedSavedBoard;
    
    var currentGameTemplate = localStorage.getItem(savedGameKey + "_GAME").splitCSV();
    SavedBoardDescText.textContent = localStorage.getItem(savedGameKey + "_NOTE");
	
    setupNewPreviewGame(currentGameTemplate);

	document.getElementById('boardLibraryBodyWrapper').scrollTop = 0;
	
	getElementStyleObject('deleteBoard').display = "none";

	localStorage.setItem("SB_" + boardtoDel + "_NOTE", "**DEL**");

	return;
}


function playSavedBoard()
{

	if(lite){
		tryPaidVersion();
		return;
	}
	
	menuButtonWasClicked();	
	
	var boardtoPlay = currentSelectedSavedBoard;
	
	$("#saved_board_wrapper_list_SB_" + currentSelectedSavedBoard).addClass("saved_board_wrapper_list_selected");
    
    var savedGameKey = "SB_" + currentSelectedSavedBoard;
    
    var currentGameTemplate = localStorage.getItem(savedGameKey + "_GAME").splitCSV();
	
    setupNewGame(currentGameTemplate);

	newGameType = "";
	if(getAnimationStateBool()){
		setTimeout('playButtonWasClicked_Aux()', 700);
		setTimeout('flashMessage("board setup", 1500);', 2000);
	}
	else{
		playButtonWasClicked_Aux();
		flashMessage("board setup", 1500);
	}
	
	
	return;
}



function populateSavedBoardList()
{
    for (var i=1; i<=noofSavedGames; i++) {
        addSavedBoardListItem(i);
    }

}

function addSavedBoardListItem(i){
	
    
	var savedGameKey = "SB_" + i.toString();
	
	if(localStorage.getItem(savedGameKey + "_NOTE") === "**DEL**") return;
	
	
	var newSavedBoardListItem = document.createElement("div");
	newSavedBoardListItem.id = "saved_board_wrapper_list_" + savedGameKey;
	newSavedBoardListItem.className = "saved_board_wrapper_list";
	
	newSavedBoardListItem.innerHTML =  i.toString();
	
	
	
	document.getElementById("boardLibraryBody").appendChild(newSavedBoardListItem);

	addButtonElement("saved_board_wrapper_list_" + savedGameKey, boardWasSelectedInLibrary);
		
}














function populatePuzzleBoardList()
{
    for (var i=0; i<exercisesCategories.length; i++) {
        addPuzzleBoardListItem(i);
    }

	if(touchSupport){  
    	//puzzleListiScroll.refresh();
	}
}

function addPuzzleBoardListItem(i){
	var puzzleCatKey = i.toString();
	
	var newPuzzleBoardListItem = document.createElement("div");
	newPuzzleBoardListItem.id = "puzzle_wrapper_list_" + puzzleCatKey;
	newPuzzleBoardListItem.className = "puzzle_wrapper_list";
	
	newPuzzleBoardListItem.innerHTML =  "<b>" + exercisesCategories[i] + "</b>" 
    	
	//newPuzzleBoardListItem.innerHTML = newPuzzleBoardListItem.innerHTML + "<div id='puzzle_wrapper_list_EH_" + puzzleCatKey + "' class='saved_board_wrapper_list_EH'>   </div>";
	
	document.getElementById("puzzleLibraryBody").appendChild(newPuzzleBoardListItem);
	
	addButtonElement("puzzle_wrapper_list_" + puzzleCatKey, puzzleCatWasSelectedInLibrary);
	
	//document.getElementById(newPuzzleBoardListItem.id).addEventListener('click', puzzleCatWasSelectedInLibrary, false); 
	
    populatePuzzles(i, noOfPuzzles[i]);
}



function saveTheBoard()
{
	playSound("tink");

    noofSavedGames = noofSavedGames + 1;
    localStorage.setItem("noofSavedGames", noofSavedGames.toString());
    
    var dateStamp = new Date().toDateString();
    var savedGameKey = "SB_" + noofSavedGames.toString();
    var marblesLeft = 33 - currentGame.length;
    
    localStorage.setItem(savedGameKey + "_GAME", currentGame);
    localStorage.setItem(savedGameKey + "_DATE", dateStamp);
    localStorage.setItem(savedGameKey + "_MARB", marblesLeft.toString());
    //localStorage.setItem(savedGameKey + "_NOTE", commentTextArea.value);
    localStorage.setItem(savedGameKey + "_NOTE", "");
    
    flashMessage("Board Saved!", 2000);
    
    addSavedBoardListItem(noofSavedGames);

    return;
}

function saveAndStartFullBoard()
{
    
    $("#newGameButton").removeClass('headerButtonActive');
    startNewGameAfterSave = true;
    goToSaveBoardOptionsScreen();
	
    return;
}


function fullScreenAuxBoard(){
    newGameOptionsRightDiv.style.webkitTransform = "translate(-175px, -20px) scale(2.2)";
    newGameOptionsRightDiv.style.backgroundColor = "rgba(20, 20, 20, .7)";
    
    $(".fullScreenAuxBoardButtons").fadeIn();
	
    return;
}

function exitFullScreenAuxBoard(){
    newGameOptionsRightDiv.style.webkitTransform = "translate(0px, 0px) scale(1)";
    newGameOptionsRightDiv.style.backgroundColor = "transparent";
    
    $(".fullScreenAuxBoardButtons").fadeOut();
    
    return;
}

function marbleColorWasChanged()
{
    marbleColor = document.marbleColorForm.currentColorSelect.value
    changeMarbleColor();
}

function populateBackgroundOptions()
{
    var optn;
    for (i=0; i < backgroundValues.length; i++){
        optn = document.createElement("OPTION");
        optn.text = backgroundNames[i];
        optn.value = backgroundValues[i];
        backgroundSelect.options.add(optn);
    }
}


function getBackgroundID(theValue){
    for (i = 0; i < backgroundValues.length; i++){
        if (backgroundValues[i] === theValue){
            return i;
        }
    }
}


function backgroundOpacityChanged(brightnessPrc)
{
    var opacityPrc = 100 - parseInt(brightnessPrc);
    var op = opacityPrc / 100;
    backgroundImageOpacity = parseFloat(brightnessPrc)/100;
    var temp = op.toString();
    $("#mainAreaBackCover").css("opacity", temp);
}

function flashShine(flashTime)
{
    document.getElementById("mainAreaShineDiv").style.display = "block";
    setTimeout('document.getElementById("mainAreaShineDiv").style.display = "none";', flashTime);
}

function flashCover(flashTime)
{
    document.getElementById("mainAreaCoverAlt").style.display = "block";
    setTimeout('document.getElementById("mainAreaCoverAlt").style.display = "none";', flashTime);
}

function getStringUptoUS(str)
{
	var r = "";
	for (var i=0; i < str.length; i++)
	{
		if (str[i] === "_"){
			break;
		}
		
		r = r + str[i]
	}
	
	return r;
	
}
function aPreviewMarbleWasClicked(event)
{
	if(lite){
		oneMoreGamePlayed();
		if(noofPlayedGames > 10){	
			tryPaidVersion();
			return;
		}
	}
	
    playSound("tink");
    var newMarbleColor = getStringUptoUS(event.target.id.substring(11));

    if (newMarbleColor === marbleColor){
        return;
    }
    

    $("#marbleColor" + marbleColor).removeClass('currentMarbleClass');   
    getElementStyleObject("marbleColor" + marbleColor).borderColor = 'transparent';
 
    marbleColor = newMarbleColor;
    changeMarbleColor();
    $("#marbleColor" + marbleColor).addClass('currentMarbleClass');

    getElementStyleObject("marbleColor" + marbleColor).borderColor = 'rgba(240,76,62,1)';

	return;
}

function aPreviewBGWasClicked(event)
{
	if(lite){
		oneMoreGamePlayed();
		if(noofPlayedGames > 10){	
			tryPaidVersion();
			return;
		}
	}
	
    playSound("tink");
    var newbgID = getStringUptoUS(event.target.id.substring(10));

    if (newbgID === bgImageID){
        return;
    }
    
    removeClass("background" + bgImageID,'currentBGClass');    
    getElementStyleObject("background" + bgImageID).borderColor = 'transparent';

    bgImageID = newbgID;
    changeBackground();
    addClass("background" + bgImageID,'currentBGClass');    
    getElementStyleObject("background" + bgImageID).borderColor = 'rgba(240,76,62,1)';

//    $("#background" + bgImageID).addClass('currentBGClass');
}



function emailInfo(event)
{
	playSound("tink");
	
    if (chromeOS){
        var mailto_link = 'mailto:'+'?subject='+emailSubject+'&body='+emailText;
        var win = window.open(mailto_link,'emailWindow');
        if (win && win.open &&!win.closed) win.close();
        return;
    }
    
	new EmailComposer().showEmailComposer(emailSubject, emailText);
}



function buyAdFree()
{
    if (chromeOS){
        window.open("http://foxyninjastudios.com/marblehop");
        return;
    }
    
    PhoneGap.exec("ChildBrowserCommand.showWebPage", "http://foxyninjastudios.com/marblehop/buy");
    return;
}


function fnsLink()
{
	playSound("tink");
	
    if (chromeOS){
        window.open("http://foxyninjastudios.com");
        return;
    }

    PhoneGap.exec("ChildBrowserCommand.showWebPage", "http://foxyninjastudios.com");
    return;
}


function shareOnFaceBook()
{
	playSound("tink");
	
    socialText = "http://foxyninjastudios.com/marblehop";

    if (chromeOS){
        window.open("http://www.facebook.com/sharer.php?u=" + socialText);
        return;
    }
    
    PhoneGap.exec("ChildBrowserCommand.showWebPage", "http://www.facebook.com/sharer.php?u=" + socialText);
}


function shareOnTwitter()
{
	playSound("tink");
	
    socialText = "http://foxyninjastudios.com/marblehop";
    
    if (chromeOS){
        window.open("http://twitter.com/home?status=" + socialText);
        return;
    }
    
    PhoneGap.exec("ChildBrowserCommand.showWebPage", "http://twitter.com/home?status=" + socialText);
}


function manageTrial()
{
    //if(noofPlayedGames > 25){
    //    document.getElementById("trialOverScreen").style.display = "block";
    //}
}

function oneMoreGamePlayed()
{
    noofPlayedGames = noofPlayedGames + 1;
    localStorage.setItem("noofPlayedGames", noofPlayedGames.toString());
    return;
}


function populatePuzzles(puzCat, noofPuzzles)
{
    newPuzzleWrapper = document.createElement("ul");
    newPuzzleWrapper.id = "group_wrapper_" + puzCat.toString()
    newPuzzleWrapper.className = "group_wrapper";

    document.getElementById("puzcatdiv" + puzCat.toString()).appendChild(newPuzzleWrapper)


    for (var i=1; i<=noofPuzzles; i++) {


        var newPuzzleGridItem = document.createElement("li");
        newPuzzleGridItem.id = "card_wrapper_grid_" + puzCat.toString() + "_" + i.toString();
        newPuzzleGridItem.className = "card_wrapper_grid";
        newPuzzleGridItem.innerHTML =  i.toString();
		/*getRoman(puzCat+1) + "<br>" + */ 

        document.getElementById(newPuzzleWrapper.id).appendChild(newPuzzleGridItem);
        


        if (localStorage.getItem("PUZ_PERF_" + puzCat.toString() + "_" + i.toString()) == null){
            localStorage.setItem("PUZ_PERF_" + puzCat.toString() + "_" + i.toString(), "puzzle_locked");
            $("#" + newPuzzleGridItem.id).addClass("puzzle_locked");
        }
        else{

            $("#" + newPuzzleGridItem.id).addClass(localStorage.getItem("PUZ_PERF_" + puzCat.toString() + "_" + i.toString()));        

        }
        
    
    }
    
    for (var i=1; i<=noofPuzzles; i++) {
		addTapElement("card_wrapper_grid_" + puzCat.toString() + "_" + i.toString(), puzzleWasSelected);
    }
}

function puzzleCatWasSelectedInLibrary(e)
{
	playSound('tink');
	
    var targetDivID = event.target.id;
		
	var puzNoInt = parseInt(targetDivID.substring(20));
    var puzNo = puzNoInt.toString();

    puzCat = "pzcat" + puzNo;

    if (puzCat === currentSelectedPuzzleCat){
        return;
    }

    getElementStyleObject("puzzlePreviewDiv").opacity = "0";   
    getElementStyleObject("puzInst").opacity = "1";

	if(currentSelectedPuzzleBoard != "none"){
		getElementStyleObject("card_wrapper_grid_" + currentSelectedPuzzleBoard).borderColor = "transparent";
		currentSelectedPuzzleBoard = "none";
	}
	
    
    if (currentSelectedPuzzleCat != "info"){
		$("#puzzle_wrapper_list_" + currentSelectedPuzzleCat.substring(5)).removeClass("puzzle_board_wrapper_list_selected");
		getElementStyleObject("puzzle_wrapper_list_" + currentSelectedPuzzleCat.substring(5)).color = "rgba(240,76,62,1)";
    }


	goRight(currentSelectedPuzzleCat)



    currentSelectedPuzzleCat = puzCat;
    
    $("#puzzle_wrapper_list_" + puzCat.substring(5)).addClass("puzzle_board_wrapper_list_selected");
    
	goCenter(currentSelectedPuzzleCat);
	
	getElementStyleObject("puzzle_wrapper_list_" + puzCat.substring(5)).color = "rgba(190,215,48,1)";

	getElementObject('puzzleBoardTitle').innerHTML = "level " + getRoman(parseInt(currentSelectedPuzzleCat.substring(5))+1) + " boards";
	
}


function getstbedus(st)
{
	var ret = "";
	for (var i=0; i< st.length; i++){
		ret = ret + st[i]
		if (st[i+1] === "_" && st[i+2] === "_"){
			break;
		}
	}
	
	return ret;
	
}

function puzzleWasSelected(e)
{
    if (e.target.id.length < 18){
        return;
    }
 
	playSound('tink');
	
	if(currentSelectedPuzzleBoard != "none"){
		getElementStyleObject("card_wrapper_grid_" + currentSelectedPuzzleBoard).borderColor = "transparent";
	}
	getElementStyleObject(e.target.id).borderColor = "rgba(249,160,27,1)";
	
   	puzCat = getstbedus(e.target.id.substring(18));

    setUpPuzzle(puzCat);
    
	getElementObject('puzzleBoardSel').innerHTML = getRoman(parseInt(currentSelectedPuzzleBoard)+1) + " - " + parseInt(currentSelectedPuzzleBoard.substring(2)).toString();
	
	
    return;
}

function setUpPuzzle(puzCat){
    currentSelectedPuzzleBoard = puzCat;
    
    getElementObject("endPuzzleOptionsTitleN").innerHTML =  getRoman(parseInt(currentSelectedPuzzleCat.substring(5))+1) + " - " + getstringafterus(puzCat);
    
    getElementStyleObject("puzzlePreviewDiv").opacity = "1";   
    getElementStyleObject("puzInst").opacity = "0";   
    
    var currentPuzzle = getGameMovesinStringArray(exercisesDict[puzCat + "_MOVES"]); 
    puzzleStart = currentPuzzle[0+ parseInt(exercisesDict[puzCat + "_START"])].splitCSV();
    puzzleEnd = currentPuzzle[currentPuzzle.length - 1 - parseInt(exercisesDict[puzCat + "_END"])].splitCSV();
	
    setupPuzzleEndGameBoard(puzzleEnd);
    setupPuzzleStartGameBoard(puzzleStart);
        
}


function backtoAllPuzzles()
{
	goDown("puzzleResults");

	menuButtonWasClicked();
	exercizeMode = false;
	if(getAnimationStateBool()){		
		setTimeout('puzzlesButtonWasClicked();', 700);  
	}
	else{
		puzzlesButtonWasClicked();
	}
	
    return;
}

function setupPuzzleSolnBoard(theGame)
{
    var coods;
    for (var j = 0; j< theBoardSlots.length; j++){
        coods = theBoardSlots[j];
        document.getElementById("Soln_marble" + coods).style.opacity = "1";
        document.getElementById("Soln_movingMarble" + coods).style.opacity = "0.01";
    }
    for(var i = 0; i < theGame.length; i++){
        removeMarbleFromSolnBoard(theGame[i]);
    }
    return;
}


function setupPuzzleEndGameBoard(theGame)
{
    var coods;
    for (var j = 0; j< theBoardSlots.length; j++){
        coods = theBoardSlots[j];
        document.getElementById("PuzEnd_marble" + coods).style.opacity = "1";
        document.getElementById("PuzEnd_movingMarble" + coods).style.opacity = "0.01";

        document.getElementById("PuzHint_marble" + coods).style.opacity = "1";
        document.getElementById("PuzHint_movingMarble" + coods).style.opacity = "0.01";
    }
    for(var i = 0; i < theGame.length; i++){
        removeMarbleFromPEndBoard(theGame[i]);
    }
    return;
}


function setupPuzzleStartGameBoard(theGame)
{
    var coods;
    for (var j = 0; j< theBoardSlots.length; j++){
        coods = theBoardSlots[j];
        document.getElementById("PuzStart_marble" + coods).style.opacity = "1";
        document.getElementById("PuzStart_movingMarble" + coods).style.opacity = "0.01";
    }
    for(var i = 0; i < theGame.length; i++){
        removeMarbleFromPStartBoard(theGame[i]);
    }
    return;
}


function removeMarbleFromPEndBoard(coods)
{
    document.getElementById("PuzEnd_marble" + coods).style.opacity = "0.01"; 
    document.getElementById("PuzEnd_movingMarble" + coods).style.opacity = "0.01"; 

    document.getElementById("PuzHint_marble" + coods).style.opacity = "0.01"; 
    document.getElementById("PuzHint_movingMarble" + coods).style.opacity = "0.01"; 
    return;
}

function removeMarbleFromSolnBoard(coods)
{
    document.getElementById("Soln_marble" + coods).style.opacity = "0.01"; 
    document.getElementById("Soln_movingMarble" + coods).style.opacity = "0.01"; 


    return;
}



function removeMarbleFromPStartBoard(coods)
{
    document.getElementById("PuzStart_marble" + coods).style.opacity = "0.01"; 
    document.getElementById("PuzStart_movingMarble" + coods).style.opacity = "0.01"; 
    return;
}


function getGameMovesinStringArray(str)
{
    var retV = [];
    var temp = "";
    
    for (i=0; i<str.length; i++){
        if (str[i] === "|"){
            retV[retV.length] = temp;
            temp = "";
            continue;
        }
        
        temp = temp + str[i];
    }
    
    return retV;
}



function quickStartHowTo()
{
    doneWithQuickStart();
    goToHowToScreen();
    return;
}

function quickStartPuzzles()
{
    doneWithQuickStart();
    loadGameButtonWasClicked();
    puzzleTabButtonWasClicked();
    return;
}

function tryPaidVersion()
{
    $("#fullVersionInfoScreen").fadeIn('slow');
	getElementStyleObject('app6').backgroundImage = "url(../Images/icon.png)";
}


function backtoLite()
{
    $("#fullVersionInfoScreen").fadeOut('slow');
}

function solvePuzzle()
{
	playSound("tink");
	
	if (currentSelectedPuzzleBoard === "none"){
		flashMessage("Please select a Puzzle...", 1500);
        return;
	}
	
	
	if (localStorage.getItem("PUZ_PERF_" + puzCat) == "puzzle_locked"){
        flashMessage("Puzzle locked!", 1500);
        return;
    }
	
	menuButtonWasClicked();	
	    
    exercizeMode = true;    
	if(getAnimationStateBool()){		
    	setTimeout('getElementStyleObject("puzzleTools").display = "block"', 2000);
	}
	else{
    	setTimeout('getElementStyleObject("puzzleTools").display = "block"', 200);
	}

		
    Stack.empty();
    setupNewGame(puzzleStart);
    

    if(hintsState === "show"){
        updateHints();
    }
    
    setTimeout("startTimer()", 2000);


	newGameType = "";
	if(getAnimationStateBool()){
		setTimeout('playButtonWasClicked_Aux(); flashMessage("Puzzle setup...", 1200);', 700);
	}
	else{
		playButtonWasClicked_Aux(); 
		flashMessage("Puzzle setup...", 1200);
	}
    return;
}

function goToPuzzleEndScreen()
{    
	
    if(isPuzzleSolved()){
        puzzleSolved();
    }
    else{
        puzzleFailed();
    }
    getElementStyleObject("puzzleTools").display = "none";

	goUp("puzzleResults");

	setTimeout("stopTimer();", 500);

    return;
}

function showPuzzleEndBoard()
{
    $("#puzzleHint").show();
    document.getElementById("puzzleHintOffButton").style.display = "none";
    document.getElementById("puzzleHintOnButton").style.display = "block";
    $("#theBoard").addClass('currentPuzState');

}


function resumePuzzle()
{
    $("#puzzleHint").hide();
    document.getElementById("puzzleHintOffButton").style.display = "block";
    document.getElementById("puzzleHintOnButton").style.display = "none";
    $("#theBoard").removeClass('currentPuzState');

}

function isPuzzleSolved()
{

    if(currentGame.sort().toString() === puzzleEnd.sort().toString()){
        return true;
    }
    
    return false;


}


function puzzleSolved()
{
    var pastPerf = localStorage.getItem("PUZ_PERF_" + currentSelectedPuzzleBoard);
    var currPerf;
    var timeLeft = getElementObject("timerText").innerHTML
    getElementObject("puzzleResultTextN").innerHTML = timeLeft;
    

    $("#flairBox").removeClass("flair_excellent");
    $("#flairBox").removeClass("flair_good");
    $("#flairBox").removeClass("flair_verygood");
    $("#flairBox").removeClass("flair_failed");
    $("#flairBox").removeClass("flair_timeout");
        
	getElementStyleObject("nextPuzzleN").display = "block";
	getElementStyleObject("playPuzzleAgainN").marginLeft = "0px";

    localStorage.removeItem("PUZ_PERF_" + currentSelectedPuzzleBoard);

    if (timeLeft[0] === "0"){
        $("#flairBox").addClass("flair_good");
        localStorage.setItem("PUZ_PERF_" + currentSelectedPuzzleBoard, "puzzle_good");
        currPerf = "puzzle_good";
    }

    if (timeLeft[0] === "1"){
        $("#flairBox").addClass("flair_verygood");
        localStorage.setItem("PUZ_PERF_" + currentSelectedPuzzleBoard, "puzzle_verygood");
        currPerf = "puzzle_verygood";        
    }

    if (timeLeft[0] === "2"){
        $("#flairBox").addClass("flair_excellent");
        localStorage.setItem("PUZ_PERF_" + currentSelectedPuzzleBoard, "puzzle_excellent");
        currPerf = "puzzle_excellent";
    }

    var nextP = getnextPuzzle();
    var nextPPerf = localStorage.getItem("PUZ_PERF_" + nextP);

    if (nextPPerf == "puzzle_locked"){
        localStorage.setItem("PUZ_PERF_" + nextP, "puzzle_unplayed");
        $("#card_wrapper_grid_" + nextP).removeClass("puzzle_locked");
        $("#card_wrapper_grid_" + nextP).addClass("puzzle_unplayed");
        
    }
    
    if (isItAnImprovement(pastPerf, currPerf)){
           $("#card_wrapper_grid_" + currentSelectedPuzzleBoard).removeClass(pastPerf);
           $("#card_wrapper_grid_" + currentSelectedPuzzleBoard).addClass(currPerf);
    }

}

function goToNextPuzzle()
{
    var temp = currentSelectedPuzzleBoard;
    currentSelectedPuzzleBoard = getnextPuzzle();
    

    if (getstringbeforeus(temp) === getstringbeforeus(currentSelectedPuzzleBoard)){
        solveAgain();
        return;
    }
    
    currentSelectedPuzzleCat = "pzcat" + (parseInt(currentSelectedPuzzleCat.substring(5)) + 1).toString();
    solveAgain();
    return;
}

function getnextPuzzle()
{
    if (currentSelectedPuzzleBoard === "0_1"){
        return "1_1";
    }

    if (currentSelectedPuzzleBoard === "1_12"){
        return "2_1";
    }
    
    if (currentSelectedPuzzleBoard === "2_12"){
        return "3_1";
    }
    
    if (currentSelectedPuzzleBoard === "3_12"){
        return "4_1";
    }

    if (currentSelectedPuzzleBoard === "4_12"){
        return "5_1";
    }

    if (currentSelectedPuzzleBoard === "5_12"){
        return "6_1";
    }


    if (currentSelectedPuzzleBoard === "6_12"){
        return "END";
    }
    
    var pc = getstringbeforeus(currentSelectedPuzzleBoard);
    var pb = getstringafterus(currentSelectedPuzzleBoard);
    
    return pc + "_" + (parseInt(pb) + 1).toString();
    
}

function puzzleFailed()
{

    $("#flairBox").removeClass("flair_excellent");
    $("#flairBox").removeClass("flair_good");
    $("#flairBox").removeClass("flair_verygood");
    $("#flairBox").removeClass("flair_failed");
    $("#flairBox").removeClass("flair_timeout");

    $("#flairBox").addClass("flair_failed");
    
	getElementStyleObject("nextPuzzleN").display = "none";
	getElementStyleObject("playPuzzleAgainN").marginLeft = "140px";
	
}

function puzzleFailed_1()
{

	hideSolutionScreen();

    $("#flairBox").removeClass("flair_excellent");
    $("#flairBox").removeClass("flair_good");
    $("#flairBox").removeClass("flair_verygood");
    $("#flairBox").removeClass("flair_failed");
    $("#flairBox").removeClass("flair_timeout");

    $("#flairBox").addClass("flair_timeout");
    
    getElementStyleObject("puzzleTools").display = "none";

	goUp("puzzleResults");

	setTimeout("stopTimer();", 2000);
	
	getElementStyleObject("nextPuzzleN").display = "none";
	getElementStyleObject("playPuzzleAgainN").marginLeft = "140px";

}

function solveAgain()
{
	goDown("puzzleResults");
	
	setUpPuzzle(currentSelectedPuzzleBoard);
    solvePuzzle();
    
}

function showAllPuzzles()
{
    $("#puzzleResults").fadeOut(2000);
    loadGameButtonWasClicked();
    puzzleTabButtonWasClicked();
}


function isItAnImprovement(oldP, newP)
{
    var oldPval = getNoforP(oldP);
    var newPval = getNoforP(newP);
    
    if (newPval > oldPval){
        return true;
    }
    
    return false;
}

function getNoforP(perf)
{
    if (perf === "puzzle_locked"){
        return 0;
    }
    if (perf === "puzzle_unplayed"){
        return 1;
    }
    if (perf === "puzzle_good"){
        return 2;
    }
    if (perf === "puzzle_verygood"){
        return 3;
    }
    if (perf === "puzzle_excellent"){
        return 4;
    }
    return -1;
}


function playButtonWasClicked()
{    
	newGameType = "fullBoard";
	playButtonWasClicked_Aux();
	
	return;
}

function playButtonWasClicked_Aux(){
	playSound("tink");

	getElementStyleObject("mainMenuScreenWrapper").webkitTransform = "translate3d(-778px,0,0)";
    
	goUp("theBoard");

	getElementStyleObject("headerDiv").webkitTransform = "translate3d(0,0px,0)";

	if (newGameType === "fullBoard"){
        setupNewGame(standardGameTemplete);
        return; 
    }

}


function menuButtonWasClicked()
{
	playSound("tink");
    
	hideMessageTextDiv();
	stopTimer();
	exercizeMode = false;
	getElementStyleObject("puzzleTools").display = "none";	
	
	getElementStyleObject("mainMenuScreenWrapper").webkitTransform = "translate3d(0px,0,0)";
	getElementStyleObject("mainMenuScreen").webkitTransform = "translate3d(0px,0,0)";
	
	
	getElementStyleObject("puzzleScreen").webkitTransform = "translate3d(0,0px,0)";
	getElementStyleObject("settingScreen").webkitTransform = "translate3d(0px,0,0)";
	getElementStyleObject("loadGameScreen").webkitTransform = "translate3d(0px,0,0)";
	getElementStyleObject("howToPlay").webkitTransform = "translate3d(0px,0,0)";
	
	goDown("theBoard");

	setInfoText("");
	getElementStyleObject('infoBox').display = "none";
	
	getElementStyleObject("headerDiv").webkitTransform = "translate3d(0,-70px,0)";
	
	getElementStyleObject("helpWrapper").display = "none";
	

}

function settingsButtonWasClicked()
{
	playSound("tink");
    
	getElementStyleObject("mainMenuScreenWrapper").webkitTransform = "translate3d(-768px,0,0)";
	getElementStyleObject("settingScreen").webkitTransform = "translate3d(-768px,0,0)";


    $("#marbleColor" + marbleColor).addClass('currentMarbleClass');
    $("#background" + bgImageID).addClass('currentBGClass');
	return;
}

function puzzlesButtonWasClicked()
{
	playSound("tink");
    
	getElementStyleObject("mainMenuScreenWrapper").webkitTransform = "translate3d(0,-1024px,0)";
	getElementStyleObject("puzzleScreen").webkitTransform = "translate3d(0,-1024px,0)";

	//getElementStyleObject("info").display = "block";
	
	//currentSelectedPuzzleCat = "info";
	
	return;
}


function helpButtonWasClicked()
{
	playSound("tink");
    
	if(getAnimationStateBool()){
		setTimeout('getElementStyleObject("helpWrapper").display = "block"', 500);
	}
	else{
		getElementStyleObject("helpWrapper").display = "block";
	}
	getElementStyleObject("mainMenuScreenWrapper").webkitTransform = "translate3d(768px,0,0)";
	getElementStyleObject("howToPlay").webkitTransform = "translate3d(768px,0,0)";

	for(var i=1; i <= 6; i++){
		getElementStyleObject("helpSlide" + i.toString()).backgroundImage = "url(Images/helpPage" + i.toString() + ".png)";
	}

	return;
}

function doneWithHelp()
{
	getElementStyleObject("mainMenuScreenWrapper").webkitTransform = "translate3d(0px,0,0)";
	getElementStyleObject("howToPlay").webkitTransform = "translate3d(0px,0,0)";
	
	return;
}


function savedBoardButtonWasClicked()
{
	playSound("tink");
    
	backtoSavedBoards();
	getElementStyleObject("mainMenuScreenWrapper").webkitTransform = "translate3d(0,1024px,0)";
	getElementStyleObject("loadGameScreen").webkitTransform = "translate3d(0,1024px,0)";

    $("#saved_board_wrapper_list_SB_" + currentSelectedSavedBoard).removeClass("saved_board_wrapper_list_selected");
    currentSelectedSavedBoard = 1;    
    $("#saved_board_wrapper_list_SB_" + currentSelectedSavedBoard).addClass("saved_board_wrapper_list_selected");
    var savedGameKey = "SB_" + currentSelectedSavedBoard;
    var currentGameTemplate = localStorage.getItem(savedGameKey + "_GAME").splitCSV();
    setupNewPreviewGame(currentGameTemplate);

	getElementStyleObject('deleteBoard').display = "none";
	
	document.getElementById('boardLibraryBodyWrapper').scrollTop = 0;

	return;
}


function marbleWasTouchedCOS(pegpos)
{
	if (isAMemberof(coods, currentGame)){
    	return;
	}

	getElementStyleObject("body").cursor = "-webkit-grabbing";
	getElementStyleObject("appWrapper").cursor = "-webkit-grabbing";
	var coods = pegpos;
    var theMarbleSelected = "movingMarble" + coods;

    currentlyDraggedMarble = theMarbleSelected;
	
    var theMarble = "marble" + coods;
    var theMarbleWrapper = "marbleWrapper" + coods;
    if (isNOTaMemberof(coods, currentGame)){
        playSound('lift');
      //  document.getElementById(theMarbleSelected).style.opacity = '1';
        document.getElementById(theMarble).style.opacity = '0';
	//	setTimeout("document.getElementById('movingMarble' + coods).style.opacity = '0.01'", 200);


        if(targetPegState === "show"){
            var validPegs = validMovesDict[coods];
            for (var i = 0; i < validPegs.length ; i++){
                $("#peg" + validPegs[i]).addClass("validPegClass");
            }
        }

    }

	marbleIsDraggedCOS(event, coods)


    return;
}


function marbleWasReleasedCOS(pegpos)
{	
    $(".boardTableTD").removeClass("validPegClass");
    var coods = pegpos;
    if (isNOTaMemberof(coods, currentGame)){
        setTimeout('playSound("fallback")', 250);
    }
    putTheMarbleBackCOS(coods);
	setTimeout('getElementStyleObject("body").cursor = "default"; getElementStyleObject("appWrapper").cursor = "default";', 100);

	getElementStyleObject(currentlyDraggedMarble).webkitAnimation = "none";


    return;
}

function marbleWasDroppedCOS(e)
{
	//getElementStyleObject(currentlyDraggedMarble).webkitAnimation = "none";
	
	getElementStyleObject("movingMarblezIndex").opacity = "0";
    getElementStyleObject("movingMarblezIndex").top = "-100px";
    getElementStyleObject("movingMarblezIndex").left = "-100px";

    var destPeg = e.target.id;
	sourcePeg = currentlyDraggedMarble;
		
    var sourceCoods = sourcePeg.substring(12);
    var destCoods = destPeg.substring(3);
    sourceX = parseInt(sourceCoods[0]);
    sourceY = parseInt(sourceCoods[1]);
    destX = parseInt(destCoods[0]);
    destY = parseInt(destCoods[1]);
    if (isMoveValid(sourceX, sourceY, destX, destY)){
        
        $("#" + destPeg).removeClass("validPegClass");
        playSound('drop');
		
		
        addMarbleToBoard(destCoods);
        removeMarbleFromBoard(sourceCoods);
        var midMarbleCoods = getAvgOfCoods(sourceX, sourceY, destX, destY);
        setTimeout('setInterimOpacity("'+ midMarbleCoods +'")', 250);

        setTimeout('animateAwayMarble("'+ midMarbleCoods +'")', 300);
        
        currentGame[currentGame.length] = midMarbleCoods;
        updateValidMovesDict();
        updateHints();
        

        setTimeout('removeMarbleFromBoard_x("'+ midMarbleCoods +'"); ', 700);
        setTimeout('document.getElementById("marble'+ destCoods +'").style.opacity = "1"; ', 300);
		

        if (isGameOver()){
            setTimeout("goToEndGameScreen();", 200);
        }

        Stack.push(makeArrayCopy(currentGame));
		
    }
    else{
        document.getElementById("movingMarble" + sourceCoods).style.opacity = '.01';
        document.getElementById("marble" + sourceCoods).style.opacity = '1';
    }
    
    putTheMarbleBackCOS(sourceCoods);

	setTimeout('getElementStyleObject("body").cursor = "-webkit-grab"; getElementStyleObject("appWrapper").cursor = "-webkit-grab";', 100);

	
    return;
}


function loadHelpPage(event)
{
	playSound("tink");
	
	//getElementStyleObject("helpSlide0").backgroundImage = "url(Images/helpPage0.png)";
	
	var helpPage = parseInt(event.target.id.substring(10,20));

	for(var i=1; i <= 6; i++){
		if (i<helpPage){
			goLeft("helpSlide" + i.toString());
		}
		if (i == helpPage){
			getElementStyleObject("helpSlide" + i.toString()).backgroundImage = "url(Images/helpPage" + i.toString() + ".png)";
			goCenter("helpSlide" + i.toString());
		}
		if (i>helpPage){
			goRight("helpSlide" + i.toString());
		}
		
	}

	return;
}


function goLeft(aDiv)
{
	var sw = getElementObject(aDiv).parentNode.offsetWidth
    getElementStyleObject(aDiv).webkitTransform = "translate3d(-" + sw.toString() + "px, 0, 0)";
    
	return;
}


function goCenter(aDiv)
{
    getElementStyleObject(aDiv).webkitTransform = "translate3d(0px,0,0)";

    return;
}

function goRight(aDiv)
{
	var sw = getElementObject(aDiv).parentNode.offsetWidth
    getElementStyleObject(aDiv).webkitTransform = "translate3d(" + sw.toString() + "px, 0, 0)";

    return;
}


function hideSolutionScreen(){
	playSound("tink");
	
	getElementStyleObject("solnScreen").backgroundColor = "transparent";
	goDown('solnScreen'); 

	return;
}

var currentSolutionStep = 1;
var solnStartStep = 0;
var noofSolnSteps = 1;

function showSolutionScreen(){	
	playSound("tink");
	
	if (currentSelectedPuzzleBoard === "none"){
		flashMessage("Please select a Puzzle...", 1500);
        return;
	}
	
	
	if (localStorage.getItem("PUZ_PERF_" + puzCat) == "puzzle_locked"){
        flashMessage("Puzzle locked!", 1500);
        return;
    }
	
	if(lite){
		tryPaidVersion();
		return;
	}
	
	getElementStyleObject("solnSliderWrapper").display = "block";
	
	var puzCat = currentSelectedPuzzleBoard;
	var currentPuzzle = getGameMovesinStringArray(exercisesDict[puzCat + "_MOVES"]); 
	    
	solnStartStep = parseInt(exercisesDict[puzCat + "_START"]);
	
	noofSolnSteps = currentPuzzle.length - 1 - parseInt(exercisesDict[puzCat + "_END"]) - solnStartStep;
	
	currentSolutionStep = 1;
	
	updateSolutionBoard();

	showSolutionScreen_Aux();
	
	getElementStyleObject("prevStep").backgroundImage = 'url("../Images/prev.png")';
	getElementStyleObject("nextStep").backgroundImage = 'url("../Images/next.png")';
	
	return;
}

function peekSolution()
{
	if(lite){
		flashMessage("upgrade to use this..", 2000);
		return;
	}
	playSound("tink");
	
	var currentPuzzle = getGameMovesinStringArray(exercisesDict[puzCat + "_MOVES"]); 
	
	solnStartStep = parseInt(exercisesDict[puzCat + "_START"]);
	currentSolutionStep = Stack.size();
	noofSolnSteps = currentPuzzle.length - 1 - parseInt(exercisesDict[puzCat + "_END"]) - solnStartStep;
	
	
	var temp = currentPuzzle[solnStartStep + currentSolutionStep].splitCSV();
    
	getElementObject("solnSliderValue").innerHTML = "Step " + (currentSolutionStep).toString() + " of " + (noofSolnSteps).toString();
	
    setupPuzzleSolnBoard(temp);

	getElementStyleObject("solnSliderWrapper").display = "block";

	getElementStyleObject("prevStep").backgroundImage = 'url("../Images/prev.png")';
	getElementStyleObject("nextStep").backgroundImage = 'url("../Images/next.png")';

	showSolutionScreen_Aux();
	
	return;
}


function peekTarget()
{
	playSound("tink");
	getElementStyleObject("solnSliderWrapper").display = "none";
	getElementObject("solnSliderValue").innerHTML = "TARGET BOARD";
	
	var currentPuzzle = getGameMovesinStringArray(exercisesDict[puzCat + "_MOVES"]); 
	
	solnStartStep = parseInt(exercisesDict[puzCat + "_START"]);
	
	noofSolnSteps = currentPuzzle.length - 1 - parseInt(exercisesDict[puzCat + "_END"]) - solnStartStep;
	
    var temp = currentPuzzle[solnStartStep + noofSolnSteps].splitCSV();
		

	
    setupPuzzleSolnBoard(temp);

	showSolutionScreen_Aux();
		
	return;
}


function updateSolutionBoard()
{
	playSound("tink");
	
	var currentPuzzle = getGameMovesinStringArray(exercisesDict[puzCat + "_MOVES"]); 
    var temp = currentPuzzle[solnStartStep + currentSolutionStep - 1].splitCSV();
	
	getElementObject("solnSliderValue").innerHTML = "Step " + (currentSolutionStep-1).toString() + " of " + (noofSolnSteps).toString();
	
    setupPuzzleSolnBoard(temp);
}

function showSolutionScreen_Aux(){
	getElementObject("solnScreenTitle").innerHTML = "puzzle " + getRoman(parseInt(currentSelectedPuzzleCat.substring(5))+1) + " - " + getstringafterus(puzCat);
	
	
	goUp('solnScreen'); 

	if(getAnimationStateBool()){
		setTimeout('getElementStyleObject("solnScreen").backgroundColor = "rgba(0,0,0,.6)"', 700);
	}
	else{
		getElementStyleObject("solnScreen").backgroundColor = "rgba(0,0,0,.6)";
	}
	return;
}

function solnSliderStop()
{	
	var parWidth = parseInt(getElementObject('solnSliderKnob').parentNode.offsetWidth) - parseInt(getElementObject('solnSliderKnob').offsetWidth);
	var pos = Math.round(parWidth*solnSliderValue/100);
	
	getElementStyleObject("solnSliderKnobMoving").left = pos.toString() + "px";
	getElementStyleObject("solnSliderKnobMoving").top = "-62px";

	getElementStyleObject("solnSliderKnob").left = pos.toString() + "px";


}


function setSliderVal(percent)
{	
	var parWidth = parseInt(getElementObject('solnSliderKnob').parentNode.offsetWidth) - parseInt(getElementObject('solnSliderKnob').offsetWidth);
	var pos = parWidth * percent /100 ;
	getElementStyleObject("solnSliderKnobMoving").left = pos + "px";
	var posaux = pos;
	

	pos = parseInt(posaux * 100/parWidth);
	
	solnSliderValue = pos;
	solnSliderValueChanged()
	solnSliderStop();
	
	return;
}



function solnSliderDrag()
{
	var parWidth = parseInt(getElementObject('solnSliderKnob').parentNode.offsetWidth) - parseInt(getElementObject('solnSliderKnob').offsetWidth);
	var pos = parseInt(getElementStyleObject("solnSliderKnobMoving").left);
	var posaux = 0;
	
	if (pos > 0 && pos < parWidth){
		getElementStyleObject("solnSliderKnob").left = pos.toString() + "px";
		posaux = pos;
	}
	
	if (pos <= 0){
		getElementStyleObject("solnSliderKnob").left = "0";
		posaux = 0;
	}
	
	if (pos >= parWidth){
		getElementStyleObject("solnSliderKnob").left = parWidth.toString() + "px";
		posaux = parWidth;
	}

	pos = parseInt(posaux * 100/parWidth);
	
	if (solnSliderValue != pos){
		solnSliderValue = pos;
		solnSliderValueChanged()
	}
	
	return;
}

function solnSliderValueChanged()
{
	var newSolnStep = 1 + Math.round(parseFloat(noofSolnSteps*solnSliderValue/100));
	
	if (newSolnStep == currentSolutionStep){
		return;
	}
	
	currentSolutionStep = newSolnStep;
	
	updateSolutionBoard();
	
	return;	
}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		//if (el.id === "content"){
		//	break;
		//}
        _x += el.offsetLeft;// - el.scrollLeft;
        _y += el.offsetTop;// - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function continuePurchase()
{
	backtoLite();
	
	if (chromeOS){
        window.open("https://chrome.google.com/webstore/detail/lagnbahfchokmglcdnnmbbkkdboaegla");
		return;
    }
}

function marbleIsDraggedCOS(e, coods)
{
	if(OSX){
		return;
	}
	
	if (isAMemberof(coods, currentGame)){
    	return;
	}
	
	var l1 = e.pageX;
	var t1 = e.pageY
	var l = (l1)* 100/zoomPercent - 50;
	var t = (t1)* 100/zoomPercent - 50;
	
	
	
	if (l1 < screenWidth-40){ 
		getElementStyleObject('movingMarblezIndex').left =  l.toString() + "px";
	}
	if (t1 < screenHeight-40){
		getElementStyleObject('movingMarblezIndex').top =  t.toString() + "px";
	}
	getElementStyleObject('movingMarblezIndex').opacity = "1";
	
}

function loadHelpImages()
{
	
	
}



function nextSolnStep(){
	if (currentSolutionStep > noofSolnSteps){
		return;
	}
	currentSolutionStep = currentSolutionStep + 1;
	updateSolutionBoard();
	
	return;
}

function prevSolnStep(){
	if (currentSolutionStep <= 0){
		return;
	}
	currentSolutionStep = currentSolutionStep - 1;
	updateSolutionBoard();
	
	return;
}

function setInfoText(txt)
{
	getElementStyleObject('infoBox').display = "block";
	getElementObject('infoBoxText').innerHTML = txt;
	return;
}


function toggleAnimation()
{
	playSound("tink");
	
    if (animationState === "true"){
		setAnimation(false);
		setInfoText("<u>animations off</u> : faster response (recommended)");
		localStorage.setItem("animationState", "false");
        animationState = "false";
    }
    else{
		setAnimation(true);
		setInfoText("<u>animations on</u> : smooth transitions. For faster devices");
		localStorage.setItem("animationState", "true");
        animationState = "true";
    }
}

function getAnimationStateBool()
{
	if (animationState === "true"){
		return true;
    }
	else{
		return false;
	}
}