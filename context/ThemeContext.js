import {createContext , useState , useContext , useEffect} from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    
    const storedTheme = typeof window !== "undefined" ? localStorage.getItem('darkMode') === 'true' : false;
    const [darkMode,setDarkMode] = useState(storedTheme)
    useEffect(()=>{
        if (darkMode){
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

    }, [darkMode])

    const toggleTheme = () => setDarkMode(prev => !prev)
    return (
        <ThemeContext.Provider value = {{darkMode,toggleTheme}}>
            {children}
            </ThemeContext.Provider>
    )

}

export const useTheme = () => useContext(ThemeContext)

