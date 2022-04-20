import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#374955",
      light: '#bee2f3',
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",  
    },
    secondary: {
      main: "#ff1654",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      light: '#f8324526'
    },
  },
  shape: {
    borderRadius: 25,
  },
  
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  },

  overrides: {
    MuiTableRow: {
        root: {
            "&:last-child td": {
                borderBottom: 0,
            },
        }
    }
  },
  overrides: {
    MuiOutlinedInput: {
        input: {
          padding:"9px 14px"
        }
    }
  },
  // overrides: {
  //   MuiPopover:{
  //     paper:{
  //       marginTop:"40px"
  //     }
  //   }
  // }
  // overrides: {
  //   MuiInputBase: {
  //       input: {
  //         height:"0.2em"
  //       }
  //   }
  // },
  // overrides: {
  //   MuiSelect:{
  //     select: {
  //       height:"0.2em"
  //     }
  //     }
  // }
  // scroll:{
  //   '&::-webkit-scrollbar': {
  //     width: '10px'
  //   },
  //     /* Track */
  //   '&::-webkit-scrollbar-track' :{
  //     background: '#f1f1f1',
  //     boxShadow: 'inset 0 0 8px f1f1f1',
  //     borderRadius: '100px',
  //     margin: '60px',
  //   },
    
  //   /* Handle */
  //   '&::-webkit-scrollbar-thumb' :{
  //     background: '#247ba0',
  //     borderRadius: '100px',
  //     backgroundClip: 'padding-box',
  //     height: '3px',
  //     paddingLeft: '100px',
  //   },
    
  //   /* Handle on hover */
  //   '&::-webkit-scrollbar-thumb:hover' :{
  //     background: '#1e6685',
  //     height: '3px',
    
  //     /* background: #ff1654; */
  //   },
    

  // }
  

});

export default theme;
