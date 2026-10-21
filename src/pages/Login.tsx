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
    <div className="flex flex-1 items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-87.5 flex-col items-center gap-2 rounded-xl border border-neutral-800 bg-black p-6 shadow-2xl"
      >
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
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
          className="w-full cursor-pointer rounded-md bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
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
