import { io } from "socket.io-client";
import React, { useEffect } from "react";

const socket = io("http://localhost:5000"); // Replace with your backend server URL

const RealTimeNotification = () => {
  useEffect(() => {
    // Listen for the "notification" event from the server
    socket.on("notification", (message) => {
      alert(message); // Show the notification (simple alert for now)
    });

    // Clean up the listener on unmount
    return () => {
      socket.off("notification");
    };
  }, []);

  return null; // This component doesn't render UI; it just handles WebSocket logic
};

export default RealTimeNotification;
