export const initialDilutionSettings = [
  {
    selected: 'diluent',
    selectedValue: 950,
    selectedCalc: 'sample',
    selectedCalcValue: 50,
    rawOD600Target: 0.3,
    rowNumber: 0,
    OD600Reading: '0.',
    // dilutionFactor: 5,
  },
];

export const dilutionTotaluLOptions = [200, 500, 750, 800, 900, 1000, 1500];
export const sampleuLOptions = [25, 50, 100, 200, 250, 500];
export const diluentuLOptions = [180, 200, 500, 750, 800, 900, 950, 980, 1000];
export const dilutionFactorOptions = [2, 5, 10, 12.5, 15, 20];
export const estimatedOD600Options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];

// type TRelationshipMap = {[key: string]: number[]}

export const relationshipMap = {
  total: { options: dilutionTotaluLOptions, defaultVal: 1000 },
  diluent: { options: diluentuLOptions, defaultVal: 950 },
  sample: { options: sampleuLOptions, defaultVal: 100 },
};

export const calcRelationshipMap = {
  dilutionFactor: { options: dilutionFactorOptions, defaultVal: 5 },
  estimate: { options: estimatedOD600Options, defaultVal: 3 },
  sample: { options: sampleuLOptions, defaultVal: 100 },
};


// if you want to limit the number of decimal points - not wanted for serial dilutions... error will add up
export function dilutionsCalculator(
  selected: string,
  selectedValue: number,
  selectedCalc: string,
  selectedCalcValue: number,
  rawOD600Target: number
  // OD600Reading: string
) {
  let diluentUL = 0;
  let sampleUL = 0;

  // dilutionFactor section
  if (selected === 'total' && selectedCalc === 'dilutionFactor') {
    diluentUL = parseFloat(
      (selectedValue - selectedValue / Number(selectedCalcValue)).toFixed(1)
    );
    sampleUL = parseFloat(
      (selectedValue / Number(selectedCalcValue)).toFixed(1)
    );
  }

  if (selected === 'diluent' && selectedCalc === 'dilutionFactor') {
    diluentUL = parseFloat(selectedValue.toFixed(1));
    sampleUL = parseFloat(
      (selectedValue / (Number(selectedCalcValue) - 1)).toFixed(1)
    );
  }

  if (selected === 'sample' && selectedCalc === 'dilutionFactor') {
    diluentUL = parseFloat(
      (selectedValue * selectedCalcValue - selectedValue).toFixed(1)
    );
    sampleUL = parseFloat(Number(selectedValue).toFixed(1));
  }

  // estimate section
  if (selected === 'total' && selectedCalc === 'estimate') {
    diluentUL = parseFloat(
      (
        selectedValue -
        (rawOD600Target / selectedCalcValue) * selectedValue
      ).toFixed(1)
    );
    sampleUL = parseFloat(
      ((rawOD600Target / selectedCalcValue) * selectedValue).toFixed(1)
    );
  }

  if (selected === 'diluent' && selectedCalc === 'estimate') {
    diluentUL = parseFloat(selectedValue.toFixed(1));
    sampleUL = parseFloat(
      (selectedValue / (selectedCalcValue / rawOD600Target - 1)).toFixed(1)
    );
  }

  if (selected === 'sample' && selectedCalc === 'estimate') {
    diluentUL = parseFloat(
      ((selectedCalcValue / rawOD600Target - 1) * selectedValue).toFixed(1)
    );
    sampleUL = parseFloat(selectedValue.toFixed(1));
  }

  // second row as 'sample'
  if (selected === 'total' && selectedCalc === 'sample') {
    diluentUL = parseFloat((selectedValue - selectedCalcValue).toFixed(1));
    sampleUL = parseFloat(selectedCalcValue.toFixed(1));
  }

  if (selected === 'diluent' && selectedCalc === 'sample') {
    diluentUL = parseFloat(selectedValue.toFixed(1));
    sampleUL = parseFloat(selectedCalcValue.toFixed(1));
  }


  // do NOT round the dilution factor, it will accumulate error
  const dilutionFactor = 
    ((diluentUL + sampleUL) / sampleUL)
  ;

  return { diluentUL, sampleUL, dilutionFactor };
}

