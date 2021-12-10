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
        <div className="enter">
          Press
            <C.Key onClick={e=>setPressEnter(true)}>enter</C.Key> 
          to start
        </div>
      }

      {pressEnter &&
        <>
          <WeatherArea />

          <footer>
            <div className="arrow--area">
              Made with
              <span className="arrow">🤍</span>
              by <a href="https://github.com/iamdevmarcos" target="_blank">Marcos </a>
            </div>
          </footer>
        </>
      }

    </div>
  );
}

export default App;