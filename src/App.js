import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./containers/Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateLocation from "./components/CreateLocation/CreateLocation";
import ShowLocation from "./components/ShowLocation/ShowLocation";
import EditLocation from "./components/EditLocation/EditLocation";
import Auth from "./components/Auth/Auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./features/user";

function App() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async() => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        credentials: "include",
      });
      const user = await response.json();
      dispatch(login(user.user));
    }
    getUser();
  }, []);
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/new-location" element={<CreateLocation />} />
          <Route path="/locations/:id" element={<ShowLocation />} />
          <Route path="/locations/:id/edit" element={<EditLocation />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
