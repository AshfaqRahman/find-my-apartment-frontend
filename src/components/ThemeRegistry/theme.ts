import { Noto_Sans, Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({subsets: ['latin']});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: notoSans.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;