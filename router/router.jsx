import { BrowserRouter as Routing, Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Context from "../utils/context"
import Pages from "../src/pages/pages";
import Login from "../src/components/auth/login";
import Register from "../src/components/auth/register";
import axios from "axios";
import FormEvent from "../src/components/forms/formEvent";
import EventDetail from "../src/components/details/eventDetail";
import FormTicket from "../src/components/forms/formTicket";
import Scanner from "../src/components/scanner/scanner";
import ScanResult from "../src/components/scanner/scanResult";
import PrivacyPolicy from "../security/privacyPolicy";
import Guide from "../others/guides";

const Router = () => {

  const savedcookie = sessionStorage.getItem('savedcookie');
  const endpoint = import.meta.env.VITE_API
  const [ready, setReady] = useState(true);

  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useState(true);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [sid, setSid] = useState("");

  const initServer = async () => {
    try {
      setLoading(true)
      await axios.get(endpoint);
      setReady(true);
    } catch (error) {
      setReady(false);
      return Promise.reject(error);
    } finally {
      setLoading(false)
    }
  }

  const initCookie = async () => {
    if (!ready) return false;
    if (savedcookie) return setCookie(true);

    try {
        setLoading(true)
        await axios.get(`${endpoint}/getvxsrf`);
        await axios.get(`${endpoint}/checkvxsrf`);
        sessionStorage.setItem('savedcookie', true);
        setCookie(true);
    } catch (error) {
        setCookie(false);
        return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }

  const initData = async () => {
    if (!cookie) return false;

    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API}/stressor`)
      response.data.token && setToken(response.data.token);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    initServer().then(() => initCookie().then(() => initData()))
  }, [])

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setName(decode.name);
      setSid(decode.sid);
    }
  }, [token])

  const context = {ready, token, cookie, name, sid, loading, setToken, setLoading }

  return (
    <Context.Provider value={context}>
      <Routing>
        <Routes>
          <Route path="/" element={<Pages/>}/>
          <Route path="/review" element={<Pages/>}/>
          <Route path="/events" element={<Pages/>}/>
          <Route path="/tickets" element={<Pages/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/scanner" element={<Scanner/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/panduan" element={<Guide/>}/>
          <Route path="/scan/result" element={<ScanResult/>}/>
          <Route path="/create/event" element={<FormEvent/>}/>
          <Route path="/create/ticket" element={<FormTicket/>}/>
          <Route path="/detail/event" element={<EventDetail/>}/>
          <Route path="/privacy/policy" element={<PrivacyPolicy/>}/>
          <Route path="/api/ticket/v1/auth/google/callback" element={<Pages/>}/>
        </Routes>
      </Routing>
    </Context.Provider>
  )
}

export default Router;