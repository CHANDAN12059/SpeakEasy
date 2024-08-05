import {BrowserRouter, Route, Routes} from "react-router-dom";
import Join from "./component/join";
import "./app.css";
import User from "./component/user";

function App() {


  return (
 <div className="app">
<BrowserRouter>




<Routes>
<Route path="/"element={<Join/>}></Route>
<Route path="/chats" element={<User/>}></Route>



</Routes>



</BrowserRouter>



 </div>
  )
}

export default App
