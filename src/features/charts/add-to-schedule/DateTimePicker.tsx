import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MultiInput } from '../../../styles/UtilStyles';
import {
  combineDateAndTime,
  displayLocalTime,
  formatDateTime,
  transformListStringToArray,
  validateCurrentFlasks,
} from '../../../hooks/hooks';
import { addHours } from 'date-fns';
import Button from '../../../ui/Button';
import { useMutation } from '@tanstack/react-query';
import { baseUrl } from '../../../../configs';
import { validate } from 'json-schema';

const StyledDateTimePicker = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: 4rem;
  padding: 1rem;
  background-color: black;
`;

const SelectorOuterContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

const SelectorInnerContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
`;

export default function DateTimePicker({
  clickedXY,
  bookmarkedFlasks,
  setBookmarkedFlasks,
}) {
  console.log(clickedXY, 'clickedXY');
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // Format time as HH:MM

  // Initialize state with current date and time
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime);
  const selectedStartTime = combineDateAndTime(date, time);

  const scheduleStartDate = `${date} ${time}`;
  const [adjustedTime, setAdjustedTime] = useState<Date | null>(null);

  const [notes, setNotes] = useState('');
  const [flask_id, setFlask_id] = useState('');
  const [current_flasks, setCurrent_flasks] = useState('');

  useEffect(() => {
    function adjustDateTime(originalDate, hoursToAdd) {
      const adjustedDate = new Date(originalDate);
      adjustedDate.setHours(adjustedDate.getHours() + hoursToAdd);
      return adjustedDate;
    }

    if (clickedXY) {
      setAdjustedTime((prev) => {
        return adjustDateTime(selectedStartTime, clickedXY[0]);
      });
      // setTime(adjustedTime.toTimeString().split(' ')[0].substring(0, 5));
    }
  }, [clickedXY, date, time]);

  async function createSchedule(createEntry) {
    const response = await fetch(`${baseUrl}/api/schedules`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...createEntry,
      }),
    });
  }

  const {
    mutate: createScheduleMutation,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (createEntry: any) => createSchedule(createEntry),
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from being submitted
    console.log('date time', scheduleStartDate);
    console.log(
      'adjustedTime',
      adjustedTime?.toISOString().split('.')[0].replace('T', ' ')
    );

    const createScheduleObject = {
      start_date: scheduleStartDate,
      time_since_inoc_hr: clickedXY[0],
      notes,
      flask_bookmark: bookmarkedFlasks,
      flask_id: flask_id == '' ? null : flask_id,
      current_flasks: transformListStringToArray(current_flasks),
    };

    createScheduleMutation(createScheduleObject);

    // alert(`Selected Date: ${date}\nSelected Time: ${time}`);
  };

  return (
    <StyledDateTimePicker>
      <h2>Click on graph to estimate sampling time</h2>
      <form onSubmit={handleSubmit}>
        <SelectorOuterContainer>
          <SelectorInnerContainer>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </SelectorInnerContainer>
          <SelectorInnerContainer>
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </SelectorInnerContainer>
        </SelectorOuterContainer>
        {clickedXY && (
          <ColumnContainer>
            <h3>Selected time since inoc hrs: {clickedXY[0]?.toFixed(2)}</h3>
            <h3>Estimated OD600: {clickedXY[1]?.toFixed(2)}</h3>
          </ColumnContainer>
        )}

        <MultiInput
          // id="notes"
          name="notes"
          onChange={(e) => setNotes(e.target.value)}
          placeholder="notes (e.g. project Cedar, for strain screening.  6 flasks.)"
          required
          value={notes}
        />

        <MultiInput
          // id="project"
          name="current_flasks"
          onChange={(e) => setCurrent_flasks(e.target.value)}
          placeholder="flasks (e.g. 40, 41, 42)"
          // required
          value={current_flasks}
        />
        {!validateCurrentFlasks(current_flasks) && (
          <p>Flask list format is invalid. </p>
        )}

        <MultiInput
          // id="project"
          name="flask_id"
          onChange={(e) => setFlask_id(e.target.value)}
          placeholder="add a single MAIN flask id if it already exists"
          // required
          value={flask_id}
        />

        <ColumnContainer>
          {/* {adjustedTime?.toString()} */}
          {adjustedTime && <p>Sample at {formatDateTime(adjustedTime)}</p>}
          <Button type="submit" disabled={!clickedXY}>{!clickedXY ? 'click on graph to choose sample time' : 'Add to Schedule' }</Button>
        </ColumnContainer>
      </form>
    </StyledDateTimePicker>
  );
}
