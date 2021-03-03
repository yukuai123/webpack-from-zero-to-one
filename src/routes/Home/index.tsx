import React from 'react';
import style from './index.scss';

const Home = () => {
  const a = { a: 132 };
  console.log(a?.a ?? 123);

  return <h1 className={style.color}>Homqqweqwewee</h1>;
};

export default Home;
