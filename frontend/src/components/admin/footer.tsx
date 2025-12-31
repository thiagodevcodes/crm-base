import Link from "next/link";

export function Footer() {
  return (
    <footer className=" bg-black px-8 py-4 flex justify-between">
        <p className="text-sm text-white/60">
        © 2025 - Developed by <Link href="https://github.com/thiagodevcodes">Thiago Silva Rodrigues</Link>
        </p>

        <p className="text-sm text-white/60">
        Versão 0.0.1
        </p>
    </footer>
  );
}