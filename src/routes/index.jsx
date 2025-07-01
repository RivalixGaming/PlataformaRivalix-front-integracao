import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../contexts/DefaultLayout";
import Inicio from "../pages/Inicio";
import Sobre from "../pages/Sobre/Sobre";
import Login from "../pages/Login/Login";
import Configuracoes from "../pages/Configuracoes/Configuracoes";
import Perfil from "../pages/Perfil/Perfil";
import Home from "../pages/HomePage/HomePage";
import Feed from "../pages/Feed/Feed";
import Ranking from "../pages/Ranking/Ranking";
import Planos from "../pages/Planos/Planos";
import Notificacoes from "../pages/Notificacao/Notificacoes";
import Galeria from "../pages/Galeria/Galeria";
import ArtesSalvas from "../pages/Galeria/ArtesSalvas";
import Recompensas from "../pages/Recompensas/Recompensa";
import Faq from "../pages/Faq/Faq";
import Torneios from "../pages/Torneios/Torneios";
import MeusTorneios from "../pages/Torneios/MeusTorneios.jsx";
import Loja from "../pages/Loja/Loja.jsx";
import DetalhesTorneio from '../pages/DetalhesTorneio/DetalhesTorneio.jsx';

// Importando as páginas necessárias para as rotas
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      // --- Rotas Públicas (não precisam de login) ---
      { path: "/", element: <Inicio /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/login", element: <Login /> },

      // --- Rotas Protegidas (precisam de login) ---
      {
        element: <ProtectedRoute />, // Componente que protege todas as rotas
        children: [
          { path: "/home", element: <Home /> },
          { path: "/perfil", element: <Perfil /> },
          { path: "/configuracoes", element: <Configuracoes /> },
          { path: "/feed", element: <Feed /> },
          { path: "/ranking", element: <Ranking /> },
          { path: "/planos", element: <Planos /> },
          { path: "/notificacoes", element: <Notificacoes /> },
          { path: "/galeria", element: <Galeria /> },
          { path: "/artes-salvas", element: <ArtesSalvas /> },
          { path: "/recompensas", element: <Recompensas /> },
          { path: "/faq", element: <Faq /> },
          { path: "/torneios", element: <Torneios /> },
          { path: "/meus-torneios", element: <MeusTorneios /> },
          { path: "/torneios/:id", element: <DetalhesTorneio /> },
          { path: "/loja", element: <Loja /> },
        ]
      }
    ]
  }
]);