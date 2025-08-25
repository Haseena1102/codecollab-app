import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

// Connect to the backend server
const socket = io('https://codecollab-server-haseena.onrender.com');

function App() {
  const [code, setCode] = useState('');

  useEffect(() => {
    // Listen for 'code-change' events from the server
    socket.on('code-change', (receivedCode) => {
      setCode(receivedCode);
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.off('code-change');
    };
  }, []);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    // Send the new code to the server
    socket.emit('code-change', newCode);
  };

  return (
    <div className="App">
      <textarea 
        value={code}
        onChange={handleCodeChange}
        className="editor"
      />
    </div>
  );
}

export default App;