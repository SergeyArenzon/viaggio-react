import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./containers/Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateLocation from "./components/CreateLocation/CreateLocation";
import ShowLocation from "./components/ShowLocation/ShowLocation";
import EditLocation from "./components/EditLocation/EditLocation";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new-location" element={<CreateLocation/>}/>
          <Route path="/locations/:id" element={<ShowLocation/>}/>
          <Route path="/locations/:id/edit" element={<EditLocation/>}/>
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
