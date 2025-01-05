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
  Message = 'Message',
  Send = 'Send',
  UserList = 'UserList',
  UserRequest = 'UserRequest',
  UserUpdated = 'UserUpdated',
}
