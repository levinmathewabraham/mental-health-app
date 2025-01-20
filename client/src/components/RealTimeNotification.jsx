import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./RealTimeNotification.css"; // Optional: Add custom styles

const socket = io("http://localhost:5000", { withCredentials: true });

function RealTimeNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for 'notification' events
    socket.on("notification", (data) => {
      const notificationMessage = typeof data === "object" ? data.message : data; // Extract message
      setNotifications((prev) => [...prev, notificationMessage]);
    });

    // Clean up on unmount
    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div className="real-time-notification">
      {notifications.map((notification, index) => (
        <div key={index} className="notification-toast">
          {notification}
        </div>
      ))}
    </div>
  );
}

export default RealTimeNotification;
