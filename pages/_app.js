import Navbar from '@/components/Navbar';
import '../styles/globals.css'; 
import { ThemeProvider } from '@/context/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
  <>
    <ThemeProvider>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
  )
}
