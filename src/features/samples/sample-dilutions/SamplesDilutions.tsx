import React, { useState } from 'react';
import SamplesDilutionCalculator from './SamplesDilutionCalculator';
import Button from '../../../ui/Button';
import styled from 'styled-components';
import {
  dilutionsCalculator,
  initialDilutionSettings,
} from '../samples-helpers';
import AllSerialDilutionsSummary from './AllSerialDilutionsSummary';

export const StyledSamplesDilution = styled.div`
  /* background-color: #829bda; */
  /* padding: 1rem; */
  /* max-width: 400px; */
`;

export default function SamplesDilutions() {
  const [dilutionSettings, setDilutionSettings] = useState(
    initialDilutionSettings
  );

  // derived state diluentUL, sampleUL, dilutionFactor from dilutionSettings
  const dilutionsSummary = dilutionSettings.map((singleDilution, i) => {
    const { diluentUL, sampleUL, dilutionFactor } = dilutionsCalculator(
      singleDilution.selected,
      singleDilution.selectedValue,
      singleDilution.selectedCalc,
      singleDilution.selectedCalcValue,
      singleDilution.rawOD600Target
    );
    console.log('inside dilutionSummary', {
      diluentUL,
      sampleUL,
      dilutionFactor,
    });
    return { diluentUL, sampleUL, dilutionFactor };
  });
  console.log('dilutionsSummary', dilutionsSummary);

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
      <StyledSamplesDilution>
        {dilutionSettings.map((e, i) => (
          <SamplesDilutionCalculator
            key={i}
            dilutionSetting={dilutionSettings[i]}
            dilutionSettings={dilutionSettings}
            setDilutionSettings={setDilutionSettings}
            dilutionsSummary={dilutionsSummary}
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
        <AllSerialDilutionsSummary
          dilutionsSummary={dilutionsSummary}
          dilutionSettings={dilutionSettings}
        />
        <Button onClick={addSerialDilution}>Add Dilution</Button>
        <Button onClick={() => setDilutionSettings(initialDilutionSettings)}>
          Clear Dilutions
        </Button>
      </StyledSamplesDilution>
    </>
  );
}
