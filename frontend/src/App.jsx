import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Home } from './screens/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Home />
      {/* <FormPost/> */}
    </div>
  )
}

export default App