import { useRef, useState, useEffect } from "react";
import {
    Box, HStack, Flex,
    Menu, MenuButton, MenuList, MenuItem,
    Button, IconButton,
    useToast, useDisclosure,
    Tabs, Tab, TabList, TabPanels, TabPanel,
    Tooltip,
    Image, Text,
    Checkbox
} from "@chakra-ui/react"
import { SettingsIcon, SmallCloseIcon, TriangleDownIcon } from "@chakra-ui/icons"
import { Editor } from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import beautify from "js-beautify";

import { CODE_SNIPPETS, ONGLETS_TEST } from "../constantes";

import IDEOptionsDrawer from "./IDEOptionsDrawer";
import NewTabModal from "./NewTabModal";
import RenameTabModal from "./RenameTabModal"
import TabDeleteDialog from "./TabDeleteDialog";
import Output from "./Output";


// ! ---------------------------------------------------------------------------------------------------- ! //
// TODO : revoir tout le placement / les balises du code

// TODO : importer fonctionnel
// TODO : sauvegarder fonctionnel

// TODO : retenir les parametres d'IDE (thème, police, minimap,...) selon l'utilisateur

// ! ---------------------------------------------------------------------------------------------------- ! //

const CodeEditor = () => {

    const toast = useToast();
    const editorRef = useRef();                                                     // Ref pour l'editeur
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()                             // Ouverture du Drawer des paramètres de l'IDE

    const [fontSize, setFontSize] = useState(14)                                    // Taille de la police (12 par défaut)
    const [theme, setTheme] = useState("vs-dark")                                   // Theme de l'IDE (sombre par défaut)
    const [minimap, setMinimap] = useState(false)                                   // Activer/desactiver la minimap

    const [tabs, setTabs] = useState(ONGLETS_TEST);                                 // Fichiers du TP
    const [displayedTabs, setDisplayedTabs] = useState(                             // Onglets de l'IDE
        () => tabs.filter(tab => tab.displayed)
    );
    const [tabIndex, setTabIndex] = useState(0)                                     // Index onglet actif
    const [newTabInfo, setNewTabInfo] = useState({ title: '', language: 'plaintext' });     // Contenu fenêtre nouveau onglet

    const [isModalOpen, setIsModalOpen] = useState(false);                          // Ouverture fenetre nouveau onglet
    const [isRenameOpen, setIsRenameOpen] = useState(false);                        // Ouverture fenetre renommer onglet
    const [isAlertOpen, setIsAlertOpen] = useState(false);                          // Ouverture du TabDeleteDialog
    const [idToDelete, setidToDelete] = useState(null);                           // Table a supprimer

    useEffect(() => {
        const handleKeyDown = (event) => {                                          // Raccourcis clavier
            if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '=')) {
                event.preventDefault();                                             // Empêche que le raccourci navigateur prime
                increaseFontSize();
            } else if ((event.ctrlKey || event.metaKey) && event.key === '-') {
                event.preventDefault();
                decreaseFontSize();
            } else if ((event.ctrlKey || event.metaKey) && event.key === 'm') {
                event.preventDefault();
                setMinimap(!minimap);
            } else if ((event.ctrlKey || event.metaKey) && event.key === 'o') {
                event.preventDefault();
                setIsModalOpen(true);
            } else if ((event.ctrlKey || event.metaKey) && event.key === 'w') {
                event.preventDefault();
                confirmRemoveTab(displayedTabs[tabIndex].id);
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
    }, [fontSize, minimap, isModalOpen, tabIndex, displayedTabs]);

    useEffect(() => {
        setDisplayedTabs(tabs.filter(tab => tab.displayed));
    }, [tabs]);

    const handleIndentCode = (indentType) => {                        // Indente le code dans l'onglet actuel
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

    const onMount = (editor) => {                       // Met le focus sur l'éditeur quand il a fini de charger
        editorRef.current = editor;
        editor.focus();
    };

    const addTab = (validatedTitle) => {                // Ajout d'un onglet 
        const newTab = {
            id: tabs.length + 1,
            title: validatedTitle,
            language: newTabInfo.language,
            content: CODE_SNIPPETS[newTabInfo.language] || 'Aucun langage n\'a été reconnu pour ce fichier',
            displayed: true,
        };
        setTabs([...tabs, newTab]);                                 // Ajoute l'onglet à la liste des onglets
        setTabIndex(displayedTabs.length);                                   // Défini le nouvel onglet comme actif
        setIsModalOpen(false);                                      // Ferme le modal après l'ajout
        setNewTabInfo({ title: '', language: 'plaintext' });        // Réinitialise les informations du formulaire
    }

    const renameTab = (newTitle, newLanguage) => {
        displayedTabs[tabIndex].title = newTitle;
        displayedTabs[tabIndex].language = newLanguage;
        setIsRenameOpen(false);
    }

    const handleContextMenu = (event, index) => {                               // Gère le clic droit sur les onglets pour les renommer
        event.preventDefault();
        setTabIndex(index);
        setIsRenameOpen(true);
    }

    const confirmRemoveTab = (removeId) => {
        setidToDelete(removeId);
        setIsAlertOpen(true);
    }

    const removeTab = () => {                                               // Suppression d'un onglet
        const newTabs = tabs.filter(tab => tab.id !== idToDelete);
        let deleteIndex = displayedTabs.findIndex(tab => tab.id === idToDelete);
        setTabs(newTabs);
        setIsAlertOpen(false);

        if (deleteIndex === tabIndex) {
            if(deleteIndex === displayedTabs.length-1) setTabIndex(deleteIndex-1);
        } else if (deleteIndex < tabIndex) {
            setTabIndex(tabIndex - 1);
        }
    }

    const decreaseFontSize = () => fontSize > 8 && setFontSize(fontSize - 1);   // Diminue la taille de la police (si > 8)
    const increaseFontSize = () => fontSize < 30 && setFontSize(fontSize + 1);  // Augmente la taille de la police (si < 30)

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

    const handleCheckbox = (id) => { // ! AJOUTER GESTION DE LA MODIFICATION DU tabIndex
        const indentIndex = tabs.findIndex(tab => tab.id === id);
        let newTabs = [...tabs];
        newTabs[indentIndex].displayed = !newTabs[indentIndex].displayed;
        setTabs(newTabs);
    };

    return (
        <Box minH="100vh" bg="#121212" color="gray.500" px={6} py={8}>

            <Image mt="-1%" src='img/CAT.png' mr='auto' ml='auto' alt='Logo CAT' borderRadius="full" boxSize="6%" onClick={() => navigate('/')} cursor="pointer" />

            <HStack spacing={4}>
                <Box w='65%'>

                    {/* Flex contenant les différents boutons */}
                    <Flex alignItems="center" mb="10px">

                        <Box mr="auto" mt={5}>

                            <Button leftIcon={<SettingsIcon />} onClick={onOpen}>Paramètres IDE</Button>
                        </Box>

                        {/* Bouton permettant de sauvegarder le/les fichiers */}
                        <Box mt={5}>

                            <Tooltip label={"Sauvegarde le fichier dans le dossier étudiant"} openDelay={500} hasArrow>
                                <Button
                                    color={"green.500"}
                                    border={"2px solid"}
                                    _hover={{ bg: "green.200" }}
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
                                    _hover={{ bg: "orange.200" }}
                                    onClick={toastNonImplementee}
                                >
                                    Importer
                                </Button>
                            </Tooltip>

                        </Box>

                        <Box mt={5} mr="2%">

                            <Menu closeOnSelect={false} placement="bottom">
                                <Tooltip label={"Liste des fichiers du TP"} openDelay={500} hasArrow>
                                    <MenuButton
                                        as={Button}
                                        color={"blue.500"}
                                        border={"2px solid"}
                                        _hover={{ bg: "blue.200" }}
                                        rightIcon={<TriangleDownIcon />}
                                    >
                                        Fichiers du TP
                                    </MenuButton>
                                </Tooltip>
                                <MenuList>
                                    {tabs.map(tab => (
                                        <MenuItem key={tab.id} onClick={() => handleCheckbox(tab.id)}>
                                            {tab.title}
                                            <Checkbox
                                                ml="auto"
                                                isChecked={tab.displayed}
                                                onChange={() => handleCheckbox(tab.id)}
                                            />
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
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
                        onIndentCode={handleIndentCode}
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
                                                handleCheckbox(tab.id);
                                            }}
                                            border="none"
                                        />
                                    </Flex>
                                ))}

                            </TabList>
                        </Flex>

                        <TabPanels mt="-2%">

                            {displayedTabs.length > 0 ? (
                                displayedTabs.map((tab, index) => (

                                    <TabPanel key={index}>
                                        <Editor
                                            height="75vh"
                                            theme={theme}
                                            language={tab.language}
                                            defaultValue={tab.content}
                                            onMount={onMount}
                                            value={tab.content}
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

                                ))
                            ) : (
                                <TabPanel>
                                    <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
                                        <Text fontSize="2xl" color="gray.500">Aucun onglet ouvert</Text>
                                    </Box>
                                </TabPanel>
                            )}

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
                        onClose={() => setIsAlertOpen(false)}
                        onDelete={removeTab}
                        tabName={tabs.find(tab => tab.id === idToDelete)?.title}
                    />

                </Box>

                {tabIndex !== -1 && displayedTabs[tabIndex] ? (
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