import { useEffect, useState } from "react"
import { connectSocket, getSocket, disconnectSocket } from "@/socket/socket"

export default function useSocket(token) {
  const [isConnected, setIsConnected] = useState(false)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (!token) return

    const newSocket = connectSocket(token)
    setSocket(newSocket)

    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)

    newSocket.on("connect", onConnect)
    newSocket.on("disconnect", onDisconnect)
    if (newSocket.connected) setIsConnected(true)

    return () => {
      newSocket.off("connect", onConnect)
      newSocket.off("disconnect", onDisconnect)
    }
  }, [token])

  const emit = (event, data) => {
    if (socket?.connected) socket.emit(event, data)
  }

  const on = (event, callback) => {
    socket?.on(event, callback)
    return () => socket?.off(event, callback)
  }

  return { socket, isConnected, emit, on, disconnect: disconnectSocket }
}
