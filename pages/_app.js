import '@/styles/globals.css'
import Layout from "@/components/Layout"
import { useState } from "react"

export default function App({ Component, pageProps }) {
  const [userScore, setUserScore] = useState(0);

  return (
    <Layout userScore={userScore}>
      <Component {...pageProps} userScore={userScore} setUserScore={setUserScore} />
    </Layout>
  )
}
