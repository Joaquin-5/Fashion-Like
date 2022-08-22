import React from 'react';
/* import { FormPost } from '../s/cards/FormPost'; */
import { Cards } from '../components/cards/Cards';
import { ModalComponent } from '../components/modal/Modal';

export const Home = () => {
  return (
    <div>
        <h1>Home</h1>
        <Cards/>
        <ModalComponent />
    </div>
  )
}