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
      console.log('Received notification:', data);
      const notificationMessage = typeof data === "object" ? data.message : data;
      const notificationId = typeof data === "object" ? data.id : Date.now();
      
      setNotifications((prev) => [
        ...prev, 
        { id: notificationId, message: notificationMessage }
      ]);
      
      // Auto-dismiss after 10 seconds if not manually dismissed
      setTimeout(() => {
        dismissNotification(notificationId);
      }, 30000);
    });

    // Clean up on unmount
    return () => {
      socket.off("notification");
      socket.off('connect');
      socket.off('connect_error');
    };
  }, []);

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="real-time-notification">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification-toast">
          <span className="notification-message">{notification.message}</span>
          <button 
            className="dismiss-btn" 
            onClick={() => dismissNotification(notification.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default RealTimeNotification;
