import './globals.css';
import { SocketProvider } from '../app/context/SocketContext';
import { UserProvider } from '../app/context/UserContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
          <UserProvider>{children}</UserProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
