// Class for creating Question Objects
class Question {

    // Takes in Question parameters and initializes values
    constructor(question, answer, falseOne, falseTwo) {
        this._question = question;
        this._answer = answer;
        this._falseOne = falseOne;
        this._falseTwo = falseTwo;
    }
}

// Game Object
var game = {
    score: 0,
    count: 0,
    timer: 0,
    interval: 0,

    // This array holds question-answer packets
    questions: [],

    // This array is used to shuffle the questions array
    newQuestions: [],

    // This array holds the Question Objects after their creation
    final: [],

    // Arrays used to shuffle the order in which button values are assigned
    choices: [],

    choiceMix: [],

    // Randomizes the Trivia Questions
    shuffle: function () {

        // Shuffles 7 times
        for (var l = 0; l < 7; l++) {

            // Core shuffle logic
            for (var i = game.questions.length; i > 0; i--) {

                // Chooses randomly between 1 and 0
                var rng = Math.floor(Math.random() * 2);

                // If 1
                if (rng === 1) {

                    // Take from the front of the questions array 
                    var transfer = game.questions.shift([rng]);
                    game.newQuestions.push(transfer);

                    // if 0
                } else if (rng === 0) {

                    // Take from the end of the questions array
                    var transfer = game.questions.pop([rng]);
                    game.newQuestions.push(transfer);

                    // paranoia
                } else {

                    return
                }
            }

            // Move the mixed questions back into questions array
            game.questions = game.newQuestions;
            game.newQuestions = [];

            // Back to top x7
        }

        // Shuffle done
    },

    // Initialize questions array at load
    reset: function () {
        game.questions = [
            ["What kind of language is Javascript?", "Interpreted", "Compiled", "Low-Level"],
            ["Which year was the first message sent over the Internet?", "1969", "1972", "1968"],
            ["A recursive function...", "Calls itself", "Is called in another function", "Is called in a loop"],
            ["What is the output of: [return ((true + 3) + 'true') + (5 * false)]", "'4true0'", "5", "true"],
            ["What does ';' do in Javascript?", "Separates statements", "Causes an evaluation", "Causes a return"]
        ];
    },

    createQuestions: function () {
        // Creates question objects from the list, loads them into final array
        for (let x = 0; x < game.questions.length; x++) {
            game.final.push(new Question(game.questions[x][0], game.questions[x][1], game.questions[x][2], game.questions[x][3]));
        }
    },

    // Mixes the order in which options appear 
    mix: function () {

        // Shuffles 6 times
        for (let a = 0; a < 6; a++) {

            // Core shuffle logic
            for (var l = 3; l > 0; l--) {

                // Generates a random number between 0 and 1
                let flip = Math.floor(Math.random() * 2);

                // If 0
                if (flip === 0) {

                    // Take from the front of the array
                    let xfer = game.choices.shift();
                    if (typeof xfer === "string") {
                        game.choiceMix.push(xfer)

                        // Prevents invalid returns
                    } else {

                        console.log("failed")
                        return

                    }

                    // if 1
                } else if (flip === 1) {

                    // Take from the back of the array
                    let xfer = game.choices.pop();
                    if (typeof xfer === "string") {
                        game.choiceMix.push(xfer)
                    } else {

                        // Prevents invalid returns
                        console.log("failed")
                        return
                    }
                } else {

                    return
                }


            }

            // Moves shuffled choices back into their array
            game.choices = game.choiceMix;
            game.choiceMix = [];
        }
    },

    // Handles the interaction between the question objects and the radio buttons, uses mix() to shuffle positions, takes in question objecs
    render: function (question) {

        // Clear choice array
        game.choices = [];

        // Reset timer
        game.timer = 30;


        // Loads the possible responses into choice array
        game.choices.push(question._answer);
        game.choices.push(question._falseOne);
        game.choices.push(question._falseTwo);

        // Mix() called on choice array
        game.mix();

        // Renders current question
        $("#question-holder").text(question._question);

        game.interval = setInterval(function () {
            game.timer--;
            $("#time-holder").text("Seconds left: " + game.timer);
            if (game.timer === 0) {
                game.check();
            }
        }, 1000);

        // Sets responses to radio buttons
        $("#txt-0").text(game.choices[0]);
        $("#radio-0").attr("value", game.choices[0]);
        $("#txt-1").text(game.choices[1]);
        $("#radio-1").attr("value", game.choices[1]);
        $("#txt-2").text(game.choices[2]);
        $("#radio-2").attr("value", game.choices[2]);
    },

    // Checks answers
    check: function (target) {

        clearInterval(game.interval);
        target = $("#result").val()
        console.log(target)

        // If answer is correct
        if ($("#result").val() === game.final[game.count]._answer) {
            // Add one to score
            game.score++;
            $("#score-holder").text("Score : " + game.score);
            $("#question-holder").text("Correct!");
            clearInterval(game.interval);
            setTimeout(function(){
                $("#question-holder").text("Your Response: " + game.final[game.count -1]._answer);
            }, 1500)

            // If answer is wrong
        } else if ($("#result").val() != game.final[game.count]._answer) {

            $("#question-holder").text("Wrong!");
            clearInterval(game.interval);
            setTimeout(function(){
                $("#question-holder").text("Correct Response: " + game.final[game.count -1]._answer);
            }, 1500)
        }

        // Move to the next question object
        game.count++;
        if (game.count === 1) {
            $(".progress-bar").css("width", "20%");
        } else if (game.count === 2) {
            $(".progress-bar").css("width", "40%");
        } else if (game.count === 3) {
            $(".progress-bar").css("width", "60%");
        } else if (game.count === 4) {
            $(".progress-bar").css("width", "80%");
        } else if (game.count === 1) {
            $(".progress-bar").css("width", "100%");
        }

        // End case
        if (game.count === 5) {
            console.log("test");
            $("html").html("<h1 style='text-align: center'>You answered " + game.score +" questions correctly!</h1> <br> <a style='text-align: center' href='index.html'><h1>Try Again!</h1></a>");
            return;
        }

        $('#b1, #result').css('display', 'none');

        setTimeout(function () {
            // Renders next question object
            game.render(game.final[game.count]);

            // Clears radio buttons 
            $('input[type=radio]').prop('checked', function () {
                return this.getAttribute('checked') == 'checked';
            });

            $('#b1').css('display', 'initial');

            // Clears result 
            $("#result").val("");
        }, 4000)

    }


}

// High Level Logic 

game.reset();
game.shuffle();
game.createQuestions();



// JQ stoof
$(document).ready(function () {

    $("#score-holder").text("Score : " + game.score);
    $(".progress-bar").css("width", "0%");

    // Picks question objects in order from the shuffled arrays, using game.count to iterate
    game.render(game.final[game.count]);

    // Moves the value of the radio button click into result
    $('input[type=radio]').on("click", function () {
        document.getElementById('result').value = $(this).val();
    });


    // Submit button, runs the .check function, passing the value of the result in
    $("#b1").on("click", function () {

        game.check($("#result").val());

    })
});


