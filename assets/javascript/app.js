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
var question = new Question("Saved By the Bell was a reboot of what show?","The Wonderful Years","Hanging With Mr. Belvidere","Good Morning, Miss Bliss","The Days of Our Lives","c");
questions.push(question);
question = new Question("Which of the following is not a Saved By the Bell spin-off or movie?","Hawaiian Style","The College Years","Wedding in Las Vegas","Bayside on the Wayside","d");
questions.push(question);
question = new Question("How many Saved By the Bell novels are there?","21","25","11","37","a");
questions.push(question);
question = new Question("Who played the character Screech?","Lou Diamond Phillips","Dennis Haskins","Jessie Spanowski","Dustin Diamond","d");
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
                
                timer.stop();
                var question = questions[number];
                console.log(question);
                var answer = question.answer;
                var answerText = question[answer];
                $("#floater").text("Sorry, you're out of time.\n The correct answer is "+answer+": "+answerText);
                newGame.incorrect++;
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
                   setTimeout(function(){ 
                   $("#floater").text("Game over!\nCorrect Answers: "+newGame.correct+"\nIncorrect Answers: "+newGame.incorrect);
                   $("#button").html("<button id='restart'>Play Again!</button>");
                   },5000);
                }

            }
            $("#seconds").text(timer.time);
            
        };

Timer.prototype.reset = function(){
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
        $("#floater").text("Game over! Correct Answers: "+newGame.correct+" Incorrect Answers: "+newGame.incorrect);
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

