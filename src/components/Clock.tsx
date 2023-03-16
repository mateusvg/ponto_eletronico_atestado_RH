import React, { useState, useEffect } from 'react';

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  });

  const tick = () => {
    setTime(new Date());
  };

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  return (
    <>
      <h2>Digital Clock</h2>
      <div>
        {formatTime(time.getHours())}:
        {formatTime(time.getMinutes())}:
        {formatTime(time.getSeconds())}
      </div>
    </>
  );
};

export default DigitalClock;
