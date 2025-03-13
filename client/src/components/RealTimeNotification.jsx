import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./RealTimeNotification.css"; // Optional: Add custom styles
import { API_BASE_URL } from '../config';

// Configure socket with proper options
const socket = io(API_BASE_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

function RealTimeNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Add connection status logging
    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Listen for 'notification' events
    socket.on("notification", (data) => {
      console.log('Received notification:', data); // Add logging
      const notificationMessage = typeof data === "object" ? data.message : data;
      setNotifications((prev) => [...prev, notificationMessage]);
    });

    // Clean up on unmount
    return () => {
      socket.off("notification");
      socket.off('connect');
      socket.off('connect_error');
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
