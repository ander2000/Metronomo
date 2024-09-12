import React from 'react'
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav>
        <ul>
            <li><Link to={'/'}>Metrono</Link></li>
            <li><Link to={'/about'}>Acerca de</Link></li>
        </ul>
    </nav>
  )
}