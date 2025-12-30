import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users } from "lucide-react";

export function Aside() {
  const pathname = usePathname();

  return (
    <aside className="row-span-3 bg-slate-900 px-6">
      <div className="flex items-center gap-2 text-white font-bold">
        <Image
          className="py-3"
          src={"/logo-prime.png"}
          width={50}
          height={50}
          alt=""
        ></Image>
        <h2>Painel Admin</h2>
      </div>

      <nav className="mt-4">
        <Link
          href={"/admin/dashboard"}
          className={`nav-link ${
            pathname == "/admin/dashboard" ? "active" : ""
          }`}
        >
          <LayoutDashboard width={20} />
          Dashboard
        </Link>
        <Link
          href={"/admin/dashboard"}
          className={`nav-link ${
            pathname == "/admin/usuarios" ? "active" : ""
          }`}
        >
          <Users width={20} />
          Usuários
        </Link>
      </nav>
    </aside>
  );
}
