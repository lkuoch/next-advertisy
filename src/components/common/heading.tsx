import Typography from "@mui/material/Typography";

interface Props {
  text: string;
}

const Heading = ({ text }: Props) => {
  return (
    <Typography variant="h6" component="div" gutterBottom sx={{ textDecoration: "underline" }}>
      {text}
    </Typography>
  );
};

export default Heading;
