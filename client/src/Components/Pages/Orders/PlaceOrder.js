import Navbar from "../../Common/CustomNavbar/Index";
import Footer from "../../Shared/Footer/CustomFooter";
import { Grid } from "@mui/material";

const PlaceOrder = () => {
  return (
    <>
      <Navbar />
      <Grid container spacing={3} padding={8}></Grid>
      <Footer />
    </>
  );
};

export default PlaceOrder;
