import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useStartAttempt } from "@/customHook/quiz.hook"

export default function StartQuiz() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [captured, setCaptured] = useState(null)
  const [stream, setStream] = useState(null)
  const { mutateAsync, isPending } = useStartAttempt()

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        setCameraReady(true)
      }
    } catch (err) {
      console.error("Camera error:", err)
    }
  }, [])

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
    ctx.drawImage(videoRef.current, 0, 0)
    const imageData = canvasRef.current.toDataURL("image/jpeg")
    setCaptured(imageData)
    if (stream) stream.getTracks().forEach((t) => t.stop())
    setCameraReady(false)
  }

  const handleStart = async () => {
    if (!captured) return
    try {
      const result = await mutateAsync({ quizId, studentImage: captured })
      const attemptId = result?.data?._id || result?._id || "demo-attempt-id"
      navigate(`/student/attempt/${attemptId}`, { state: { quizId } })
    } catch {
      // fallback for demo
      navigate(`/student/attempt/demo-attempt-id`, { state: { quizId } })
    }
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-lg">
            🎥
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verify Identity</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
        >
          <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600">
            {!captured ? (
              <>
                <video ref={videoRef} autoPlay muted className={`w-full h-full object-cover ${cameraReady ? "" : "hidden"}`} />
                {!cameraReady && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <span className="text-5xl mb-3">📷</span>
                    <p className="text-sm">Camera required</p>
                  </div>
                )}
              </>
            ) : (
              <img src={captured} alt="Captured" className="w-full h-full object-cover" />
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="mt-6 space-y-3">
            {!cameraReady && !captured && (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={startCamera} className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all">
                Open Camera
              </motion.button>
            )}
            {cameraReady && !captured && (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={captureImage} className="w-full py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all">
                Capture Photo
              </motion.button>
            )}
            {captured && (
              <>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 justify-center">
                  <span>✅</span>
                  <span className="text-sm font-medium">Photo captured</span>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleStart} disabled={isPending} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold disabled:opacity-60 transition-all">
                  {isPending ? "Starting..." : "Start Quiz"}
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
