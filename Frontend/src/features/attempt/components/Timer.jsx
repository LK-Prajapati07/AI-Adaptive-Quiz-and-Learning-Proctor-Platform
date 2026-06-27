import { Clock } from "lucide-react";

import useTimer from "@/customHook/useTimer";

const Timer = ({ duration, onComplete }) => {
  const {
    formattedTime,
    progress,
    isWarning,
  } = useTimer({
    duration,
    onComplete,
  });

  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      shadow-md
      p-5
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`
            p-3
            rounded-full

            ${
              isWarning
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }
            `}
          >
            <Clock size={24} />
          </div>

          <div>

            <p className="text-sm text-gray-500">
              Remaining Time
            </p>

            <h2
              className={`
              text-3xl
              font-bold

              ${
                isWarning
                  ? "text-red-600"
                  : "text-gray-800"
              }
              `}
            >
              {formattedTime}
            </h2>

          </div>

        </div>

        {isWarning && (
          <span
            className="
            px-3
            py-1
            rounded-full
            bg-red-100
            text-red-600
            text-sm
            font-medium
            "
          >
            Hurry Up!
          </span>
        )}

      </div>

      {/* Progress */}

      <div className="mt-5">

        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

          <div
            className={`
            h-full
            transition-all
            duration-1000

            ${
              isWarning
                ? "bg-red-500"
                : "bg-blue-600"
            }
            `}
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
};

export default Timer;