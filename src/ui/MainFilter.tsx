import styled from 'styled-components';
import Select from 'react-select';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LinkButton,

} from '../styles/UtilStyles';
import { useAppDispatch, useMainFilter } from '../hooks/hooks';
import { set } from 'date-fns';
import { MainFilterContainer, MainFilterSelector } from '../styles/table-styles/tableStyles';

// main filter

export const StyledMainFilter = styled.div``;

export default function MainFilter() {
  //   const dispatch = useAppDispatch();

  //   const mainNavRef = useRef(null);
  //   const userButtonRef = useRef<HTMLButtonElement | null>(null);

  //   // handle toggle of user and nav menu
  //   const [openNav, setOpenNav] = useState(false);
  //   const [openUser, setOpenUser] = useState(false);
  //   const userListRef = useRef<HTMLUListElement | null>(null);
  //   const navListRef = useRef<HTMLUListElement | null>(null);
  //   const navButtonRef = useRef<HTMLButtonElement | null>(null);
  const mainfilterselectorOptions = [
    { value: 'all', label: 'All Flasks' },
    { value: 'project', label: 'Project' },
    { value: 'user_id', label: 'user_id' },
    { value: 'username', label: 'username' },
    // { value: 'cell_bank_id', label: 'cell_bank' },
  ];

  // select mainfilter

  type TOptionType = {
    value: string;
    label: string;
  };

  const [mainFilterSelected, setMainFilterSelected] = useState<string>(
    mainfilterselectorOptions[0].value
  );

  const [mainFilterOption, setMainFilterOption] = useState<string>('all');

  const {
    data: mainfilterData,
    isLoading: mainfilterLoading,
    isError: mainfilterError,
  } = useMainFilter({
    selector: mainFilterSelected,
    
  });
  console.log(mainfilterData, 'mainfilterData');
  const filterOptionsData = mainfilterData
    ? mainfilterData.map((option, i) => ({ value: option, label: option }))
    : [];
  //   console.log(filterOptionsData, 'filterOptionsData');

  const handleChangeSelected = (selected) => {
    // console.log('selected', selected);
    setMainFilterSelected(selected.value);
    // setMainFilterOption('null');
  };

  const handleChangeOption = (selected) => {
    console.log('in handlechangeoption', selected.value);
    setMainFilterOption(selected.value);
  };

//     useEffect(() => {
//       if (mainFilterSelected == 'all') return;
//       // console.log(
//       //   'filterOptionsData right before handlechangeoption',
//       //   filterOptionsData
//       // );

//       console.log('filterOptionsData in useeffect', filterOptionsData)
//       if (filterOptionsData?.length > 0) {
//           console.log('filterOptionsData?.[0].value', filterOptionsData?.[0].value)
//         handleChangeOption(filterOptionsData?.[0].value);
//       }
//     }, [filterOptionsData]);
//   //   console.log('mainFilterSelected', mainFilterSelected);

  return (
    <StyledMainFilter>
      {/* main filter - only show if user is logged in */}
      {/* {userProfile?.isAuthenticated && ( */}
      <MainFilterContainer>
        <MainFilterSelector
          options={mainfilterselectorOptions}
          defaultValue={mainfilterselectorOptions[0]}
          onChange={handleChangeSelected}
          // onChange={(e) => setMainFilterSelector(e.target.value)}
        />
        {mainfilterData && mainfilterData.length > 0 && (
          <MainFilterSelector
          key={mainFilterSelected}
            options={filterOptionsData}
            defaultValue={filterOptionsData[0]}
            onChange={handleChangeOption}

      

            //   onChange={(e) => setMainFilterValue(e.target.value)}
          />
        )}
      </MainFilterContainer>

      {/* old version */}
      {/* <MainFilterContainer>
              <MainFilterSelector
                value={mainFilterSelector}
                onChange={(e) => setMainFilterSelector(e.target.value)}
              >
                {mainfilterselectorOptions.map((option, i) => (
                  <MainFilterSelectorOption key={i} value={option}>
                    {option}
                  </MainFilterSelectorOption>
                ))}
              </MainFilterSelector>
              {mainfilterData && mainfilterData.length > 0 && (
                <MainFilterSelector
                  value={mainFilterValue}
                  onChange={(e) => setMainFilterValue(e.target.value)}
                >
                  {mainfilterData.map((option, i) => (
                    <MainFilterSelectorOption key={i} value={option}>
                      {option}
                    </MainFilterSelectorOption>
                  ))}
                  ))
                </MainFilterSelector>
              )}
            </MainFilterContainer> */}
      {/* )} */}
    </StyledMainFilter>
  );
}
