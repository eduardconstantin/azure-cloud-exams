import { useState, useEffect } from "react";

type Time = {
  minutes: number;
  seconds: number;
};

type TimerHook = {
  remainingTime: string;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
};

function timeToMilliseconds(time: Time): number {
  return time.minutes * 60 * 1000 + time.seconds * 1000;
}

function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const useTimer = (initialTime: Time): TimerHook => {
  const initialDuration = timeToMilliseconds(initialTime);
  const [remainingTime, setRemainingTime] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1000));
      }, 1000);
    } else if (remainingTime <= 0 && isRunning) {
      setIsRunning(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, remainingTime]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRemainingTime(initialDuration);
  };

  return {
    remainingTime: formatTime(remainingTime),
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useTimer;
