import NavbarHome from "../../Components/HomeNavBar/NavBarHome.jsx";
import BannerPerfil from "../../Components/Perfil/BannerSection";
import PerfilCard from "../../Components/Perfil/PerfilCard.jsx";
import InfoPerfil from "../../Components/Perfil/BioSection.jsx";
import BadgesPerfil from "../../Components/Perfil/BadgesSection.jsx";
import SocialEquipePerfil from "../../Components/Perfil/SocialEquipe.jsx";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from 'react-router-dom';


import layoutStyles from "./PerfilPageLayout.module.css"; // Importa o novo CSS

import { useProfile } from "../../contexts/ProfileContext";

// Mock do usuário para testes
const mockUser = {
  nome: "Nome",
  nivel: 15,
  foto: "",
  banner: "",
  bio: "Flare é conhecida por sua estratégia agressiva...",
  badges: "",
  redes: [
    // { nome: "@flare.joga", link: "https://instagram.com/flare.joga" },
    // { nome: "@flare.gg", link: "https://x.com/flare.gg" }
  ],
  equipe: "Rivalix.Team"
};

export default function PerfilPage({ user = mockUser, isOwner = true }) {

  const { usuario, loading, authToken } = useProfile(); // Pega também authToken para depuração, se quiser
  const navigate = useNavigate();

  if (loading) {
    return (
      <>
        <NavbarHome />
        <main className="main-content"><div>Carregando perfil...</div></main>
      </>
    );
  }

  if (!usuario) {
    // Redirecionamento para /login deve ser tratado no ProfileProvider ou em uma rota protegida (ProtectedRoutes).
    // Aqui, apenas não renderizamos nada se o usuario for nulo.
    return null;
  }

  return (
    <>
      <NavbarHome />
      <main className="main-content">
        {/* Garante que o perfil só seja renderizado se o objeto 'usuario' não for nulo */}
        {usuario && (
          <>
            <BannerPerfil
              bannerUrl={usuario.banner || ''} // Usa || '' como fallback para valores nulos
              isOwner={isOwner}
              fotoUrl={usuario.foto || ''}
              nome={usuario.nome}
            >
              {/* Este PerfilCard parece redundante dentro do BannerPerfil, mas mantive sua estrutura */}
              <PerfilCard nome={usuario.nome} isOwner={isOwner} />
            </BannerPerfil>

            <section className={layoutStyles.perfilGrid}>
              <div className={layoutStyles.colunaEsquerda}>
                <InfoPerfil bioInicial={usuario.bio || 'Sem biografia.'} isOwner={isOwner} />
                <BadgesPerfil badges={usuario.badges || []} isOwner={isOwner} />
              </div>

              <div className={layoutStyles.colunaDireita}>
                <SocialEquipePerfil
                  redes={usuario.redes || []}
                  equipe={usuario.equipe || 'Sem equipe'}
                  isOwner={isOwner}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}