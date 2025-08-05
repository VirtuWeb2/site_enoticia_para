import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import CookieConsent from './components/cookies/CookieConsent';
import Homepage from "./views/home/Homepage";
import Regioes from "./views/regioes/Regioes";
import Politica from "./views/category/Politica";
import Foco from "./views/category/Foco";
import Seguranca from "./views/category/Seguranca";
import Esportes from "./views/category/Esportes";
import Noticia from "./views/singlepage/Noticia";
import Search from "./views/search/Search";
import Tv from "./views/tv/Tv";
import Login from "./views/admin/login/Login";
import Araguaia from "./views/regioes/Araguaia";
import BaixoAmazonas from "./views/regioes/BaixoAmazonas";
import BaixoTocantins from "./views/regioes/BaixoTocantins";
import Caete from "./views/regioes/Caete";
import Capim from "./views/regioes/Capim";
import Carajas from "./views/regioes/Carajas";
import Guajarina from "./views/regioes/Guajarina";
import LagoTucurui from "./views/regioes/LagoTucurui";
import Marajo from "./views/regioes/Marajo";
import Metropolitana from "./views/regioes/Metropolitana";
import Salgado from "./views/regioes/Salgado";
import Tapajos from "./views/regioes/Tapajos";
import Xingu from "./views/regioes/Xingu";
import Termos from './views/politicas/Termos';
import PoliticaPrivacidade from './views/politicas/PoliticaPrivacidade';
import "./App.css";
const Dashboard = lazy(() => import("./views/admin/dashboard/Dashboard"));

const Layout = () => {
  return (
    <>
      <Header />
      <CookieConsent />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/regioes",
        element: <Regioes />,
      },
      {
        path: "/politica-de-privacidade",
        element: <PoliticaPrivacidade />,
      },
      {
        path: "/termos-de-uso",
        element: <Termos />,
      },
      {
        path: "/politica",
        element: <Politica />,
      },
      {
        path: "/seguranca",
        element: <Seguranca />,
      },
      {
        path: "/esportes",
        element: <Esportes />,
      },
      {
        path: "/foco",
        element: <Foco />,
      },
      {
        path: "/noticia/:id",
        element: <Noticia />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/tv-en-para",
        element: <Tv />,
      },
      {
        path: "/regiao/araguaia",
        element: <Araguaia />,
      },
      {
        path: "/regiao/baixo-amazonas",
        element: <BaixoAmazonas />,
      },
      {
        path: "/regiao/baixo-tocantins",
        element: <BaixoTocantins />,
      },
      {
        path: "/regiao/caete",
        element: <Caete />,
      },
      {
        path: "/regiao/capim",
        element: <Capim />,
      },
      {
        path: "/regiao/carajas",
        element: <Carajas />,
      },
      {
        path: "/regiao/guajarina",
        element: <Guajarina />,
      },
      {
        path: "/regiao/lago-tucurui",
        element: <LagoTucurui />,
      },
      {
        path: "/regiao/marajo",
        element: <Marajo />,
      },
      {
        path: "/regiao/metropolitana",
        element: <Metropolitana />,
      },
      {
        path: "/regiao/salgado",
        element: <Salgado />,
      },
      {
        path: "/regiao/tapajos",
        element: <Tapajos />,
      },
      {
        path: "/regiao/xingu",
        element: <Xingu />,
      },
      {        
        path: "*",
        element: <Navigate to="/" />,
      }
    ],
  },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin/*",
    element: (
      <Suspense fallback={null}>
        <Dashboard />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;
