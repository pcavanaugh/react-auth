import React, { useState } from 'react';
import useForm from 'react-hook-form';
import InputField from '../components/input-field';
import { useAuth } from '../context/auth-context';
import styles from './global.module.css';
import { Spinner } from '../components/spinner';

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
        <InputField
          label="Email"
          placeholder="Enter email"
          name="username"
          inputRef={ register({ required: 'Required' }) }
          errorMessage={ errors.username && errors.username.message }
        />
        <InputField
          type="password"
          label="Password"
          placeholder="Enter password"
          name="password"
          inputRef={ register({ required: 'Required' }) }
          errorMessage={ errors.password && errors.password.message }
        />
      </div>
      <div>{ error }</div>
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
