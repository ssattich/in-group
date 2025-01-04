import { useEffect, useState } from 'react';
import { useUser } from '../app/context/UserContext';
import UserService from '@/services/UserService';

const Login = () => {
  const { login } = useUser();
  const [selectedUser, setSelectedUser] = useState('');
  const [appUsers, setAppUsers] = useState([]);

  useEffect(() => {
    const userService = UserService();
    (async function populateUsers() {
      const users = await userService.getUserList();
      setAppUsers(users);
    })();
  }, []);

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
