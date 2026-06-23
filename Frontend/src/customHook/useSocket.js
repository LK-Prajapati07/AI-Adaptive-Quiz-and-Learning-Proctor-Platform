import { useEffect, useRef } from "react";
import { toast } from "sonner";

export const useSocket = (attemptId) => {
  const socket = useRef(null);

  useEffect(() => {
    if (!attemptId) return;
    socket.current = new WebSocket("ws://localhost:3000");
    socket.current.onopen = () => {
      console.log("Socket Connected");
      socket.current.send(
        JSON.stringify({
          type: "JOIN_ATTEMPT",
          attemptId,
        }),
      );
    };
    socket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Server Message", data);
      } catch (error) {
        toast.error("Invalid server response");
      }
    };
    socket.current.onerror = (error) => {
      console.log("Socket Error", error);
      toast.error("WebSocket Error");
    };
    socket.current.onclose = () => {
      console.log("Socket Closed");
    };
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [attemptId]);
  const sendSocketMessage = (payload) => {
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(payload));
    } else {
      console.log("Socket not connected");
    }
  };
  return {
    sendSocketMessage,
  };
};
