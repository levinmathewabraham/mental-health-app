import React, { useState, useEffect } from "react";
import "./Notification.css";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("/api/notifications")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched notifications:", data); // Add this line
        setNotifications(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className={notification.isRead ? "read" : "unread"}>
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
