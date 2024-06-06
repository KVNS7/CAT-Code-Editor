import {
    Box, Flex, HStack,
    Drawer, DrawerBody, DrawerHeader, DrawerContent, DrawerCloseButton,
    Menu, MenuButton, MenuList, MenuItem,
    Switch, Button, Text,
    Divider,
    Kbd
} from "@chakra-ui/react";
import { VS_THEMES } from '../constantes';

const OptionsDrawer = ({ isOpen, onClose, fontSize, setFontSize, theme, setTheme, minimap, setMinimap, onIndentCode, toastNonImplementee }) => {

    const themes = Object.entries(VS_THEMES)                                        // Thèmes de l'IDE

    return (

        <Drawer isOpen={isOpen} placement='right' onClose={onClose} size="sm">
            <DrawerContent bg="#2C3E50">

                <DrawerHeader fontSize="2xl" mx="auto">
                    Paramètres
                </DrawerHeader>

                <Divider mt="-2" mb="4" mx="auto" borderWidth={1} width="60%" />

                <DrawerBody>

                    <Box>
                        <Text mb={2} fontSize='lg'>
                            Indenter le code :
                        </Text>
                        <Button width="49%" onClick={() => onIndentCode('expand')} mr="2%">Allman</Button>
                        <Button width="49%" onClick={() => onIndentCode('collapse')}>K&R</Button>
                    </Box>

                    <Divider my="5" borderWidth={1} />

                    <Box>
                        <Text mb={2} fontSize='lg'>
                            Taille de la police : {fontSize}
                        </Text>
                        <HStack spacing={4}>
                            <Button onClick={() => setFontSize(fontSize - 1)} width="50%"> - </Button>
                            <Button onClick={() => setFontSize(fontSize + 1)} width="50%"> + </Button>
                        </HStack>
                    </Box>

                    <Divider my="5" borderWidth={1} />

                    <Box>
                        <Text mb={2} fontSize='lg'>
                            Thème de l'éditeur :
                        </Text>
                        <Menu placement='bottom' matchWidth={true}>
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

                    <Divider my="5" borderWidth={1} />

                    <Box>
                        <Flex alignItems="center">
                            <Text mb={2} mr="auto" fontSize='lg'>Minimap :</Text>
                            <Switch size="lg" colorScheme="orange" isChecked={minimap} onChange={() => setMinimap(!minimap)} mr="5%" />
                        </Flex>
                    </Box>

                    <Divider my="5" borderWidth={1} />

                    <Box>
                        <Text mb={2} mr="auto" fontSize='lg'>Exporter les fichiers du TP :</Text>
                        <Button width="100%" onClick={toastNonImplementee}> Exporter </Button>
                    </Box>

                    <Divider my="5" borderWidth={1} />

                    <Box fontSize='md'>
                        <Text mb={2} fontSize='lg'>
                            Commandes et raccourcis clavier :
                        </Text>

                        <Text lineHeight="taller">
                            <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>+</Kbd> : augmenter la taille de la police
                            <br />
                            <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>-</Kbd> : diminuer la taille de la police
                            <br />
                            <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>m</Kbd> : activer / désactiver la minimap
                            <br />
                            <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>o</Kbd> : créer un nouveau fichier
                            <br />
                            <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>w</Kbd> : supprimer le fichier actuel
                            <br />
                            <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>s</Kbd> : sauvegarder les fichiers
                            <br />
                            <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>i</Kbd> : importer un fichier
                            <br />
                            <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + <Kbd>c</Kbd> : stopper l'execution dans le terminal
                            <br />
                            <Kbd>Clic droit</Kbd> (sur un onglet) : renommer le fichier


                        </Text>
                    </Box>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default OptionsDrawer;
