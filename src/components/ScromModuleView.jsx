import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ScormModuleViewer() {
  const { id } = useParams(); // <- remplace useRouter
  const [moduleUrl, setModuleUrl] = useState(null);
  const [availableModules, setAvailableModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:4000/modules');
        setAvailableModules(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des modules:', error);
      }
    };
    fetchModules();
  }, []);

  useEffect(() => {
    if (id && availableModules.length) {
      if (availableModules.includes(id)) {
        setModuleUrl(`/scorm-modules/${id}/index.html`);
      } else {
        setModuleUrl(null);
      }
    }
  }, [id, availableModules]);

  if (!id) return <p>Chargement...</p>;
  if (!moduleUrl) return <p>Module SCORM non trouvé ou en cours de traitement.</p>;

  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Module SCORM : {id}</h1>
      <iframe
        src={moduleUrl}
        className="w-full h-[90vh] border rounded shadow"
        allowFullScreen
        title={`SCORM Module ${id}`}
      />
    </div>
  );
}
