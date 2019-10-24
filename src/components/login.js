import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { useAuth } from '../context/auth-context';
import styles from './login.module.css';
import { Spinner } from './spinner';

const Login = () => {
  const { handleSubmit, register, errors } = useForm();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { login } = useAuth();

  const onSubmit = (values) => {
    if (isPending) return;
    setIsPending(true);
    login(values).then(() => {}, (error) => {
      setIsPending(false);
      setError(error.message);
    });
  };

  return (
    <div className={ styles.flexContainer }>
      <div className={ styles.subHeader }>Sign in to your account.</div>
      <div className={ styles.form }>
        <div className={ styles.formInput }>
          <div>Email</div>
          <input
            placeholder="Enter email"
            className={ styles.input }
            name="username"
            ref={ register({ required: 'Required.' }) }
            type="email"
          />
          <div className="errorMessage">{ errors.email && errors.email.message }</div>
        </div>
        <div className={ styles.formInput }>
          <div>Password</div>
          <input
            placeholder="Enter password"
            className={ styles.input }
            name="password"
            ref={ register({ required: 'Required.' }) }
            type="password"
          />
          <div className="errorMessage">
            { errors.password ? errors.password.message : error }
          </div>
        </div>
      </div>
      <button
        className={ styles.button }
        onClick={ handleSubmit(onSubmit) }>
          { !isPending && 'Sign in' }
          { isPending && <Spinner /> }
      </button>
    </div>
  );
};

export default Login;
