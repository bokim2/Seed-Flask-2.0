import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const StyledInfoButtonForModal = styled.div`
position: absolute;
left: 0.25rem;
bottom: 0.25rem;
`

const StyledImg = styled.img`
  height: 30px;
  transition: transform 0.1s ease-in-out, filter 0.1s ease-in-out;

  /* &:hover {
    transform: scale(1.1);
    filter: brightness(1.5); */
  /* } */
`;

const InfoButton = styled.button`
  border-radius: 50%; /* Use 50% for a circular shape */
  aspect-ratio: 1/1;
  padding: 0.5rem; /* Add padding if needed */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 100ms ease-in-out;

  &.light {
    background-color: rgba(var(--clr-accent-0), 1);
  }

  &:hover {
    transform: scale(1.1);
  }
`;
export const StyledFaUser = styled.img`
  font-size: 1.75rem;
  fill: var(--clr-accent-0);
`;



export default function InfoButtonForModal({children, imgSrc, alt, buttonBackgroundColor}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

  return (
    <StyledInfoButtonForModal>
      <InfoButton className={buttonBackgroundColor}
        onClick={(e) => {
        //   console.log('clicked', isOpenModal);
          e.stopPropagation();
          setIsOpenModal((prev) => !prev);
        }}
        aria-label={alt}
      >
        <StyledImg src={imgSrc} alt={alt} />
      </InfoButton>
      {isOpenModal && (
        <Modal ref={modalRef} setIsOpenModal={setIsOpenModal}>
            {children}
        </Modal>
      )}
    </StyledInfoButtonForModal>
  );
}
