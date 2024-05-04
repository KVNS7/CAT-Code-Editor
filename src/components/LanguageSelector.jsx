import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { LANGUAGE_VERSIONS } from '../constantes'
import { version } from 'react'

const languages = Object.entries(LANGUAGE_VERSIONS) // Constante dans constantes.js
const COULEUR_SELECTIONNE = "orange.500"
const COULEUR_SELECTION = "blue.600"
const COULEUR_FOND = "gray.900"
const COULEUR_VERSION = "gray.600"

const LanguageSelector = ({language, onSelectLanguage}) => {
  return (
    <Box mb = {4}>

        <Text mb = {2} fontSize = 'lg'>     
            Langage : 
        </Text>

        <Menu isLazy>
            <MenuButton as={Button}>
                {language}
                &nbsp; {/* Espace entre langage et version + restent sur même ligne */}
                {<Text as = "span" fontStyle = "italic" color = {COULEUR_VERSION} fontSize = "xs">
                    (v{LANGUAGE_VERSIONS[language]})
                </Text>}
            </MenuButton>
            
            <MenuList background = "#110c1b">
                {languages.map(([lang, version]) => (
                    <MenuItem 
                        key = {lang} 
                        color = {lang === language ? COULEUR_SELECTIONNE : ""}
                        background = {lang === language ? COULEUR_FOND : ""}
                        _hover = {{color : COULEUR_SELECTION, background : COULEUR_FOND}}
                        onClick = {() => onSelectLanguage(lang)}
                    >
                        {lang}
                        &nbsp;
                        <Text as = "span" fontStyle = "italic" color = {COULEUR_VERSION} fontSize = "xs">
                            (v{version})
                        </Text>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
        
    </Box>
  )
}

export default LanguageSelector