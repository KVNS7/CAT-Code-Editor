import { useRef, useState, useEffect } from 'react';
import {
    Box,
    Tooltip,
    Button,
    Input,
    useToast
} from '@chakra-ui/react'
import { LANGUAGE_VERSIONS } from '../constantes';

const ImportFileButton = ({ addTab, tabs }) => {

    const toast = useToast();
    const fileInputRef = useRef(null);                                                  // Ref input fichier

    const determineLanguage = (filename) => {               // Détermine le langage avec l'extension du fichier
        const extension = filename.split('.').pop();
        const foundLanguage = Object.entries(LANGUAGE_VERSIONS).find(([_, value]) => value.extension === `.${extension}`);
        return foundLanguage ? foundLanguage[0] : 'plaintext';
    };

    const handleAddTab = (fileTitle, fileContent) => {          // Gère l'import du fichier dans les fichiers du TP

        if (!fileTitle) {
            if (!toast.isActive("toast1")) {
                toast({
                    id: "toast1",
                    title: "Erreur",
                    description: "Le nom du fichier ne peut être vide",
                    status: "error",
                    duration: 1500,
                    isClosable: false,
                    position: "top",
                });
            }
            return;
        }

        if (tabs.some(tab => tab.title === fileTitle)) {
            if (!toast.isActive("toast2")) {
                toast({
                    id: "toast2",
                    title: "Erreur",
                    description: "Un fichier avec ce nom existe déjà.",
                    status: "error",
                    duration: 1500,
                    isClosable: false,
                    position: "top",
                });
            }
            return;
        }

        const detectedLanguage = determineLanguage(fileTitle);
        addTab(fileTitle, fileContent, detectedLanguage);
    }

    const handleFileImport = async (event) => {     // Importe le titre et le contenu du fichier
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                handleAddTab(file.name, fileContent);
            }
            reader.readAsText(file);
        }
    };


    return (
        <Box ml="2%" mt={5} mr="2%">
            <Tooltip label={"Importer un fichier ou un dossier(zip) au TP"} openDelay={500} hasArrow>
                <Button
                    color={"orange.500"}
                    border={"2px solid"}
                    _hover={{ bg: "orange.200" }}
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
            />
        </Box>
    );
};

export default ImportFileButton;