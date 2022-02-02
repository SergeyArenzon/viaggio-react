import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./containers/Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateLocation from "./components/CreateLocation/CreateLocation";
import ShowLocation from "./components/ShowLocation/ShowLocation";
import EditLocation from "./components/EditLocation/EditLocation.tsx";
import Auth from "./components/Auth/Auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./features/user";
import { AuthApi } from "./services/api/index.js";

function App() {
  const user = useSelector((state) => state.user.info);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await AuthApi.user();
      if (!userInfo.error) {
        dispatch(login(userInfo));
      }
    };
    getUser();
  }, []);

  console.log(user);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/new-location" element={<CreateLocation />} />
          <Route path="/locations/:id" element={<ShowLocation />} />
          <Route path="/locations/:id/edit" element={<EditLocation />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
