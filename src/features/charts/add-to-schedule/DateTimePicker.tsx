import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MultiInput } from '../../../styles/UtilStyles';
import {
  combineDateAndTime,
  formatDateTime,
  transformListStringToArray,
  validateCurrentFlasks,
} from '../../../hooks/hooks';
import { format } from 'date-fns';
import Button from '../../../ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '../../../../configs';
import ErrorMessage from '../../../ui/ErrorMessage';

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
  flex-direction: column;
  gap: 3rem;
  align-items: center;

  @media (min-width: 600px) {
    flex-direction: row;
  }
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
  setClickedXY,
  bookmarkedFlasks,
  // setBookmarkedFlasks,
}) {
  console.log(clickedXY, 'clickedXY in date time picker');
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // Format time as HH:MM

  // Initialize state with current date and time
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime);
  const selectedStartTime = combineDateAndTime(date, time);

  const scheduleStartDate = `${date} ${time}`;
  const [adjustedTime, setAdjustedTime] = useState<Date | null>(null);
  console.log('adjustedTime', adjustedTime);

  const [notes, setNotes] = useState('');
  const [flask_id, setFlask_id] = useState('');
  const [current_flasks, setCurrent_flasks] = useState('');
  const queryClient = useQueryClient();

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
    try {
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

      const data = await response.json();
      if (!response.ok) {
        console.log('response is NOT ok', response, 'data', data);
        throw new Error(data.message);
      }
      setClickedXY(null);
      setNotes('');
      setFlask_id('');
      setCurrent_flasks('');
      setAdjustedTime(null);

      return data;
      // setBookmarkedFlasks([]);
      // console.log(response.json(), 'response in createSchedule')
    } catch (error: unknown) {
      if (error instanceof Error) {
        // console.error('Error in createSchedule', error.message);
        throw error;
      } else {
        // console.error('An unexpected error happened', error);
      }
    }
  }

  const {
    mutate: createScheduleMutation,
    isPending: isPendingCreate,
    error: createError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: (createEntry: any) => createSchedule(createEntry),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('schedules'),
      });
      reset();
    },
    onError: (err) => {
      console.error('error in createScheduleMutation ONERROR!!!', err);
      throw err;
    },
  });

  const handleSubmit = async (event) => {
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
    try {
      await createScheduleMutation(createScheduleObject);
    } catch (error) {
      console.error('error in createScheduleMutation', error);
      throw error;
    }
    // alert(`Selected Date: ${date}\nSelected Time: ${time}`);
  };

  console.log('createError', createError);

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
          {adjustedTime && (
            <p>
              Sample at{' '}
              {`${formatDateTime(adjustedTime)} ${format(adjustedTime, 'EEE')}`}
            </p>
          )}

          {isPendingCreate && <h1>edit is pending Create...</h1>}
          {createError && <ErrorMessage error={createError} />}
          <Button type="submit" disabled={!clickedXY}>
            {!clickedXY
              ? 'click on graph to choose sample time'
              : 'Add to Schedule'}
          </Button>
        </ColumnContainer>
      </form>
    </StyledDateTimePicker>
  );
}
