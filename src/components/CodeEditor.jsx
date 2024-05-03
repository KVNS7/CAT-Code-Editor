import { useRef, useState } from "react";
import { Box, HStack, Button, Text, Flex, useToast } from "@chakra-ui/react"
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constantes";
import Output from "./Output";

// TODO : onglets pour avoir plusieurs fichiers
// TODO : bouton sauvegarder fonctionnel
// TODO : bouton importer fonctionnel

const CodeEditor = () => {

    const toast = useToast();
    const editorRef = useRef();
    const [value, setValue] = useState('');         // Valeur (lignes de code) dans l'éditeur
    const [language, setLanguage] = useState("c")   // Pour changer le langage (C par défaut)
    const [fontSize, setFontSize] = useState(14)    // Etat taille de la police (12 par défaut)

    const onMount = (editor) => {                   // Fonction mettant le focus sur l'éditeur quand on arrive sur la page
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language) => {                // Fonction changeant le language de programmation de l'éditeur
        setLanguage(language);
        setValue(CODE_SNIPPETS[language])           // Ajoute l'exemple de code associé au langage selectionné dans l'IDE
    }

    const increaseFontSize = () => fontSize < 30 && setFontSize(fontSize + 1);  // Augmente la taille de la police (si < 30)
    const decreaseFontSize = () => fontSize > 8 && setFontSize(fontSize - 1);   // Diminue la taille de la police (si > 8)

    const toastNonImplementee = () => {
        toast({                                                             
            title: "Non implémenté",
            description: "Cette fonction n'a pas encore été ajoutée",
            status: "error",
            duration: 5000,
            variant: "left-accent",
            position: "bottom-right",
        })
    }


  return (
      <Box>
        <HStack spacing={4}>
            <Box w='65%'>

                {/* Flex contenant les différents boutons */}
                <Flex alignItems = "center">
                    {/* Menu permettant de changer le langage utilisé */}
                    <LanguageSelector language={language} onSelect={onSelect}/>
                
                    {/* Boutons pour changer la taille de la police */}
                    <Box mr = "auto" ml = "2%" mb = {4}>

                        <Text mb = {2} fontSize = 'lg'>     
                            Police : 
                        </Text>
                        
                        <HStack spacing = {2}>
                            <Button onClick={increaseFontSize}> + </Button>
                            <Button onClick={decreaseFontSize}> - </Button>
                        </HStack>
                    </Box>

                    {/* Bouton permettant de sauvegarder le/les fichiers */}
                    <Box ml = "auto" mt = {5}>

                        <Button 
                            color = {"green.500"}
                            border = {"2px solid"} 
                            _hover = {{bg :"green.700"}} 
                            onClick = {toastNonImplementee}
                        >
                            Sauvegarder
                        </Button>
                        
                    </Box>

                    {/* Bouton permettant d'importer un/des fichiers */}
                    <Box ml = "2%" mt = {5}>
                        <Button
                            color = {"orange.500"}
                            border = {"2px solid"}
                            _hover = {{bg :"orange.700"}}
                            onClick = {toastNonImplementee}
                        >
                            Importer
                        </Button>
                    </Box>
                </Flex>


                {/* Fenêtre de l'éditeur */}
                <Editor 
                    height = "75vh" 
                    theme = "vs-dark"
                    language = {language}   // Met le langage par défaut choisi ligne 12
                    defaultValue = {CODE_SNIPPETS[language]} // Exemple de code associé au langage
                    onMount = {onMount}     // Fonction pour le focus du curseur
                    value = {value}
                    onChange = {(value) => setValue(value)}
                    options = {{ fontSize: fontSize }}  // Applique la taille de la police à l'éditeur
                />

            </Box>

            

            <Output editorRef = {editorRef} language = {language}/>     {/* Fenêtre résultat d'exécution du code*/}
        </HStack>

    
    </Box>
  );
};

export default CodeEditor
