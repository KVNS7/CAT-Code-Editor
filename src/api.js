import axios from 'axios'
import { LANGUAGE_VERSIONS } from './constantes'

const API = axios.create(({     // URL de l'API qui exécute le code
    baseURL: "https://emkc.org/api/v2/piston"
}))

export const executeCode = async (language, sourceCode) => {
     const response = await API.post("/execute", {
        "language": language,
        "version": LANGUAGE_VERSIONS[language],
        "files": [
            {
            "content": sourceCode,  // code dans l'IDE
            }
        ],
     });
     return response.data;
}

