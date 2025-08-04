type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
  };
  
  export default function Button({
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
  }: ButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          w-full py-4 px-8 text-white font-bold text-lg rounded-lg
          transition duration-300 shadow-lg tracking-wide
          ${disabled ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-700'}
          ${className}
        `}
      >
        {children}
      </button>
    );
  }