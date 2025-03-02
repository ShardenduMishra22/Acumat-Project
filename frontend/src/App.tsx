import Theme from './components/Theme';
import Fast from './components/Page/Fast';
import Home from './components/Page/Home';
import Landing from './components/Page/Landing';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/too-fast" element={<Fast />} />
      </Routes>
      <div className="relative min-h-screen">
        <Theme />
      </div>
    </div>
  );
};

export default App;
