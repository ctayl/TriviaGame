// Class for creating Question Objects
class Question {

    // Takes in Question parameters and initializes values
    constructor(question, answer, falseOne, falseTwo) {
        this._question = question;
        this._answer = answer;
        this.falseOne = falseOne;
        this._falseTwo= falseTwo;
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
    count: 0,

    // This array holds question-answer packets
    questions: [],

    // This array is used to shuffle the questions array
    newQuestions: [],

    // Randomizes the Trivia Questions
    shuffle: function () {

        // Shuffles 7 times
        for (var l = 0; l < 7; l++) {

            // Core shuffle logic
            for (var i = game.questions.length; i > 0; i--) {

                // Chooses randomly between 1 and 0
                var rng = Math.floor(Math.random() * 2);
                console.log(rng);

                // If 1
                if (rng === 1) {

                    // Take from the front of the questions array 
                    var transfer = game.questions.shift([rng]);
                    game.newQuestions.push(transfer);
                    console.log(transfer);
                    console.log(game.newQuestions);

                    // if 0
                } else if (rng === 0) {

                    // Take from the end of the questions array
                    var transfer = game.questions.pop([rng]);
                    game.newQuestions.push(transfer);
                    console.log(transfer);
                    console.log(game.newQuestions);

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

        // SHuffle done
    },

    // Initialize questions array at load
    reset: function () {
        game.questions = [["question0", "answer0", "false0.0", "false0.1"], ["question1", "answer1", "false1.0", "false1.1"], ["question2", "answer2", "false2.0", "false2.1"], ["question3", "answer3", "false3.0", "false3.1"], ["question4", "answer4", "false4.0", "false4.1"]];
    },

}
game.reset();
game.shuffle();

// Create the First Trivia Question 
const q0 = new Question(game.questions[0][0], game.questions[0][1], game.questions[0][2], game.questions[0][3]);
console.log(q0);
const q1 = new Question(game.questions[1][0], game.questions[1][1], game.questions[1][2], game.questions[1][3]);
console.log(q1);
const q2 = new Question(game.questions[2][0], game.questions[2][1], game.questions[2][2], game.questions[2][3]);
console.log(q2);
const q3 = new Question(game.questions[3][0], game.questions[3][1], game.questions[3][2], game.questions[3][3]);
console.log(q3);
const q4 = new Question(game.questions[4][0], game.questions[4][1], game.questions[4][2], game.questions[4][3]);
console.log(q4);

$(document).ready(function() {
    $("#b1").on("click", function(){
        $("#radio-0").text(q0._answer);
        console.log("test");
    })
});
