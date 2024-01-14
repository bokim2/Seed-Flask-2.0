import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../lib/store';
import { useAppSelector, useAppDispatch } from '../lib/hooks';

// notes:
// timezone
// animations on/off

const TimeZones = ['pacific', 'eastern', 'central', 'mountain'];

const TimeZoneInputs = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;

  background-color: rgba(var(--clr-primary-900), 0.7);
`;

const TimeZoneInput = styled.div`
  display: flex;

  /* align-items: center; */
  justify-content: center;

  background-color: rgba(var(--clr-primary-900), 0.7);
`;

export default function Settings() {
  //   const timeZone = useSelector((state) => state.timeZone);
  const timeZoneSetting = useAppSelector((state) => state.timeZone.timeZone);

  return (
    <TimeZoneInputs>
      timeZone from useSelector: {timeZoneSetting}
      Timezone
      {TimeZones.map((timezone, i) => (
        <TimeZoneInput key={i}>
          <label htmlFor="timeZone">{timezone}</label>
          <input
            type="radio"
            id={timezone}
            name="timeZone"
            checked={timezone == timeZoneSetting}
          />
        </TimeZoneInput>
      ))}
    </TimeZoneInputs>
  );
}
