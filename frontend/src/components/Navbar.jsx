import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../images/cart.svg"
import { getUserFromToken } from "../utils/auth";
const Navbar = () => {
  const navigate = useNavigate();
  const user=getUserFromToken()

  const handleLogout=()=>{
    localStorage.removeItem("CommerceToken")
    navigate("/login")
  }

  return (
    <AppBar position="static" sx={{
    background: "#fff",
    color: "#000",
    borderRadius: 7,
    width: "98%",
    mx: "auto",   // center karega
  }}>
      <Toolbar>

        <img src={logo} alt="" />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/product")}
        >
          Ecomora
        </Typography>

        {/* Menu */}
       <Box display="flex" gap={2}>

  {user.role === "admin" && (
    <>
      <Button>Dashboard</Button>
      <Button>Customers</Button>
      <Button>Analytics</Button>
      <Button>Settings</Button>
    </>
  )}

  {/* Common */}
  <Button>Products</Button>

  {user.role === "user" && (
    <>
      <Button>Cart</Button>
      <Button>Purchases</Button>
    </>
  )}

  <Button onClick={handleLogout}>Logout</Button>

</Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
