import React, { useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  FormControl, FormLabel,
  Input,
  Button,
  Tooltip,
  Box,
  useToast
} from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';
import { LANGUAGE_VERSIONS } from '../constantes';

const NewTabModal = ({ isOpen, onClose, addTab, newTabInfo, setNewTabInfo, tabs }) => {

  const toast = useToast();

  // Fonction pour déterminer le langage basé sur l'extension du fichier
  const determineLanguage = (filename) => {
    const extension = filename.split('.').pop();
    const foundLanguage = Object.entries(LANGUAGE_VERSIONS).find(([_, value]) => value.extension === `.${extension}`);
    return foundLanguage ? foundLanguage[0] : 'plaintext';
  };

  // Effet pour mettre à jour le langage lorsque le titre change
  useEffect(() => {
    if (newTabInfo.title) {
      const detectedLanguage = determineLanguage(newTabInfo.title);

      if (detectedLanguage) {
        setNewTabInfo(prev => ({ ...prev, language: detectedLanguage }));
      }
    }
  }, [newTabInfo.title, setNewTabInfo]);

  const handleAddTab = () => {
    if(tabs.some(tab => tab.title === newTabInfo.title)){
      if (!toast.isActive("toast")) {
        toast({
          id: "toast",
          title: "Erreur",
          description: "Un fichier avec ce nom existe déjà.",
          status: "error",
          duration: 1500,
          isClosable: false,
          position: "top",
        });
      }
    } else {
      addTab();
    }
  }

  const handleClose = () => {
    setNewTabInfo({title: ""});
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#333644">
        <ModalHeader>Ajouter un nouveau fichier</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="2%">

          <FormControl mb="3%">
            <FormLabel>
              Titre du fichier
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
              value={newTabInfo.title}
              onChange={(e) => setNewTabInfo({ title: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTab()}
              placeholder="Entrez le titre du fichier"
              autoFocus
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>

          <Button colorScheme="blue" mr={3} onClick={handleAddTab}>
            Ajouter
          </Button>

          <Button onClick={() => handleClose()}>Annuler</Button>

        </ModalFooter>
      </ModalContent>

    </Modal>


  );
};

export default NewTabModal;
