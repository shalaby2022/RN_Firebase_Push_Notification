import {createContext, useState} from 'react';

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthenticatedUserContext.Provider
      value={{user, setUser, isLoading, setIsLoading}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
