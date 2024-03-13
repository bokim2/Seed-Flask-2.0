import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledDateTimePicker = styled.div`
`;

export default function DateTimePicker({ clickedXY }) {
  console.log(clickedXY, 'clickedXY');
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // Format time as HH:MM

  // Initialize state with current date and time
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime);
  const [adjustedTime, setAdjustedTime] = useState<Date | null>(null);

  useEffect(() => {
    if (clickedXY) {
      setAdjustedTime(new Date(now.getTime() + clickedXY[0] * 3600000));
      // setTime(adjustedTime.toTimeString().split(' ')[0].substring(0, 5));
    }
  }, [clickedXY]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from being submitted
    console.log('date time', `${date} ${time}`)
    console.log('adjustedTime', adjustedTime?.toISOString().split('.')[0].replace('T', ' '))
    // alert(`Selected Date: ${date}\nSelected Time: ${time}`);
  };

  return (
    <StyledDateTimePicker>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        {clickedXY && (
          <>
            <h3>Selected time since inoc hrs: {clickedXY[0]?.toFixed(2)}</h3>
            <h3>Estimated OD600: {clickedXY[1]?.toFixed(2)}</h3>
          </>
        )}

        <button type="submit">Submit</button>

        {adjustedTime?.toString()}
      </form>
    </StyledDateTimePicker>
  );
}
