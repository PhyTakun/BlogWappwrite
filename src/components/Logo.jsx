import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <svg width={width} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#0f172a" />
      <text x="50" y="58" textAnchor="middle" fill="white" fontSize="30" fontFamily="sans-serif">
        BlogIT
      </text>
    </svg>
  )
}

export default Logo