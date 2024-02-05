import { useState, useEffect } from 'react';

const useFocusSession = (sessionsLimit, startTimestamp, stopTimeremain) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  function calculateRemainingTime() {
    if (stopTimeremain > 0) {
      // If the timer has been stopped, use stopTimeremain as the remaining time
      return stopTimeremain;
    } else {
      const currentTime = Math.floor(Date.now() / 1000);
      const elapsedTime = currentTime - startTimestamp;
      const remainingTimeInSeconds = sessionsLimit - elapsedTime;

      return remainingTimeInSeconds >= 0 ? remainingTimeInSeconds : 0;
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [startTimestamp, sessionsLimit, stopTimeremain]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return { remainingTime, formatTime };
};

export default useFocusSession;
