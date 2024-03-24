import React, {ReactNode} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({children}) => (
  <>
    <Header/>
    {children}
    <Footer/>
  </>
);

export default DefaultLayout;
