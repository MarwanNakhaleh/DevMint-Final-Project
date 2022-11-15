import { Typography, Toolbar, Box, AppBar } from "@mui/material";
import { MenuBook } from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledToolBar = styled(({ className, ...other }) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar
        style={{
          height: "10vh",
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          backgroundColor: "white",
        }}
        {...other}
      />
    </AppBar>
  </Box>
))``;

const StyledLink = styled(({ className, ...other }) => (
  <Typography variant="h6" styles={{ color: "#333" }} {...other} />
))`
  color: "#333";
`;

const StyledLogo = styled(({ className, ...other }) => (
  <Typography
    variant="h6"
    style={{ color: "#333", cursor: "pointer" }}
    {...other}
  />
))``;

const StyledMenuIcon = styled(({ className, ...other }) => (
  <MenuBook classes={{ tooltip: className }} {...other} />
))`
    color: 'blue',
    cursor: 'pointer',
    `;

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
`;

const Form = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-bottom: 48px;
`;

const Dropdown = styled.select`
  padding: 16px;
  width: 100%;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 16px;
    width: 100%;
  }
`;

const Input = styled.input`
  padding: 16px;
  width: 100%;
`;

const Button = styled.button`
  background-color: turquoise;
  border-radius: 3px;
  padding: 16px;
`;

export {
  StyledToolBar,
  StyledLink,
  StyledLogo,
  StyledMenuIcon,
  FormContainer,
  Form,
  Input,
  Button,
  Dropdown,
};
