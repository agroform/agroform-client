import React from 'react';
import HomeNavbar from './HomeNavbar';

export default function Home(props) {
  return (
    <div>
      <HomeNavbar userInSession={props.userInSession} />
      <div>Manifesto : What is agroform. Farmers, join us</div>
      <div>Showcase for contractors. Contractors, join us</div>
    </div>
  )
}
