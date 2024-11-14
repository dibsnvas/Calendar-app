import React, { useState } from 'react';
import Modal from './Modal';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date();
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const dates = Array.from({ length: daysInMonth }, (_, i) =>
    new Date(today.getFullYear(), today.getMonth(), i + 1)
  );

  const generateRandomWorkStatus = () => {
    return dates.map((date) => {
      const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());

      if (dateWithoutTime > todayWithoutTime) {
        return {
          date,
          needsToWork: true,
          wasLate: false,
          finishedTasks: false,
        };
      } else {
        const wasLate = Math.random() < 0.3;
        const finishedTasks = !wasLate ? Math.random() < 0.7 : false;

        return {
          date,
          needsToWork: false,
          wasLate,
          finishedTasks,
        };
      }
    });
  };

  const [datesData] = useState(generateRandomWorkStatus());

  const handleDateClick = (date) => {
    const status = datesData.find((data) => data.date.toDateString() === date.toDateString());
    setSelectedDate(date);
    setSelectedStatus(status || { needsToWork: true, wasLate: false, finishedTasks: false });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedStatus(null);
  };

  const getDateColorClass = (data) => {
    if (data.needsToWork) {
      return 'bg-gray-300';
    } else if (!data.wasLate && data.finishedTasks) {
      return 'bg-green-500 text-white';
    } else if (!data.wasLate && !data.finishedTasks) {
      return 'bg-yellow-500 text-white';
    } else if (data.wasLate && !data.finishedTasks) {
      return 'bg-red-500 text-white';
    } else {
      return 'bg-gray-300';
    }
  };

  return (
    <div className="p-6 w-full h-screen mx-auto bg-white rounded-lg shadow-md flex flex-col items-center">
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 mb-2"></div>
        <h2 className="text-lg font-bold">Name Surname</h2>
        <p className="text-sm text-gray-500">Position</p>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button className="px-4 py-2 bg-gray-200 rounded">Spisanie</button>
        <button className="px-4 py-2 bg-gray-200 rounded">Smena</button>
      </div>

      <div className="grid grid-cols-7 gap-4 flex-grow">
        {Array.from({ length: datesData.length }).map((_, i) => (
          <button
            key={datesData[i].date.toISOString()}
            onClick={() => handleDateClick(datesData[i].date)}
            className={`w-12 h-12 flex items-center justify-center rounded-full ${getDateColorClass(datesData[i])}`}
          >
            {datesData[i].date.getDate()}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          date={selectedDate}
          status={selectedStatus}
        />
      )}
    </div>
  );
};

export default Calendar;
