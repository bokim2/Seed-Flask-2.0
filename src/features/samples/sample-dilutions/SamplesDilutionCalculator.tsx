import React, { useState } from 'react';
import { dilutionsCalculator } from '../samples-helpers';
import SamplesDilutionAnimation from './SamplesDilutionAnimation';
import { DilutionSelectors } from './DilutionSelectors';
import {
  CalculationContainer,
  OD600ReadingInput,
  SampleSummaryContainer,
  SingleDilutionContainer,
  SingleSelectorWrapper,
  StyledH2,
  StyledSingleDilution,
} from './dilutions-styles';
import SamplesDilutionSummary from './SamplesDilutionSummary';

export default function SamplesDilutionCalculator({
  dilutionSetting,
  setDilutionSettings,
  dilutionSettings,
  dilutionsSummary,
  row,
}) {
  const {
    selected,
    selectedValue,
    selectedCalc,
    selectedCalcValue,
    rawOD600Target,
    rowNumber,
  } = dilutionSetting;
  // console.log(
  //   'selected, selectedValue, selectedCalc, selectedCalcValue, rawOD600Target',
  //   selected,
  //   selectedValue,
  //   selectedCalc,
  //   selectedCalcValue,
  //   rawOD600Target
  // );


  const { diluentUL, sampleUL, dilutionFactor } = dilutionsSummary[row];

  return (
    // <SingleDilutionContainer id='dilution-calculator'>
      <StyledSingleDilution id='single-dilution'>
        <StyledH2>Serial Dilution {row + 1}</StyledH2>
        <SampleSummaryContainer id="SampleSummaryContainer">

          <SamplesDilutionAnimation
            diluentUL={diluentUL}
            sampleUL={sampleUL}
            dilutionFactor={dilutionFactor}
          />

          <SingleSelectorWrapper>
            <DilutionSelectors
              selected={selected}
              selectedValue={selectedValue}
              rawOD600Target={rawOD600Target}
              setDilutionSettings={setDilutionSettings}
              selectedCalc={selectedCalc}
              selectedCalcValue={selectedCalcValue}
              row={row}
            />
          </SingleSelectorWrapper>
        </SampleSummaryContainer>

        <SamplesDilutionSummary
          diluentUL={diluentUL}
          sampleUL={sampleUL}
          dilutionFactor={dilutionFactor}
          selected={selected}
          selectedValue={selectedValue}
          selectedCalc={selectedCalc}
          selectedCalcValue=  {selectedCalcValue}
          rawOD600Target={rawOD600Target}
          dilutionSettings={dilutionSettings}
          dilutionSetting={dilutionSetting}setDilutionSettings={setDilutionSettings}
          // OD600Reading={OD600Reading}
        />
        
      </StyledSingleDilution>
    // </SingleDilutionContainer>
  );
}
