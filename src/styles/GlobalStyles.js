import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
// CSS reset by Andy Bell

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
margin: 0;
}

/* Prevent font size inflation */
html {

  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

html,
body {
  ${'' /* height: 100%; */}
}

/* Remove default margin in favour of better control in authored CSS */
body, h1, h2, h3, h4, p,
figure, blockquote, dl, dd {
  ${'' /* margin-block-end: 0; */}

}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  line-height: 1.5;
}

/* Set shorter line heights on headings and interactive elements */
h1, h2, h3, h4,
button, input, label {
  line-height: 1.1;
}

/* Balance text wrapping on headings */
h1, h2,
h3, h4 {
  text-wrap: balance;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
  color: currentColor;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input, button,
textarea, select {
  font: inherit;
}

/* Make sure textareas without a rows attribute are not tiny */
textarea:not([rows]) {
  min-height: 1em;
}

/* Anything that has been anchored to should have extra scroll margin */
:target {
  scroll-margin-block: 5ex;
}

/* Removes all animations, transitions and smooth scrolling */
@media (prefers-reduced-motion: reduce){
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}


// import fonts

${
  '' /* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');  */
}

// BK

#root {

  ${
    '' /* display:flex;
  flex-direction: column; */
  }
  ${'' /* min-height: 100vh; */}
}

 :root {



--font-sans-serif: 'Inter', sans-serif;
--font-serif: 'Playfair Display', serif;

       /* Colors */
  --clr-primary-0: white;
  --clr-primary-50: #f8fafc;
  --clr-primary-100: #f1f5f9;
  --clr-primary-200: #e2e8f0;
  --clr-primary-300: hsl(213, 27%, 84%);
  --clr-primary-400: #94a3b8;
  --clr-primary-500: #64748b;
  --clr-primary-600: #475569;
  --clr-primary-700: #334155;
  --clr-primary-800: #150F1D; // app background
  --clr-primary-900: 21, 15, 29; //dark black - navbar
  --clr-primary-950: 2, 6, 23;  //darker black - navbar expanded


  --clr-table-100: 38, 34, 49;  // less dark black - table #262231
  --clr-table-200: 18, 17, 24;  // dark black - background of Page #121118

  --clr-accent-0: 242, 209, 124; /* main accent #F2D17C yellow-orange*/
  --clr-accent-1: 250, 247, 240; /* menu button #FAF7F0 */ 
  --clr-accent-2: 225, 246, 242; /* #E1F6F2*/
  --clr-accent-3: 231, 241, 220; /* #E7F1DC */
  --clr-accent-4: 228, 241, 238;/* #E4F1EE menu button */
  --clr-accent-5: 235,185,54; /*dark yellow-orange #ebb936*/
  --clr-accent-6: 16, 231, 220; /* bright light blue turquoise #10e7dc */
  --clr-accent-7: #D4F27C; // selected table header
  --clr-accent-8: #F68086; 
  --clr-accent-9: #10e7dc;
  --clr-accent-10: #fde5d4;
  --clr-accent-11: #7C9DF2;
  --clr-accent-12: #FBC7CA;
  --clr-accent-13: #fff5e4;
  --clr-accent-14: #C8C0B8; 

  --clr-text-1: #D3D3D3;
  --clr-text-2: black;
  --clr-text-3: #CCCCCC;
  --clr-text-4: black;
  --clr-text-5: 112, 128, 144; //#708090
  --clr-text-6: black;
   }
  
   a {
     font-weight: 500;
     color: #646cff;
     text-decoration: inherit;
   }
   a:hover {
     color: #535bf2;
   }
  
   body {
     margin: 0;
     padding: 0;
     ${'' /* width: 100vw; */}
     ${'' /* overflow-x: hidden; */}
     color: var(--clr-text-3);
     font-family: var(--font-sans-serif);
     
   }
  
   h1 {
     font-size: 3.2em;
     line-height: 1.1;
   }
  
   button {
     border-radius: 8px;
     border: 1px solid transparent;
     padding: 0.6em 1.2em;
     font-size: 1em;
     font-weight: 500;
     font-family: inherit;
     background-color: #ffffff; //#1a1a1a;
     cursor: pointer;
     transition: border-color 0.25s;
   }
   button:hover {
     border-color: #646cff;
   }
   button:focus,
   button:focus-visible {
     ${'' /* outline: 4px auto -webkit-focus-ring-color; */}
   }
  
   ${'' /* @media (prefers-color-scheme: light) {
     :root {
       color: #213547;
       background-color: #ffffff;
     }
     a:hover {
       color: #747bff;
     }
     button {
       background-color: #f9f9f9;
     }
   } */}
  

  
  `;

export default GlobalStyles;
