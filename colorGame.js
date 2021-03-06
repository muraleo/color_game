var difficulty = 6;
var squares = document.querySelectorAll(".square");
var rgbValue = document.querySelector("h2");
var target = Math.floor(Math.random() * difficulty);
var colors = colorGenerator();
var answerColor = rgbToString(colors[target][0], colors[target][1], colors[target][2]);
var message = document.querySelector("div span");
var resetButton = document.querySelector("button");
var modes = document.querySelectorAll(".mode");

function setUp(){
	addListenters();
	changeSquareColor();
}

function addListenters(){
	resetButton.addEventListener("click", function(){
		reset();
	})

	for (var i = 0; i < 3; i++) {
		modes[i].addEventListener("click", function(){
			difficulty = corr_diff(this);
			reset();
			unselected();
			this.classList.add("selected");
		})
	}
}

// easyButton.addEventListener("click", function(){
// 	difficulty = 3;
// 	reset();
// 	this.classList.add("selected");
// 	hardButton.classList.remove("selected");
// 	expertButton.classList.remove("selected");
// })

// hardButton.addEventListener("click", function(){
// 	difficulty = 6;
// 	reset();
// 	this.classList.add("selected");
// 	easyButton.classList.remove("selected");
// 	expertButton.classList.remove("selected");
// })

// expertButton.addEventListener("click", function(){
// 	difficulty = 9;
// 	reset();
// 	this.classList.add("selected");
// 	hardButton.classList.remove("selected");
// 	easyButton.classList.remove("selected");
// })

function colorGenerator(){
	result = [];
	for (var i = 0; i < difficulty; i++) {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		temp = [r, g, b];
		result.push(temp);
	}
	return result;
}

function unselected(){
	for (var i = 0; i < 3; i++) {
		modes[i].classList.remove("selected");
	}
}

function changeSquareColor(){
	for (var i = 0; i < difficulty; i++) {
		var temp = rgbToString(colors[i][0], colors[i][1], colors[i][2])
		// console.log(i);
		squares[i].style.background = temp;
		squares[i].addEventListener("click", function(){
			if(this.style.background === answerColor){
				message.textContent = "Good Job!";
				winnerColor();
				resetButton.textContent = "Play Again?";
			}
			else{
				this.style.backgroundColor = "#232323";
				message.textContent = "Try Again!";
			}
		})
	}
	rgbValue.textContent = answerColor;
	blockSquare(9-difficulty);
}

function rgbToString(a1, a2, a3){
	return "rgb("+a1.toString()+", "+a2.toString()+", "+a3.toString()+")";
}

function winnerColor(){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = answerColor;
		document.querySelector("h1").style.background = answerColor;
	}
}

function reset(){
	target = Math.floor(Math.random() * difficulty);
	colors = colorGenerator();
	answerColor = rgbToString(colors[target][0], colors[target][1], colors[target][2]);
	changeSquareColor();
	document.querySelector("h1").style.background = "steelblue";
	message.textContent = "Welcome"
	resetButton.textContent = "New Colors"
}

function blockSquare(num){
	for (var i = 3; i < 9 ; i++) {
		squares[i].style.display = "block";
	}
	for (var i = 0; i < num ; i++) {
		squares[8-i].style.display = "none";
	}
}

function corr_diff(obj){
	if(obj.textContent === "Easy"){
		return 3;
	}else if(obj.textContent === "Hard"){
		return 6;
	}else if(obj.textContent === "Expert"){
		return 9;
	}
}

setUp();