// src/hooks/useScorm.js
import { SCORM } from 'pipwerks-scorm-api-wrapper';
import { useEffect } from 'react';

export default function useScorm() {
    useEffect(() => {
        // Spécifier la version SCORM 2004
        SCORM.version = '2004';
        // Initialisation de la session
        const connected = SCORM.init();
        if (connected) {
            console.log('✅ SCORM 2004 session initialized');
        } else {
            console.error('❌ Failed to initialize SCORM 2004 session');
        }

        // À la sortie du composant, fermer la connexion
        return () => {
            SCORM.quit();
        };
    }, []);
}
