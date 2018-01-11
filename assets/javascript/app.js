function Game(questions){
	this.questions = questions;
	this.correct = 0;
	this.incorrect = 0;
	this.draw = function(question){
		$("#question").text(question.text);
		$("#a").text(question.a);
		$("#b").text(question.b);
		$("#c").text(question.c);
		$("#d").text(question.d);
	}
	
}

function Timer(length,game,number){
        this.intervalId;
        this.timeUp = false;
        this.active = false;
        this.time = length;
        this.number = number;
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

$(document).ready(function(){
var interval;
var newGame = new Game(questions);
var timer = new Timer(30,newGame,0);
Timer.prototype.start = function(){
            
            if(!timer.active)
            {                
                timer.intervalId = setInterval(timer.count,1000);
                timer.active = true;
            }
        };
Timer.prototype.count = function(){
            newGame.draw(newGame.questions[timer.number]);
            $("#seconds").text(timer.time);
            console.log(timer.time);

            if (timer.time>0)
            {
                timer.time--;
            }
            else
            {
                timer.timeUp = true;
                timer.stop();
            }
        };

Timer.prototype.reset = function(){
            timer.timeUp = false;
            timer.active = false;
            timer.time = length;
        };
Timer.prototype.stop = function(){
            if(timer.active)
            {   
                clearInterval(timer.intervalId);
                timer.active = false;
            }
        };
timer.start();

$(".answer").on("click", function(){
    var choice = $(this).attr("id");
    console.log(choice);
    if (choice != questions[timer.number].answer)
    {
       alert("wrong!");
    }
    else
    {
       alert("right!");
    }

})
});

