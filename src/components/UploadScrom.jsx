import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UploadScormModule() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedModuleId, setUploadedModuleId] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setUploadedModuleId('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("❗ Veuillez choisir un fichier .zip");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/upload-scorm', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const moduleId = response.data.moduleId;
      setMessage(`✅ Module "${moduleId}" uploadé avec succès !`);
      setUploadedModuleId(moduleId);
      setFile(null); // Reset
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de l'upload du module SCORM.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Uploader un module SCORM (.zip)</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".zip" onChange={handleFileChange} className="mb-2 block w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Upload
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}

      {uploadedModuleId && (
        <div className="mt-4">
          <Link
            to={`/modules/${uploadedModuleId}`}
            className="text-blue-600 underline"
          >
            👉 Voir le module SCORM
          </Link>
        </div>
      )}
    </div>
  );
}
