"use client";
import { useState, useEffect } from "react";
import { bpscQuestionsEnglish, bpscQuestionsHindi } from "../app/data"; // Adjust this import as needed
import QuestionComponent from "./QuestionComponent";
import FinalResult from "./FinalResult";

export default function Home() {
  const [lang, setLanguage] = useState("en");
  const [timeLeft, setTimeLeft] = useState(60);  // Initial timer value in seconds
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [quizResult, setQuizResult] = useState(null);  // State to store quiz result
  const [timerActive, setTimerActive] = useState(true); // State to control timer visibility and activity

  // Timer logic - when time reaches 0 or when quiz is finished, show the result
  useEffect(() => {
    if (timeLeft === 0 || !timerActive) {
      setShowFinalResult(true);  // Show the final result when timer is 0
      setTimerActive(false);  // Stop the timer
      return; // Exit early if timer is done or inactive
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer); // Stop the timer when it hits 0
          setShowFinalResult(true);  // Show final result when time is up
          setTimerActive(false); // Ensure the timer doesn't restart
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer when component unmounts or timer stops
  }, [timeLeft, timerActive]);

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Handle quiz result calculation
  const handleQuizResult = (correctAnswers, totalQuestions) => {
    const incorrectAnswers = totalQuestions - correctAnswers;
    const unattemptedAnswers = totalQuestions - (correctAnswers + incorrectAnswers);
    const score = correctAnswers * 4 - incorrectAnswers; // Example calculation
    setQuizResult({
      correctAnswers,
      incorrectAnswers,
      unattemptedAnswers,
      totalQuestions,
      score,
    });
    setShowFinalResult(true);  // Show final result section
    setTimerActive(false);  // Stop the timer when quiz is finished
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <section className="flex flex-wrap justify-between items-center p-2 border-2 border-blue-300 mb-4">
        <h2 className="text-2xl font-semibold sm:text-xl md:text-2xl lg:text-3xl">Quiz App</h2>

        {/* Conditionally render the timer */}
        {timerActive && (
          <div id="timer" className="border-2 bg-yellow-200 border-solid text-black border-yellow-500 rounded-full px-6 py-1 text-lg sm:text-sm md:text-base lg:text-lg">
            00: {timeLeft} s
          </div>
        )}

        <button onClick={toggleTheme} className="focus:outline-none">
          <img
            src={isDarkMode ? "https://cdn-icons-png.flaticon.com/512/2698/2698194.png" : "https://cdn-icons-png.flaticon.com/512/1812/1812660.png?f=webp&w=256"}
            alt={isDarkMode ? "Moon Icon" : "Sun Icon"}
            className="w-8 h-8 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
          />
        </button>
      </section>

      <div className="m-4">
        {/* Conditionally render the QuestionComponent if quiz is not finished */}
        {!showFinalResult && <QuestionComponent onFinishQuiz={handleQuizResult} isDarkMode={isDarkMode} />}
      </div>

      {/* Display Final Result */}
      {showFinalResult && quizResult && (
        <FinalResult result={quizResult} isDarkTheme={isDarkMode} />
      )}

<footer className={`mt-8 p-4 text-center ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
  <p className="text-sm">
    Created by <strong>Deepak Chakravarti</strong>
  </p>
  <button
    onClick={() => window.location.href = 'https://api.whatsapp.com/send?phone=918795243375&text=Hello%20Deepak%20Chakravarti%20!!'} // Replace with your email or contact link
    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
  >
    Contact Me
  </button>
</footer>

    </div>
  );
}




// "use client";
// import { useState, useEffect } from "react";
// import { bpscQuestionsEnglish, bpscQuestionsHindi} from '../app/data';
// import QuestionComponent from './QuestionComponent';
// import FinalResult from "./finalResult";
// export default function Home() {
//   const [lang,setLanguage]=useState("en");
//   // const questions=lang==="en"?bpscQuestionsEnglish:bpscQuestionsHindi;
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [showFinalResult, setShowFinalResult] = useState(false);
//   useEffect(() => {
//     if (timeLeft === 0) return;
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime === 0) {
//           clearInterval(timer);
//         }
//         return prevTime - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const toggleTheme = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   return (
//     <div className={`min-h-screen  p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>

//       <section className="flex justify-between items-center p-2 border-2 border-blue-300 mb-4">

//         <h2 className="text-2xl font-semibold">Quiz App</h2>
//         <div id="timer" className="border-2 bg-yellow-200 border-solid text-black border-yellow-500 rounded-full px-6 py-1">00: {timeLeft} s</div>
//         <button
//           onClick={toggleTheme}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           Change Theme
//         </button>
//       </section>

//       <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc' }}>
//         <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Welcome to Quiz...</div>
//         <button style={{
//             padding: '8px 180px',fontSize: '22px',cursor: 'pointer',backgroundColor: '#007bff',color: 'white',border: 'none',borderRadius: '8px',
//           }}onClick={() => setShowFinalResult(true)}>Submit</button>

//       </section>

//       <div className="m-4">
//         <QuestionComponent/>
//       </div>
      
      
      
//       {showFinalResult && (
//         <FinalResult/>
//       )}
//     </div>
//   );
// }



// import { useState } from "react";
// import { bpscQuestionsEnglish, bpscQuestionsHindi } from '../app/data';  // Ensure the path is correct

// export default function Home() {
//   const [language, setLanguage] = useState("english"); // Language state

//   // Select the set of questions based on the language
//   const questions = language === "english" ? bpscQuestionsEnglish : bpscQuestionsHindi;

//   // Toggle between English and Hindi
//   const toggleLanguage = () => {
//     setLanguage((prevLanguage) => (prevLanguage === "english" ? "hindi" : "english"));
//   };

//   // If questions are not available, show a loading state
//   if (!questions || questions.length === 0) {
//     return <div>Loading questions...</div>;
//   }

//   return (
//     <div className="min-h-screen p-8 bg-white text-black">
//       <section className="flex justify-between items-center p-2 border-2 border-blue-300 mb-4">
//         <h2 className="text-2xl font-semibold">Quiz App</h2>
//         <button
//           onClick={toggleLanguage}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           Switch Language
//         </button>
//       </section>

//       <section className="mb-6">
//         {/* Render all questions */}
//         {questions.map((questionObj, index) => (
//           <div key={index} className="mb-6 p-4 border-2 border-gray-300 rounded-lg">
//             <h3 className="text-xl font-semibold mb-2">{questionObj.question}</h3>
//             <div className="flex flex-col gap-3">
//               {questionObj.options.map((option, optionIndex) => (
//                 <button
//                   key={optionIndex}
//                   className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
//                 >
//                   {option}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }


// "use client";
// import React, { useState, useEffect } from "react";
// import { bpscQuestionsEnglish, bpscQuestionsHindi } from "../app/data"; // Adjust path if necessary
// import QuestionList from "../app/QuestionList"; // Ensure path is correct

// export default function Home() {
//   // Language state (default to Hindi)
//   const [languageCode, setLanguageCode] = useState("hi");

//   // Timer state
//   const [timeLeft, setTimeLeft] = useState(60);

//   // Dark mode state
//   const [isDarkMode, setIsDarkMode] = useState(true);

//   // Question navigation states
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   // Select the appropriate set of questions based on language
//   const questions = languageCode === "en" ? bpscQuestionsEnglish : bpscQuestionsHindi;

//   // Timer logic
//   useEffect(() => {
//     if (timeLeft === 0) return;
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime === 0) {
//           clearInterval(timer);
//         }
//         return prevTime - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   // Toggle dark mode
//   const toggleTheme = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   // Language toggle function
//   const toggleLanguage = () => {
//     setLanguageCode(languageCode === "en" ? "hi" : "en");
//   };

//   // Handle next question
//   const goToNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   // Handle previous question
//   const goToPreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen p-8 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
//     >
//       {/* Header section */}
//       <section className="flex justify-between items-center p-2 border-2 border-blue-300 mb-4">
//         <h2 className="text-2xl font-semibold">Quiz App</h2>
//         <div
//           id="timer"
//           className="border-2 bg-yellow-200 border-solid text-black border-yellow-500 rounded-full px-6 py-1"
//         >
//           00: {timeLeft} s
//         </div>
//         <button
//           onClick={toggleTheme}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           Change Theme
//         </button>
//       </section>

//       {/* Language and Question Navigation */}
//       <section className="flex justify-between items-center p-2 mb-4">
//         <button
//           onClick={toggleLanguage}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           Switch to {languageCode === "en" ? "Hindi" : "English"}
//         </button>
//       </section>

//       <section
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "10px",
//           border: "1px solid #ccc",
//         }}
//       >
//         <div style={{ fontSize: "24px", fontWeight: "bold" }}>Welcome to Quiz...</div>
//         <button
//           style={{
//             padding: "8px 180px",
//             fontSize: "22px",
//             cursor: "pointer",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//           }}
//         >
//           Submit
//         </button>
//       </section>

//       {/* Question Section */}
//       <div>
//         <QuestionList
//           indices={[currentQuestionIndex]} // Passing only the current question index
//           languageCode={languageCode}
//         />
//       </div>

//       {/* Footer - Question Navigation */}
//       <footer
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "20px",
//           borderTop: "1px solid #ccc",
//         }}
//       >
//         {/* Previous Button */}
//         <button
//           onClick={goToPreviousQuestion}
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             cursor: "pointer",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             marginLeft: "10px",
//           }}
//         >
//           Previous Question
//         </button>
//         {/* Next Button */}
//         <button
//           onClick={goToNextQuestion}
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             cursor: "pointer",
//             backgroundColor: "#28a745",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             marginRight: "10px",
//           }}
//         >
//           Next Question
//         </button>
//       </footer>
//     </div>
//   );
// }

