import { useEffect } from 'react';
import {
  InnerContainer,
  DilutionSelectorInput,
  OuterContainer,
  SingleSelectorWrapper,
  DilutionSelectorButton,
  DilutionValueButton,
} from './dilutions-styles';
import { calcRelationshipMap, relationshipMap } from '../samples-helpers';
import e from 'express';
import styled from 'styled-components';

export const DilutionSelectorTitle = styled.p`
  font-family: var(--font-serif);
  letter-spacing: 0.05rem;
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
  opacity: 0.7;
`;

export function DilutionSelectors({
  selected,
  selectedValue,
  rawOD600Target,
  setDilutionSettings,
  row,
  selectedCalc,
  selectedCalcValue,
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

  function selectButtonTitle(option) {
    if (option == 'dilutionFactor') {
      return 'dilution factor';
    }
    if (option == 'estimate') {
      return 'estimated OD600';
    }

    return option;
  }

  return (
    <SingleSelectorWrapper>
      <OuterContainer>
        {/* first row - total diluent sample */}
        <InnerContainer>
          <DilutionSelectorTitle>part 1</DilutionSelectorTitle>
          {/* selected: {selected} */}
          {relationshipMap &&
            Object.keys(relationshipMap)?.map((option) => (
              <DilutionSelectorButton
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
              </DilutionSelectorButton>
            ))}
        </InnerContainer>

        {/* first row - options values, 900, 950, etc */}
        <InnerContainer className="align-left">
          {selected &&
            relationshipMap?.[selected]?.options?.map((option, i) => (
              <DilutionValueButton
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
                className={`${
                  selectedValue == option ? 'selected' : ''
                } ${selected}`}
              >
                {option}
              </DilutionValueButton>
            ))}

          {/* input for first row - total, diluent */}
          <DilutionSelectorInput
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
        {/* second row - dilutionFactor, estimate, sample */}
        <InnerContainer>
          {/* <InnerContainer> */}
          <DilutionSelectorTitle>part 2</DilutionSelectorTitle>
          {/* selected: {selectedCalc} */}
          {relationshipMap &&
            Object.keys(calcRelationshipMap)?.map((option) => {
              // dont show 'estimate' button if there is more than 1 dilution
              // if (dilutionSettings.length > 1 && option === 'estimate') {
              //   return null;
              // }
              // don't show 'sample' button on the second row if 'sample' is selected on the first row
              if (selected === 'sample' && option === 'sample') {
                return null;
              } else {
                return (
                  <DilutionSelectorButton
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
                    {selectButtonTitle(option)}
                  </DilutionSelectorButton>
                );
              }
            })}
          {/* </InnerContainer> */}

          {/* target OD600 on spec - linear range 0.1- 0.5  */}
          {selectedCalc == 'estimate' ? (
            <>
              spec OD600 target:
              <DilutionSelectorInput
                type="number"
                placeholder="total uL"
                value={rawOD600Target}
                onChange={(e) => {
                  setDilutionSettings((prev) => {
                    return prev.map((el) => {
                      if (el.rowNumber === row) {
                        return {
                          ...el,
                          rawOD600Target: Number(e.target.value),
                        };
                      } else {
                        return el;
                      }
                    });
                  });
                }}
              />
            </>
          ) : (
            ''
          )}
        </InnerContainer>
        {/* second column - options, 100, 200  */}
        <InnerContainer className="align-left">
          {selectedCalc &&
            calcRelationshipMap?.[selectedCalc]?.options?.map((option, i) => (
              <DilutionValueButton
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
              </DilutionValueButton>
            ))}

          <DilutionSelectorInput
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
    </SingleSelectorWrapper>
  );
}
