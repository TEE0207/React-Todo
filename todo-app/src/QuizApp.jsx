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
  

  const [currentQuestion, setCurrentQuestion] = useState(0); // Which question card are we looking at? (starts at 0, which means the first card)


  const [selectedAnswer, setSelectedAnswer] = useState(''); //Which answer did you pick? (starts empty)

  const [feedback, setFeedback] = useState(''); //What does the computer tell you? "Correct!" or "Incorrect!" (starts empty)


  const [score, setScore] = useState(0); //How many you got right (starts at 0)

  const [quizComplete, setQuizComplete] = useState(false); //Are we done with all questions? (starts as "no/false")


  const [showFeedback, setShowFeedback] = useState(false); //Should we show if you're right or wrong? (starts as "no/false")



  const handleSubmit = () => {
    if (!selectedAnswer) return; // // If no answer picked, do nothing

    const isCorrect = selectedAnswer === questions[currentQuestion].correct; 
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect!');
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 >= questions.length) {
      setQuizComplete(true);
    } else {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
        setFeedback('');
      }, 10000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setFeedback('');
    setScore(0);
    setQuizComplete(false);
    setShowFeedback(false);
  };

  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Quiz Complete!
        </h1>
        <p className="text-xl text-center mb-6">
          You scored {score} out of {questions.length}!
        </p>
        <div className="text-center">
          <button
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
            // Width = (0+1) divided by 3 multiply by 100 then add % to it to make it the width
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

                onChange={(e) => setSelectedAnswer(e.target.value)}


                className="mr-3 w-4 h-4 text-blue-600"
                disabled={showFeedback}
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

        {!showFeedback && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Submit
          </button>
        )}

        {showFeedback && (
          <div
            className={`text-center p-4 rounded-lg ${
              feedback === 'Correct!' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            <p className="text-lg font-semibold">{feedback}</p>
            {feedback === 'Incorrect!' && (
              <p className="text-sm mt-2">
                The correct answer was: {questions[currentQuestion].correct}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-gray-600">
        <p>Score: {score} / {questions.length}</p>
      </div>
    </div>
  );
};

export default QuizApp;
