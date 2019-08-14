import React from 'react';
import Main from './src/components/Main';
import GlobalState from './src/GlobalState';

const App = () => {
  return (
    <GlobalState>
      <Main />
    </GlobalState>
  );
};

export default App;
