import React from 'react';

const AuthContext = React.createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

export default AuthContext;
