import React from 'react';

const Modal = ({ isOpen, onClose, date, status }) => {
  if (!isOpen) return null;

  const { needsToWork, wasLate, finishedTasks } = status;

  const dateText = date.toLocaleDateString();

  const totalAmount = 600;
  let completedAmount = 0;
  let percentage = 0;

  if (needsToWork) {
    completedAmount = 0;
    percentage = 0;
  } else {
    if (!wasLate && finishedTasks) {
      completedAmount = totalAmount;
      percentage = 100;
    } else if (!wasLate && !finishedTasks) {
      completedAmount = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
      percentage = (completedAmount / totalAmount) * 100;
    } else if (wasLate && !finishedTasks) {
      completedAmount = Math.floor(Math.random() * (299 - 100 + 1)) + 100;
      percentage = (completedAmount / totalAmount) * 100;
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <h2 className="text-lg font-bold mb-4">Диана Бейсенбаева</h2>
        <h3 className="text-md font-semibold mb-2">Store Name</h3>
        <p className="mb-4">Дата: {dateText}</p>

        {needsToWork ? (
          <p className="font-semibold text-center">
            You need to work on this day.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <p className="font-semibold">Plan</p>
              <p>
                {completedAmount} / {totalAmount} ({Math.round(percentage)}%)
              </p>
              <div className="w-full bg-gray-300 rounded h-4 mt-1">
                <div
                  className={`h-4 rounded ${
                    !wasLate && finishedTasks
                      ? 'bg-green-500'
                      : !wasLate && !finishedTasks
                      ? 'bg-yellow-500'
                      : wasLate && !finishedTasks
                      ? 'bg-red-500'
                      : 'bg-gray-300'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold">Shift</p>
              <p>Work hours: 12:00 - 20:00</p>
              <p>
                Came at: {wasLate ? '12:30' : '12:00'} | Left at: 20:00 |{' '}
                {wasLate ? 'Late for 30 min' : 'No lateness'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
