import React from 'react';
// import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledInnerPageTransition = styled.div` 


    .slide {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        /* background-color: red; */
        /* z-index: 1; */
    }

`

export default function InnerPageTransition({ children }) {
  const anim = (variants) => {
    return {
      initial: 'initial',
      animate: 'enter',
      exit: 'exit',
      variants,
    };
  };

  const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 1 },
  };

  const slide = {
    initial: {
      top: '100vh',
    },
    enter: {
      top: '0vh',
    },
    exit: {
      top: '0',
    },
  };

  return (
    <StyledInnerPageTransition>
      {/* <motion.div {...anim(slide)} className="slide">
        <motion.div {...anim(opacity)} className="inner-page">
        </motion.div>
      </motion.div> */}
          {children}
    </StyledInnerPageTransition>
  );
}
