import { ToastContainer } from "react-toastify"
import Router from "./routes/Router"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <>
    <ToastContainer />
      <Router />
    </>
  )
}

export default App
