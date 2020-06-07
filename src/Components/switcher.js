import React from 'react';

import Home from './home/home';
import Login from './user/login';



function Switcher (props) {
  console.log(props);
  return props.isLoggedIn ? (<Home/>) : (<Login/>);
}


export {
  Switcher
}