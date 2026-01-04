import { Dropdown, DropdownItem } from "../global/dropdown";
import { useAuth } from "@/hooks/useAuth";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import ButtonMobile from "../global/buttonMobile";

export function Header() {
  const { user, logout } = useAuth();
  const { toggleMenu, isOpen } = useMobileMenu();

  return (
    <div
      className="
         bg-black px-8 py-3 flex items-center justify-end
        z-20
        "
    >
      <Dropdown
        trigger={
          <div className="items-center gap-4 lg:flex hidden">
            <span className="text-white/80 text-sm ">Olá, {user?.name}</span>

            <div className="w-9 h-9 rounded-full bg-[#0d8cd7] flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {/* {user?.roles.map(role => (
              <span key={role.roleId} className="text-white">{role.name}</span>
            ))} */}
          </div>
        }
      >
        <DropdownItem onClick={logout}>Sair</DropdownItem>
      </Dropdown>

      <div
        className="text-2xl text-white rounded lg:hidden z-50"
        onClick={toggleMenu}
      >
        <ButtonMobile isActive={isOpen} />
      </div>
    </div>
  );
}
