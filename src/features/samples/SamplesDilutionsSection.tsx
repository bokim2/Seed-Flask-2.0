import React, { useState } from 'react';
import SamplesDilutionCalculator from './SamplesDilutionCalculator';
import Button from '../../ui/Button';

export default function SamplesDilutionsSection() {
  const [dilutionSettings, setDilutionSettings] = useState([
    {
      selected: 'total',
      selectedValue: 1000,
      selectedCalc: 'dilutionFactor',
      selectedCalcValue: 5,
      rawOD600Target: 0.3,
      rowNumber: 0,
    },
  ]);
  console.log('dilutionSettings', dilutionSettings);
  return (
    <>
      {dilutionSettings.map((e, i) => (
        <SamplesDilutionCalculator
          key={i}
          dilutionSetting={dilutionSettings[i]}
          setDilutionSettings={setDilutionSettings}
          row={i}
        />
      ))}
      <Button
        onClick={() =>
          setDilutionSettings((prev) => [...prev, {...prev[prev.length - 1], rowNumber: prev.length}])
        }
      >
        Add Dilution
      </Button>
    </>
  );
}