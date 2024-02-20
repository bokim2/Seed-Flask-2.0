import styled from 'styled-components'


const StyledModal = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: red;
border-radius: 10px;
padding: 1rem;
transition: all .1s ease-in-out;
`

const Overlay = styled.div`
position: fixed;
inset: 0;
z-index: 99999;
background-color: grey;
backdrop-filter: blur(5px);
transition: all .1s ease-in-out;
`

export default function Modal() {
  return (
    <StyledModal>Modal</StyledModal>
  )
}
