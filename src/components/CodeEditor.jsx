import { useRef, useState, useEffect } from "react";
import { Box, HStack, Button, Text, Flex, useToast, Drawer, DrawerBody, DrawerHeader, DrawerContent, DrawerCloseButton, useDisclosure, Divider, Menu, MenuButton, MenuList, MenuItem, Switch, Kbd } from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, VS_THEMES } from "../constantes";
import Output from "./Output";

// TODO : onglets pour avoir plusieurs fichiers
// TODO : bouton sauvegarder fonctionnel
// TODO : bouton importer fonctionnel

const CodeEditor = () => {

    const toast = useToast();
    const editorRef = useRef();
    const themes = Object.entries(VS_THEMES)
    const {isOpen, onOpen, onClose} = useDisclosure()   // Variable : ouverture du Drawer des paramètres de l'IDE
    const [value, setValue] = useState('')              // Variable : valeur dans l'éditeur (lignes de code)
    const [language, setLanguage] = useState("c")       // Variable : langage de l'IDE (C par défaut)
    const [fontSize, setFontSize] = useState(14)        // Variable : taille de la police (12 par défaut)
    const [theme, setTheme] = useState("vs-dark")       // Variable : theme de l'IDE (sombre par défaut)
    const [minimap, setMinimap] = useState(false)       // Variable : activer/desactiver la minimap

    useEffect(() => {
        const handleKeyDown = (event) => {  
            if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '=')) {  // Inclure '=' pour les claviers où '+' nécessite Shift
                event.preventDefault();  // Empêche que le raccourci navigateur prime
                increaseFontSize();
            } else if ((event.ctrlKey || event.metaKey) && event.key === '-') {
                event.preventDefault();
                decreaseFontSize();
            } else if ((event.ctrlKey || event.metaKey) && event.key === 'm'){
                event.preventDefault();
                toggleMinimap();
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [fontSize, minimap]);  // Inclure fontSize pour s'assurer que les fonctions utilisent les valeurs à jour
             


    const onMount = (editor) => {               // Met le focus sur l'éditeur quand il a fini de charger
        editorRef.current = editor;
        editor.focus();
    };
        
    const onSelectLanguage = (language) => {            // Change le langage de programmation de l'éditeur
        setLanguage(language);
        setValue(CODE_SNIPPETS[language])               // Ajoute l'exemple de code associé au langage selectionné dans l'IDE
    }

    const onSelectTheme = (theme) => {                  // Change le thème de l'IDE
        setTheme(theme);
    }

    const toggleMinimap = () => {                       // Active / désactive la minimap
        setMinimap(!minimap);
    }

    const decreaseFontSize = () => fontSize > 8 && setFontSize(fontSize - 1);   // Diminue la taille de la police (si > 8)
    const increaseFontSize = () => fontSize < 30 && setFontSize(fontSize + 1);  // Augmente la taille de la police (si < 30)

    const toastNonImplementee = () => {                 // Toast pour les fonctionnalités non implémentées
        toast({                                                             
            title: "Non implémenté",
            description: "Cette fonction n'a pas encore été ajoutée",
            status: "error",
            duration: 5000,
            variant: "left-accent",
            position: "bottom-right",
        })
    }


  return (
      <Box>
        <HStack spacing={4}>
            <Box w='65%'>

                {/* Flex contenant les différents boutons */}
                <Flex alignItems = "center">

                    {/* Menu permettant de changer le langage utilisé */}
                    <LanguageSelector language={language} onSelectLanguage={onSelectLanguage}/>
                    
                    {/* Bouton ouvrant les paramètres de l'IDE */}
                    <Box ml = "auto" mt = {5} mr = "1%">
                        <Button leftIcon={<SettingsIcon/>} onClick = {onOpen}>Paramètres IDE</Button>
                    </Box>

                    {/* Drawer contenant les paramètres de l'IDE */}
                    <Drawer
                        isOpen = {isOpen}
                        placement = 'right'
                        onClose = {onClose}
                        size = "sm"
                    >
                        <DrawerContent bg = "#333644">
                            <DrawerCloseButton/>

                            <DrawerHeader>
                                Paramètres de l'IDE
                            </DrawerHeader>

                            <DrawerBody>

                                {/* Boutons pour changer la taille de la police */}
                                <Box>
                                    <Text mb = {2} fontSize = 'lg'>     
                                            Taille de la police : {fontSize}
                                    </Text>
                                    <HStack spacing = {4}>
                                        <Button onClick={decreaseFontSize} width = "50%"> - </Button>
                                        <Button onClick={increaseFontSize} width = "50%"> + </Button>
                                    </HStack>
                                </Box>

                                <Divider my = "4" borderWidth = {1}/>

                                {/* Menu pour changer le thème de l'éditeur */}
                                <Box>
                                    <Text mb = {2} fontSize = 'lg'>     
                                        Thème de l'éditeur : 
                                    </Text>

                                    <Box textAlign="center">
                                        <Menu>

                                            <MenuButton as = {Button} width="82%">
                                                {themes.find(([_, code]) => code === theme)[0]}
                                            </MenuButton>

                                            <MenuList background="#110c1b">
                                                {themes.map(([nom, code]) => (
                                                    <MenuItem
                                                        key={nom}
                                                        color = {code === theme ? "orange.500" : ""}
                                                        background={code === theme ? "gray.900" : ""}
                                                        _hover = {{color : "blue.600", background : "gray.900"}}
                                                        onClick={() => onSelectTheme(code)}
                                                    >
                                                        {nom}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>

                                        </Menu>
                                    </Box>
                                </Box>

                                <Divider my = "4" borderWidth = {1}/>
                                
                                <Box>
                                    <Flex alignItems="center">
                                        <Text mb = {2} mr = "auto" fontSize = 'lg'>Minimap :</Text>
                                        <Switch size="lg" colorScheme="orange" isChecked={minimap} onChange={toggleMinimap} mr="5%"/>
                                    </Flex>
                                </Box>

                                <Divider my = "4" borderWidth = {1}/>

                                <Box>
                                    <Text mb = {2} fontSize = 'lg'>     
                                            Raccourcis clavier : 
                                    </Text>
                                    
                                    <Text mb={2}>
                                        <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>+</Kbd> : augmenter la taille de la police
                                    </Text>

                                    <Text mb={2}>
                                        <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>+</Kbd> : augmenter la taille de la police
                                    </Text>

                                    <Text mb={2}>
                                        <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>m</Kbd> : activer / désactiver la minimap
                                    </Text>

                                    <Text mb={2}>
                                        <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>s</Kbd> : sauvegarder les fichiers 
                                    </Text>

                                    <Text mb={2}>
                                        <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>m</Kbd> : importer un fichier / dossier
                                    </Text>
                                    
                                    <Text mb={2}>
                                        <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>c</Kbd> : stopper l'execution en cours dans le terminal
                                    </Text>

                                </Box>

                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>

                    {/* Bouton permettant de sauvegarder le/les fichiers */}
                    <Box mt = {5}>

                        <Button 
                            color = {"green.500"}
                            border = {"2px solid"} 
                            _hover = {{bg :"green.700"}} 
                            onClick = {toastNonImplementee}
                        >
                            Sauvegarder
                        </Button>
                        
                    </Box>

                    {/* Bouton permettant d'importer un/des fichiers */}
                    <Box ml = "2%" mt = {5}>
                        <Button
                            color = {"orange.500"}
                            border = {"2px solid"}
                            _hover = {{bg :"orange.700"}}
                            onClick = {toastNonImplementee}
                        >
                            Importer
                        </Button>
                    </Box>
                </Flex>


                {/* Fenêtre de l'éditeur */}
                <Editor 
                    height = "75vh" 
                    theme = {theme}
                    language = {language}   // Met le langage par défaut choisi ligne 12
                    defaultValue = {CODE_SNIPPETS[language]} // Exemple de code associé au langage
                    onMount = {onMount}     // Fonction pour le focus du curseur
                    value = {value}
                    onChange = {(value) => setValue(value)}
                    options = {{ 
                        minimap: {enabled: minimap,},       // Active / desactive la minimap
                        fontSize: fontSize,                 // Applique la taille de la police à l'éditeur
                    }}  
                />

            </Box>

            

            <Output editorRef = {editorRef} language = {language}/>     {/* Fenêtre résultat d'exécution du code*/}
        </HStack>

    
    </Box>
  );
};

export default CodeEditor
