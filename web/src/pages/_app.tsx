import { Inter } from "next/font/google";
import { AppProps } from "next/app";
import Head from "next/head";
import "../app/globals.css";
import { ToastContainer } from "react-toastify";
 

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Automify</title>
            </Head>
            <main className={inter.className}>
                <Component {...pageProps} />
                <ToastContainer />
            </main>
        </>
    )
}
