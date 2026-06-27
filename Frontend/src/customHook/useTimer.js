import { useEffect, useMemo, useState } from "react";

const useTimer = ({ duration = 30, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  // Reset timer whenever duration changes
  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  // Countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  // Time calculations
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  const formattedTime = useMemo(() => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }, [minutes, seconds]);

  const progress = useMemo(() => {
    return ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  }, [duration, timeLeft]);

  return {
    timeLeft,
    minutes,
    seconds,
    formattedTime,
    progress,
    isWarning: timeLeft <= 60,
    isFinished: timeLeft === 0,
  };
};

export default useTimer;