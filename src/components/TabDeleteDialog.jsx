import {
    Button,
    AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay
} from "@chakra-ui/react";


const TabDeleteDialog = ({ isOpen, onClose, onDelete, cancelRef, tabName }) => {
    return (

        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>

                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Supprimer le fichier
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Supprimmer <b><u>définitivement</u></b> le fichier {tabName} ?
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