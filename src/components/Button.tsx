type ButtonType = {
  title: string;
  variant?: "default" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ title, variant = "default", ...props }: ButtonType) => {
  const buttonVariant = () => {
    if (variant === "default") {
      return "w-full cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-indigo-600";
    } else if (variant === "outline") {
return "w-full cursor-pointer rounded-md border-2 px-4 py-2 font-bold text-white hover:border-transparent hover:bg-blue-600 hover:text-white";
    }
  };

  return (
    <button {...props} className={buttonVariant()}>
      {title}
    </button>
  );
};

export default Button;