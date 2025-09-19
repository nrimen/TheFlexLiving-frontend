'use client'

import Sidebar from "./components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full">
            <div className="flex-shrink-0 ">

                <Sidebar />
            </div>

            <div className="flex-1 flex ">
                {children}
            </div>
        </div>
    );
}
