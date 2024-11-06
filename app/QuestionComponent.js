import React, { useState } from 'react';
import { bpscQuestionsEnglish, bpscQuestionsHindi } from './data';  // Import data

const QuestionComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  // Track question index
  const [selectedAnswer, setSelectedAnswer] = useState(null);  // Track selected answer
  const [isEnglish, setIsEnglish] = useState(true);  // Track language selection (true for English)

  // Get the appropriate question set based on selected language
  const questionsData = isEnglish ? bpscQuestionsEnglish : bpscQuestionsHindi;
  const { question, options, correctAnswer } = questionsData[currentQuestionIndex];

  // Handle next question button click
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setSelectedAnswer(null); // Reset selected answer when moving to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle language toggle (change between English and Hindi)
  const handleLanguageToggle = () => {
    setIsEnglish(!isEnglish);
    // Do not reset the currentQuestionIndex to 0; preserve the current index
    setSelectedAnswer(null);  // Reset selected answer on language change
  };

  // Handle option click
  const handleOptionClick = (option) => {
    if (selectedAnswer === null) { // Allow click only if no answer has been selected
      setSelectedAnswer(option);
    }
  };

  // Check if the selected answer is correct
  const isAnswerCorrect = selectedAnswer === correctAnswer;

  // Check if the current question is the last one
  const isLastQuestion = currentQuestionIndex + 1 === questionsData.length;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Header with question number and language toggle */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-medium text-gray-700">
          Question {currentQuestionIndex + 1} of {questionsData.length}
        </span>
        <button 
          onClick={handleLanguageToggle}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        >
          Switch to {isEnglish ? "Hindi" : "English"}
        </button>
      </div>

      {/* Question Text */}
      <div className="mb-4">
        <p className="text-xl font-semibold text-gray-800">{question}</p>
      </div>

      {/* Options */}
      <div>
        <ol className="list-decimal pl-5 space-y-2">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`cursor-pointer p-2 rounded-lg transition-colors ${selectedAnswer === option ? (isAnswerCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-100 hover:bg-gray-200'} ${selectedAnswer ? 'pointer-events-none' : ''}`}
            >
              {option}
            </li>
          ))}
        </ol>
      </div>

      {/* Answer Feedback */}
      {selectedAnswer && (
        <div className="mt-4">
          <p className={`text-lg ${isAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isAnswerCorrect ? "Correct!" : `Incorrect, the correct answer is: ${correctAnswer}`}
          </p>
        </div>
      )}

      {/* Next Button */}
      <div className="mt-6 text-right">
        {!isLastQuestion ? (
          <button 
            onClick={handleNextQuestion} 
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none"
            disabled={selectedAnswer === null}  // Disable Next if no answer is selected
          >
            Next
          </button>
        ) : (
          <button 
            onClick={handleNextQuestion} 
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none"
            disabled={selectedAnswer === null}  // Disable Finish if no answer is selected
          >
            Finish Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionComponent;




// // components/QuestionList.js
// import React from "react";
// import { bpscQuestionsEnglish, bpscQuestionsHindi } from "./data"; // Adjust the import path

// const QuestionList = ({ indices, languageCode }) => {
//   // Function to select the right set of questions based on language
//   const getQuestions = () => {
//     if (languageCode === "en") {
//       return bpscQuestionsEnglish;
//     } else if (languageCode === "hi") {
//       return bpscQuestionsHindi;
//     }
//     return [];
//   };

//   const questions = getQuestions();

//   // Function to get the question details by index
//   const getQuestionDetails = (index) => {
//     const question = questions[index];
//     if (question) {
//       return (
//         <div key={index} className="mb-6 p-4 border-2 border-gray-300 rounded-lg">
//           <h3 className="text-xl font-semibold mb-2">
//             Q{index + 1}: {question.question}
//           </h3>
//           <ul className="space-y-2">
//             {question.options.map((option, idx) => (
//               <li key={idx} className="px-4 py-2 text-black bg-white rounded-md">
//                 {option}
//               </li>
//             ))}
//           </ul>
//           <p className="mt-2">
//             <strong>Correct Answer:</strong> {question.correctAnswer}
//           </p>
//         </div>
//       );
//     } else {
//       return <p key={index}>Question not found!</p>;
//     }
//   };

//   return <div>{indices.map((index) => getQuestionDetails(index))}</div>;
// };

// export default QuestionList;
