import { useEffect } from 'react';
import { DilutionButton, InnerContainer, OD600ReadingInput, OuterContainer } from './dilutions-styles';
import { calcRelationshipMap, relationshipMap } from '../samples-helpers';



export 
function DilutionSelectors({
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

  return (
    <>
      <OuterContainer>
        {/* first row - total diluent sample */}
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

    {/* first row - options values, 900, 950, etc */}
        <InnerContainer className='align-left'>
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
        {/* second row - dilutionFactor, estimate, sample */}
        <InnerContainer>
          <InnerContainer>
            selected: {selectedCalc}
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

         {/* target OD600 on spec - linear range 0.1- 0.5  */}
          {selectedCalc == 'estimate' ? (
            <>
              spec OD600 target:
              <OD600ReadingInput
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
          <InnerContainer className='align-left'>
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
 