import { useState } from "react";
import { FaRegSmile, FaRegEnvelope, FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";

import { useProfile } from "../../contexts/ProfileContext"; 

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nome, setNome] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");

  const navigate = useNavigate();

  const { login } = useProfile();

  const emailValido = (email) => email.includes("@");

  const cadastroValido =
    nome.trim() !== "" &&
    nomeUsuario.trim() !== "" &&
    emailValido(emailCadastro) &&
    senha.trim() !== "" &&
    confirmarSenha.trim() !== "" &&
    senha === confirmarSenha &&
    acceptedTerms;

  const loginValido = emailValido(emailLogin) && senhaLogin.trim() !== "";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginValido) {
    try {
      const response = await fetch("https://plataforma-rivalix-gaming-24af3d5ab112.herokuapp.com/api/auth/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailLogin,
          senha: senhaLogin
        }),
      });

      if (response.ok) { // Status 2xx (200, 201, etc.)
        const data = await response.json();
                const token = data.token; // Assumindo que o backend retorna { "token": "seu-token-aqui" }

                if (token) {
                    
                    login(token);
                    
                    navigate("/home"); 

                } else {
                    alert("Erro: O token não foi recebido do servidor.");
                }
      } else {
        const errorData = await response.json(); // Tenta ler a mensagem de erro do backend
        console.error("Erro no login:", errorData);
        alert(`Erro ao realizar login: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro de conexão ou inesperado:", error);
      alert("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
    }
  }
  };

 const handleRegister = async (e) => { // Adicione 'async'
  e.preventDefault();
  if (cadastroValido) {
    try {
      const response = await fetch("https://plataforma-rivalix-gaming-24af3d5ab112.herokuapp.com/api/auth/register", { // Ou "/api/auth/register" se moveu
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          nomeUsuario: nomeUsuario,
          email: emailCadastro,
          senha: senha
        }),
      });

      if (response.ok) { // Status 2xx (200, 201, etc.)
        console.log("Cadastro realizado com sucesso!");
        alert("Cadastro realizado com sucesso! Faça login agora.");
        setIsRegistering(false); // Voltar para o formulário de login após o cadastro
        setEmailLogin(emailCadastro); // Preencher o email de login
        setSenhaLogin(""); // Limpar a senha de login
      } else {
        const errorData = await response.json(); // Tenta ler a mensagem de erro do backend
        console.error("Erro no cadastro:", errorData);
        alert(`Erro ao cadastrar: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro de conexão ou inesperado:", error);
      alert("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
    }
  }
};

  return (
    <section className="login-wrapper">
      <div className="login-form-only">
        <h2 className="form-title">{isRegistering ? "Cadastre-se" : "Login"}</h2>

        <form
          className={`auth-form ${isRegistering ? "scrollable-form" : "no-scroll-form"}`}
          onSubmit={isRegistering ? handleRegister : handleLogin}
        >
          {isRegistering ? (
            <>
              <label htmlFor="nome">Nome completo</label>
              <div className="input-icon-wrapper">
                <input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
                <FaRegSmile className="toggle-password" />
              </div>

              <label htmlFor="email-cadastro">Email</label>
              <div className="input-icon-wrapper">
                <input
                  id="email-cadastro"
                  type="email"
                  placeholder="Digite seu email"
                  value={emailCadastro}
                  onChange={(e) => setEmailCadastro(e.target.value)}
                  required
                />
                <FaRegEnvelope className="toggle-password" />
              </div>

              <label htmlFor="nomeUsuario">Nome de Usuário</label>
              <div className="input-icon-wrapper">
                <input
                  id="nomeUsuario"
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  value={nomeUsuario}
                  onChange={(e) => setNomeUsuario(e.target.value)}
                  required
                />
                <FaUserAlt className="toggle-password" />
              </div>

              <label htmlFor="senha">Senha</label>
              <div className="input-icon-wrapper">
                <input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <label htmlFor="confirmar-senha">Confirmar senha</label>
              <div className="input-icon-wrapper">
                <input
                  id="confirmar-senha"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repita a senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-password"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </>
          ) : (
            <>
              <label htmlFor="email-login">Email</label>
              <div className="input-icon-wrapper">
                <input
                  id="email-login"
                  type="email"
                  placeholder="Digite seu email"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                  required
                />
                <FaRegEnvelope className="toggle-password" />
              </div>

              <label htmlFor="senha-login">Senha</label>
              <div className="input-icon-wrapper">
                <input
                  id="senha-login"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senhaLogin}
                  onChange={(e) => setSenhaLogin(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <a href="#" className="forgot-password">Esqueceu sua senha?</a>
            </>
          )}

          <div className="form-footer">
            {isRegistering && (
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <span> Aceito os <a href="#">termos de uso e privacidade</a></span>
              </label>
            )}

            <button
              type="submit"
              className="auth-button"
              disabled={isRegistering ? !cadastroValido : !loginValido}
            >
              {isRegistering ? "Cadastrar" : "Entrar"}
            </button>

            <p className="toggle-auth">
              {isRegistering ? "Já tem uma conta? " : "Não tem uma conta? "}
              <span onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Fazer login" : "Cadastre-se"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}