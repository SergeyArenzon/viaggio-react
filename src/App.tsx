import "./App.scss";
import Home from "./components/Home/Home";
import Layout from "./containers/Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateLocation from "./components/CreateLocation/CreateLocation";
import ShowLocation from "./components/ShowLocation/ShowLocation";
import EditLocation from "./components/EditLocation/EditLocation";
import Auth from "./components/Auth/Auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, getUser } from "./features/user";
import { AuthApi } from "./services/api/index";
import {fetchUserData} from './store/slices/authSlice'



interface IUser {
  user: {
    info: {
      firstName: string,
      lastName: string,
      email: string,
      _id: string,
      date: string,
    }
  }
}

function App() {
  // const user = useSelector((state: IUser) => state.user.info);
  const dispatch = useDispatch();

  useEffect(() => {
   
    dispatch(fetchUserData())
    
  }, [dispatch]);

  

  
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
