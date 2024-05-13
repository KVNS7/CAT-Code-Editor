import { useRef, useState, useEffect } from "react";
import {
    Box,
    HStack,
    Button,
    Text,
    Flex,
    useToast,
    useDisclosure,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../constantes";
import IDEOptionsDrawer from "./IDEOptionsDrawer";
import NewTabModal from "./NewTabModal";
import Output from "./Output";

// TODO : onglets (composants bougent lorsque passe en mode défilement)
    // TODO : detecter le language avec le nom du fichier OU mettre juste le nom du fichier et le choix du langage rajoute l'extension dans le nom
// TODO : bouton sauvegarder fonctionnel
// TODO : bouton importer fonctionnel
// TODO : retenir les parametres d'IDE (thème, police, minimap,...) selon l'utilisateur

const CodeEditor = () => {

    const toast = useToast();
    const editorRef = useRef();                                                     // Ref pour l'editeur
    const {isOpen, onOpen, onClose} = useDisclosure()                               // Variable : ouverture du Drawer des paramètres de l'IDE
    const [value, setValue] = useState('')                                          // Variable : valeur dans l'éditeur (lignes de code)
    const [language, setLanguage] = useState("c")                                   // Variable : langage de l'IDE (C par défaut)
    const [fontSize, setFontSize] = useState(14)                                    // Variable : taille de la police (12 par défaut)
    const [theme, setTheme] = useState("vs-dark")                                   // Variable : theme de l'IDE (sombre par défaut)
    const [minimap, setMinimap] = useState(false)                                   // Variable : activer/desactiver la minimap
    const [tabs, setTabs] = useState([                                              // Variable : onglets de l'IDE
        {id: 1, title: 'main.'+ language, language: 'c', content: CODE_SNIPPETS[language]}
    ])
    const [tabIndex, setTabIndex] = useState(0)                                     // Variable : garder une trace de l'onglet actif
    const [isModalOpen, setIsModalOpen] = useState(false);                          // Variable : ouverture fenetre nouveau onglet
    const [newTabInfo, setNewTabInfo] = useState({ title: '', language: 'c' });     // Variable : contenu fenetre nouveau onglet

    useEffect(() => {                                                               // Raccourcis clavier
        const handleKeyDown = (event) => {  
            if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '=')) {  // Inclu '=' pour les claviers où '+' nécessite Shift
                event.preventDefault();  // Empêche que le raccourci navigateur prime
                increaseFontSize();
            } else if ((event.ctrlKey || event.metaKey) && event.key === '-') {
                event.preventDefault();
                decreaseFontSize();
            } else if ((event.ctrlKey || event.metaKey) && event.key === 'm'){
                event.preventDefault();
                toggleMinimap();
            }else if ((event.ctrlKey || event.metaKey) && event.key === 'o'){
                event.preventDefault();
                setIsModalOpen(true);
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [fontSize, minimap, isModalOpen]);

    const onMount = (editor) => {               // Met le focus sur l'éditeur quand il a fini de charger
        editorRef.current = editor;
        editor.focus();
    };

    const setTab = (index) => {                         // Lors du changement d'onglet
        setTabIndex(index);                             // Met la sélection sur le nouvel onglet créé
        setLanguage(tabs[index].language);              // Met à jour le langage à partir de l'onglet sélectionné (pour l'editeur et Piston)
        setValue(tabs[index].content);                  // Met à jour le contenu de l'éditeur
      };

    const toggleMinimap = () => {                       // Active / désactive la minimap
        setMinimap(!minimap);
    }

    const addTab = () => {                              // Ajout d'un onglet 
        const newTab = {
            id: tabs.length + 1,
            title: (newTabInfo.title || `NewTab${tabs.length + 1}`) + `.${newTabInfo.language}`,
            language: newTabInfo.language,
            content: CODE_SNIPPETS[newTabInfo.language] || ''
        };
        setTabs([...tabs, newTab]);                                 // Ajoute l'onglet à la liste des onglets
        setTabIndex(tabs.length);                                   // Défini le nouvel onglet comme actif
        setIsModalOpen(false);                                      // Ferme le modal après l'ajout
        setNewTabInfo({ title: '', language: newTab.language });    // Réinitialise les informations du formulaire
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
                    <Flex alignItems = "center" mb="10px">

                        {/* Bouton ouvrant les paramètres de l'IDE */}
                        <Box mr = "auto" mt = {5}>
                            <Button leftIcon={<SettingsIcon/>} onClick = {onOpen}>Paramètres IDE</Button>
                        </Box>

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
                        <Box ml = "2%" mt = {5} mr="2%">
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

                    {/* Drawer contenant les paramètres de l'IDE */}
                    <IDEOptionsDrawer isOpen={isOpen}
                            onClose={onClose}
                            fontSize={fontSize}
                            setFontSize={setFontSize}
                            theme={theme}
                            setTheme={setTheme}
                            minimap={minimap}
                            setMinimap={setMinimap}
                    />

                    {/* Onglets de l'IDE */}
                    <Tabs index={tabIndex} onChange={setTab} size="sm">
                    
                        <Flex    // Pour le défilement des onglets
                        position="sticky"
                        >  
                            <Button onClick={() => setIsModalOpen(true)} ml="2%" mr="1%">+</Button>
                            <TabList 
                                display="flex"
                                whiteSpace="nowrap"
                                width="90%"
                                overflowX="auto"
                                sx={{
                                    '&::-webkit-scrollbar': { display: 'none' },        // Enleve scrollbar pour Chrome, Safari, et Edge
                                    scrollbarWidth: 'none',                             // pour Firefox
                                    '-ms-overflow-style': 'none'                        // pour Internet Explorer 10+
                                }}
                            >
                                
                                {tabs.map((tab, index) => (
                                    <Tab key={index}>{tab.title}</Tab>
                                ))}

                            </TabList>
                        </Flex>

                        <TabPanels mt="-2%">
                            
                            {tabs.map((tab, index) => (

                            <TabPanel key={index}>
                                <Editor
                                height="75vh"
                                theme={theme}
                                language={tabs[index].language}
                                defaultValue={tab.content}
                                onMount={onMount}
                                value={tabs[index].content}
                                onChange={(newValue) => {
                                    const newTabs = [...tabs];
                                    newTabs[index].content = newValue;
                                    setTabs(newTabs);
                                }}
                                options={{
                                    minimap: { enabled: minimap },
                                    fontSize: fontSize
                                }}
                                />
                            </TabPanel>

                            ))}

                        </TabPanels>
                    </Tabs>

                    <NewTabModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        addTab={addTab}
                        newTabInfo={newTabInfo}
                        setNewTabInfo={setNewTabInfo}
                    />

                </Box>

                <Output content={tabs[tabIndex].content} language = {tabs[tabIndex].language}/>     {/* Fenêtre de résultat d'exécution du code*/}
            
            </HStack>
        </Box>
  );
};

export default CodeEditor
