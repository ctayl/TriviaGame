# TriviaGame

Stuff Things Do:

// Class for creating Question Objects

    // Takes in Question parameters and initializes values


// Game Object


    // This array holds question-answer packets
  
    // This array is used to shuffle the questions array
 
    // This array holds the Question Objects after their creation

    // Arrays used to shuffle the order in which button values are assigned

    // Randomizes the Trivia Questions

        // Shuffles 7 times

            // Core shuffle logic

                // Chooses randomly between 1 and 0

                // If 1

                    // Take from the front of the questions array 

                    // if 0

                    // Take from the end of the questions array


            // Move the mixed questions back into questions array

            // Back to top x7

        // Shuffle done

    // Initialize questions array at load


        // Creates question objects from the list, loads them into final array

    // Mixes the order in which options appear 

        // Shuffles 6 times

            // Core shuffle logic

                // Generates a random number between 0 and 1

                // If 0

                    // Take from the front of the array

                        // Prevents invalid returns

                    // if 1

                    // Take from the back of the array

                        // Prevents invalid returns

            // Moves shuffled choices back into their array


    // Handles the interaction between the question objects and the radio buttons, uses mix() to shuffle positions, takes in question objecs

        // Clear choice array

        // Reset timer

        // Loads the possible responses into choice array

        // Mix() called on choice array

        // Renders current question

        // Sets responses to radio buttons

    // Checks answers

        // If answer is correct

            // Add one to score

            // If answer is wrong



        // Move to the next question object

        // End case

        setTimeout(function () {
            // Renders next question object

            // Clears radio buttons 

            // Clears result 



    // Picks question objects in order from the shuffled arrays, using game.count to iterate

    // Moves the value of the radio button click into result


    // Submit button, runs the .check function, passing the value of the result in



