export type MData = {
  sender: string;
  recipient: string;
  text: string;
  fake?: boolean;
};

export enum ChatEvents {
  History = 'History',
  Login = 'Login',
  Logout = 'Logout',
  Send = 'Send',
  UserList = 'UserList',
  User = 'User',
}
