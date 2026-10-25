import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
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

        <Button title="Login" />
        <Link to="/cadastro" className="w-full">
          <Button title="Não tem uma conta?" variant="outline" />
        </Link>
      </form>
    </div>
  );
};

export default Login;
