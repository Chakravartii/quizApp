// src/components/FinalResult.js
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const FinalResult = ({ result, isDarkTheme }) => {
  const { correctAnswers, incorrectAnswers, unattemptedAnswers, totalQuestions, score } = result;

  // Calculate percentages for each category
  const correctPercent = ((correctAnswers / totalQuestions) * 100).toFixed(2);
  const incorrectPercent = ((incorrectAnswers / totalQuestions) * 100).toFixed(2);
  const unattemptedPercent = ((unattemptedAnswers / totalQuestions) * 100).toFixed(2);

  // Pie chart data
  const chartData = {
    labels: ['Correct', 'Incorrect', 'Unattempted'],
    datasets: [
      {
        data: [correctPercent, incorrectPercent, unattemptedPercent],
        backgroundColor: ['#4CAF50', '#FF6347', '#D3D3D3'], // Green for correct, Red for incorrect, Gray for unattempted
        borderWidth: 1,
      },
    ],
  };

  // Pie chart options for customization
  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div
      className={`text-center p-6 space-y-6 ${isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
    >
      <h2
        className={`text-2xl font-semibold ${isDarkTheme ? "text-white" : "text-gray-800"}`}
      >
        Quiz Result
      </h2>

      {/* Display total score */}
      <div
        className={`font-semibold text-xl mb-4 ${isDarkTheme ? "text-white" : "text-gray-800"}`}
      >
        Total Score: {score} points
      </div>

      {/* Display results summary */}
      <div className="space-y-4 mb-6">
        <div
          className={`text-lg font-medium ${isDarkTheme ? "text-white" : "text-gray-800"}`}
        >
          Correct Answers: {correctAnswers} ({correctPercent}%)
        </div>
        <div
          className={`text-lg font-medium ${isDarkTheme ? "text-white" : "text-gray-800"}`}
        >
          Incorrect Answers: {incorrectAnswers} ({incorrectPercent}%)
        </div>
        <div
          className={`text-lg font-medium ${isDarkTheme ? "text-white" : "text-gray-800"}`}
        >
          Unattempted Answers: {unattemptedAnswers} ({unattemptedPercent}%)
        </div>
      </div>

      {/* Pie Chart Container - Adjust layout for desktop */}
      <div className="relative flex justify-center">
        <div className="max-w-xs md:max-w-md lg:max-w-lg">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Optional Tooltip to explain each segment */}
      <div className="mt-6 text-sm text-gray-600">
        <p>
          <span className="font-semibold text-green-500">Green:</span> Correct Answers
        </p>
        <p>
          <span className="font-semibold text-red-500">Red:</span> Incorrect Answers
        </p>
        <p>
          <span className="font-semibold text-gray-400">Gray:</span> Unattempted Answers
        </p>
      </div>
    </div>
  );
};

export default FinalResult;
