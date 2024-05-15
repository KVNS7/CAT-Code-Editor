import { useRef, useState, useEffect } from "react";
import {
    Box, HStack, Flex,
    Button, IconButton,
    useToast,
    useDisclosure,
    Tabs, Tab, TabList, TabPanels, TabPanel,
    Tooltip,
} from "@chakra-ui/react"
import { SettingsIcon, SmallCloseIcon } from "@chakra-ui/icons"
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "../constantes";

import IDEOptionsDrawer from "./IDEOptionsDrawer";
import NewTabModal from "./NewTabModal";
import Output from "./Output";
import TabDeleteDialog from "./TabDeleteDialog";

// TODO : revoir tout le placement / les balises du code

// TODO : ajouter renommer fichier (clic droit?)
// TODO : importer indentation puis ajouter bouton dans le drawer

// TODO : sauvegarder fonctionnel
// TODO : importer fonctionnel
// TODO : retenir les parametres d'IDE (thème, police, minimap,...) selon l'utilisateur
// TODO : onglets (composants bougent lorsque passe en mode défilement)

const CodeEditor = () => {

    const toast = useToast();
    const editorRef = useRef();                                                     // Ref pour l'editeur
    const { isOpen, onOpen, onClose } = useDisclosure()                             // Variable : ouverture du Drawer des paramètres de l'IDE
    const [language, setLanguage] = useState("c")                                   // Variable : langage de l'IDE (C par défaut)
    const [fontSize, setFontSize] = useState(14)                                    // Variable : taille de la police (12 par défaut)
    const [theme, setTheme] = useState("vs-dark")                                   // Variable : theme de l'IDE (sombre par défaut)
    const [minimap, setMinimap] = useState(false)                                   // Variable : activer/desactiver la minimap
    const [tabs, setTabs] = useState([                                              // Variable : onglets de l'IDE
        {
            id: 1,
            title: 'main' + LANGUAGE_VERSIONS['c'].extension,
            language: language,
            content: CODE_SNIPPETS['c']
        }
    ])
    const [tabIndex, setTabIndex] = useState(0)                                     // Variable : garder une trace de l'onglet actif
    const [isModalOpen, setIsModalOpen] = useState(false);                          // Variable : ouverture fenetre nouveau onglet
    const [newTabInfo, setNewTabInfo] = useState({ title: '', language: 'plaintext' });     // Variable : contenu fenetre nouveau onglet
    const [isAlertOpen, setIsAlertOpen] = useState(false);                          // Variable : ouverture du TabDeleteDialog
    const [tabToDelete, setTabToDelete] = useState(null);                           // Variable : table a supprimer
    const cancelRef = useRef();                                                     // Ref du bouton annuler


    useEffect(() => {                                                               // Raccourcis clavier
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '=')) {
                event.preventDefault();                                             // Empêche que le raccourci navigateur prime
                increaseFontSize();
            } else if ((event.ctrlKey || event.metaKey) && event.key === '-') {
                event.preventDefault();
                decreaseFontSize();
            } else if ((event.ctrlKey || event.metaKey) && event.key === 'm') {
                event.preventDefault();
                toggleMinimap();
            } else if ((event.ctrlKey || event.metaKey) && event.key === 'o') {
                event.preventDefault();
                setIsModalOpen(true);
            } else if ((event.ctrlKey || event.metaKey) && event.key === 'w') {
                event.preventDefault();
                confirmRemoveTab(tabIndex);
            }
        };

        document.addEventListener('keydown', handleKeyDown);


        const handleBeforeUnload = (event) => {                                 // Demande confirmation avant de fermer/actualiser la page
            const message = "Êtes-vous sûr de vouloir quitter cette page ? Vos modifications non sauvegardées seront perdues.";
            event.returnValue = message;
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [fontSize, minimap, isModalOpen, tabIndex]);

    const onMount = (editor) => {               // Met le focus sur l'éditeur quand il a fini de charger
        editorRef.current = editor;
        editor.focus();
    };

    const setTab = (index) => {                         // Changement d'onglet
        setTabIndex(index);                             // Met la sélection sur le nouvel onglet créé
        setLanguage(tabs[index].language);              // Met à jour le langage à partir de l'onglet sélectionné (pour l'editeur et Piston)
    };

    const addTab = (validatedTitle) => {                              // Ajout d'un onglet 
        const newTab = {
            id: tabs.length + 1,
            title: validatedTitle,
            language: newTabInfo.language,
            content: CODE_SNIPPETS[newTabInfo.language] || 'Aucun langage n\'a été reconnu pour ce fichier'
        };
        setTabs([...tabs, newTab]);                                 // Ajoute l'onglet à la liste des onglets
        setTabIndex(tabs.length);                                   // Défini le nouvel onglet comme actif
        setIsModalOpen(false);                                      // Ferme le modal après l'ajout
        setNewTabInfo({ title: '', language: 'plaintext' });        // Réinitialise les informations du formulaire
    }

    const confirmRemoveTab = (index) => {
        if (tabs.length === 1) { return; }                  // Annule l'opération s'il ne reste qu'un onglet

        setTabToDelete(index);
        setIsAlertOpen(true);
    }

    const removeTab = () => {
        const newTabs = tabs.filter((_, index) => index !== tabToDelete);
        setTabs(newTabs);
        setIsAlertOpen(false);

        if (tabToDelete === tabIndex) {                     // Si l'onglet supprimé est l'onglet actif
            const newIndex = tabToDelete > 0 ? tabToDelete - 1 : 0;
            setTabIndex(newIndex);
            setLanguage(newTabs[newIndex]?.language || 'plaintext');
        } else if (tabToDelete < tabIndex) {                // Si un onglet avant l'onglet actif est supprimé, décrémente l'index actif
            setTabIndex(tabIndex - 1);
        }
    }

    const decreaseFontSize = () => fontSize > 8 && setFontSize(fontSize - 1);   // Diminue la taille de la police (si > 8)
    const increaseFontSize = () => fontSize < 30 && setFontSize(fontSize + 1);  // Augmente la taille de la police (si < 30)

    const toggleMinimap = () => setMinimap(!minimap);                           // Active / désactive la minimap

    const toastNonImplementee = () => {                                         // Toast pour les fonctionnalités non implémentées
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
                    <Flex alignItems="center" mb="10px">

                        {/* Bouton ouvrant les paramètres de l'IDE */}
                        <Box mr="auto" mt={5}>
                            <Button leftIcon={<SettingsIcon />} onClick={onOpen}>Paramètres IDE</Button>
                        </Box>

                        {/* Bouton permettant de sauvegarder le/les fichiers */}
                        <Box mt={5}>

                            <Tooltip label={"Sauvegarde le fichier dans le dossier étudiant"} openDelay={500} hasArrow>
                                <Button
                                    color={"green.500"}
                                    border={"2px solid"}
                                    _hover={{ bg: "green.700" }}
                                    onClick={toastNonImplementee}
                                >
                                    Sauvegarder
                                </Button>
                            </Tooltip>

                        </Box>

                        {/* Bouton permettant d'importer un/des fichiers */}
                        <Box ml="2%" mt={5} mr="2%">

                            <Tooltip label={"Importer un fichier ou un dossier(zip) au TP"} openDelay={500} hasArrow>
                                <Button
                                    color={"orange.500"}
                                    border={"2px solid"}
                                    _hover={{ bg: "orange.700" }}
                                    onClick={toastNonImplementee}
                                >
                                    Importer
                                </Button>
                            </Tooltip>

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
                                    'msOverflowStyle': 'none'                           // pour Internet Explorer 10+
                                }}
                            >

                                {tabs.map((tab, index) => (
                                    <Flex alignItems="center" key={index}>
                                        <Tab>
                                            {tab.title}
                                        </Tab>
                                        <IconButton
                                            aria-label="Fermer l'onglet"
                                            icon={<SmallCloseIcon />}
                                            variant="unstyled"
                                            color={tabIndex === index ? "blue.400" : ""}
                                            size="xs"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                confirmRemoveTab(index);
                                            }}
                                            border="none"
                                        />
                                    </Flex>
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
                                            fontSize: fontSize,
                                            formatOnType: true
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
                        tabs={tabs}
                    />

                    <TabDeleteDialog
                        isOpen={isAlertOpen}
                        onClose={() => setIsAlertOpen(false)}
                        onDelete={removeTab}
                        cancelRef={cancelRef}
                        tabName={tabs[tabToDelete]?.title}
                    />

                </Box>

                <Output content={tabs[tabIndex].content} language={tabs[tabIndex].language} />     {/* Fenêtre de résultat d'exécution du code*/}

            </HStack>
        </Box>
    );
};

export default CodeEditor
