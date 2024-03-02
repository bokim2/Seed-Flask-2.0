import React, { useState } from 'react';
import DilutionCalculator from './DilutionCalculator';
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
  /* max-width: 450px; */
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 850px) {
    font-size: 1.5rem;
  }
`;

export const DilutionCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  @media (min-width: 850px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const DilutionsSummaryButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  justify-content: center;
  gap: 0.5rem;
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

  // const totalDilutionFactor = dilutionsSummary.reduce((acc, prev)=> acc * prev.dilutionFactor, 1);
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
        <DilutionCardsContainer>
          {dilutionSettings.map((e, i) => (
            <DilutionCalculator
              key={i}
              dilutionSetting={dilutionSettings[i]}
              dilutionSettings={dilutionSettings}
              setDilutionSettings={setDilutionSettings}
              dilutionsSummary={dilutionsSummary}
              row={i}
            />
          ))}
        </DilutionCardsContainer>
        <AllSerialDilutionsSummary
          dilutionsSummary={dilutionsSummary}
          dilutionSettings={dilutionSettings}
          setDilutionSettings={setDilutionSettings}
          // totalDilutionFactor={totalDilutionFactor}
        />
        <DilutionsSummaryButtonsContainer>
          {/* add and clear serial dilutions */}
          <Button $size="small" onClick={addSerialDilution}>
            Add Dilution
          </Button>
          {dilutionSettings.length > 0 && (
            <Button
              $size="small"
              $variation="warning"
              onClick={() => {
                setDilutionSettings((prev) => prev.slice(0, -1));
              }}
            >
              Clear last dilution
            </Button>
          )}

          <Button
            $size="small"
            $variation="warning"
            onClick={() => setDilutionSettings(initialDilutionSettings)}
          >
            Clear All Dilutions
          </Button>
        </DilutionsSummaryButtonsContainer>
      </StyledSamplesDilution>
    </>
  );
}
