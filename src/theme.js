import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    config: {
        initialColorMode : "dark",
        useSystemColorNode : false,
    },
});
export default theme;