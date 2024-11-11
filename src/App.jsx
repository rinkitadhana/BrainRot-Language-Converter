import Header from "./components/Header"
import Top from "./components/Top"
import Screen from "./Layout/Screen"
import Content from "./components/Content"

const App = () => {
  return (
    <Screen>
      <Top />
      <Header />
      <Content />
    </Screen>
  )
}

export default App
