import React from 'react';

const AuthContext = React.createContext({
  userId: null,
  userName: null,
  roles: null,
  token: null,
  login: (tokenData, userIdData, userNameData, rolesData, tokenExpirationData) => {},
  logout: () => {},
});

export default AuthContext;
