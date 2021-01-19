import * as React from 'react';
import '../styles/SearchItem.css'

export const SearchItem: React.StatelessComponent<{}> = () => {
    return (

        <div className="topnav">
            <a className="active" href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <input type="text" placeholder="Search.."/>
            <button id="search">Search</button>
      </div>


    );
  }

