
//Globals
var noofSavedGames;
var isSoundOn = "true";
var isMusicOn = "true";
var lite = false;

var screenHeight; 
var screenWidth;

var marbleColor;
var bgImageID;

var howToStartupState;


var OSX = false;
var touchSupport;
var chromeOS;
var iOS;
var iPad;
var android;


var clickEvent;

var exercizeMode = false;

function load()
{
	
	var agent = navigator.userAgent.toLowerCase();

	if( agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1 || agent.indexOf('ipad') != -1
	 ) {
		touchSupport = true;
		chromeOS = false;
		iOS = true;
		android = false;
		iPad = false;
		if (agent.indexOf('ipad') != -1){
			iPad = true;
		}
	}

	else if( agent.indexOf('android') != -1) {
		touchSupport = true;
		chromeOS = false;
		iOS = false;
		android = true;
		iPad = false;
	}

	else{
		touchSupport = false;
		chromeOS = true;
		iOS = false;
		android = false;
		iPad = false;
	}
	goDown('about'); 
    goDown('endGame'); 
    goDown('solnScreen'); 
    goDown('endGame'); 
    goDown('puzzleResults'); 
	goDown("solnScreen");
	
    setTimeout('document.getElementById("splashScreen").style.display = "none"', 700);
	setTimeout('document.getElementById("splashScreen").style.opacity = "0";', 200);
 	addButtonEventListeners();
    initializeGlobals();
    startUp();
}

function initializeGlobals()
{
	if (localStorage.getItem("animationState") == null){
        localStorage.setItem("animationState", "false");
        animationState = "false";
		if(OSX){
			localStorage.setItem("animationState", "true");
	        animationState = "true";
		}
    }
    else{
        animationState = localStorage.getItem("animationState");        
    } 

    if (animationState === "true"){
		setAnimation(true);
    }
    else{
		setAnimation(false);
    }

	if (localStorage.getItem("noofPlayedGames") == null){
        localStorage.setItem("noofPlayedGames", "0");
        noofPlayedGames = 0;
    }
    else{
        noofPlayedGames = parseInt(localStorage.getItem("noofPlayedGames"));
    }

	if (localStorage.getItem("noofSavedGames") == null){
        localStorage.setItem("noofSavedGames", "2");
        noofSavedGames = 2;
    }
    else{
        noofSavedGames = parseInt(localStorage.getItem("noofSavedGames"));
    }


	if (localStorage.getItem("currentSelectedPuzzleCat") == null){
        localStorage.setItem("currentSelectedPuzzleCat", "info");
        currentSelectedPuzzleCat = "info";
    }
    else{
        currentSelectedPuzzleCat = localStorage.getItem("currentSelectedPuzzleCat");
    }
    

	if (localStorage.getItem("isSoundOn") == null){
        localStorage.setItem("isSoundOn", "true");
        isSoundOn = "true";
    }
    else{
        isSoundOn = localStorage.getItem("isSoundOn");        
    }
    
    if (isSoundOn === "true"){
        document.getElementById("soundisOnButtonN").style.display = "block";
        document.getElementById("soundisOffButtonN").style.display = "none";
    }
    else{
        document.getElementById("soundisOnButtonN").style.display = "none";
        document.getElementById("soundisOffButtonN").style.display = "block";
    }


	if (localStorage.getItem("isMusicOn") == null){
        localStorage.setItem("isMusicOn", "true");
        isMusicOn = "true";
    }
    else{
        isMusicOn = localStorage.getItem("isMusicOn");        
    }
    
    if (isMusicOn === "true"){
        document.getElementById("musicisOnButtonN").style.display = "block";
        document.getElementById("musicisOffButtonN").style.display = "none";
    }
    else{
        document.getElementById("musicisOnButtonN").style.display = "none";
        document.getElementById("musicisOffButtonN").style.display = "block";
    }
    
    
    if (localStorage.getItem("bgImageID") == null){
        localStorage.setItem("bgImageID", "10");
        bgImageID = "10";
    }
    else{
        bgImageID = localStorage.getItem("bgImageID");        
    }


    if (localStorage.getItem("marbleColor") == null){
        localStorage.setItem("marbleColor", "Red");
        marbleColor = "Red";
    }
    else{
        marbleColor = localStorage.getItem("marbleColor");        
    }


    if (localStorage.getItem("backgroundImageOpacity") == null){
        localStorage.setItem("backgroundImageOpacity", "4");
        backgroundImageOpacity = 4;
    }
    else{
        backgroundImageOpacity = parseInt(localStorage.getItem("backgroundImageOpacity"));        
    }
                

    if (localStorage.getItem("backgroundOpacityBarLength") == null){
        localStorage.setItem("backgroundOpacityBarLength", "20");
        backgroundOpacityBarLength = 20;
    }
    else{
        backgroundOpacityBarLength = parseInt(localStorage.getItem("backgroundOpacityBarLength"));        
    }

    if (localStorage.getItem("targetPegState") == null){
        localStorage.setItem("targetPegState", "show");
        targetPegState = "show";
    }
    else{
        targetPegState = localStorage.getItem("targetPegState");        
    }    
    
    
    
    if (targetPegState === "show"){
        document.getElementById("tpOnButtonN").style.display = "block";
        document.getElementById("tpOffButtonN").style.display = "none";
    }
    else{
        document.getElementById("tpOnButtonN").style.display = "none";
        document.getElementById("tpOnButtonN").style.display = "block";
    }
    


    if (localStorage.getItem("hintsState") == null){
        localStorage.setItem("hintsState", "hide");
        hintsState = "hide";
    }
    else{
        hintsState = localStorage.getItem("hintsState");        
    } 
    
    
    
    if (hintsState === "show"){
        document.getElementById("hintsareOnButtonN").style.display = "block";
        document.getElementById("hintsareOffButtonN").style.display = "none";
    }
    else{
        document.getElementById("hintsareOnButtonN").style.display = "none";
        document.getElementById("hintsareOffButtonN").style.display = "block";
    }



    if (localStorage.getItem("howToStartupState") == null){
        localStorage.setItem("howToStartupState", "show");
        howToStartupState = "show";
    }
    else{
        howToStartupState = localStorage.getItem("howToStartupState");        
    } 
    
    
    if (howToStartupState === "show"){
        document.getElementById("howtoStartupOnButton").style.display = "block";
        document.getElementById("howtoStartupOffButton").style.display = "none";
    }
    else{
        document.getElementById("howtoStartupOnButton").style.display = "none";
        document.getElementById("howtoStartupOffButton").style.display = "block";
    }
    
}

function addButtonEventListeners()
{
		var i;
		initializeButtonClicks();
	
		var theBoardSlots_A = ['13', '14', '15', '23', '24', '25', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '47', '51', '52', '53', '54', '55', '56', '57', '63', '64', '65', '73', '74', '75'];
	
		for(i = 0; i < 33; i++){
			addTapElement("Aux_movingMarble" + theBoardSlots_A[i], auxMarbleWasClicked);
        }

		addButtonElement("goToBoard", playButtonWasClicked);
		addButtonElement("goToSettings", settingsButtonWasClicked);
		addButtonElement("goToPuzzles", puzzlesButtonWasClicked);
		addButtonElement("goToLoadBoards", savedBoardButtonWasClicked);
		
		addButtonElement("goToHelp", helpButtonWasClicked);
		addButtonElement("dismissEndGameOptionsScreenN", hideEndGameScreen);
		
		addButtonElement("dismissHelpScreen", menuButtonWasClicked);
		addButtonElement("menuButtonN", menuButtonWasClicked);
		addButtonElement("dismissLoadGameScreenN", menuButtonWasClicked);
		addButtonElement("settingsDoneButton", menuButtonWasClicked);
		addButtonElement("dismissPuzzlesScreen", menuButtonWasClicked);

		addButtonElement("soundToggle", toggleSound);
		addButtonElement("musicToggle", toggleMusic);
		addButtonElement("targetPegToggle", toggleTargetPeg);
		addButtonElement("hintsToggle", toggleHints);
		addButtonElement("anToggle", toggleAnimation);

		addButtonElement("undoButtonN", undoMove);
		addButtonElement("resetButtonN", resetBoard);

		addButtonElement("saveButtonN", saveTheBoard);

		for (i = 1; i <= 6; i++){
			addTapElement("helpButton" + i.toString(), loadHelpPage);
		}
		
		addButtonElement("goToInfo", goToAboutScreen);
		addButtonElement("dismissAboutButtonN", doneWithAbout);

		addButtonElement("fnslogo", fnsLink);

		addButtonElement("facebookN", shareOnFaceBook);
		addButtonElement("facebook1N", shareOnFaceBook);
		addButtonElement("twitterN", shareOnTwitter);
		addButtonElement("twitter1N", shareOnTwitter);
		addButtonElement("mailN", emailInfo);
		addButtonElement("mail1N", emailInfo);
		
		addButtonElement("studioInfoWrapper", buyAdFree);
		addButtonElement("deleteBoard", deleteSavedBoard);

		addButtonElement("playPreviewBoardN", playSavedBoard);

		addButtonElement("undoLastMoveButtonN", undoFinalMove);
		addButtonElement("startANewFullBoardButton1N", startNewBoard);

		addButtonElement("useAsTempleteN", editBoardButtonWasClicked);

		addButtonElement("fullBoardN", setupFullBoardPreviewGame);
		addButtonElement("emptyBoardN", setupEmptyBoardPreviewGame);
		addButtonElement("btosavedBoardN", backtoSavedBoards);

		addButtonElement("playCustomBoardN", playPreviewBoard);

		addButtonElement("playPuzzleN", solvePuzzle);

		addButtonElement("dismissPButton", backtoAllPuzzles);
		addButtonElement("puzzleBack", backtoAllPuzzles);

		addButtonElement("seeSolution", showSolutionScreen);

		addButtonElement("dismissSolnScreen", hideSolutionScreen);

		addButtonElement("puzzleSoln", peekSolution);
		addButtonElement("puzzleTarget", peekTarget);

		addButtonElement("nextPuzzleN", goToNextPuzzle);
		addButtonElement("playPuzzleAgainN", solveAgain);
		
		addButtonElement("backtoLiteN", backtoLite);

		addButtonElement("continuePurchase", continuePurchase);

		addButtonElement("goToUpgrade", tryPaidVersion);
	 	
    for (i=0; i<marbleHandles.length; i++){
    
		addTapElement("marbleColor" + marbleHandles[i], aPreviewMarbleWasClicked);

    }
    

    for (i=1; i<=noofBgs; i++){
    	
		addTapElement("background" + i.toString(), aPreviewBGWasClicked);
    
    }
        
	addTapElement("prevStep", prevSolnStep);
	addTapElement("nextStep", nextSolnStep);

    return;
}


