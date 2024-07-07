// components/Loader.tsx
import React from 'react';
import '../index.css'; // We'll create this CSS file for the rotation animation

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <img src="/can.png" alt="Loading..." className="logo" />
    </div>
  );
};

export default Loader;
