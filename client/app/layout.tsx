import "@mantine/core/styles.css";
import React from "react";
import {MantineProvider, ColorSchemeScript} from "@mantine/core";
import {theme} from "../theme";
import "./global.css";

export const metadata = {
    title: "StockTrack - Finance Tracker",
    description: "Stock Tracking App",
};

export default function RootLayout({children}: { children: any }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <ColorSchemeScript/>
            <link rel="shortcut icon" href="/favicon.svg"/>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <title>FINAN</title>
        </head>
        <body className="antialiased">
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
        </body>
        </html>
    );
}
