'use client'

import { useState } from 'react';
import { useUser } from '../app/context/UserContext';

const Signup = () => {
  const { login } = useUser();
  const [name, setName] = useState('');

  const handleSignUp = () => {
    if (name.trim()) {
      login(name); // Log in as the entered name
      // At some point, send this info to the backend for storage
    }
  };

  return (
    <div>
      <h2>SIGN UP</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default Signup;
