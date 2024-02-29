import React, { useState } from 'react';
import {
  CalculationContainer,
  OD600ReadingInput,
  SampleSummaryContainer,
  SingleDilutionContainer,
  SingleSelectorWrapper,
  StyledH2,
  StyledSingleDilution,
} from './dilutions-styles';

export default function SamplesDilutionSummary({
  diluentUL,
  sampleUL,
  dilutionFactor,
  selected,
  selectedValue,
  selectedCalc,
  selectedCalcValue,
  rawOD600Target,
}) {
    const [OD600Reading, setOD600Reading] = useState<string>('0.');

  function calculateOD600() {
    if (OD600Reading !== '0.' && Number(OD600Reading)) {
      if (selectedCalc == 'estimate') {
        return (Number(OD600Reading) * selectedCalcValue) / rawOD600Target;
      } else {
        return (Number(OD600Reading) * Number(selectedCalcValue)).toFixed(2);
      }
    }
    // if (dilutionSettings.length > 1){
    //   return 'look at final dilution '
    // }
    return 'Enter reading from spec';
  }
  return (
    <CalculationContainer>
      {' '}
      {/* single dilution spec reading input - raw OD600 .34 */}
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
    </CalculationContainer>
  );
}
