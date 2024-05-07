import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  ModalFooter, Button, FormControl, FormLabel, Input
} from "@chakra-ui/react";
import LanguageSelector from "./LanguageSelector"; // Assurez-vous que le chemin est correct

const NewTabModal = ({ isOpen, onClose, addTab, newTabInfo, setNewTabInfo }) => {
  return (
    <Modal isOpen = {isOpen} onClose = {onClose}>
      <ModalOverlay />
      <ModalContent bg="#333644">
        <ModalHeader>Ajouter un nouvel onglet</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="2%">

          <FormControl mb="3%">
            <FormLabel>Titre du fichier</FormLabel>
            <Input
              value = {newTabInfo.title}
              onChange = {(e) => setNewTabInfo({ ...newTabInfo, title: e.target.value })}
              placeholder="Entrez le titre du fichier"
              autoFocus
            />
          </FormControl>

          <LanguageSelector
            language = {newTabInfo.language}
            onSelectLanguage = {(language) => setNewTabInfo({ ...newTabInfo, language })}
          />

        </ModalBody>

        <ModalFooter>
          <Button colorScheme = "blue" mr={3} onClick={addTab}>
            Ajouter
          </Button>
          <Button onClick = {() => onClose()}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewTabModal;
