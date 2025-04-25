'use client';
import { AppContextProvider } from "@/context/AppContext";

const SignINLayout = ({children}) => {
    return <>
        <AppContextProvider>
    {children}
    </AppContextProvider>
    </>
   }
   export default SignINLayout;