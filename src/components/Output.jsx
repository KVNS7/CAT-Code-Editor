import {
    Box, Flex,
    Text, Button,
    useToast
} from "@chakra-ui/react"
import { executeCode } from "../api";
import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constantes";

const Output = ({ content, language }) => {

    const toast = useToast();                                                   // Notification en cas d'erreur
    const [output, setOutput] = useState(null)                                  // Stocke le résultat d'exécution
    const [isLoading, setIsLoading] = useState(false)                           // Etat de chargement
    const [isError, setIsError] = useState(false)                               // Etat en cas d'erreur

    const runCode = async () => {
        const supportedLanguages = Object.keys(LANGUAGE_VERSIONS);              // Récupère les langages pris en charge

        if (!supportedLanguages.includes(language)) {                           // Si langage du fichier non reconnu, return
            toast({
                title: "Language non reconnu",
                description: "Aucun langage reconnu pour ce fichier",
                status: "error",
                duration: 5000,
                variant: "left-accent",
                position: "bottom-right",

            })
            return;
        }

        const sourceCode = content;                                             // Récupère le code depuis l'éditeur
        if (!sourceCode) return;                                                // Si vide, return
        try {
            setIsLoading(true)                                                  // Début animation chargement
            const { run: resultat } = await executeCode(language, sourceCode);  // Execution du code selon le langage choisi et stocke le resultat run dans resultat
            setOutput(resultat.output.split("\n"));                             // Met le résultat dans output pour l'affichage
            resultat.stderr ? setIsError(true) : setIsError(false);             // Indique si une erreur est survenue en vérifiant la sortie d'erreur
        } catch (error) {
            console.log(error);                                                 // Affiche l'erreur dans les logs
            toast({                                                             // Notification en cas d'erreur
                title: "Une erreur est survenue au niveau de l'API Piston",
                description: error.message || "Impossible d'exécuter le code",
                status: "error",
                duration: 5000,
                variant: "left-accent",
                position: "bottom-right",
            })
        } finally {
            setIsLoading(false);                                                // Fin animation chargement
        }

    }

    return (
        <Box w="35%">

            <Flex alignItems="center" >
                <Box ml="auto">
                    {/* Bouton d'exécution */}
                    <Button variant='outline' colorScheme="green" mb={2} isLoading={isLoading} onClick={runCode}>
                        Exécuter
                    </Button>
                </Box>
            </Flex>


            <Box
                height="75vh"
                p={2}
                color={isError ? "red.400" : ""}
                border="1px solid"
                borderRadius={4}
                borderColor={isError ? "red.500" : "#333"}
                mt={12}
                overflowY="auto"
                maxHeight="75vh"
            >
                {output ?
                    output.map((line, i) => <Text key={i}>{line}</Text>)             // Affiche le résultat d'exécution ligne par ligne
                    : 'Cliquez sur exécuter pour voir le résultat de votre code'}   {/* Message par défaut */}
            </Box>
        </Box>
    );
};

export default Output