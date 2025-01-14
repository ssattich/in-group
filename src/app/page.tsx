'use client';

import { useUser } from './context/UserContext';
import Signup from '../components/Signup';
import LoginOld from '../components/LoginOld';
import Chat from '../components/Chat';

export default function App() {
  const { user } = useUser();

  return (
    <div>
      {!user && (
        <>
          <Signup />
          <br />
          <LoginOld />
        </>
      )}
      {user && <Chat />}
    </div>
  );
}
