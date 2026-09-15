import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/user/Sidebar'

function RootLayout() {
     return (
        <div className="min-h-screen bg-[#08080a]">
            <Sidebar />

            <main className="lg:ml-[270px] min-h-screen pt-16 lg:pt-0">
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout
