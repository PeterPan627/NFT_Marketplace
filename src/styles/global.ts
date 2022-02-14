import { createGlobalStyle } from 'styled-components';
 
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: #c1ff70;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
  }
 
  #root {
    margin: 0 auto;
  }
 
  html {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;    
    font-size: 10px;
  }

  body {
    background-color: #09101a;
  }

  .App {
    
  }
`;