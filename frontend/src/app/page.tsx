'use client'; // This directive is needed for using hooks like useState and useEffect

import { useState, useEffect } from 'react';

export default function Home() {
  // State to store the message from our backend
  const [backendMessage, setBackendMessage] = useState('Loading...');

  useEffect(() => {
    // Function to fetch data from the FastAPI backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/ping');
        const data = await response.json();
        setBackendMessage(data.message);
      } catch (error) {
        console.error('Failed to fetch from backend:', error);
        setBackendMessage('Failed to connect to backend.');
      }
    };

    fetchData();
  }, []); // The empty array [] means this effect runs once when the component mounts

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Frontend is Running!</h1>
        <p className="text-xl p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          Message from Backend: <span className="font-semibold text-green-500">{backendMessage}</span>
        </p>
      </div>
    </main>
  );
}