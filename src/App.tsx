import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const App = (props: object) => {
  const [count, setCount] = useState<number>(1)
  const handleCount = () => {
    setCount(count + 1)
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleCount}>
          {count}
        </button>
      </header>
    </div>
  );
}

export default App;
