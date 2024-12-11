'use client'

import { useUser } from './context/UserContext';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Chat from '../components/Chat';

export default function App() {
  const { user } = useUser();

  return (
    <div>
      {!user && (
        <>
          <Signup />
          <br />
          <Login />
        </>
      )}
      {user && <Chat />}
    </div>
  );
}
