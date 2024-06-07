// create a new pattern

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

/***********************EVENT HANDLING ***********************/
// starting the game
$(document).on("keydown", function(){
    if (!started){
        nextSequence();
        $("h1").text("Level "+level);
        started = true;
    }
});

// detect when any of the buttons are clicked
$(".btn").on("click", function(){
    userChosenColour = this.id; // referencing the id of the clicked button
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


// recall sequence
function recallSequence(){

    for(var i = 0; i < gamePattern.length; i++){
        $("#"+gamePattern[i]).fadeOut(200).fadeIn(200); // using #id selector to select the random button to flash
        var sound = new Audio("sounds/"+gamePattern[i]+".mp3"); // playing a sound while the button flashes
        sound.play();
    }

    setTimeout(function(){
            nextSequence();
        }, 1000);

        
}

function nextSequence(){ // generate a random number
    var randomNum = Math.random();
    randomNum = Math.floor(randomNum * 4 );

    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

   // indicate the button to be selected next
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200); // using #id selector to select the random button to flash
    var sound = new Audio("sounds/"+randomChosenColour+".mp3");// playing a sound while the button flashes
    sound.play();

     // increment level
     level++;
     $("h1").text("Level "+level);
}

// playing the sound of the selected button
function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3") // playing a sound while button is being pressed
    sound.play();
}

// animating the pressing of a button
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed"); // adding a class to change animation

    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");}, 100);  //removing class after some timeout 
    ;
}

// checking the users answer
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                //recallSequence();
                nextSequence();
                userClickedPattern = []; // we start the array afresh and check if the last element is equal to the gamePattern + check the lengths if they're the same
            }, 1000);
            
        }
    }
    else{
        // incorrect answer
        playSound("wrong"); 
        $("body").addClass("game-over"); // gave is over when they get something incorrect
        $("h1").text("Game Over, Press Any Key to Restart"); // change heading

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// restarting the game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}