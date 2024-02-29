import React, { useState } from 'react';
import SamplesDilutionCalculator from './SamplesDilutionCalculator';
import Button from '../../../ui/Button';
import styled from 'styled-components';
import { initialDilutionSettings } from '../samples-helpers';

export const DilutionsSectionContainer = styled.div`
  /* background-color: #829bda; */
  /* padding: 1rem; */
`;

export default function SamplesDilutionsSection() {
  const [dilutionSettings, setDilutionSettings] = useState(
    initialDilutionSettings
  );

  function addSerialDilution() {
    setDilutionSettings((prev) => {
      if (dilutionSettings.length == 0) {
        return initialDilutionSettings;
      }
      return [...prev, { ...prev[prev.length - 1], rowNumber: prev.length }];
    });
  }

  console.log('dilutionSettings', dilutionSettings);

  return (
    <>
      <DilutionsSectionContainer>
        {dilutionSettings.map((e, i) => (
          <SamplesDilutionCalculator
            key={i}
            dilutionSetting={dilutionSettings[i]}
            dilutionSettings={dilutionSettings}
            setDilutionSettings={setDilutionSettings}
            row={i}
          />
        ))}
        {/* add and clear serial dilutions */}
        <Button
          $size="xs"
          $variation="warning"
          onClick={() => {
            setDilutionSettings((prev) => prev.slice(0, -1));
          }}
          >
          erase this dilution
        </Button>
        <Button onClick={addSerialDilution}>Add Dilution</Button>
        <Button onClick={() => setDilutionSettings(initialDilutionSettings)}>
          Clear Dilutions
        </Button>
      </DilutionsSectionContainer>
    </>
  );
}
