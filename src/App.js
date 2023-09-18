import { BrowserRouter, Routes,Route } from "react-router-dom";
//Importing other componnents
import Nav from "./components/Nav";
import Home from "./components/Home";
import Log_in from "./components/Log in";
import Log_out from "./components/Log out";
import View_More from "./components/View more";
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import Searched from "./components/Searched";
import Users from "./components/Users";
import Contact_us from "./components/Contact us";


function App() {
  return (
    <>
    <Nav/>
    <Search/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/searched/:search" element={<Searched/>}/>
        <Route path="/game/:id" element={<View_More/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/log_in" element={<Log_in/>}/>
        <Route path="/log_out" element={<Log_out/>}/>
        <Route path="/contact_us" element={<Contact_us/>}/>
        <Route path="/users" element={<Users/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
