/*eslint-env browser*/
//javascript.js


// Game logic
// click button Start/Reset Game
// if already started:
    // reload page (reset game)
// else start new game:
    // Set button Set/Reset to Rest
    // Start timer
    // set score to 0
    //while time is not over:
        // generate question and answers
        // if correct - increase score and continue
// if time is over:
    // show Final Score and Game Over

var play = false;
var score = 0;
var action;
var remainingTime;
var correctAnswer;

document.getElementById("startreset").onclick = function(){ 
    //if we are playing
    if (play == true) {
        location.reload();  
    } else {
        play = true;
        
        //reset button Start/Reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        //start timer
        startCountDown();
        
        // set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        //generate Q&A
        generateQA();
        
        // set initial amount of time
        remainingTime = 30;
        document.getElementById("timeremainingvalue").innerHTML = remainingTime;
        
    }
    
}

function startCountDown() {
    
    action = setInterval(function(){
        remainingTime--;
        document.getElementById("timeremainingvalue").innerHTML = remainingTime;
        if (remainingTime == 0) { 
            stopCountDown();
            show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Game over</p><p>Your score is " + score + ".</p>";   
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            play = false;
            document.getElementById("startreset").innerHTML = "Start Game";            
        }
    },1000);
}

function stopCountDown() {
    clearInterval(action);
}

function generateQA() {
    var a = Math.round(Math.random()*20);
    var b = Math.round(Math.random()*20);
    var sign;
    // addition or subtraction
    sign = Math.random()>= 1/2 ? 1 : -1;
    correctAnswer = a + sign*b;
    document.getElementById("question").innerHTML = a + (sign == 1 ? " + " : " - ") + b;
    //  box which contains a correct answer
    var correctPosition = 1 + Math.round(Math.random() * 3);
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; 
    // array of answers
    var answers = [correctAnswer];
    var i;
    for (i = 1; i<= 4; i++) {
        if (i != correctPosition) {
            // add non-existing wrong answer and show it
            var wrongAnswer;
            do {
                wrongAnswer = Math.round(Math.random()*20) + (Math.random()>= 1/2 ? 1 : -1)*Math.round(Math.random()*20); 
            } while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

// what if the answer is chosen
var i;
for (i = 1; i <= 4; i++) {
    document.getElementById("box"+i).onclick = function() {
        // only if we are playinh
        if (play == true) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                show("correct");
                hide("wrong");
                setTimeout(function(){
                    hide("correct");   
                }, 1000);
                generateQA();
            } else {
                show("wrong");
                hide("correct");
                setTimeout(function(){
                    hide("wrong");   
                }, 1000);
            }
       } 
    }
}

// additional functions to hde and show elements
function hide(element) {
    document.getElementById(element).style.display = "none"; 
}

function show(element) {
    document.getElementById(element).style.display = "block"; 
}
      
