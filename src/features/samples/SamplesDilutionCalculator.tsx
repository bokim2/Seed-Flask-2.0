import React, { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import styled from 'styled-components';
import { calcRelationshipMap, dilutionsCalculator, relationshipMap } from './samples-helpers';

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
  )

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
        dilutionSettings={dilutionSettings}
        row={row}
      />

      {/* dilution factor */}

{`${diluentUL} uL diluent + ${sampleUL} uL sample.  The dilution factor is ${dilutionFactor}.`}

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
          ? (
              Number(OD600Reading) *
              (selectedCalc == 'estimate'
                ? selectedCalcValue / rawOD600Target
                : Number(selectedCalcValue))
            ).toFixed(2)
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
  dilutionSettings,
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

  // update default when sample and sample is selected
  useEffect(() => {
    if (selected == 'sample' && selectedCalc == 'sample') {
      setDilutionSettings((prev) => {
        return prev.map((el) => {
          if (el.rowNumber === row) {
            return {
              ...el,
              selectedCalc: 'dilutionFactor',
              selectedCalcValue: 10,
            };
          } else {
            return el;
          }
        });
      });
    }
  }, [selected, selectedCalc, row]);

  return (
    <>
      <OuterContainer>
        {/* total ul */}
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
        {/* second row*/}
        <InnerContainer>
          <InnerContainer>
            selected: {selectedCalc}
            {relationshipMap &&
              Object.keys(calcRelationshipMap)?.map((option) => {
                // dont show 'estimate' button if there is more than 1 dilution 
                if (dilutionSettings.length > 1 && option === 'estimate') {
                  return null;
                }
                // don't show 'sample' button on the second row if 'sample' is selected on the first row
                if (selected === 'sample' && option === 'sample') {
                  return null;
                } else {
                  return (
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
                  );
                }
              })}
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
