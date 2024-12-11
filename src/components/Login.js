import { useState } from 'react';
import { useUser } from '../app/context/UserContext';
import { appUsers } from '../Variables';

const Login = () => {
  const { login } = useUser();
  const [selectedUser, setSelectedUser] = useState('');

  const handleLogin = () => {
    if (selectedUser) {
      login(selectedUser);
    }
  };

  return (
    <div>
      <h2>LOG IN</h2>
      <select 
        value={selectedUser} 
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="" disabled>Select a user</option>
        {appUsers.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button onClick={handleLogin} disabled={!selectedUser}>
        Log in
      </button>
    </div>
  );
};

export default Login;
