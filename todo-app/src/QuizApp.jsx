import React, { useState } from 'react';

const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: "Mars"
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: "4"
    }
  ];

const QuizApp = () => {
  

  const [currentQuestion, setCurrentQuestion] = useState(0); // Which question card are we looking at? (starts at 0, which means the first card) // Keeps track of which question you're on (starts at 0 = first question)


  const [selectedAnswer, setSelectedAnswer] = useState(''); //Which answer did you pick? Tracks the answer the user selected (starts empty) // 

   const [feedback, setFeedback] = useState(''); // Stores the text that says “Correct!” or “Incorrect!”



  const [score, setScore] = useState(0); //How many you got right (starts at 0) //Keeps count of how many answers were correct

  const [quizComplete, setQuizComplete] = useState(false); //Are we done with all questions? (starts as "no/false") //Becomes true when the last question is done — so we can show the final score


  const [showFeedback, setShowFeedback] = useState(false); //Should we show if you're right or wrong? (starts as "no/false") // Decides if we should show the result (correct/incorrect) after clicking Submit



  const handleSubmit = () => {

    if (!selectedAnswer) return; // // If no answer picked, do nothing //If the user hasn’t selected anything, do nothing.

    const isCorrect = selectedAnswer === questions[currentQuestion].correct; //Compares the user’s selected answer to the correct one.


    setFeedback(isCorrect ? 'Correct!' : 'Incorrect!'); //Show the feedback text depending on correctness.

    setShowFeedback(true); // Set showFeedback to true so we can show it.

    if (isCorrect) {
      setScore(score + 1);
    } //If the answer is correct, increase the score by 1.

    if (currentQuestion + 1 >= questions.length) {
      setQuizComplete(true); //If it's the last question, mark the quiz as complete. (>=)
                                 // else
    } else {
      setTimeout(() => { //It gives the user time to read the feedback ("Correct!" / "Incorrect!") before moving on. // delays the code inside by 1,000 milliseconds (1seconds). Before running the code inside here
        setCurrentQuestion(currentQuestion + 1); //Moves to the next question by increasing the index
        setSelectedAnswer(''); // Clears the selected answer so no radio button is checked for the next question
        setShowFeedback(false); //Hides the feedback box before showing the next question
        setFeedback(''); // Clears the "Correct!" or "Incorrect!" message so it's clean for the next one
      }, 1000); 
    }
  };

  const resetQuiz = () => { // When user clicks “Take Quiz Again”, reset all the values to start over.
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setFeedback('');
    setScore(0);
    setQuizComplete(false);
    setShowFeedback(false);
  };

  if (quizComplete) { // if thIf quizComplete === true, show: “Quiz Complete” , Score , Reset button

    

   
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Quiz Complete!
        </h1>
        <p className="text-xl text-center mb-6">
            {/* The score */}
          You scored {score} out of {questions.length}! 
        </p>
        <div className="text-center">
          <button
        //   Reset Button
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }






  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Quiz App</h1>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
            {/* currentQuestion is set to zero in state so we add 1 to it OF questions.length. i.e Question 1 OF 3 */}
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            // progress bar using currentQuestion Number and question length number 
            // ((0 + 1) / 3) * 100 = (1 / 3) * 100 = 33.33%

            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div>
        <p className="text-xl font-semibold mb-6">
            {/* Go into questions with the index number [currentQuestion] .question. i.e go into the full array of questions, use currentQuestion as index number of the object literal you want to show then from the object literal pick the question property*/}
          {questions[currentQuestion].question}
        </p>

        <div className="space-y-3 mb-6">
            {/* Now let us map over the option. i.e go into the questions array with the currentQuestion set to be the index, then go into the options property and map over it's array */}
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                //Gives each radio button a unique name like "option0", "option1", "option2", "option3".
                id={`option${index}`}

                name="quiz-option"

                //Sets what answer this radio button represents gotten from the map option. you know that the map loop over the options array 4 times, so value will keep the option for each loop
                value={option}
                // checked will check if selectedAnswer === option i.e the value, mark the radio button.  
                checked={selectedAnswer === option}
                 
                // This onChange will set value for selectedAnswer, so out of the 4 options, anyone we picked here will make our selectedAnswer have a value
                onChange={(e) => setSelectedAnswer(e.target.value)}


                className="mr-3 w-4 h-4 text-blue-600"
                disabled={showFeedback} // disabled={showFeedback} means:

                   //“ After clicking on submit showFeedback is set to "true" so once it's set to true you cannot click on another radio button again and it will show whether the answer is correct or wrong, This won't allow the user to changetheir answer anymore.” This will lock the answer the user clicked on
              />
              <label
                htmlFor={`option${index}`}
                className={`text-lg cursor-pointer ${showFeedback ? 'cursor-not-allowed' : ''}`}
              >
                {option}
              </label>
            </div>
          ))}
        </div>

        {!showFeedback && ( //Shows the submit button only if feedback hasn’t been shown yet and this is when the submit button is yet to be clicked on because when you click on the submit button showFeedback will be set to true
          <button
            type="button"
            onClick={handleSubmit}

            // if there is no answer selected yet, disabled the button, like not let the button be clickeable i.e when selectedAnswer is an empty string it means it's a false 
            disabled={!selectedAnswer}
            // disable button color is here in the tailwind css
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Submit
          </button>
        )}

        {showFeedback && ( // After clicking on the submit button show feedback will be set to true and when it is set to true this jsx will run 
          <div
            className={`text-center p-4 rounded-lg ${
                // when feedback is correct show this a certain style and when it's wrong add a certain style 
              feedback === 'Correct!' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {/* show the feed back here */}
            <p className="text-lg font-semibold">{feedback}</p>
             
             {/* if feedback is Incorrect show the correct answer */}
            {feedback === 'Incorrect!' && (
              <p className="text-sm mt-2">
                The correct answer was: {questions[currentQuestion].correct}
              </p>
            )}
          </div>
        )}
      </div>

      {/* At the buttom it will show the score  */}

      <div className="mt-6 text-center text-gray-600">
        <p>Score: {score} / {questions.length}</p>
      </div>
    </div>
  );
};

export default QuizApp;
