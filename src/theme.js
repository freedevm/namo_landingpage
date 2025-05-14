// Import from theme package instead
import { extendTheme } from "@chakra-ui/theme-utils";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7c948",
      900: "#1a202c",
    },
  },
});

export default theme;