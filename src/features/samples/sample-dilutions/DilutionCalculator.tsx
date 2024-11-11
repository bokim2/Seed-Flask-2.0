import React, { useState } from 'react';
import { dilutionsCalculator } from '../samples-helpers';
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
import DilutionSummary from './DilutionSummary';
import DilutionAmountAnimation from './DilutionAmountAnimation';

export default function DilutionCalculator({
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
    <SingleDilutionContainer id='dilution-calculator'>
    <StyledSingleDilution id="single-dilution">
      <StyledH2>Serial Dilution {row + 1}</StyledH2>
      <SampleSummaryContainer id="SampleSummaryContainer">
        {/* <DilutionAnimation
          diluentUL={diluentUL}
          sampleUL={sampleUL}
          dilutionFactor={dilutionFactor}
        /> */}

        {/* <SingleSelectorWrapper> */}
          <DilutionSelectors
            selected={selected}
            selectedValue={selectedValue}
            rawOD600Target={rawOD600Target}
            setDilutionSettings={setDilutionSettings}
            selectedCalc={selectedCalc}
            selectedCalcValue={selectedCalcValue}
            row={row}
          />
        {/* </SingleSelectorWrapper> */}
      <DilutionAmountAnimation
          diluentUL={diluentUL}
          sampleUL={sampleUL}
          dilutionFactor={dilutionFactor}
        />
      </SampleSummaryContainer>


      <DilutionSummary
        diluentUL={diluentUL}
        sampleUL={sampleUL}
        dilutionFactor={dilutionFactor}
        selectedCalc={selectedCalc}
        selectedCalcValue={selectedCalcValue}
        rawOD600Target={rawOD600Target}
        dilutionSetting={dilutionSetting}
        // OD600Reading={OD600Reading}
      />
      
    </StyledSingleDilution>
      {/* <DilutionAmountAnimation
          diluentUL={diluentUL}
          sampleUL={sampleUL}
          dilutionFactor={dilutionFactor}
        /> */}
    </SingleDilutionContainer>
  );
}
