import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from "react-router-dom"
import HomePage from "./components/Home"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import CreateDrug from "./components/CreateDrug"
import ReadDrug from "./components/ReadDrug"
import TransferDrug from "./components/TransferDrug"
import Manufacturer from "./components/Manufacturer"
import Dva from "./components/Dva"
import ApproveDrug from "./components/ApproveDrug"
import ReadAllDrugs from "./components/ReadAllDrugs"
import Distributor from "./components/Distributor"
import Hospital from "./components/Hospital"
import CreateOrder from "./components/CreateOrder"
import ReadOrder from "./components/ReadOrder"
import QueryAllOrders from "./components/ReadAllOrders"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/'element={<HomePage/>}/>
    <Route path='/login'element={<LoginPage/>}/>
    <Route path="/signup"element={<SignupPage/>}/>
    <Route path="/create"element={<CreateDrug/>}/>
    <Route path="/read"element={<ReadDrug/>}/>
    <Route path="/transfer"element={<TransferDrug/>}/>
    <Route path="/manufacturer"element={<Manufacturer/>}/>
    <Route path="/dva"element={<Dva/>}/>
    <Route path="/approve"element={<ApproveDrug/>}/>
    <Route path="/read-all"element={<ReadAllDrugs/>}/>
    <Route path="/distributor"element={<Distributor/>}/>
    <Route path="/hospital"element={<Hospital/>}/>
    <Route path="/create-order"element={<CreateOrder/>}/>
    <Route path="/read-order"element={<ReadOrder/>}/>
    <Route path="/view-order"element={<QueryAllOrders/>}/>





      
      


    </>


  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App