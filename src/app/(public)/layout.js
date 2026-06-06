import Providers from '@/components/providers/Providers';
import Footer from '@/components/shared/footer/footer';
import Navbar from '@/components/shared/navbar/navbar';
import React from 'react';

const PublicLayout = ({children}) => {
    return (
        <>
        <Providers>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </Providers>
        </>
    );
};

export default PublicLayout;