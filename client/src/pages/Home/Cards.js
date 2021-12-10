import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these Diets !</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-8.jpg'
              text='Diet with fluids and fruits'
              label='Special'
              path='/prices'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Diet with complete food'
              label='Lux'
              path='/prices'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-2.jpg'
              text='Diet with sport'
              label='Full-Diet'
              path='/prices'
            />
            <CardItem
              src='images/img-5.jpg'
              text='Diet with private exercises'
              label='My-Diet'
              path='/prices'
            />
            <CardItem
              src='images/img-1.jpg'
              text='Diet with a personal plan'
              label='Self-Diet'
              path='/prices'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;