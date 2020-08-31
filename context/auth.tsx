import React from 'react';

export type UserDataType = {
  email: string;
  exp: number;
  iat: number;
  roles: [string];
  userId: string;
  userName: string;
};

interface AuthContextType {
  user: UserDataType | null;
  login: (user: UserDataType) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: (userData: UserDataType) => {},
  logout: () => {},
});

export default AuthContext;
