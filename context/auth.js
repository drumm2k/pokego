import React from 'react';

const AuthContext = React.createContext({
  userId: null,
  userName: null,
  token: null,
  login: (tokenData, userIdData, userNameData, tokenExpirationData) => {},
  logout: () => {},
});

export default AuthContext;
