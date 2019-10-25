import React from 'react';
import { Link } from 'react-router-dom';
import styles from './global.module.css';
import querystring from 'query-string';
import { useAuth } from '../context/auth-context';

const Home = ({ user, location }) => {
  const { logout } = useAuth();
  const queryParams = querystring.parse(location.search);
  return (
    <div className={ styles.container }>
      <div className={ styles.flexContainer }>
        <div className={ styles.header }>React Auth</div>
        { !user && <Link className={ styles.button } style={{ lineHeight: '40px' }} to="/login">Log In</Link> }
        { user && <button className={ styles.button } onClick={ () => logout() }>Logout</button> }
        <div>{ user && JSON.stringify(user) }</div>
        <div>{ queryParams && JSON.stringify(queryParams) }</div>
      </div>
    </div>
  );
};

export default Home;