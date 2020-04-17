import React from 'react';

import './style.css';
import { Link } from 'react-router-dom';

export default function InitialHeader() {
  return (
    <header className="col-md-12">
      <div className="container">
        <h1><Link to="/">React Notes</Link></h1>
      </div>
    </header>
  );
}
