import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Video, VideoOff, Shield, AlertTriangle, CheckCircle, RefreshCw, Eye, UserCheck } from "lucide-react"

export default function ProctorCamera({ onWarning, warnings }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const intervalRef = useRef(null)
  const [status, setStatus] = useState("initializing")
  const [faceDetected, setFaceDetected] = useState(true)
  const [snapshot, setSnapshot] = useState(null)
  const [cameraOn, setCameraOn] = useState(false)
  const [confidence, setConfidence] = useState(98)
  const [logs, setLogs] = useState([])

  const addLog = useCallback((msg, type = "info") => {
    setLogs(prev => [{ msg, type, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 20))
  }, [])

  const startCamera = useCallback(async () => {
    try {
      setStatus("initializing")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 320 }, height: { ideal: 240 } }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCameraOn(true)
        setStatus("active")
        addLog("Camera initialized successfully", "success")
      }
    } catch (err) {
      setStatus("error")
      addLog(`Camera error: ${err.message}`, "error")
    }
  }, [addLog])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setCameraOn(false)
    setStatus("stopped")
    addLog("Camera stopped", "info")
  }, [addLog])

  const captureSnapshot = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !cameraOn) return
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth || 320
    canvas.height = video.videoHeight || 240
    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, 0, 0)
    const dataUrl = canvas.toDataURL("image/jpeg", 0.7)
    setSnapshot(dataUrl)
    addLog("Proctor snapshot captured", "info")
    return dataUrl
  }, [cameraOn, addLog])

  const simulateProctorCheck = useCallback(() => {
    const detected = Math.random() > 0.1
    setFaceDetected(detected)
    if (!detected) {
      addLog("WARNING: Face not detected!", "warning")
      onWarning?.()
    } else {
      setConfidence(prev => Math.min(99, prev + Math.floor(Math.random() * 3)))
    }
  }, [onWarning, addLog])

  useEffect(() => {
    startCamera()
    return () => { stopCamera(); if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startCamera, stopCamera])

  useEffect(() => {
    if (cameraOn) {
      intervalRef.current = setInterval(() => {
        captureSnapshot()
        simulateProctorCheck()
      }, 5000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [cameraOn, captureSnapshot, simulateProctorCheck])

  const getStatusColor = () => {
    switch (status) {
      case "active": return "from-emerald-500 to-green-600"
      case "initializing": return "from-yellow-500 to-amber-600"
      case "error": return "from-red-500 to-pink-600"
      default: return "from-gray-500 to-gray-600"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "active": return <CheckCircle size={14} />
      case "initializing": return <RefreshCw size={14} className="animate-spin" />
      case "error": return <AlertTriangle size={14} />
      default: return <VideoOff size={14} />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-violet-600" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">AI Proctor</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${getStatusColor()} text-white font-medium`}>
            {getStatusIcon()}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          {warnings > 0 && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${warnings >= 3 ? "bg-red-100 dark:bg-red-900/30 text-red-600" : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600"}`}>
              {warnings}/3
            </span>
          )}
        </div>
      </div>

      <div className="p-3">
        <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-[4/3] mb-3">
          {cameraOn ? (
            <>
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${faceDetected ? "bg-emerald-500" : "bg-red-500"} ${faceDetected ? "" : "animate-pulse"}`} />
                <span className={`text-[10px] font-medium ${faceDetected ? "text-emerald-400" : "text-red-400"}`}>
                  {faceDetected ? "Face Detected" : "No Face"}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/50 text-white font-mono">
                  {confidence}%
                </span>
              </div>
              {!faceDetected && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 border-2 border-red-500 rounded-xl flex items-center justify-center bg-black/30">
                  <AlertTriangle size={32} className="text-red-500" />
                </motion.div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-2">
              <Camera size={32} />
              <span className="text-xs">{status === "error" ? "Camera unavailable" : "Camera off"}</span>
              {status === "error" && (
                <button onClick={startCamera} className="text-xs px-3 py-1 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 font-medium mt-1">
                  Retry
                </button>
              )}
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          {cameraOn ? (
            <button onClick={stopCamera} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-all">
              <VideoOff size={14} /> Stop
            </button>
          ) : (
            <button onClick={startCamera} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 text-xs font-medium hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-all">
              <Video size={14} /> Start
            </button>
          )}
          <button onClick={captureSnapshot} disabled={!cameraOn}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 transition-all">
            <Camera size={14} /> Capture
          </button>
        </div>

        {snapshot && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Eye size={12} className="text-gray-400" />
              <span className="text-[10px] text-gray-400">Last Snapshot</span>
            </div>
            <img src={snapshot} alt="Snapshot" className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
          </div>
        )}

        <div>
          <div className="flex items-center gap-1 mb-1">
            <RefreshCw size={10} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">Proctor Log</span>
          </div>
          <div className="h-24 overflow-y-auto space-y-0.5 custom-scrollbar">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="text-gray-400 shrink-0">{log.time}</span>
                <span className={`shrink-0 ${log.type === "warning" ? "text-yellow-500" : log.type === "error" ? "text-red-500" : log.type === "success" ? "text-emerald-500" : "text-gray-500"}`}>
                  {log.type === "warning" ? "⚠" : log.type === "error" ? "✗" : log.type === "success" ? "✓" : "→"}
                </span>
                <span className={`truncate ${log.type === "warning" ? "text-yellow-700 dark:text-yellow-400" : log.type === "error" ? "text-red-700 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}>
                  {log.msg}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
