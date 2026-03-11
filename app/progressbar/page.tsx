"use client"
import React, { useState, useRef } from 'react';

const VolumeBar = () => {
  // Volume ki current value store karne ke liye state (default 0)
  const [volume, setVolume] = useState(0);

  // Bar container element ka reference lene ke liye
  const barRef = useRef(null);

  // Click handle karne ka function
  const handleBarClick = (event) => {
    if (!barRef.current) return;

    // Bar ki screen par position aur dimensions nikalna
    const rect = barRef.current.getBoundingClientRect();
    console.log(rect);

    // User ne bar ke left edge se kitni door click kiya hai
    const clickX = event.clientX - rect.left;

    // Percentage calculation
    let percentage = (clickX / rect.width) * 100 ;

    // Value ko 0 aur 100 ke beech limit karna
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    // State ko update karna (UI apne aap re-render ho jayega)
    setVolume(percentage);
  };

  return (
    <div style={{ margin: '50px', fontFamily: 'Arial, sans-serif' }}>

      {/* Container jispar hum click detect kar rahe hain */}
      <div
        ref={barRef}
        onClick={handleBarClick}
        style={{
          width: '300px',
          height: '20px',
          backgroundColor: '#e0e0e0',
          borderRadius: '10px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Fill wala hissa jiski width volume state par depend karti hai */}
        <div
          style={{
            height: '100%',
            width: `${volume}%`, // Width dynamically set ho rahi hai
            backgroundColor: '#4caf50',
            transition: 'width 0.2s ease' // Smooth animation
          }}
        />

      </div>

      <p>Volume: <strong>{volume}%</strong></p>


    </div>
  );
};

export default VolumeBar;

