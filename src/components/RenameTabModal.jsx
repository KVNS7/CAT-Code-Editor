import { useEffect, useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
    FormControl, FormLabel, FormErrorMessage,
    Input,
    Button,
    Tooltip,
    Box,
    useToast
} from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';
import { LANGUAGE_VERSIONS } from '../constantes';

const RenameTabModal = ({ isOpen, onClose, displayedTabs, tabs, tabIndex, renameTab }) => {

    const [newTitle, setNewTitle] = useState("");
    const [newLanguage, setNewLanguage] = useState("");
    const toast = useToast();

    const isError = newTitle === '';

    useEffect(() => {
        if (isOpen) {
            setNewTitle(displayedTabs[tabIndex].title);                  // Met à jour newTitle quand le modal est ouvert
        }
    }, [isOpen, displayedTabs, tabIndex]);

    useEffect(() => {
        if (newTitle) {                                         // à chaque saisie de nom, verifie le language et le modifie
            const detectedLanguage = determineLanguage(newTitle);

            if (detectedLanguage) {
                setNewLanguage(detectedLanguage);
            }
        }
    }, [newTitle]);

    // Fonction pour déterminer le langage basé sur l'extension du fichier
    const determineLanguage = (filename) => {
        const extension = filename.split('.').pop();              // Coupe le nom et garde la partie après le point
        const foundLanguage = Object.entries(LANGUAGE_VERSIONS).find(([_, value]) => value.extension === `.${extension}`); // Compare aux langages enregistrés
        return foundLanguage ? foundLanguage[0] : 'plaintext';    // Retourne le langage si trouvé, plaintext sinon (texte brut)
    };

    const validateTitle = (title) => {                            // Fonction validant le format du nom
        if (!title.includes('.')) {                                 // Si nom sans '.', rajout .txt a la fin
            title += '.txt';
        }

        const [name, extension] = title.split('.');                 // Separe en 2 partie (avant et après le '.')
        if (!name) {                                                // Si pas de nom avant le '.', retourne faux
            return false;
        }

        return title;
    }

    const handleRenameTab = () => {
        const validatedTitle = validateTitle(newTitle);

        if (!validatedTitle) {                                      // Si validateTitle retourne faux, toast d'erreur
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

        if (tabs.some(tab => tab.title === validatedTitle)) {         // Si nom déja existant, toast d'erreur
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
        renameTab(validatedTitle, newLanguage);                                     // Sinon ajoute le fichier
        onClose();
    }

    return (

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#333644">
                <ModalHeader>Renommer le fichier</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <FormControl isInvalid={isError}>
                        <FormLabel>
                            Nom du fichier

                            <Tooltip                                    // Infobulle des langages supportés
                                label={
                                    <Box whiteSpace="pre">
                                        Langages supportés :{"\n"}
                                        - C{"\n"}
                                        - Java{"\n"}
                                        - Python{"\n"}
                                        - Php{"\n"}
                                        - C#{"\n"}
                                        - TypeScript

                                    </Box>
                                }
                                aria-label="Langages supportés"
                                hasArrow
                            >
                                <InfoIcon ml={1} mb={0.5} />
                            </Tooltip>

                        </FormLabel>

                        <Input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleRenameTab()}
                            placeholder="Entrez le nom du fichier"
                            autoFocus
                        />
                        {isError ? (
                            <FormErrorMessage>Nom de fichier requis</FormErrorMessage>
                        ) : null}

                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleRenameTab}>
                        Valider
                    </Button>

                    <Button onClick={onClose}>Annuler</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
};

export default RenameTabModal;