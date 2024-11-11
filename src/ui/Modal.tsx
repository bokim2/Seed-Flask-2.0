import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useOnClickOutside } from '../hooks/hooks';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.1s ease-in-out;
`;

const InnerModalContainer = styled.div``;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background-color: rgb(241, 237, 237, 0.1);
  /* backdrop-filter: blur(5px); */
  transition: all 0.1s ease-in-out;
`;

type TModalProps = {
  children: React.ReactNode;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = forwardRef<HTMLDivElement, TModalProps>((props, ref) => {
  const { setIsOpenModal } = props;
  const appBody = document.body;
  useOnClickOutside([ref], () => {
    setIsOpenModal((prev) => !prev);
  });

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <InnerModalContainer>{props.children}</InnerModalContainer>
      </StyledModal>
    </Overlay>,
    appBody
  );
});

export default Modal;
