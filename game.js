var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level =0;
var started=false;

$(".btn").on("click", function() {
    var userChosenColor=($(this).attr("id"));
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length)-1);
});

$(document).on("keypress", function() {
    if(!started){
    $("h1").text("Level 0");
    nextSequence();
    started=true;
}
})
    
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}
function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}

function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern=[];
    level=level+1;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor((Math.random()*4));
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor); 

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
}