'use client';

import { Menu } from 'lucide-react';
import React from 'react'

const Sidebar = () => {
  return (
    <div>
        {/* LOGOS */}
        <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
            <div>Logo</div>
            <h1 className="font-extrabold text-2xl">Sitio</h1>
            <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" onClick={() => {}}>
                <Menu className="w-4 h-4" />
            </button>
        </div>
        {/* MENUS */}
        <div className="flex-grow mt-8">
            {/* LINKS */}
        </div>

        {/* FOOTER */}
        <div>
            <p className="text-center text-xs text-gray-500">&copy; 2024 Datadoor</p>
        </div>
    </div>
  )
}

export default Sidebar;