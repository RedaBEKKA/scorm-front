import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ModuleList() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/modules')
            .then(resp => {
                setModules(resp.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Impossible de charger les modules.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Chargement des modules…</p>;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    if (modules.length === 0) {
        return <p>Aucun module disponible.</p>;
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Liste des modules SCORM</h2>
            <ul className="space-y-2">
                {modules.map(moduleId => (
                    <li key={moduleId}>
                        <Link
                            to={`/modules/${moduleId}`}
                            className="text-blue-600 hover:underline"
                        >
                            Module : {moduleId}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
