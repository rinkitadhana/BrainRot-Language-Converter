import Header from "./components/Header"
import Top from "./components/Top"
import Screen from "./Layout/Screen"
import Content from "./components/Content"
import Footer from "./components/Footer"

const App = () => {
  return (
    <Screen>
      <Top />
      <Header />
      <Content />
      <Footer />
    </Screen>
  )
}

export default App
