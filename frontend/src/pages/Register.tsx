import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, cep }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      navigate("/login", { state: { message: data.message } });
    } catch {
      setError("Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-black p-6 shadow-2xl"
      >
        <Link
          to="/"
          className="mb-2 flex items-center justify-center transition-opacity hover:opacity-90"
        >
          <img src="/logo.png" alt="McDev's Burger" className="h-20 w-auto" />
        </Link>

        <Input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          placeholder="Confirme sua Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Input
          placeholder="CEP"
          type="text"
          inputMode="numeric"
          maxLength={9}
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        {error && <p className="w-full text-sm text-[#ffa41b]">{error}</p>}
        <Button
          title={loading ? "Cadastrando..." : "Cadastrar"}
          type="submit"
        />
        <Link to="/login" className="w-full">
          <Button title="Já tem conta?" variant="outline" type="button" />
        </Link>
      </form>
    </div>
  );
};

export default Register;