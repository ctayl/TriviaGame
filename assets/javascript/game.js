// Class for creating Question Objects
class Question {

    // Takes in Question parameters and initializes values
    constructor(question, answer, falseOne, falseTwo) {
        this._question = question;
        this._answer = answer;
        this._falseOne = falseOne;
        this._falseTwo = falseTwo;
    }

    get question() {
        return this._question;
    }

    get answer() {
        return this._answer;
    }
}

// Game Object
var game = {
    score: 0,
    count: 0,

    // This array holds question-answer packets
    questions: [],

    // This array is used to shuffle the questions array
    newQuestions: [],

    // This array holds the Question Objects after their creation
    final: [],

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
                // console.log(rng);

                // If 1
                if (rng === 1) {

                    // Take from the front of the questions array 
                    var transfer = game.questions.shift([rng]);
                    game.newQuestions.push(transfer);
                    // console.log(transfer);
                    // console.log(game.newQuestions);

                    // if 0
                } else if (rng === 0) {

                    // Take from the end of the questions array
                    var transfer = game.questions.pop([rng]);
                    game.newQuestions.push(transfer);
                    // console.log(transfer);
                    // console.log(game.newQuestions);

                    // paranoia
                } else {
                    game.shuffle();
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
            ["What is a recursive function?", "A function which calls itself", "A function which is called in another function", "A function which is called in a loop"],
            ["What is the output of: [return ((true + 3) + 'true') + (5 * false)]", "'4true0'", "5", "true"],
            ["What does ';' do in Javascript?", "Separates statements", "Causes an evaluation", "Causes a return"]
        ];
    },

    createQuestions: function () {
        // Create the First Trivia Question 
        var q0 = new Question(game.questions[0][0], game.questions[0][1], game.questions[0][2], game.questions[0][3]);
        console.log(q0);
        var q1 = new Question(game.questions[1][0], game.questions[1][1], game.questions[1][2], game.questions[1][3]);
        console.log(q1);
        var q2 = new Question(game.questions[2][0], game.questions[2][1], game.questions[2][2], game.questions[2][3]);
        console.log(q2);
        var q3 = new Question(game.questions[3][0], game.questions[3][1], game.questions[3][2], game.questions[3][3]);
        console.log(q3);
        var q4 = new Question(game.questions[4][0], game.questions[4][1], game.questions[4][2], game.questions[4][3]);
        console.log(q4);
        game.final = [q0, q1, q2, q3, q4];
    },

    mix: function () {

        // game.choices = [0, 1, 2];
        // game.choiceMix = [];
        console.log(game.choices);
        for (let a = 0; a < 6; a++) {
            for (var l = 3; l > 0; l--) {
                let flip = Math.floor(Math.random() * 2);
                // console.log("flip: " + flip);

                if (flip === 0) {
                    let xfer = game.choices.shift();
                    // console.log("Shifted: " + xfer);
                    if (typeof xfer === "string") {
                        game.choiceMix.push(xfer)
                    } else {
                        console.log("failed")
                        return;
                    }
                    ;
                } else if (flip === 1) {
                    let xfer = game.choices.pop();
                    // console.log("popped: " + xfer);
                    if (typeof xfer === "string") {
                        game.choiceMix.push(xfer)
                    } else {
                        console.log("failed")
                        return;
                    }
                } else {
                    return;
                }
                // console.log(game.choiceMix);

            }
            game.choices = game.choiceMix;
            game.choiceMix = [];
        }
    },
    render: function (question) {
        game.choices = [];
        // console.log(game.choices);
        // console.log(question._answer);
        game.choices.push(question._answer);
        // console.log(question._falseOne);
        game.choices.push(question._falseOne);
        // console.log(question._falseTwo);
        game.choices.push(question._falseTwo);
        // console.log(question._falseTwo);
        // console.log(game.choices);
        game.mix();
        // console.log(game.choices);
        $("#question-holder").text(question._question);
        $("#txt-0").text(game.choices[0]);
        $("#radio-0").attr("value", game.choices[0]);
        $("#txt-1").text(game.choices[1]);
        $("#radio-1").attr("value", game.choices[1]);
        $("#txt-2").text(game.choices[2]);
        $("#radio-2").attr("value", game.choices[2]);
    },
    check: function (target) {

        target = $("#result").val()
        console.log(target)
        if ($("#result").val() === game.final[game.count]._answer) {
            game.score++;
            console.log("game count " + game.count);
            console.log("score: " + game.score);
        } else if ($("#result").val() != game.final[game.count]._answer) {
            console.log("-1");
            game.score--;
            console.log("score: " + game.score);
        }
        game.count++;
        if (game.count === 5) {
            console.log("test");
            $("html").text(game.score);
            return;
        }
        console.log("game count " + game.count);
        console.log(game.count);
        game.render(game.final[game.count]);
        
        $('input[type=radio]').prop('checked', function () {
            return this.getAttribute('checked') == 'checked';
        });

        $("#result").val("");
    }


}

// High Level Logic 

game.reset();
game.shuffle();
game.createQuestions();




$(document).ready(function () {
    game.render(game.final[game.count]);
    $("#b1").on("click", function () {

        game.check($("#result").val());

    })
});
