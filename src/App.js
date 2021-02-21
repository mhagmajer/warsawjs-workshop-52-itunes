import logo from "./logo.svg";
import "./App.css";

function LearnReactBanner({ topic }) {
  return (
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn {topic} with WarsawJS
    </a>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <LearnReactBanner topic="iTunes browser in React" />
      </header>
    </div>
  );
}

export default App;
