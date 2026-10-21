import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center p-6 text-white">
        <h1 className="text-3xl font-bold">Bem-vindo ao McDev's Burger!</h1>
        <p className="mt-2 text-neutral-400">
          O melhor hambúrguer artesanal para devs! 🍔
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
