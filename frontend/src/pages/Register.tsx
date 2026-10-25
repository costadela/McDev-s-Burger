import { useState } from "react";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import { Link } from "react-router-dom";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    console.log("Nome:", nome);
    console.log("E-mail:", email);
    console.log("Senha:", password);
    console.log("CEP:", cep);
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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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

        <Button title="Cadastrar" />
        <Link to="/login" className="w-full">
          <Button
            title="Já tem conta?"
            variant="outline"
            type="button"
          />
        </Link>
      </form>
    </div>
  );
};

export default Register;
