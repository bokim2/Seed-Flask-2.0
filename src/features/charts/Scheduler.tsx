import React, { useState } from 'react';
import DateTimePicker from './DateTimePicker';

export default function Scheduler({ clickedXY }) {
  if (!clickedXY) return;
  return (
    <>
      {clickedXY && (
        <>
          <p>{clickedXY[0]?.toFixed(2)}</p>
          <h3>{clickedXY[1]?.toFixed(2)}</h3>
        </>
      )}

     
    </>
  );
}
