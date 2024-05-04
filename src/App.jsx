import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";

const BG_ORIGINAL = "#0f0a19"
const BG_GRIS_FONCE = "#121212"
const BG_BLEU_CHARBON = "#1E1E2E"
const BG_GRIS_ARDOISE = "#2C3E50"
const BG_ANTHRA = "#333644"
const BG_NOIR_EBENE = "#0D0D0D"


function App() {
  return  <Box minH = "100vh" bg = {BG_NOIR_EBENE} color = "gray.500" px = {6} py = {8}>
            <CodeEditor/>   {/* Voir CodeEditos.jsx */}
          </Box>

}

export default App
