import { useState, useEffect } from 'react';
import { WeatherArea } from './components/WeatherArea';
import showMessage from './helpers/showMessage';

const App = () => {

  return(
    <div>
      <WeatherArea />
    </div>
  );
}

export default App;