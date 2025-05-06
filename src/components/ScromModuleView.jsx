import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function ScormModuleViewer() {
  const { id } = useParams();
  const [moduleUrl, setModuleUrl] = useState(null);
  const [availableModules, setAvailableModules] = useState([]);

  const [scormData, setScormData] = useState({
    lessonLocation: '',
    suspendData: '',
    lessonStatus: '',
    scoreRaw: '',
    studentId: '',
    studentName: '',
    sessionTime: '',
  });

  const iframeRef = useRef(null);

  // Récupération de la liste des modules dispo
  useEffect(() => {
    axios.get('http://localhost:4000/modules')
      .then(resp => setAvailableModules(resp.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    window.API_1484_11 = {
      _data: {},
      Initialize: () => {
        console.log('SCORM Initialize');
        return 'true';
      },
      GetValue: (el) => {
        return window.API_1484_11._data[el] || '';
      },
      SetValue: (el, val) => {
        console.log(val);
        window.API_1484_11._data[el] = val;
        console.log(window.API_1484_11._data);
        setScormData(prev => ({
          ...prev,
          lessonLocation: window.API_1484_11._data['cmi.location'] ?? prev.lessonLocation,
          suspendData: window.API_1484_11._data['cmi.suspend_data'] ?? prev.suspendData,
          lessonStatus: window.API_1484_11._data['cmi.completion_status'] ?? prev.lessonStatus,
          scoreRaw: window.API_1484_11._data['cmi.score.raw'] ?? prev.scoreRaw,
          studentId: window.API_1484_11._data['cmi.student_id'] ?? prev.studentId,
          studentName: window.API_1484_11._data['cmi.student_name'] ?? prev.studentName,
        }));

        console.log(`SCORM SetValue: ${el} = ${val}`);
        return 'true';
      },
      Commit: () => {
        console.log('SCORM Commit');
        return 'true';
      },
      Terminate: () => {
        console.log('SCORM Terminate');
        return 'true';
      },
      GetLastError: () => '0',
      GetErrorString: () => '',
      GetDiagnostic: () => ''
    };

    const initResult = window.API_1484_11.Initialize();
    console.log('Initialize result:', initResult);

    const timer = setInterval(() => {
      const t = window.API_1484_11.GetValue('cmi.session_time');
      if (t) {
        setScormData(prev => ({ ...prev, sessionTime: t }));
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      const termResult = window.API_1484_11.Terminate();
      console.log('Terminate result:', termResult);
      delete window.API_1484_11;
    };
  }, []);

  useEffect(() => {
    if (id && availableModules.includes(id)) {
      setModuleUrl(`/scorm-modules/${id}/index.html`);
    }
  }, [id, availableModules]);

  if (!moduleUrl) {
    return <p>Module non prêt ou introuvable.</p>;
  }

  const { scoreRaw: score, lessonStatus: status, sessionTime } = scormData;

  return (
    <div className="w-full h-screen p-4 relative">
      <h1 className="text-xl font-bold mb-4">Module SCORM {id}</h1>

      {/* <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg z-10 text-sm">
        <p><strong>lessonLocation:</strong> {scormData.lessonLocation}</p>
        <p><strong>suspendData:</strong> {scormData.suspendData}</p>
        <p><strong>lessonStatus:</strong> {scormData.lessonStatus}</p>
        <p><strong>scoreRaw:</strong> {scormData.scoreRaw || '—'}</p>
        <p><strong>studentId:</strong> {scormData.studentId}</p>
        <p><strong>studentName:</strong> {scormData.studentName}</p>
        <p><strong>sessionTime:</strong> {scormData.sessionTime || '—'}</p>
      </div> */}
      <Link
        to="/"
      >
        <button
          className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg shadow-sm transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
      </Link>
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
        <p><strong>lessonLocation:</strong> {scormData.lessonLocation || '—'}</p>
        <p><strong>Score :</strong> {score || '—'}</p>
        <p><strong>Statut :</strong> {status || '—'}</p>
        <p><strong>Temps :</strong> {sessionTime || '—'}</p>
      </div>

      <iframe
        ref={iframeRef}
        src={moduleUrl}
        className="w-full h-[75vh] mt-6 border rounded shadow"
        allowFullScreen
        title={`SCORM ${id}`}
      />
    </div>
  );
}
