import { createGlobalStyle } from 'styled-components';



const GlobalStyles = createGlobalStyle`
// CSS reset by Andy Bell

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Prevent font size inflation */
html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

/* Remove default margin in favour of better control in authored CSS */
body, h1, h2, h3, h4, p,
figure, blockquote, dl, dd {
  margin-block-end: 0;
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
  min-height: 10em;
}

/* Anything that has been anchored to should have extra scroll margin */
:target {
  scroll-margin-block: 5ex;
}


// from Vite starter template
 :root {
     font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
     line-height: 1.5;
     font-weight: 400;
  
     color-scheme: light dark;
     color: rgba(255, 255, 255, 0.87);
     background-color: #242424;
  
     font-synthesis: none;
     text-rendering: optimizeLegibility;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;

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
  --clr-primary-800: #1e293b;
  --clr-primary-900: #0f172a;
  --clr-primary-950: #020617;

  /* color testing area - these are overwriting colors above!! */


  --clr-primary-100: #080f5b; /* function EVEN background */
  --clr-primary-200: #222629; /* navbar background */
  --clr-primary-300: rgb(205, 250, 213, 0.2); /* navbar shadow */
  --clr-primary-800: #f8fafc;

  /*                       */

  --clr-accent-0: #dafffb; /* nav bar LINKS */
  --clr-accent-1: #faed26; /* nav bar "seed flask" */
  --clr-accent-2: #d6cc99; /* hero bar "seed flask" */
  --clr-accent-3: #334155; /* hero background-color */
  --clr-accent-4: #ccfad4; /* .function__title */
  --clr-accent-5: #86a789;
  --clr-accent-6: #ff7676;
  --clr-accent-7: #ff8080;
  --clr-accent-8: #445d48;
  --clr-accent-9: #10e7dc;
  --clr-accent-10: #fde5d4;

  --color-text-1: black;
  --color-text-2: white;
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
     display: flex;
     place-items: center;
     min-width: 320px;
     min-height: 100vh;
     background-color: #150F1D;
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
     background-color: #1a1a1a;
     cursor: pointer;
     transition: border-color 0.25s;
   }
   button:hover {
     border-color: #646cff;
   }
   button:focus,
   button:focus-visible {
     outline: 4px auto -webkit-focus-ring-color;
   }
  
   @media (prefers-color-scheme: light) {
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
   }
  
  `;
  
  export default GlobalStyles;