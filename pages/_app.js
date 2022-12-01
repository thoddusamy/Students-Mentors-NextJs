import Drawer from '../Components/Drawer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Drawer>
      <Component {...pageProps} />
    </Drawer>
  )
}

export default MyApp
