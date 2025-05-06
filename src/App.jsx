// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ScormProvider } from '@erik-efl/react-scorm-provider';
import UploadScormModule from './components/UploadScrom';
import ScormModuleViewer from './components/ScromModuleView';


function App() {
  return (
    // <ScormProvider version="1.2" debug={true}>
    <Router>
      <Routes>
        <Route path="/" element={<UploadScormModule />} />
        <Route path="/modules/:id" element={<ScormModuleViewer />} />
      </Routes>
    </Router>
    // </ScormProvider>
  );
}

export default App;
