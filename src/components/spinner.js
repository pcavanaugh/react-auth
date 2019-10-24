/** @jsx jsx */
import {jsx} from '@emotion/core'
import { FaSpinner } from 'react-icons/fa';
import { keyframes } from '@emotion/core';

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

export const Spinner = () => (
  <FaSpinner
    className="fa-spin"
    css={{ animation: `${spin} 1s linear infinite` }}
    aria-label="loading"
  />
);

export const FullPageSpinner = () => (
  <div style={{ marginTop: '5rem' }}>
    <Spinner />
  </div>
);
