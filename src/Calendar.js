import React, { useState } from 'react';
import Modal from './Modal';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date();
  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const weekStartOffset = (firstDayOfMonth.getDay() + 6) % 7;

  const dates = Array.from({ length: daysInMonth }, (_, i) =>
    new Date(today.getFullYear(), today.getMonth(), i + 1)
  );

  const generateRandomWorkStatus = () => {
    return dates.map((date) => {
      const dateWithoutTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

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
    const status = datesData.find(
      (data) => data.date.toDateString() === date.toDateString()
    );
    setSelectedDate(date);
    setSelectedStatus(
      status || { needsToWork: true, wasLate: false, finishedTasks: false }
    );
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

  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-5 text-center">Task Calendar</h2>
      <div className="grid grid-cols-7 gap-0 border border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-medium border border-gray-200 p-2"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: weekStartOffset }).map((_, index) => (
          <div key={`empty-${index}`} className="border border-gray-200 h-16"></div>
        ))}
        {datesData.map((data) => (
          <button
            key={data.date.toISOString()}
            onClick={() => handleDateClick(data.date)}
            className={`w-full h-16 flex items-center justify-center ${getDateColorClass(
              data
            )} border border-gray-200`}
          >
            {data.date.getDate()}
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
