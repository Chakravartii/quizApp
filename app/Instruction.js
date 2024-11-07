// Instruction.js
import React from "react";

const Instruction = ({ isEnglish, isDarkMode, onStartQuiz, handleLanguageToggle }) => {
  const instructions = isEnglish ? (
    <div
      className={`instructions p-6 rounded-lg mb-6 ${
        isDarkMode ? "bg-gray-700" : "bg-gray-100"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4">Quiz Instructions</h2>
      <ul className="list-disc pl-5">
        <li>Each question has 4 options, choose the correct one.</li>
        <li>For each correct answer, you will receive +4 points.</li>
        <li>For each incorrect answer, you will receive -1 point.</li>
        <li>If you don't attempt a question, it will be considered unattempted.</li>
        <li>You can skip any question and come back to it later.</li>
        <li>You can switch between English and Hindi for the questions.</li>
      </ul>
      <button
        onClick={onStartQuiz} // Ensure this triggers the parent function to start the quiz
        className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Start Quiz
      </button>
    </div>
  ) : (
    <div
      className={`instructions p-6 rounded-lg mb-6 ${
        isDarkMode ? "bg-gray-700" : "bg-gray-100"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4">क्विज़ निर्देश</h2>
      <ul className="list-disc pl-5">
        <li>प्रत्येक प्रश्न में 4 विकल्प होते हैं, सही विकल्प चुनें।</li>
        <li>प्रत्येक सही उत्तर के लिए +4 अंक प्राप्त होंगे।</li>
        <li>प्रत्येक गलत उत्तर के लिए -1 अंक प्राप्त होंगे।</li>
        <li>यदि आपने कोई प्रश्न नहीं किया है, तो उसे अनुपस्थित माना जाएगा।</li>
        <li>आप किसी भी प्रश्न को छोड़ सकते हैं और बाद में उसे फिर से देख सकते हैं।</li>
        <li>आप प्रश्नों के लिए अंग्रेज़ी और हिंदी के बीच स्विच कर सकते हैं।</li>
      </ul>
      <button
        onClick={onStartQuiz} // Ensure this triggers the parent function to start the quiz
        className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        क्विज़ शुरू करें
      </button>
    </div>
  );

  return (
    <div className="flex-row justify-center items-center">
  <button
    onClick={handleLanguageToggle}
    className="mt-4 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 focus:outline-none m-2"
  >
    Switch to {isEnglish ? "Hindi" : "English"}
  </button>
  {instructions}
</div>

  );
};

export default Instruction;
