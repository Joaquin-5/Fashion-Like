import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { FormPost } from './screens/FormPost';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FormPost/>
    </div>
  )
}

export default App