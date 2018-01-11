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
        this.start = function(){
             if(!this.active)
            {
                console.log(this);
                this.intervalId = setInterval(function(this){ 
                game.draw(game.questions[number]);
                $("#seconds").text(this.time);
            
                if (this.time>0)
                {
                    this.time--;
                }
                else
                {
                this.timeUp = true;
                this.stop();
                }
                },1000);
                this.active = true;
            }
        }
        this.stop = function(){
            if(this.active)
            {   
                clearInterval(this.intervalId);
                this.active = false;
            }
        }
                   
        this.reset = function(){
            this.timeUp = false;
            this.active = false;
            this.time = length;
        }
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
var question = new Question("What is my name?","Austin","Steve","Jack","Fish","Austin");
questions.push(question);

$(document).ready(function(){
var interval;
var newGame = new Game(questions);
var timer = new Timer(30,newGame,0);
timer.start();


});