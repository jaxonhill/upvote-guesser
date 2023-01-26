import '@/styles/globals.css'
import Layout from "@/components/Layout"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

export default function App({ Component, pageProps }) {
  const [userScore, setUserScore] = useState(0);

  return (
    <Layout userScore={userScore} setUserScore={setUserScore}>
      <Component {...pageProps} userScore={userScore} setUserScore={setUserScore} />
    </Layout >
  )
}
