// Program by John DeHart, July 09, 2020.								
// Modification charpinator, Dec 2023		


function changeColor(obj) {		//changes the color of the clicked circle in the player's control area.
	
	var innerText = parseInt(obj.textContent);		//store the circle's text. Each circle has text inside it (invisible to the player) that represents the color it currently is
	
	switch (innerText) {							//moves the circle's color to the next color.
		case 0:										//0 represents green. The next color is blue, so if the inner text is 0, change the color of the circle to blue.
			obj.style.backgroundColor = '#6FC6F7';
			obj.style.color = '#6FC6F7';
			obj.textContent = 1;
			break;
		case 1:
			obj.style.backgroundColor = '#ED6B7F';		//same thing. Change the blue circle to red.
			obj.style.color = '#ED6B7F';
			obj.textContent = 2;
			break;
		case 2:
			obj.style.backgroundColor = '#FADD5F';	//and so on
			obj.style.color = '#FADD5F';
			obj.textContent = 3;
			break;
		case 3:
			obj.style.backgroundColor = 'black';	//and so forth.
			obj.style.color = 'black';
			obj.textContent = 4;
			break;
		case 4:
			obj.style.backgroundColor = '#C866F2';
			obj.style.color = '#C866F2';
			obj.textContent = 5;				//you also have to change the number inside the circle so, if it's clicked again, the program knows what color it is.
			break;
		case 5:
			obj.style.backgroundColor = '#67E06F';
			obj.style.color = '#67E06F';
			obj.textContent = 0;
			break;
	}		
};

function checkAnswer() {		//this function gets the player's guess and places it into plArr.
	var plArr = [];
	
	obj1 = document.getElementById("pl1");		//the first circle (in the control area) is read. There are invisible number inside the circles that represent what color
	plArr[0] = parseInt(obj1.innerText);		//they are. 
	
	obj2 = document.getElementById("pl2");
	plArr[1] = parseInt(obj2.innerText);
	
	obj3 = document.getElementById("pl3");
	plArr[2] = parseInt(obj3.innerText);
	
	obj4 = document.getElementById("pl4");
	plArr[3] = parseInt(obj4.innerText);
	
	return plArr;
	
};

function checkWhite(plArr) {		//function checks how many circles are the correct color. Subtracting by the amount of circles in the correct spot will give us the correct
	var white = 0;					//hint. The white variable is named for the board game; before I selected white as a better color for this program.
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {		//these for loops go through both the CPU's arr and the player's guess array.
			if (arr[i] == plArr[j]) {	//if the guess and the CPU's color is the same...
				white++;				//increase white, then change the player's array to 10 in that position so it isn't counted again.
				plArr[j] = 10;
				break;
			}
		}
	}
	return white;			//return the amount of circles that are the correct color.
};

function printGuess(plArr, black, white) {
	var newCircles = "<div>";						//initialize a string that will be used to print the new circles to the play area.
	var gameSpace = document.getElementById('space');		//get the game space from the document. The submited answer will be printed above it.
	for (i = 0; i < 4; i++) {							//for loop adds a new circle to the string for each element in the player's array.
		switch (plArr[i]) {			//like above, 0 = green, 1 = blue, etc.
			case 0:
				newCircles += "<div class = 'symbols'></div>";
				break;
			case 1:
				newCircles += "<div class = 'symbols' style = 'background-color: #6FC6F7;'></div>";
				break;
			case 2:
				newCircles += "<div class = 'symbols' style = 'background-color: #ED6B7F;'></div>";
				break;
			case 3:
				newCircles += "<div class = 'symbols' style = 'background-color: #FADD5F;'></div>";
				break;
			case 4:
				newCircles += "<div class = 'symbols' style = 'background-color: black;'></div>";
				break;
			case 5:
				newCircles += "<div class = 'symbols' style = 'background-color: #C866F2;'></div>";
				break;
		}
	}
	
	for (i = 0; i < black; i++) {
		newCircles += "<div class = 'clue' style = 'background-color: black;'></div>";		//adds a new black square to the string for each number in "black"
	}
	for (i = 0; i < white; i++) {
		newCircles += "<div class = 'clue' style = 'background-color: yellow;'></div>";		//adds an white square for each number in "white"
	}
	if (black + white < 4) {
		for (i = black + white; i < 4; i++) {
			newCircles += "<div class = 'clue' style = 'background-color: #ffffff; border-color: black;'></div>"	//adds a white square until all the squares add up to 4
		}																										//so everything lines up nice.
	}
	
	newCircles += "</div>";								//add the end tags to the string.
	document.getElementById("guessSpace").innerHTML += newCircles;	//print the string to the document, creating the circles.
	//console.log(plArr);

}

function checkArrays() {
	var plArr = checkAnswer();		//calls a function that reads the player's input and stores it in an array.
	
    // Check if there are duplicates in the player's selection
    if (hasDuplicates(plArr)) {
        alert("Vous devez choisir 4 couleurs différentes!");
        return; // Stop execution if there are duplicates
    }
    
    var black = 0;					//variable to store how many circles are the correct color in the correct position.
	for (i = 0; i < 4; i++) {		//for loop determines how many circles are the correct color in the correct position and stores that number in "black."
		if (plArr[i] == arr[i]) {
			//console.log(true);
			black++;
		} else {
			//console.log("Not the same");		//for testing purposes.
		}
	};
	if (black == 4) {										//if there are 4 correct colors in the correct position, the code is correct.
		//console.log("They're the same");
		document.getElementById("btn").disabled = true;		//disable the "submit guess" button so the player can't alter the play field anymore.
		guesses++;											//count this as the last guess.
		winner(guesses);
	} else {
		var white = checkWhite(plArr) - black;		//"white" stores the amount of white squares that need to be printed if the guess is incorrect. The variable is named for
		guesses++;									//the board game, rather than this because I hadn't selected a color yet. They're subtracted because the checkWhite()
		//console.log("black: " +black);			//function only determines if there are circles of the same color.
		//console.log("white: " +white);
		obj1 = document.getElementById("pl1");
		plArr = checkAnswer();						//calls checkAnswer() again because apparently plArr is a global variable?
		printGuess(plArr, black, white);			//print the guess to the game area.
         if (guesses >= 8) {
            // Check if the player has exceeded xx attempts
            document.getElementById("btn").disabled = true; // Disable the button to prevent further guesses
            showLosePopup(); // Display "You Lose" popup
        }
	};
};

function hasDuplicates(arr) {
    // Function to check if there are duplicates in the array
    return (new Set(arr)).size !== arr.length;
}

function showLosePopup() {
    var modal = document.getElementById("myModal");
    var textStuff = "<center><h1>Vous avez perdu!</h1>Désolé, vous n'avez pas réussi à trouver le code en 8 coups.<br />";
    
    // Display the solution with color circles
    textStuff += "<div class='solutionCircles'>";
    for (let i = 0; i < arr.length; i++) {
        textStuff += "<div class='symbols' style='background-color: " + getColorCode(arr[i]) + ";'></div>";
    }
    textStuff += "</div>";

    textStuff += "<button id='restartBtn' onClick='location.reload();'>Rejouer</button></center>";

    document.getElementById("modal-content").innerHTML += textStuff;
    modal.style.display = "block";
}

function getColorCode(colorIndex) {
    // Function to get the color code based on the index
    switch (colorIndex) {
        case 0:
            return '#67E06F'; // Green
        case 1:
            return '#6FC6F7'; // Blue
        case 2:
            return '#ED6B7F'; // Red
        case 3:
            return '#FADD5F'; // Yellow
        case 4:
            return '#000000';   // Black
        case 5:
            return '#C866F2'; // Purple
        default:
            return '#ffffff'; // Default to white
    }
}


function winner(guesses) {		//function brings up a popup, tells the user their score, then gives them the option to refresh the page.
	var modal = document.getElementById("myModal");				//popup div
	var textStuff = "<center><h1>Bravo!</h1>Vous avez trouvé<br>le CODE en ";	//variable for the text that goes inside the popup.
	textStuff += guesses;
	textStuff += " coups.<br />"
	switch (guesses) {			//switch statement gives feedback based on how many guesses it took to crack the code.
		case 1:
			textStuff += "Bof, un coup de chance!<br />";
			break;
		case 2:
			textStuff += "Chanceux!<br />";
			break;
		case 3: case 4: case 5:
			textStuff += "Bien joué!<br />";
			break;
		case 6: case 7:
			textStuff += "Félicitations!<br />";
			break;
		default:
			textStuff += "Juste à temps!<br />";
			break;
	}
	
     // Display the solution with color circles
    textStuff += "<div class='solutionCircles'>";
    for (let i = 0; i < arr.length; i++) {
        textStuff += "<div class='symbols' style='background-color: " + getColorCode(arr[i]) + ";'></div>";
    }
    textStuff += "</div>";
   
    textStuff += "<button id = 'restartBtn' onClick = 'location.reload();'>Rejouer!</button>";
    
    textStuff += "<button id = 'codeBtn' onclick = 'copyMessage();'>Copier</button></center>";
	
    document.getElementById("modal-content").innerHTML += textStuff;
	modal.style.display = "block";
}

function copyMessage() {
    
    let message = `🟢🔵🔴🟡⚫️🟣🟠🟤\n`;
    message += `J'ai trouvé le CODE en ${guesses} coups!\n`;
    message += `\nJoué au CODE ici:\nhttps://charpie2000.github.io/cm`;
    message += `\n🟢🔵🔴🟡⚫️🟣🟠🟤\n`;

    
    // Copy the text content to the clipboard
    navigator.clipboard.writeText(message).then(() => {
        alert("message copié en mémoire");
    }).catch((err) => {
        console.error('Erreur', err);
    });
}