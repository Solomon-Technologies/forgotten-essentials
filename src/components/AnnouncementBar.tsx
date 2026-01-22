import { useState, useEffect } from 'react';
import './AnnouncementBar.css';

interface AnnouncementBarProps {
  messages?: string[];
  rotationInterval?: number; // in milliseconds
}

const defaultMessages = [
  'Free shipping on all US orders',
  'New vintage drops every week',
  'Follow us @forgottenessentials',
];

export default function AnnouncementBar({
  messages = defaultMessages,
  rotationInterval = 4000
}: AnnouncementBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 300);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [messages.length, rotationInterval]);

  if (messages.length === 0) return null;

  return (
    <div className="announcement-bar">
      <div className={`announcement-text ${isVisible ? 'visible' : ''}`}>
        {messages[currentIndex]}
      </div>
    </div>
  );
}
