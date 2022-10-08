import { useNavigate } from "react-router-dom";
import logo from './logo.svg';
import React from 'react'

export const Header: React.FC = () => {
   const navigate = useNavigate();

   return (
      <header>
         <nav>
            <ul>
               <li>
                  <a onClick={() => navigate('/')}>
                     Home
                  </a>
               </li>
               <li>
                  <a onClick={() => navigate('/add-post')}>
                     Add new post
                  </a>
               </li>
               <li>
                  <img onClick={() => navigate('/')} src={logo} alt="" />
               </li>
            </ul>
         </nav>
      </header>
   );
}