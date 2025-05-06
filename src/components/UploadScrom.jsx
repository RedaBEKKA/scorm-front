// src/components/UploadScormModule.jsx
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ModuleList from './ModuleList';

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
      setFile(null); // Réinitialiser
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de l'upload du module SCORM.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen">
        <div className="bg-white shadow-lg rounded-2xl p-6 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Uploader un module SCORM (.zip)
          </h2>

          <form onSubmit={handleUpload} className="space-y-4 w-full">
            <label className="block w-full">
              <span className="text-gray-700">Fichier SCORM :</span>
              <input
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600
                     hover:from-blue-600 hover:to-blue-700
                     text-white font-medium py-2 rounded-lg shadow-md transition"
            >
              Upload
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-gray-700 w-full">{message}</p>
          )}

          {uploadedModuleId && (
            <div className="mt-6 text-center w-full">
              <Link
                to={`/modules/${uploadedModuleId}`}
                className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium hover:bg-green-200 transition"
              >
                👉 Voir le module SCORM
              </Link>
            </div>
          )}
        </div>
      </div>
      <ModuleList />
    </>

  );
}
