import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Logo from "../../assets/images/helpxLogo.png";
import IELogo from "../../assets/images/IE.png";
import Outlook from "../../assets/images/outlook.png";
import Gmail from "../../assets/images/gmail.png";
import Button from "@mui/material/Button";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundImage:
    "url(" +
    "https://d3da1k6uo8tbjf.cloudfront.net/78cc7d3e-5430-11ec-b9d6-ecf4bbd72d92?response-content-disposition=inline%3B%20filename%3D%22SSO%20sign%20in%20page%20V.04%20opt%20onee.png%22%3B%20filename%2A%3DUTF-8%27%27SSO%2520sign%2520in%2520page%2520V.04%2520opt%2520onee.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS5PME4CT5QW2PJJU%2F20211203%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20211203T134954Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=cc2c1880aabe8dc1b94ed8297654f731b38cb1f4412c552c5027dca6674f9f6b&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kM2RhMWs2dW84dGJqZi5jbG91ZGZyb250Lm5ldC83OGNjN2QzZS01NDMwLTExZWMtYjlkNi1lY2Y0YmJkNzJkOTI~cmVzcG9uc2UtY29udGVudC1kaXNwb3NpdGlvbj1pbmxpbmUlM0IlMjBmaWxlbmFtZSUzRCUyMlNTTyUyMHNpZ24lMjBpbiUyMHBhZ2UlMjBWLjA0JTIwb3B0JTIwb25lZS5wbmclMjIlM0IlMjBmaWxlbmFtZSUyQSUzRFVURi04JTI3JTI3U1NPJTI1MjBzaWduJTI1MjBpbiUyNTIwcGFnZSUyNTIwVi4wNCUyNTIwb3B0JTI1MjBvbmVlLnBuZ1x1MDAyNnJlc3BvbnNlLWNvbnRlbnQtdHlwZT1pbWFnZSUyRnBuZ1x1MDAyNlgtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2XHUwMDI2WC1BbXotQ3JlZGVudGlhbD1BS0lBUzVQTUU0Q1Q1UVcyUEpKVSUyRjIwMjExMjAzJTJGdXMtZWFzdC0yJTJGczMlMkZhd3M0X3JlcXVlc3RcdTAwMjZYLUFtei1EYXRlPTIwMjExMjAzVDEzNDk1NFpcdTAwMjZYLUFtei1FeHBpcmVzPTg2NDAwXHUwMDI2WC1BbXotU2lnbmVkSGVhZGVycz1ob3N0XHUwMDI2WC1BbXotU2lnbmF0dXJlPWNjMmMxODgwYWFiZThkYzFiOTRlZDgyOTc2NTRmNzMxYjM4Y2IxZjQ0MTJjNTUyYzUwMjdkY2E2Njc0ZjlmNmIiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2Mzg2MjU3OTR9fX1dfQ__&Signature=GRyqNIDK9jBceb3ZCJS8TLpft4X~4cvDA--CQF0wRq-CkDI6tj933IVqaA~7CDxl0Doc13eDCK44npDfzlbd3j2VaquAtrQB4MSrwv1s5uk47sIGDWdJyy~NLAG69g6aUu~asq-yYAc8QmTFqixjLs-CA-l7p-kVhcZx0mPe3anYUcGSBhC5LklFrsvaDpUtQVpoXui3vOnAbdgbdNXvlkWdf9f3QVLUDac~kBIVpU6IM2eeujoj6g4lwyl6nbyLHW7uDJhVzzK80Jr1EiNytY7~kLw5hIIFaSVlht9RzLQJ0VH5jY76wYhOU3cvYpPFSCmiePcp17dU2mCpayiusw__&Key-Pair-Id=K2BMZZDBFKKL41" +
    ")",
  justifyContent: "center"
}));

export default function BasicGrid() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Item>
          <Paper
            elevation={0}
            sx={{
              justifyContent: "center",
              display: "inline-flex",
              width: 350,
              height: 456,
              marginTop: "100px",
              marginBottom: "60px",
              borderRadius: "20px"
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{
                color: "#247ba0",
                font: "Arial"
              }}
            >
              <Grid
                sx={{
                  justifyItems: "center",
                  display: "grid",
                  gridColumn: "span 1",
                  marginTop: "40px"
                }}
              >
                <img
                  width="60px" //130
                  height="60px"
                  display="inline-flex"
                  src={IELogo}
                  alt="IELogo"
                />
              </Grid>
              <Grid
                sx={{
                  margindisplay: "grid",
                  gridColumn: "span 1",
                  marginBottom: "30px",
                  marginTop: "15px"
                }}
              >
                <img
                  width="190px" //130
                  height="30px"
                  src={Logo}
                  alt="Help Ex Login Logo"
                />
              </Grid>
              Welcome
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ color: "#b3b3b3", font: "Arial" }}
              >
                Sign in to continue using HELPEX
              </Typography>
              <Stack
                spacing={0}
                direction="row"
                href="https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=http%3A%2F%2Fhttp://localhost:3000%2Fhomev2&response_type=code%20id_token&scope=openid%20profile%20http%3A%2F%2Fhttp%2Fv2%2FHelpExhome.All&response_mode=form_post&nonce=637769782183434056.ZDY5NDQyMWItM2RjNi00MDgxLTg0ZWItZmNiYmY1OGU4MDMyZTM5Zjg0ZjYtNjljYi00ZDVmLTk1YjgtMzc4YWRlYWQ0NTY1&ui_locales=en-US&mkt=en-US&msafed=0&state=tf-azPpvuBlpIBQkdeBu6BamFrlS_Zke71n_StYzuB_iZ0TjIBNhCVj0jQdbCRoIfCQ_sZXaPsSclGo4SrMgCKkuw75a2BgnyYMQaj19t0sbfNfC5VrOkdZv39IMOw9ORRvsFvZQf5s568_bjkVelnUUBJ65v4XFRp_5nnK75iCNIeuwNElH4kFR6Ynqh6cMzDcRBhVi0P9lohw1ctboEEoAuUSpLJQnCwDgu98nsaVMMOSTZf5uOj3Zlcr-ulbE9sm17NwGBzxrUecX9jVK8ss1sD9Ad8YGzqnzYOOU2yXu8jPMpoxMUIU7c6XjEdgb9GKDVXtoXS3YXR5_p4gNmJRkmtxTWJqoK-BBM-zyhA0&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=6.12.1.0&sso_reload=true"
                sx={{
                  marginRight: "90px",
                  marginLeft: "90px",
                  marginTop: "25px"
                }}
              >
                <Button
                  href="https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=http%3A%2F%2Fhttp://localhost:3000%2Fhomev2&response_type=code%20id_token&scope=openid%20profile%20http%3A%2F%2Fhttp%2Fv2%2FHelpExhome.All&response_mode=form_post&nonce=637769782183434056.ZDY5NDQyMWItM2RjNi00MDgxLTg0ZWItZmNiYmY1OGU4MDMyZTM5Zjg0ZjYtNjljYi00ZDVmLTk1YjgtMzc4YWRlYWQ0NTY1&ui_locales=en-US&mkt=en-US&msafed=0&state=tf-azPpvuBlpIBQkdeBu6BamFrlS_Zke71n_StYzuB_iZ0TjIBNhCVj0jQdbCRoIfCQ_sZXaPsSclGo4SrMgCKkuw75a2BgnyYMQaj19t0sbfNfC5VrOkdZv39IMOw9ORRvsFvZQf5s568_bjkVelnUUBJ65v4XFRp_5nnK75iCNIeuwNElH4kFR6Ynqh6cMzDcRBhVi0P9lohw1ctboEEoAuUSpLJQnCwDgu98nsaVMMOSTZf5uOj3Zlcr-ulbE9sm17NwGBzxrUecX9jVK8ss1sD9Ad8YGzqnzYOOU2yXu8jPMpoxMUIU7c6XjEdgb9GKDVXtoXS3YXR5_p4gNmJRkmtxTWJqoK-BBM-zyhA0&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=6.12.1.0&sso_reload=true"
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: "100px", textTransform: "none" }}
                >
                  <img
                    width="8%"
                    hight="8%"
                    src={Outlook}
                    alt="outlook"
                    display="inline-flex"
                    marginLeft="100px"
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{
                      color: "#b3b3b3",
                      font: "Arial",
                      marginLeft: "7%"
                    }}
                  >
                    Sign in with Outlook
                  </Typography>
                </Button>
              </Stack>
              <Stack
                spacing={0}
                direction="row"
                href="https://accounts.google.com/ServiceLogin/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                sx={{
                  marginRight: "90px",
                  marginLeft: "90px",
                  marginTop: "15px"
                }}
              >
                <Button
                  href="https://accounts.google.com/ServiceLogin/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: "100px", textTransform: "none" }}
                >
                  <img
                    width="8%"
                    hight="8%"
                    src={Gmail}
                    alt="outlook"
                    display="inline-flex"
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{
                      color: "#b3b3b3",
                      font: "Arial",
                      marginLeft: "7%"
                    }}
                  >
                    Sign in with Gmail
                  </Typography>
                </Button>
              </Stack>
            </Typography>
          </Paper>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ color: "#f2f2ff", font: "Arial" }}
          >
            Proudely Designed By IE Network Solutions PLC &copy;2021
          </Typography>
        </Item>
      </Grid>
    </Grid>
  );
}
