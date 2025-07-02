import NavbarHome from "../../Components/HomeNavBar/NavBarHome.jsx";
import BannerPerfil from "../../Components/Perfil/BannerSection";
import PerfilCard from "../../Components/Perfil/PerfilCard.jsx";
import InfoPerfil from "../../Components/Perfil/BioSection.jsx";
import BadgesPerfil from "../../Components/Perfil/BadgesSection.jsx";
import SocialEquipePerfil from "../../Components/Perfil/SocialEquipe.jsx";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from 'react-router-dom';


import layoutStyles from "./PerfilPageLayout.module.css"; 

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

  const { usuario, loading, authToken } = useProfile();
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
              nome={usuario.nomeUsuario}
            >
              <PerfilCard nome={usuario.nomeUsuario} isOwner={isOwner} />
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