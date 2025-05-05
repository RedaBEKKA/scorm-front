import './App.css'
import ScormModuleViewer from './components/ScromModuleView'
import UploadScormModule from './components/UploadScrom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center" }}>
        <Routes>
          <Route path="/" element={<UploadScormModule />} />
          <Route path="/modules/:id" element={<ScormModuleViewer />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
