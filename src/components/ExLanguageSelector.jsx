import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { LANGUAGE_VERSIONS } from '../constantes'

const languages = Object.entries(LANGUAGE_VERSIONS) // Constantes des langages de l'IDE et de leur version (supportées par Piston)

const COULEUR_SELECTIONNE = "orange.500"
const COULEUR_SELECTION = "blue.600"
const COULEUR_FOND = "gray.900"
const COULEUR_VERSION = "gray.600"

const ExLanguageSelector = ({ language, onSelectLanguage }) => {
    return (
        <Box mb={4}>

            <Text mb={2} fontSize='lg'>
                Langage :
            </Text>

            {/* Menu de choix des langues */}
            <Menu isLazy>

                {/* Bouton d'ouverture du menu */}
                <MenuButton as={Button}>
                    {language}
                    &nbsp;  {/* Espace entre langage et version + restent sur même ligne */}
                    {<Text as="span" fontStyle="italic" color={COULEUR_VERSION} fontSize="xs">
                        (v{LANGUAGE_VERSIONS[language]})
                    </Text>}
                </MenuButton>

                {/* Menu déroulant */}
                <MenuList background="#110c1b">
                    {languages.map(([lang, version]) => (
                        <MenuItem
                            key={lang}
                            color={lang === language ? COULEUR_SELECTIONNE : ""}  // Couleur texte selon si selectionné actuellement
                            background={lang === language ? COULEUR_FOND : ""}    // Couleur fond selon ''
                            _hover={{ color: COULEUR_SELECTION, background: COULEUR_FOND }}   // Couleur texte et fond si souris dessus
                            onClick={() => onSelectLanguage(lang)}    // Change le langage
                        >
                            {lang}
                            &nbsp;
                            <Text as="span" fontStyle="italic" color={COULEUR_VERSION} fontSize="xs">
                                (v{version})
                            </Text>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>

        </Box>
    )
}

export default ExLanguageSelector