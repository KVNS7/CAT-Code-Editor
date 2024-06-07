import { useRef, useState, useEffect, useCallback } from "react";
import {
    Box, HStack, Flex,
    Menu, MenuButton, MenuList, MenuItem,
    Button, IconButton, Checkbox,
    useToast, useDisclosure,
    Tabs, Tab, TabList, TabPanels, TabPanel,
    Tooltip,
    Image, Text,
} from "@chakra-ui/react"
import { SettingsIcon, SmallCloseIcon, TriangleDownIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Editor } from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import beautify from "js-beautify";

import { CODE_SNIPPETS, ONGLETS_TEST } from "../constantes";

import ImportFileButton from "./ImportFileButton";
import OptionsDrawer from "./OptionsDrawer";
import NewFileModal from "./NewFileModal";
import RenameTabModal from "./RenameTabModal"
import TabDeleteDialog from "./TabDeleteDialog";
import Output from "./Output";


// ! ---------------------------------------------------------------------------------------------------- ! //
// TODO : revoir tout le placement / les balises du code / repartition en composants

// TODO : retenir les parametres d'IDE (thème, police, minimap,...) selon l'utilisateur
// ! ---------------------------------------------------------------------------------------------------- ! //


const CodeEditor = () => {

    const toast = useToast();
    const editorRef = useRef();                                                     // Ref editeur
    const importButtonRef = useRef();                                               // Ref bouton importer
    const menuButtonRef = useRef();                                                 // Ref bouton menu

    const navigate = useNavigate();                                                 // Pour naviguer entre les pages
    const { isOpen, onOpen, onClose } = useDisclosure()                             // Ouverture du Drawer des paramètres de l'IDE

    const [fontSize, setFontSize] = useState(14)                                    // Taille de la police (12 par défaut)
    const [theme, setTheme] = useState("vs-dark")                                   // Theme de l'IDE (sombre par défaut)
    const [minimap, setMinimap] = useState(false)                                   // Activer/desactiver la minimap

    const [tabs, setTabs] = useState(ONGLETS_TEST);                                 // Fichiers du TP
    const [displayedTabs, setDisplayedTabs] = useState(                             // Onglets de l'IDE
        () => tabs.filter(tab => tab.displayed)
    );
    const [selectedTabs, setSelectedTabs] = useState([]);                           // Onglets selectionnés (suppression / exportation)
    const [tabIndex, setTabIndex] = useState(0);                                    // Index onglet actif

    const [isModalOpen, setIsModalOpen] = useState(false);                          // Ouverture modale nouveau onglet
    const [isRenameOpen, setIsRenameOpen] = useState(false);                        // Ouverture modale renommer onglet
    const [isAlertOpen, setIsAlertOpen] = useState(false);                          // Ouverture dialogue suppresion onglet

    const handleKeyDown = useCallback((e) => {                                      // Gestion des raccourcis clavier
        if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
            e.preventDefault();
            increaseFontSize();
        } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
            e.preventDefault();
            decreaseFontSize();
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            setMinimap(!minimap);
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
            e.preventDefault();
            setIsModalOpen(true);
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
            e.preventDefault();
            setSelectedTabs([displayedTabs[tabIndex]]);
            confirmRemoveTab();
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
            e.preventDefault();
            importButtonRef.current.click();
        }
    }, [fontSize, minimap, tabIndex, displayedTabs]);

    const handleBeforeUnload = useCallback((event) => {                             // Gestion fermeture/rechargement de la page
        const message = "Êtes-vous sûr de vouloir quitter cette page ? Vos modifications non sauvegardées seront perdues.";
        event.returnValue = message;
        return message;
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [handleKeyDown, handleBeforeUnload]);

    useEffect(() => {
        setDisplayedTabs(tabs.filter(tab => tab.displayed));
    }, [tabs]);

    const handleIndentCode = (indentType) => {                          // Indente le code dans l'onglet actuel
        let code = displayedTabs[tabIndex].content;

        switch (displayedTabs[tabIndex].language) {
            case ('c'):
            case ('java'):
            case ('javascript'):
            case ('csharp'):
            case ('typescript'):
                code = beautify(code, { indent_size: 4, brace_style: indentType });
                break;

            default:
                toast({
                    title: "Echec indentation",
                    description: "Pas d'indentation pour ce langage",
                    status: "error",
                    duration: 3000,
                    position: "bottom-right",
                })
                return;
        }

        let indentIndex = tabs.findIndex(tab => tab.id === displayedTabs[tabIndex].id);
        let newTabs = [...tabs];
        newTabs[indentIndex] = {
            ...newTabs[indentIndex],
            content: code,
        };
        setTabs(newTabs);

        return;
    }

    const onMount = (editor) => {                                       // Met le focus sur l'éditeur quand il a fini de charger
        editorRef.current = editor;
        editor.focus();
    };

    const addTab = (validatedTitle, content, lang) => {                                // Ajout d'un onglet 
        const newTab = {
            id: (tabs[tabs.length - 1].id) + 1,
            title: validatedTitle,
            language: lang,
            content: content !== null ? content : (CODE_SNIPPETS[lang] || 'Aucun langage n\'a été reconnu pour ce fichier'),
            displayed: true,
        };
        setTabs([...tabs, newTab]);                                 // Ajoute l'onglet à la liste des onglets
        setTabIndex(displayedTabs.length);                          // Défini le nouvel onglet comme actif
        setIsModalOpen(false);                                      // Ferme le modal après l'ajout

        console.log("titre : " + validatedTitle + "\nlangage : " + lang);
    }

    const renameTab = (newTitle, newLanguage) => {
        displayedTabs[tabIndex].title = newTitle;
        displayedTabs[tabIndex].language = newLanguage;
        setIsRenameOpen(false);
    }

    const handleContextMenu = (event, index) => {                       // Gère le clic droit sur les onglets pour les renommer
        event.preventDefault();
        setTabIndex(index);
        setIsRenameOpen(true);
    }

    const handleSelectTab = (tab) => {
        setSelectedTabs(prev => {
            if (prev.some(selectedTab => selectedTab.id === tab.id)) {
                return prev.filter(selectedTab => selectedTab.id !== tab.id);
            } else {
                return [...prev, tab];
            }
        });
    };

    const confirmRemoveTab = () => {
        setIsAlertOpen(true);
    }

    const removeTab = () => {                                                   // Suppression d'un fichier
        let newTabs = tabs;

        selectedTabs.forEach(delTab => {
            newTabs = newTabs.filter(tab => tab.id !== delTab.id);
            let deleteIndex = displayedTabs.findIndex(tab => tab.id === delTab.id);

            if (deleteIndex === -1) return;
            else if (deleteIndex == tabIndex) {
                if (deleteIndex === displayedTabs.length - 1) setTabIndex(deleteIndex - 1);
            } else if (deleteIndex < tabIndex) {
                setTabIndex(tabIndex - 1);
            }
        });

        setTabs(newTabs);
        setSelectedTabs([]);
        setIsAlertOpen(false);
    }

    const handleExportFiles = () => {                                           // exporter les fichiers sélectionnés
        selectedTabs.forEach(tab => {           // ! si besoin de faire un zip, nécessite d'installer JSZip et file-saver
            const element = document.createElement('a');
            const file = new Blob([tab.content], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = tab.title;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }

    const decreaseFontSize = () => fontSize > 8 && setFontSize(fontSize - 1);   // Diminue la taille de la police (si > 8)
    const increaseFontSize = () => fontSize < 30 && setFontSize(fontSize + 1);  // Augmente la taille de la police (si < 30)

    const toastNonImplementee = () => {                                         // Toast pour les fonctionnalités non implémentées
        toast({
            title: "Non implémenté",
            description: "Cette fonction n'a pas encore été implémentée",
            status: "error",
            duration: 5000,
            position: "bottom-right",
        })
    }

    const handleTabView = (tabID) => {                                         // Gère la fermeture / ouverture d'onglet

        const indexCheck = displayedTabs.findIndex(tab => tab.id === tabID);
        const displayed = indexCheck !== -1;

        if (displayed && (indexCheck < tabIndex || (indexCheck === tabIndex && tabIndex >= displayedTabs.length - 1))) {
            setTabIndex(tabIndex - 1);
        }

        const newTabs = tabs.map(tab =>
            tab.id === tabID ? { ...tab, displayed: !tab.displayed } : tab
        );
        setTabs(newTabs);

        if (!displayed) {
            const newDisplayedTabs = newTabs.filter(tab => tab.displayed);
            setDisplayedTabs(newDisplayedTabs);
            setTabIndex(newDisplayedTabs.findIndex(tab => tab.id === tabID));
        }
    }

    return (
        <Box minH="100vh" bg="#121212" color="gray.500" px={6} py={8}>

            <Image mt="-1%" src='img/CAT.png' mr='auto' ml='auto' alt='Logo CAT' border="2px solid teal" borderRadius="full" boxSize="6%" onClick={() => navigate('/')} cursor="pointer" />

            <HStack spacing={4}>
                <Box w='65%'>

                    <Flex alignItems="center" mb="10px">

                        <Box mr="auto" mt={5}>
                            <Button leftIcon={<SettingsIcon />} onClick={onOpen}>Paramètres</Button>
                        </Box>

                        <Box mt={5}>
                            <Tooltip label={"Sauvegarde le fichier dans le dossier étudiant"} openDelay={500} hasArrow>
                                <Button
                                    color={"green.500"}
                                    border={"2px solid"}
                                    _hover={{ bg: "green.900", color: 'white', borderColor: "green.500" }}
                                    onClick={toastNonImplementee}
                                >
                                    Sauvegarder
                                </Button>
                            </Tooltip>
                        </Box>

                        <ImportFileButton
                            ref={importButtonRef}
                            addTab={addTab}
                            tabs={tabs}
                            displayedTabs={displayedTabs}
                            setTabs={setTabs}
                            setTabIndex={setTabIndex}
                            ml="2%"
                            mr="2%"
                            mt={5}
                        />

                        <Box mt={5} mr="2%">

                            <Menu closeOnSelect={false} placement="bottom" /* // ! onClose={() => setSelectedTabs([])}*/>
                                <Tooltip label={"Liste des fichiers du TP"} openDelay={500} hasArrow>
                                    <MenuButton
                                        ref={menuButtonRef}
                                        as={Button}
                                        color={"blue.500"}
                                        border={"2px solid"}
                                        _hover={{ bg: "blue.900", color: 'white', borderColor: 'blue.500' }}
                                        rightIcon={<TriangleDownIcon />}
                                    >
                                        Fichiers du TP
                                    </MenuButton>
                                </Tooltip>
                                <MenuList zIndex={100}>
                                    <Box display="flex" justifyContent="space-between" mb={2}>
                                        <Button
                                            colorScheme="teal"
                                            width="47%"
                                            ml="2%"
                                            onClick={() => {
                                                if (selectedTabs.length > 0) handleExportFiles();
                                            }}
                                        >
                                            Exporter
                                        </Button>
                                        <Button
                                            colorScheme="red"
                                            width="47%"
                                            mr="2%"
                                            onClick={() => {
                                                if (selectedTabs.length > 0) confirmRemoveTab();
                                            }}
                                        >
                                            Supprimer
                                        </Button>
                                    </Box>


                                    {(tabs.length === 0) ? (
                                        <MenuItem> Aucun fichier dans le TP</MenuItem>
                                    ) : (
                                        tabs.map(tab => (
                                            <MenuItem key={tab.id} onClick={() => handleSelectTab(tab)} color="gray.200">

                                                {tab.title}

                                                {tab.displayed ? (
                                                    <ViewIcon
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTabView(tab.id);
                                                        }}
                                                        color="blue.400"
                                                        ml="auto"
                                                        height={8}
                                                    />
                                                ) : (
                                                    <ViewOffIcon
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTabView(tab.id);
                                                        }}
                                                        color="gray.400"
                                                        ml="auto"
                                                        height={8}
                                                    />
                                                )}


                                                <Checkbox
                                                    ml={3}
                                                    mr={2}
                                                    isChecked={selectedTabs.includes(tab)}
                                                    onChange={() => handleSelectTab(tab)}
                                                />
                                            </MenuItem>
                                        ))
                                    )}
                                </MenuList>
                            </Menu>
                        </Box>

                    </Flex>

                    {/* Drawer contenant les paramètres de l'IDE */}
                    <OptionsDrawer isOpen={isOpen}
                        onClose={onClose}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        theme={theme}
                        setTheme={setTheme}
                        minimap={minimap}
                        setMinimap={setMinimap}
                        onIndentCode={handleIndentCode}
                        toastNonImplementee={toastNonImplementee}
                    />

                    {/* Onglets de l'IDE */}
                    <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} size="sm">

                        <Flex position="sticky">
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

                                {displayedTabs.map((tab, index) => (
                                    <Flex alignItems="center" key={index} onContextMenu={(e) => handleContextMenu(e, index)}>
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
                                                handleTabView(tab.id);
                                            }}
                                            border="none"
                                        />
                                    </Flex>
                                ))}

                            </TabList>
                        </Flex>

                        <TabPanels mt="-2%">

                            {(displayedTabs.length === 0) || (tabIndex < 0 || tabIndex > displayedTabs.length - 1) ? (
                                <TabPanel>
                                    <Box display="flex" justifyContent="center" alignItems="center" height="75vh" border="1px solid grey">
                                        <Text fontSize="2xl" color="gray.500">Aucun onglet ouvert / selectionné</Text>
                                    </Box>
                                </TabPanel>
                            ) : (
                                displayedTabs.map((tab) => (

                                    <TabPanel key={tab.id}>
                                        <Editor
                                            height="75vh"
                                            theme={theme}
                                            language={tab.language}
                                            defaultValue={tab.content}
                                            onMount={onMount}
                                            value={tab.content}
                                            onChange={(newValue) => {
                                                const newTabs = [...tabs];
                                                const newIndex = newTabs.findIndex(t => t.id === tab.id);
                                                newTabs[newIndex].content = newValue;
                                                setTabs(newTabs);
                                            }}
                                            options={{
                                                minimap: { enabled: minimap },
                                                fontSize: fontSize,
                                                formatOnType: true
                                            }}
                                        />
                                    </TabPanel>
                                ))
                            )}

                        </TabPanels>
                    </Tabs>

                    <NewFileModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        addTab={addTab}
                        tabs={tabs}
                    />

                    <RenameTabModal
                        isOpen={isRenameOpen}
                        onClose={() => setIsRenameOpen(false)}
                        tabs={tabs}
                        displayedTabs={displayedTabs}
                        tabIndex={tabIndex}
                        renameTab={renameTab}
                    />

                    <TabDeleteDialog
                        isOpen={isAlertOpen}
                        onClose={() => {
                            setIsAlertOpen(false);
                            setSelectedTabs([]);
                        }}
                        removeTab={removeTab}
                        selectedTabs={selectedTabs}
                    />

                </Box>

                {displayedTabs[tabIndex] ? (
                    <Output content={displayedTabs[tabIndex].content} language={displayedTabs[tabIndex].language} />
                ) : (
                    <Output />
                )}
            </HStack>

            <Box ml="87%">

                <Tooltip label={"Page admin Docker"} openDelay={500} hasArrow>
                    <Button
                        color={"red.500"}
                        border={"2px solid"}
                        _hover={{ bg: "red.200" }}
                        onClick={() => navigate('/admin')}
                    >
                        Admin Docker
                    </Button>
                </Tooltip>

            </Box>
        </Box>
    );
};

export default CodeEditor