import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Webcam from "react-webcam";

import { Camera, Play, RefreshCw } from "lucide-react";

import { useGetSingleQuizId } from "@/customHook/useQuiz.hook";
import { useStartAttempt } from "@/customHook/attempt.hook";

const StartAttempt = () => {
  const { quizId } = useParams();

  const navigate = useNavigate();

  const webcamRef = useRef(null);

  const [image, setImage] = useState(null);

  const { data, isLoading } = useGetSingleQuizId(quizId);
  console.log(data);
  const { mutate, isPending } = useStartAttempt();

  const quiz = data?.data;

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    setImage(imageSrc);
  };

  const retakeImage = () => {
    setImage(null);
  };

  const startQuiz = () => {
    if (!image) {
      alert("Please capture your photo first.");
      return;
    }

    console.log("========== START QUIZ ==========");
    console.log("Quiz ID:", quizId);
    console.log("Student Image:", image);

    mutate(
      {
        quizId,
        data: {
          studentImageUrl: image,
        },
      },
      {
        onSuccess: (response) => {
          console.log("========== BACKEND RESPONSE ==========");
          console.log(response);

          console.log("Success:", response.success);
          console.log("Attempt ID:", response.attemptId);
          console.log("Question:", response.question);
          console.log("=====================================");

          navigate(`/exam/${response.attemptId}`, {
            state: {
              question: response.question,
            },
          });
        },

        onError: (error) => {
          console.log("========== START ATTEMPT ERROR ==========");
          console.log("Status:", error.response?.status);
          console.log("Response:", error.response?.data);
          console.log("=========================================");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Start Quiz</h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Quiz Information */}

          <div>
            <h2 className="text-xl font-semibold mb-5">Quiz Information</h2>

            <div className="space-y-4">
              <p>
                <strong>Title :</strong> {quiz?.title}
              </p>

              <p>
                <strong>Category :</strong> {quiz?.category}
              </p>

              <p>
                <strong>Difficulty :</strong> {quiz?.difficulty}
              </p>

              <p>
                <strong>Questions :</strong> {quiz?.totalQuestions}
              </p>

              <p>
                <strong>Duration :</strong> {quiz?.duration} Minutes
              </p>

              <p>
                <strong>Total Marks :</strong> {quiz?.totalMarks}
              </p>
            </div>
          </div>

          {/* Camera */}

          <div>
            <h2 className="text-xl font-semibold mb-5">Student Verification</h2>

            {!image ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-xl w-full"
              />
            ) : (
              <img src={image} alt="Student" className="rounded-xl" />
            )}

            <div className="flex gap-3 mt-5">
              {!image ? (
                <button
                  onClick={captureImage}
                  className="flex-1 bg-blue-600 text-white rounded-xl py-3 flex justify-center items-center gap-2"
                >
                  <Camera size={18} />
                  Capture
                </button>
              ) : (
                <button
                  onClick={retakeImage}
                  className="flex-1 bg-gray-700 text-white rounded-xl py-3 flex justify-center items-center gap-2"
                >
                  <RefreshCw size={18} />
                  Retake
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            disabled={isPending}
            onClick={startQuiz}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl flex justify-center items-center gap-3"
          >
            <Play size={20} />

            {isPending ? "Starting..." : "Start Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartAttempt;
