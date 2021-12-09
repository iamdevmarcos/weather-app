const App = () => {
  return(
    <div>
      <h1>Clima</h1>

      <form className="busca">
          <input type="search" id="searchInput" />
          <button>Buscar</button>
      </form>

      <div className="resultado">
          <div className="titulo">--</div>

          <div className="info">
              <div className="temp">
                  <div className="tempTitulo">Temperatura</div>
                  <div className="tempInfo">-- <sup>ºC</sup></div>
                  <img src="http://openweathermap.org/img/wn/10d@2x.png" />
              </div>
              <div className="vento">
                  <div className="ventoTitulo">Vento</div>
                  <div className="ventoInfo">-- <span>km/h</span></div>
                  <div className="ventoArea">
                      <div className="ventoPonto"></div>
                  </div>
              </div>
          </div>
      </div>

      <div className="aviso"></div>

      <footer>
        Made with 🤍 by <a href="https://github.com/iamdevmarcos" target="_blank">Marcos Andre</a>
      </footer>
    </div>
  );
}

export default App;