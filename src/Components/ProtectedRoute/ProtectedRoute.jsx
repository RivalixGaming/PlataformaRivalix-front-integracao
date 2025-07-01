import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../../contexts/ProfileContext'; 

const ProtectedRoute = () => {
  // É usado o seu hook `useProfile` para pegar o estado de autenticação.
  const { usuario, loading } = useProfile();

  // Enquanto o sistema verifica se o usuário está logado, é exibido uma mensagem.
  // Isso evita que a página protegida apareça antes da verificação.
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se o carregamento terminou e não há um usuário, ele é redirecionado para a página de login.
  // O `replace` evita que o usuário possa voltar para a página anterior no histórico do navegador.
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  //Se o usuário estiver logado, é renderizado a página que ele tentou acessar.
  return <Outlet />;
};

export default ProtectedRoute;