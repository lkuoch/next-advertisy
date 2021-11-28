import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "6.5%" }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
