"use client";
import React, { useState } from "react";
import { bpscQuestionsEnglish, bpscQuestionsHindi } from "./data"; // Import data
import Instruction from "./Instruction"; // Import Instruction component

const QuestionComponent = ({ onFinishQuiz, isDarkMode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Store selected answers
  const [attemptedQuestions, setAttemptedQuestions] = useState([]); // Track attempted questions
  const [isEnglish, setIsEnglish] = useState(true); // Language toggle (English or Hindi)
  const [showInstructions, setShowInstructions] = useState(true); // Control instructions visibility

  const questionsData = isEnglish ? bpscQuestionsEnglish : bpscQuestionsHindi; // Determine which set of questions to use
  const { question, options, correctAnswer } = questionsData[currentQuestionIndex];

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle skipping question
  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Toggle language between English and Hindi without resetting answers
  const handleLanguageToggle = () => {
    setIsEnglish(!isEnglish);
  };

  // Handle selecting an option
  const handleOptionClick = (option) => {
    if (!attemptedQuestions.includes(currentQuestionIndex)) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: option,
      }));
      setAttemptedQuestions((prevAttemptedQuestions) => [
        ...prevAttemptedQuestions,
        currentQuestionIndex,
      ]);
    }
  };

  // Check if the current answer is correct
  const isAnswerCorrect = (index) => {
    return answers[index] === questionsData[index].correctAnswer;
  };

  // Check if this is the last question
  const isLastQuestion = currentQuestionIndex + 1 === questionsData.length;

  // Handle finishing the quiz and sending results
  const handleFinishQuiz = () => {
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unattemptedAnswers = 0;

    // Calculate correct, incorrect, and unattempted answers
    questionsData.forEach((_, index) => {
      if (answers[index] === questionsData[index].correctAnswer) {
        correctAnswers += 1;
      } else if (answers[index] === undefined) {
        unattemptedAnswers += 1;
      } else {
        incorrectAnswers += 1;
      }
    });

    // Send results to parent component
    onFinishQuiz(correctAnswers, incorrectAnswers, unattemptedAnswers, questionsData.length);
  };

  // Handle showing instructions and starting quiz
  const handleStartQuiz = () => {
    setShowInstructions(false); // Hide instructions and start quiz
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-4 shadow-lg rounded-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Instructions Section */}
      {showInstructions ? (
        <Instruction
          isEnglish={isEnglish}
          isDarkMode={isDarkMode}
          onStartQuiz={handleStartQuiz} // Pass the start quiz function
          handleLanguageToggle={handleLanguageToggle} // Pass the language toggle function
        />
      ) : (
        <>
          {/* Upper Navigation Section */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">
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
            <p className="text-xl font-semibold">{question}</p>
          </div>

          {/* Options */}
          <div>
            <ol className="list-decimal pl-5 space-y-2">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`cursor-pointer p-2 rounded-lg transition-colors ${
                    answers[currentQuestionIndex] === option
                      ? isAnswerCorrect(currentQuestionIndex)
                        ? "bg-green-200"
                        : "bg-red-200"
                      : isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  } ${attemptedQuestions.includes(currentQuestionIndex) ? "pointer-events-none" : ""}`}
                >
                  {option}
                </li>
              ))}
            </ol>
          </div>

          {/* Navigation buttons */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePrevQuestion}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          </div>

          {/* Full-width Submit Test Button */}
          <div className="w-full mt-6">
            <button
              onClick={handleFinishQuiz}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Submit Test
            </button>
          </div>

          {/* Finish Quiz (Optional) */}
          {isLastQuestion && (
            <button
              onClick={handleFinishQuiz}
              className="mt-6 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
            >
              Finish Quiz
            </button>
          )}
        </>
      )}
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
