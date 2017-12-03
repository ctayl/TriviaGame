class Question {
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

var game = {
    count: 0,
    questions: [],
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
        }
    },

    // Initialize questions array at load
    reset: function () {
        game.questions = [["question0", "answer0"], ["question1", "answer1"], ["question2", "answer2"], ["question3", "answer3"], ["question4", "answer4"]];
    },

    questionOne: {
        question: "question1",
        answer: "answer1",
        false: ["false1" , "false1"]
    }
}
game.reset();
game.shuffle();


const q1 = new Question(game.questions[0][0], game.questions[0][1], "false-one", "false-two");
console.log(q1);


