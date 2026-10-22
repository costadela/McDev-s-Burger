import { useState } from "react";
import Input from "../components/Input.tsx";
import { Link } from "react-router-dom";

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
          <img src="/logo.png" alt="McDev's Burger" className="h-16 w-auto" />
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

        <button
          type="submit"
          className="mt-1 w-full cursor-pointer rounded-md bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Login
        </button>

        <p className="mt-2 text-center text-sm text-white">
          Não tem uma conta?{" "}
          <Link
            to="/cadastro"
            className="font-semibold text-blue-500 transition-colors hover:text-blue-400"
          >
            Clique aqui
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;