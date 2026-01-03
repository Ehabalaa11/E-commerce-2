import { BrowserRouter, Route, Routes } from "react-router"
import Default from "./layout/Default"
import Home from "./pages/Home"
import Add from "./pages/Add"
import ProductDetails from "./pages/ProductDetails"
import UserProfile from "./pages/UserProfile"
import Error from "./pages/Error"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Default/>}>
      <Route index element={<Home/>}/>
      <Route path="/products/new" element={<Add/>}/>
      <Route path="/products/:id" element={<ProductDetails/>}/>
      <Route path="/profile" element={<UserProfile/>}/>
      </Route>
      <Route path="*" element = {<Error/>}/>
      <Route path="/auth/login" element= {<Login/>} />
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
