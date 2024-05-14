import {
    Button,
    AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay
} from "@chakra-ui/react";


const TabDeleteDialog = ({ isOpen, onClose, onDelete, cancelRef, tabName }) => {
    return (

        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}         // place le focus sur le bouton "le moins destructeur"
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>

                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Supprimer l'onglet
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Êtes-vous sûr de vouloir supprimer le fichier "{tabName}" ?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Annuler
                        </Button>
                        <Button colorScheme='red' onClick={onDelete} ml={3}>
                            Supprimer
                        </Button>
                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>

    );
}

export default TabDeleteDialog;