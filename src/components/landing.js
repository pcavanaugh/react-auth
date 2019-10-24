import React from 'react';
import { Link } from 'react-router-dom';
import styles from './join.module.css';

const Landing = () => {
  return (
    <div className={ styles.container }>
      <div className={ styles.flexContainer }>
        <div className={ styles.header }>React Auth</div>
        <Link className={ styles.button } style={{ lineHeight: '40px' }} to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Landing;
