import React from 'react';
import { OD600ReadingInput } from './dilutions-styles';

export default function DilutionsSummary({
  dilutionsSummary,
  dilutionSettings,
  setDilutionSettings,
  // totalDilutionFactor
}) {
  if (dilutionsSummary.length === 0) return;

  const { OD600Reading } = dilutionSettings[dilutionSettings.length - 1];

  const totalDilutionFactor = dilutionsSummary
    .map((el) => el.dilutionFactor)
    .reduce((acc, curr) => acc * curr, 1);


  // function calculateOD600() {
  //   if (OD600Reading !== '0.' && Number(OD600Reading)) {
  //     if (selectedCalc == 'estimate') {
  //       return (Number(OD600Reading) * selectedCalcValue) / rawOD600Target;
  //     } else {
  //       return (Number(OD600Reading) * Number(selectedCalcValue)).toFixed(2);
  //     }
  //   }
  //   // if (dilutionSettings.length > 1){
  //   //   return 'look at final dilution '
  //   // }
  //   return 'Enter reading from spec';
  // }

  return (
    <div>
      <>
      Raw OD600: {/* single dilution spec reading input - raw OD600 .34 */}
      <OD600ReadingInput
        type="text"
        placeholder="od600 reading"
        value={OD600Reading}
        onChange={(e) =>
          setDilutionSettings((prev) => {
            return prev.map((el) => {
              if (el.rowNumber === dilutionSettings[dilutionSettings.length - 1].rowNumber) {
                return { ...el, OD600Reading: e.target.value };
              } else {
                return el;
              }
            });
          })
        }
      />
      OD600 reading: {parseFloat((Number(OD600Reading) * totalDilutionFactor).toFixed(2))}
      </>
      <p>totalDilutionFactor: {parseFloat((totalDilutionFactor).toFixed(3))}</p>
      <p>
        OD600:{' '}
        {parseFloat((totalDilutionFactor *
          dilutionSettings[dilutionSettings.length - 1].OD600Reading).toFixed(2))}
      </p>
    </div>
  );
}
