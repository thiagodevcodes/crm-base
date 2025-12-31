import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black px-8 py-4 flex justify-between items-center">
      {/* Esquerda */}
      <div className="flex gap-1">
        <span className="text-sm text-white/60">© 2025 - Developed by</span>

        {/* Centro */}
        <Link
          href="https://github.com/thiagodevcodes"
          className="text-sm text-white/60 hover:text-white/80 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Thiago Silva Rodrigues
        </Link>
      </div>

      {/* Direita */}
      <p className="text-sm text-white/60">Versão 0.0.1</p>
    </footer>
  );
}
