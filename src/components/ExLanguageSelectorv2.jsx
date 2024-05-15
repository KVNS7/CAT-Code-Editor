import { Select, FormControl, FormLabel } from '@chakra-ui/react'
import { LANGUAGE_VERSIONS } from '../constantes'


const LanguageSelector = ({ language, onSelectLanguage }) => {

    const languages = Object.entries(LANGUAGE_VERSIONS) // Constantes des langages de l'IDE et de leur version (supportées par Piston)
    return (

        <FormControl>
            <FormLabel>Langage</FormLabel>
            <Select
                value={language}
                onChange={(e) => onSelectLanguage(e.target.value)}
                placeholder="Sélectionnez un langage"
            >
                {languages.map(([lang, details]) => (
                    <option key={lang} value={lang}>
                        {lang} (v{details.version})
                    </option>
                ))}
            </Select>
        </FormControl>
    )
}

export default LanguageSelector