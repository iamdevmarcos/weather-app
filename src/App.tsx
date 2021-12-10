import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { WeatherArea } from './components/WeatherArea';

const App = () => {
  const [pressEnter, setPressEnter] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', function(e) {
      switch(e.code) {
        case 'Enter':
        case 'NumpadEnter':
          setPressEnter(true);
        break;
      }
    })
  });

  return(
    <div>

      {!pressEnter &&
        <div className="warning">
          Press
            <C.Key onClick={e=>setPressEnter(true)}>enter</C.Key> 
          to start
        </div>
      }

      {pressEnter &&
        <WeatherArea />
      }
    </div>
  );
}

export default App;