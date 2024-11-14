import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Modal = ({ isOpen, onClose, date, status }) => {
  if (!isOpen) return null;

  const { needsToWork, wasLate, finishedTasks } = status;
  const dateText = date.toLocaleDateString();

  let chartData;
  let message;

  if (needsToWork) {
    message = "Employee works on this day.";
  } else if (wasLate) {
    chartData = {
      labels: ['No Tasks Completed'],
      datasets: [
        {
          data: [100],
          backgroundColor: ['#f5f5f5'],
        },
      ],
    };
    message = "The employee was late.";
  } else if (!wasLate && !finishedTasks) {
    chartData = {
      labels: ['Project A', 'Project B', 'Project C', 'Project D'],
      datasets: [
        {
          data: [30, 20, 25, 25],
          backgroundColor: ['#FFD700', '#FFAE42', '#FFA500', '#FF8C00'],
        },
      ],
    };
    message = "The employee has not completed all tasks.";
  } else if (!wasLate && finishedTasks) {
    chartData = {
      labels: ['All Tasks Completed'],
      datasets: [
        {
          data: [100],
          backgroundColor: ['#4CAF50'], 
        },
      ],
    };
    message = "All tasks were completed.";
  }

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-80 relative transform transition-all"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <div className="flex flex-col items-center mb-4">
              <img
                src="profile-picture-url"
                alt="Profile"
                className="w-16 h-16 rounded-full mb-2"
              />
              <h2 className="text-lg font-bold">Diana Beisenbayeva</h2>
              <p className="text-sm text-gray-500">Collaborator</p>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-md font-semibold mb-1">Employee Statistics</h3>
              <p>Rank: <strong>1</strong> 🥇</p>
              <p>Average Check: <strong>12,500 тг</strong></p>
              <p>Sales: <strong>52</strong></p>
              <p>Conversion: <strong>73%</strong></p>
            </div>

            {needsToWork ? (
              <p className="font-semibold text-center text-gray-700 mt-4">{message}</p>
            ) : (
              <div className="text-center mb-4">
                <h3 className="text-md font-semibold mb-1">Task Statistics</h3>
                <Pie data={chartData} options={chartOptions} />
                <p className="mt-4 font-semibold text-center text-gray-700">{message}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
