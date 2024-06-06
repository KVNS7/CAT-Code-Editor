import {
    Button, Text, Box,
    AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay
} from "@chakra-ui/react";

const TabDeleteDialog = ({ isOpen, onClose, removeTab, cancelRef, selectedTabs }) => {
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Supprimer le(s) fichier(s)
                    </AlertDialogHeader>

                    <AlertDialogBody>
                            Supprimer{" "}
                            <Text as="span" fontWeight="bold" textDecoration="underline" color="red.500">
                                définitivement 
                            </Text>
                            {" "}les fichiers suivants ? :
                        

                        <ul style={{ marginLeft: '10%', marginTop: '2%' }}>
                            {selectedTabs.map((tab, index) => (
                                <li key={`${tab.id}-${index}`}>{tab.title}</li>
                            ))}
                        </ul>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Annuler
                        </Button>
                        <Button colorScheme='red' onClick={removeTab} ml={3}>
                            Supprimer
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}

export default TabDeleteDialog;
