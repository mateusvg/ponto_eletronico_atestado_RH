import React, { useState, useEffect } from "react";

function Counter(props: any) {
  const [counter, setCounter] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set the starting time
    console.log(props.counter[0])
    const startTime = new Date(props.counter[0]);

    // Start the timer and update it every second
    const interval = setInterval(() => {
      // Get the current time
      const now = new Date();
    

      // Calculate the time difference between the starting time and the current time
      const diff = now.getTime() - startTime.getTime();

      // Calculate the hours, minutes, and seconds from the time difference
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Update the counter state
      setCounter({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>{counter.hours}:{counter.minutes}:{counter.seconds}</h2>
    </div>
  );
}

export default Counter;
