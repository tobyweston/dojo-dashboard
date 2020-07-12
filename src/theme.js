import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: '#364252',
            paper: '#364252'
        },
    },
    overrides: {
        MuiAvatar: {
            root: {
                height: 25,
                width: 25,
            }
        },
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#364252'
            }
        }
    }
});

export default theme;