'use client'

import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MobileSidebar from './MobileSidebar'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <MobileSidebar open={open} setOpen={setOpen} />
            <div className="flex flex-col flex-1">
                <Navbar onMenu={() => setOpen(true)} />
                <main className="p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
