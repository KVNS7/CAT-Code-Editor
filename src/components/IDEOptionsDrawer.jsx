import React from 'react';
import {
  Box, Button, Text, Flex, Drawer, DrawerBody, DrawerHeader, DrawerContent, DrawerCloseButton,
  Divider, Menu, MenuButton, MenuList, MenuItem, Switch, HStack, Kbd, 
} from "@chakra-ui/react";
import { VS_THEMES } from '../constantes';


const IDEOptionsDrawer = ({ isOpen, onClose, fontSize, setFontSize, theme, setTheme, minimap, setMinimap }) => {
  
  const themes = Object.entries(VS_THEMES)                                        // Thèmes de l'IDE

  return (

    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size="sm">
      <DrawerContent bg="#333644">
        <DrawerCloseButton />

        <DrawerHeader>
          Paramètres de l'IDE
        </DrawerHeader>

        <DrawerBody>
          <Box>
            <Text mb={2} fontSize='lg'>
              Taille de la police: {fontSize}
            </Text>
            <HStack spacing={4}>
              <Button onClick={() => setFontSize(fontSize - 1)} width="50%"> - </Button>
              <Button onClick={() => setFontSize(fontSize + 1)} width="50%"> + </Button>
            </HStack>
          </Box>

          <Divider my="4" borderWidth={1} />

          <Box>
            <Text mb={2} fontSize='lg'>
              Thème de l'éditeur:
            </Text>
            <Menu placement='bottom' matchWidth ={true}>
              <MenuButton as={Button} width="100%">
                {themes.find(([_, code]) => code === theme)[0]}
              </MenuButton>
              <MenuList>
                {themes.map(([nom, code]) => (
                  <MenuItem
                    key={nom}
                    color={code === theme ? "blue.600" : ""}
                    background={code === theme ? "gray.800" : ""}
                    _hover={{ color: "blue.600", background: "gray.900" }}
                    onClick={() => setTheme(code)}
                  >
                    {nom}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>

          <Divider my="4" borderWidth={1} />

          <Box>
            <Flex alignItems="center">
              <Text mb={2} mr="auto" fontSize='lg'>Minimap:</Text>
              <Switch size="lg" colorScheme="orange" isChecked={minimap} onChange={() => setMinimap(!minimap)} mr="5%" />
            </Flex>
          </Box>
          <Divider my = "4" borderWidth = {1}/>

          <Box>
            <Text mb = {2} fontSize = 'lg'>     
              Raccourcis clavier : 
            </Text>

            <Text mb={2}>
              <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>+</Kbd> : augmenter la taille de la police
            </Text>

            <Text mb={2}>
              <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>-</Kbd> : diminuer la taille de la police
            </Text>

            <Text mb={2}>
              <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>m</Kbd> : activer / désactiver la minimap
            </Text>

            <Text mb={2}>
              <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>s</Kbd> : sauvegarder les fichiers 
            </Text>

            <Text mb={2}>
              <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>m</Kbd> : importer un fichier / dossier
            </Text>

            <Text mb={2}>
              <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>c</Kbd> : stopper l'execution en cours dans le terminal
            </Text>
          </Box>

        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default IDEOptionsDrawer;
