import React, { useState, useLayoutEffect } from 'react';
import { useAsync } from 'react-async';
import { bootstrapAppData } from '../services/bootstrap';
import * as authClient from '../services/auth-client';
import { FullPageSpinner } from '../components/spinner';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = useState(false);
  const {
    data = { user: null },
    error,
    isRejected,
    isPending,
    isSettled,
    reload
  } = useAsync({
    promiseFn: bootstrapAppData
  });

  useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true)
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return (
        <div className="prelogin-app">
          <FullPageSpinner />
        </div>
      );
    }
    if (isRejected) {
      return (
        <div>
          <div>Uh oh... There's a problem. Try refreshing?</div>
          <div>{ error.message }</div>
        </div>
      );
    }
  }

  const login = credentials => authClient.login(credentials).then(reload);
  const logout = () => authClient.logout().then(reload);

  return (
    <AuthContext.Provider value={{ data, login, logout }} { ...props } />
  );
}

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };