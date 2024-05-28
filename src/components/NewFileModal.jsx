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

const NewFileModal = ({ isOpen, onClose, addTab, tabs }) => {

    const toast = useToast();
    const [fileTitle, setFileTitle] = useState('');

    const isError = fileTitle === '';

    const determineLanguage = (filename) => {               // Détermine le langage avec l'extension du fichier
        const extension = filename.split('.').pop();
        const foundLanguage = Object.entries(LANGUAGE_VERSIONS).find(([_, value]) => value.extension === `.${extension}`);
        return foundLanguage ? foundLanguage[0] : 'plaintext';
    };

    const handleAddTab = () => {
        const validatedTitle = fileTitle;

        if (!validatedTitle) {
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

        if (tabs.some(tab => tab.title === validatedTitle)) {
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

        const detectedLanguage = determineLanguage(validatedTitle);
        addTab(validatedTitle, null, detectedLanguage);
        handleClose();
    }

    const handleClose = () => {
        setFileTitle('');
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent bg="#333644">
                <ModalHeader>Ajouter un nouveau fichier</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb="2%">

                    <FormControl mb="3%" isInvalid={isError}>
                        <FormLabel>
                            Nom du fichier

                            <Tooltip
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
                            value={fileTitle}
                            onChange={(e) => setFileTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTab()}
                            placeholder="Entrez le nom du fichier"
                            autoFocus
                        />
                        {isError ? (
                            <FormErrorMessage>Nom de fichier requis</FormErrorMessage>
                        ) : null}
                    </FormControl>
                </ModalBody>

                <ModalFooter>

                    <Button colorScheme="blue" mr={3} onClick={handleAddTab}>
                        Ajouter
                    </Button>

                    <Button onClick={handleClose}>Annuler</Button>

                </ModalFooter>
            </ModalContent>

        </Modal>


    );
};

export default NewFileModal;
