import React from 'react'
import { FiMail, FiMessageCircle, FiPhone } from 'react-icons/fi'
export default function About(){
  return (
    <div>
      <h2>About</h2>
      <p>Built with React, Zustand, Chart.js, and a lightweight Express API.
This application enables users to:</p>
      <ul>
        <li>Visualize the number of cars built during a given time period.</li>
        <li>Search, filter, sort, and mark cars as favorites.</li>
        <li>View detailed information about each car by clicking on it.</li>
        <li>Access their personalized list of favorite cars through the Favorites tab, with the ability to view details or update favorites directly from the detail view.</li>
      </ul>
      <FiPhone size={18} /> (777) - 777-7777
      <div>
      <FiMail size={18} /> info@info.com
      </div>
      
    </div>
  )
}
