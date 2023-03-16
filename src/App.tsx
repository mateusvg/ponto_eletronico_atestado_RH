import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index'
import Home from './pages/Home'
function App() {
  return (


    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Home />} />
    </Routes>

  );
}

export default App;
