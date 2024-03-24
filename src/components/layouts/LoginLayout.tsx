import React, {ReactNode} from 'react';
import Footer from "../Footer/Footer";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({children}) => (
  <>
    {children}
    <Footer/>
  </>
);

export default LoginLayout;
