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
    const extension = filename.split('.').pop();              // Coupe le titre et garde la partie après le point
    const foundLanguage = Object.entries(LANGUAGE_VERSIONS).find(([_, value]) => value.extension === `.${extension}`); // Compare aux langages enregistrés
    return foundLanguage ? foundLanguage[0] : 'plaintext';    // Retourne le langage si trouvé, plaintext sinon (texte brut)
  };

  // Effet pour mettre à jour le langage lorsque le titre change
  useEffect(() => {
    if (newTabInfo.title) {                           // A chaque saisie du titre, verifie le langage et le modifie
      const detectedLanguage = determineLanguage(newTabInfo.title);

      if (detectedLanguage) {
        setNewTabInfo(prev => ({ ...prev, language: detectedLanguage }));
      }
    }
  }, [newTabInfo.title, setNewTabInfo]);

  const validateAndFormatTitle = (title) => {                   // Fonction validant le format du titre
    if (!title.includes('.')) {                                 // Si titre sans '.', rajout .txt a la fin
      title += '.txt';
    }

    const [name, extension] = title.split('.');                 // Separe en 2 partie (avant et après le '.')
    if (!name) {                                                // Si pas de nom avant le '.', retourne faux
      return false;
    }
    
    return title;
  }

  const handleAddTab = () => {
    const validatedTitle = validateAndFormatTitle(newTabInfo.title);
    
    if (!validatedTitle) {                                      // Si validateAndFormatTitle retourne faux, toast d'erreur
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

    if(tabs.some(tab => tab.title === validatedTitle)){         // Si titre déja existant, toast d'erreur
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
    addTab(validatedTitle);                                     // Sinon ajoute le fichier
    handleClose();
  }

  const handleClose = () => {                                   // Lors de la fermeture
    setNewTabInfo({title: ""});                                 // Remet le titre a zéro
    onClose();                                                  // Ferme le modal
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

          <Button onClick={handleClose}>Annuler</Button>

        </ModalFooter>
      </ModalContent>

    </Modal>


  );
};

export default NewTabModal;
