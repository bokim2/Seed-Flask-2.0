import React, { useState } from 'react';
import Button from '../../../ui/Button';
import {
  dilutionsCalculator,
  initialDilutionSettings,
} from '../samples-helpers';
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

export default function SamplesDilutionCalculator({
  dilutionSetting,
  setDilutionSettings,
  dilutionSettings,
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

  const [OD600Reading, setOD600Reading] = useState<string>('0.');
  const { diluentUL, sampleUL, dilutionFactor } = dilutionsCalculator(
    selected,
    selectedValue,
    selectedCalc,
    selectedCalcValue,
    rawOD600Target
  );

  function calculateOD600() {

    if (OD600Reading !== '0.' && Number(OD600Reading)) {
      if (selectedCalc == 'estimate') {
        return (Number(OD600Reading) * selectedCalcValue) / rawOD600Target;
      } else {
        return (Number(OD600Reading) * Number(selectedCalcValue)).toFixed(2)
      }
    }
    // if (dilutionSettings.length > 1){
    //   return 'look at final dilution '
    // }
    return 'Enter reading from spec';
  }

  return (
    <SingleDilutionContainer>
      <StyledSingleDilution>
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

        {/* single dilution spec reading input - raw OD600 .34 */}
        <CalculationContainer>
          {/* Summary / dilution footer */}
          <h4>{`${diluentUL} uL diluent + ${sampleUL} uL sample.  The dilution factor is ${dilutionFactor}.`}</h4>
          Raw OD600:{' '}
          <OD600ReadingInput
            type="text"
            placeholder="od600 reading"
            value={OD600Reading}
            onChange={(e) => setOD600Reading(e.target.value)}
          />
          OD600 reading: {calculateOD600()}
          {/* {OD600Reading !== '0.' && Number(OD600Reading)
          ? (
              Number(OD600Reading) *
              (selectedCalc == 'estimate'
                ? selectedCalcValue / rawOD600Target
                : Number(selectedCalcValue))
            ).toFixed(2)
          : 'Enter reading from spec'} */}
        </CalculationContainer>
      </StyledSingleDilution>
    </SingleDilutionContainer>
  );
}
