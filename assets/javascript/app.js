function Game(questions){
	this.questions = questions;
	this.correct = 0;
	this.incorrect = 0;
   	this.draw = function(question){
		$("#question").html("<h3>"+question.text+"</h3>");
		$("#a").html("<h3>"+question.a+"</h3>");
		$("#b").html("<h3>"+question.b+"</h3>");
		$("#c").html("<h3>"+question.c+"</h3>");
		$("#d").html("<h3>"+question.d+"</h3>");
	}
	
}

function Timer(length){
        this.intervalId;
        this.timeUp = false;
        this.active = false;
        this.time = length;
        this.length = length;
}

var questions = [];

function Question(text,a,b,c,d,answer)
{
	
	this.text = text;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
    this.answer = answer;
}
var question = new Question("What is my name?","Austin","Steve","Jack","Fish","a");
questions.push(question);
question = new Question("What is the point?","to win","to lose","asdf","afsf","a");
questions.push(question);

$(document).ready(function(){
var interval;
var newGame = new Game(questions);
var timer = new Timer(30);
var number = 0;
Timer.prototype.start = function(){
            
            if(!timer.active)
            {                
                timer.interval = setInterval(timer.count,1000);
                timer.active = true;
                $("#timer").html("<h3>There are <span id='seconds'>"+timer.length+"</span> seconds remaining!</h3>");
            }
        };
Timer.prototype.count = function(){
            
            if (timer.time>0)
            {
                timer.time--;
            }
            else
            {
                timer.timeUp = true;
                timer.stop();
            }
            $("#seconds").text(timer.time);
            
        };

Timer.prototype.reset = function(){
        timer.timeUp = false;
        timer.active = false;
        timer.time = timer.length;
        console.log(timer);
};
Timer.prototype.stop = function(){
            if(timer.active)
            {   
                clearInterval(timer.interval);
                timer.active = false;
            }
        };

    newGame.draw(questions[number]);
    timer.start();

$(".answer").on("click", function(){
    var choice = $(this).attr("id");
    var question = questions[number];
    console.log(question);
    var answer = question.answer;
    var answerText = question[answer];
    timer.stop();
    if (choice != answer)
    {
        
        $("#floater").text("That is incorrect. The correct answer is "+answer+": "+answerText);
        newGame.incorrect++;
    }
    else
    {
        $("#floater").text("That is correct. The answer is "+answer+": "+answerText);
        newGame.correct++;
    }
    clicked = true;
    number++;
    if (number < questions.length)
    {
        setTimeout(function(){
        $("#floater").text("");
        $("#timer").html("");
        timer.reset();
        newGame.draw(questions[number]);
        timer.start();
        },5000);
    }
    else
    {
        $("#floater").text("Game over!\nCorrect Answers: "+newGame.correct+"\nIncorrect Answers: "+newGame.incorrect);
        $("#button").html("<button id='restart'>Play Again!</button>");
    }
});

$("#button").on("click", function(){
    newGame = new Game(questions);
    number = 0;
    newGame.correct = 0;
    newGame.incorrect = 0;
    timer.stop();
    timer.reset();
    $("#floater").text("");
    $("#button").html("");
    timer.start();
    newGame.draw(questions[number]);
});

});

