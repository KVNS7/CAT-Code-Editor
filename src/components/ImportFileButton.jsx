import { useRef, forwardRef } from 'react';
import {
    Box,
    Tooltip,
    Button,
    Input,
    useToast
} from '@chakra-ui/react'
import { LANGUAGE_VERSIONS } from '../constantes';

const ImportFileButton = forwardRef(({ tabs, displayedTabs, setTabs, setTabIndex, ml, mr, mt }, ref) => {

    const toast = useToast();
    const fileInputRef = useRef(null);                                                  // Ref input fichier

    const makeToast = (decription) => {
        toast({
            title: "Erreur",
            description: decription,
            status: "error",
            duration: 1500,
            isClosable: false,
            position: "top",
        });
    }

    const determineLanguage = (filename) => {               // Détermine le langage avec l'extension du fichier
        const extension = filename.split('.').pop();
        const foundLanguage = Object.entries(LANGUAGE_VERSIONS).find(([_, value]) => value.extension === `.${extension}`);
        return foundLanguage ? foundLanguage[0] : 'plaintext';
    };


    const handleAddTab = (fileTitle, fileContent, fileID) => {          // Gère l'import des fichiers dans les fichiers du TP
        if (!fileTitle) {
            makeToast("Le nom du fichier ne peut être vide");
            return;
        }
        if (tabs.some(tab => tab.title === fileTitle)) {
            makeToast("Un fichier existe déjà avec ce nom : " + fileTitle);
            return;
        }

        setTabs(prevTabs => [...prevTabs, {
            id: fileID,
            title: fileTitle,
            content: fileContent,
            language: determineLanguage(fileTitle),
            displayed: true
        }]);
    };

    const handleFileImport = (event) => {                               // Importe titre et contenu des fichiers
        const files = Array.from(event.target.files);
        let fileID = tabs[tabs.length - 1].id + 1;
        let index = displayedTabs.length;

        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                handleAddTab(file.name, fileContent, fileID);
                fileID++;;
            };
            index++;
            reader.readAsText(file);
        }
        setTabIndex(index-1);
    };

    return (
        <Box ml={ml} mr={mr} mt={mt}>
            <Tooltip label={"Importer des fichiers au TP"} openDelay={500} hasArrow>
                <Button
                    ref={ref}
                    color={"orange.500"}
                    border={"2px solid"}
                    _hover={{ bg: "orange.900", color: "white", borderColor: "orange.500" }}
                    onClick={() => fileInputRef.current.click()}
                >
                    Importer
                </Button>
            </Tooltip>
            <Input
                type="file"
                ref={fileInputRef}
                display="none"
                onChange={handleFileImport}
                multiple
            />
        </Box>
    );
});

export default ImportFileButton;
