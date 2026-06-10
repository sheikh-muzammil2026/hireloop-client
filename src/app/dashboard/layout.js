import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import React from 'react';

export const metadata = {
 title: {
      default: "Dashboard",
      template: "%s | Dashboard",
        },
  description: "A Online jobs finder Platform",
};


const dashboardLayout = ({children}) => {
    return (
        <div className="flex-1">
            <Sidebar/>
            <main className="ml-64 flex-1 min-h-screen bg-[#07070A] text-white p-6">
                
                {children}
                </main>
        </div>
    );
};

export default dashboardLayout;