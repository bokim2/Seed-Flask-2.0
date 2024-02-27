import React, { useState } from 'react';
import Button from '../../ui/Button';
import styled from 'styled-components';

const OuterContainer = styled.div`
  display: grid;
  /* grid-auto-flow: column; */
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  font-size: 1.2rem;
  background-color: rgba(var(--clr-accent-5), 0.2);
  padding: 1rem;
  border-radius: 15px;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
  gap: 0.25rem;
`;

const CalculationContainer = styled.div``;

const DilutionsInput = styled.input`
  width: 7ch;
  background-color: rgba(var(--clr-accent-5), 0.2);
`;

const OD600ReadingInput = styled.input`
  width: 7ch;
`;

const DilutionButton = styled(Button)`
  font-size: 1rem;
  flex-grow: 0;
  width: auto;
  height: auto;
  align-self: center;
  /* max-height: 2rem; */
  &.selected {
    background-color: rgba(var(--clr-accent-5), 1);
    color: var(--clr-text-2);
  }
`;
const dilutionTotaluLOptions = [200, 500, 1000, 1500];
const sampleuLOptions = [25, 50, 100, 200, 250, 500];
const diluentuLOptions = [180, 200, 500, 750, 800, 900, 950, 980, 1000];
const dilutionFactorOptions = [2, 5, 10, 12.5, 15, 20];
const estimatedOD600Options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];

// type TRelationshipMap = {[key: string]: number[]}

const relationshipMap = {
  total: { options: dilutionTotaluLOptions, defaultVal: 1000 },
  diluent: { options: diluentuLOptions, defaultVal: 950 },
  sample: { options: sampleuLOptions, defaultVal: 100 },
};

const calcRelationshipMap = {
  dilutionFactor: { options: dilutionFactorOptions, defaultVal: 5 },
  estimate: { options: estimatedOD600Options, defaultVal: 3 },
};

function dilutionInstructions(
  selected: string,
  selectedValue: number,
  selectedCalc: string,
  selectedCalcValue: number,
  rawOD600Target: number
  // OD600Reading: string
) {
  if (selected === 'total' && selectedCalc === 'dilutionFactor') {
    return `${parseFloat((
      selectedValue -
      selectedValue / Number(selectedCalcValue)
    ).toFixed(1))} uL diluent + ${parseFloat((
      selectedValue / Number(selectedCalcValue)
    ).toFixed(1))}uL sample for a ${selectedCalcValue}x dilution`;
  }

  if (selected === 'diluent' && selectedCalc === 'dilutionFactor') {
    return `${parseFloat(selectedValue.toFixed(1))} uL diluent + ${parseFloat((
      selectedValue /
      (Number(selectedCalcValue) - 1)
    ).toFixed(1))} uL sample for a ${selectedCalcValue}x dilution`;
  }

  if (selected === 'sample' && selectedCalc === 'dilutionFactor') {
    return `${parseFloat((selectedValue * selectedCalcValue - selectedValue).toFixed(
      1
    ))} uL diluent + ${parseFloat(Number(selectedValue).toFixed(
      1
    ))} uL sample for a ${selectedCalcValue}x dilution`;
  }

  //estimate section
  if (selected === 'total' && selectedCalc === 'estimate') {
    return `${parseFloat((
      selectedValue -
      (rawOD600Target / selectedCalcValue) * selectedValue
    ).toFixed(1))} uL diluent + ${parseFloat((
      (rawOD600Target / selectedCalcValue) *
      selectedValue
    ).toFixed(
      1
    ))} uL sample to dilute a sample with an estimated OD600 of ${selectedCalcValue}.  The dilution factor is ${parseFloat((
      selectedCalcValue / rawOD600Target
    ).toFixed(1))}`;
  }

  return null; // Add this line to handle the case when selectedCalc is not 'dilutionFactor'
}

export default function SamplesDilutionCalculator({
  dilutionSetting,
  setDilutionSettings,
  row,
}) {
  const {
    selected,
    selectedValue,
    selectedCalc,
    selectedCalcValue,
    rawOD600Target,
  } = dilutionSetting;
  // console.log(
  //   'selected, selectedValue, selectedCalc, selectedCalcValue, rawOD600Target',
  //   selected,
  //   selectedValue,
  //   selectedCalc,
  //   selectedCalcValue,
  //   rawOD600Target
  // );
  // const [totaluL, setTotaluL] = useState<number>(1000);
  // const [dilutionFactor, setDilutionFactor] = useState(5);
  const [OD600Reading, setOD600Reading] = useState<string>('0.');

  // // selected option for first row - total, diluent
  // const [selected, setSelected] = useState<string>('total');

  // // diluent, total uL
  // const [selectedValue, setSelectedValue] = useState<number>(1000);

  // // for second row - dilution factor, estimate
  // const [selectedCalc, setSelectedCalc] = useState<string>('dilutionFactor');
  // const [selectedCalcValue, setSelectedCalcValue] = useState<number>(
  //   calcRelationshipMap[selectedCalc].defaultVal
  // );

  // const [rawOD600Target, setRawOD600Target] = useState<number>(0.3);
  // const [serialDilutions, setSerialDilutions] = useState<number>(1)

  return (
    <div>
      <SamplesDilutionSingleSelector
        relationshipMap={relationshipMap}
        calcRelationshipMap={calcRelationshipMap}
        selected={selected}
        selectedValue={selectedValue}
        rawOD600Target={rawOD600Target}
        // setRawOD600Target={setRawOD600Target}
        setDilutionSettings={setDilutionSettings}
        selectedCalc={selectedCalc}
        selectedCalcValue={selectedCalcValue}
        row={row}
      />

      {/* dilution factor */}
      {dilutionInstructions(
        selected,
        selectedValue,
        selectedCalc,
        selectedCalcValue,
        rawOD600Target
      )}
      <InnerContainer>
        {/* {selectedCalc == 'dilutionFactor'
          ? `${(
              selectedValue -
              selectedValue / Number(selectedCalcValue)
            ).toFixed(3)}uL diluent + ${(
              selectedValue / Number(selectedCalcValue)
            ).toFixed(3)}uL sample for a ${selectedCalcValue}x dilution`
          : ''} */}
      </InnerContainer>
      <CalculationContainer>
        Raw OD600:{' '}
        <OD600ReadingInput
          type="text"
          placeholder="od600 reading"
          value={OD600Reading}
          onChange={(e) => setOD600Reading(e.target.value)}
        />
        OD600 reading:{' '}
        {OD600Reading
          ? (Number(OD600Reading) * (selectedCalc == 'estimate' ? selectedCalcValue / rawOD600Target : Number(selectedCalcValue))).toFixed(2)
          : 'Enter reading from spec'}
      </CalculationContainer>
      {/* </OuterContainer> */}
    </div>
  );
}

// type TSamplesDilutionsSingleSelectorProps = {
//   relationshipMap: TRelationshipMap;
//   selected: string;
//   selectedValue: string | number;
//   setSelected: (selected: string) => void;
//   setSelectedValue: (selectedValue: string | number) => void;
// };

function SamplesDilutionSingleSelector({
  relationshipMap,
  selected,
  selectedValue,
  // setSelected,
  // setSelectedValue,
  rawOD600Target,
  setDilutionSettings,
  row,
  selectedCalc,
  selectedCalcValue,
  calcRelationshipMap,
  // setRawOD600Target,
}) {
  // console.log(
  //   'relationshipMap',
  //   relationshipMap,
  //   'selected',
  //   selected,
  //   'selectedValue',
  //   selectedValue
  // );
  return (
    <>
      <OuterContainer>
        {/* total ul */}
        <InnerContainer>
          <InnerContainer>
            selected: {selected}
            {relationshipMap &&
              Object.keys(relationshipMap)?.map((option) => (
                <DilutionButton
                  key={option}
                  onClick={() => {
                    console.log('option', option, row);
                    setDilutionSettings((prev) =>
                      prev.map((el) => {
                        if (el.rowNumber === row) {
                          return {
                            ...el,
                            selectedValue: relationshipMap[option].defaultVal,
                            selected: option,
                          };
                        } else {
                          return el;
                        }
                      })
                    );
                  }}
                  $size="xs"
                  className={selected == option ? 'selected' : ''}
                >
                  {option}
                </DilutionButton>
              ))}
          </InnerContainer>

          {/* {selected == 'estimate' ? (
            <>
              raw OD600 target:
              <DilutionsInput
                type="number"
                placeholder="total uL"
                value={rawOD600Target}
                onChange={(e) => {
                  // setRawOD600Target(Number(e.target.value));
                }}
              />
            </>
          ) : (
            ''
          )} */}
        </InnerContainer>
        <InnerContainer>
          {selected &&
            relationshipMap?.[selected]?.options?.map((option, i) => (
              <DilutionButton
                key={i}
                $size="xs"
                value={selected}
                onClick={() => {
                  console.log('option', option, row);
                  setDilutionSettings((prev) =>
                    prev.map((el) => {
                      if (el.rowNumber === row) {
                        return {
                          ...el,

                          selectedValue: option,
                        };
                      } else {
                        return el;
                      }
                    })
                  );
                }}
                className={selectedValue == option ? 'selected' : ''}
              >
                {option}
              </DilutionButton>
            ))}

          {/* input for first row - total, diluent */}
          <OD600ReadingInput
            type="number"
            placeholder={selected == 'estimate' ? 'expected OD600' : selected}
            value={selectedValue}
            onChange={(e) =>
              setDilutionSettings((prev) => {
                return prev.map((el) => {
                  if (el.rowNumber === row) {
                    return {
                      ...el,
                      selectedValue: Number(e.target.value),
                    };
                  } else {
                    return el;
                  }
                });
              })
            }
          />
        </InnerContainer>
      </OuterContainer>

      <OuterContainer>
        {/* total ul */}
        <InnerContainer>
          <InnerContainer>
            selected: {selectedCalc}
            {relationshipMap &&
              Object.keys(calcRelationshipMap)?.map((option) => (
                <DilutionButton
                  key={option}
                  onClick={() => {
                    console.log('option', option, row);
                    setDilutionSettings((prev) =>
                      prev.map((e) => {
                        if (e.rowNumber === row) {
                          return {
                            ...e,
                            selectedCalcValue:
                              calcRelationshipMap[option].defaultVal,
                            selectedCalc: option,
                          };
                        } else {
                          return e;
                        }
                      })
                    );
                  }}
                  $size="xs"
                  className={selectedCalc == option ? 'selected' : ''}
                >
                  {option}
                </DilutionButton>
              ))}
          </InnerContainer>

          {selectedCalc == 'estimate' ? (
            <>
              raw OD600 target:
              <OD600ReadingInput
                type="number"
                placeholder="total uL"
                value={rawOD600Target}
                onChange={(e) => {
                  // setRawOD600Target(Number(e.target.value));
                }}
              />
            </>
          ) : (
            ''
          )}
        </InnerContainer>
        <InnerContainer>
          <InnerContainer>
            {selectedCalc &&
              calcRelationshipMap?.[selectedCalc]?.options?.map((option, i) => (
                <DilutionButton
                  key={i}
                  $size="xs"
                  value={selectedCalc}
                  onClick={() => {
                    console.log('option', option, row);
                    setDilutionSettings((prev) =>
                      prev.map((el) => {
                        if (el.rowNumber === row) {
                          return {
                            ...el,

                            selectedCalcValue: option,
                          };
                        } else {
                          return el;
                        }
                      })
                    );
                  }}
                  className={selectedCalcValue == option ? 'selected' : ''}
                >
                  {option}
                </DilutionButton>
              ))}
          </InnerContainer>
          <OD600ReadingInput
            type="number"
            placeholder={selectedCalcValue}
            value={selectedCalcValue}
            onChange={(e) =>
              setDilutionSettings((prev) => {
                return prev.map((el) => {
                  if (el.rowNumber === row) {
                    return {
                      ...el,
                      selectedCalcValue: Number(e.target.value),
                    };
                  } else {
                    return el;
                  }
                });
              })
            }
          />
        </InnerContainer>
      </OuterContainer>
    </>
  );
}
