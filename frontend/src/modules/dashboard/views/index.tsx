"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { canAccess } from "@/shared/utils/canAccess";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { useExperiences } from "@/modules/experiences/hooks/useExperiences";
import { useBannerCategories } from "@/modules/banner_categories/hooks/useBannerCategories";
import InfoBox from "../components/infoBox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faImages,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { authenticated, loading, permissions } = useAuth();
  const { getCountUsers } = useUsers();
  const { getCountBannerCategories } = useBannerCategories();
  const { getCountExperiences } = useExperiences();
  const router = useRouter();

  const [countUsers, setCountUsers] = useState<number>(0);
  const [countExperiences, setCountExperiences] = useState<number>(0);
  const [countBannerCategories, setCountBannerCategories] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      const countExperiences = await getCountExperiences();
      const countUsers = await getCountUsers();
      const countBannerCategories = await getCountBannerCategories();

      setCountExperiences(countExperiences);
      setCountBannerCategories(countBannerCategories);
      setCountUsers(countUsers);
    };
    fetchCount();
  }, []);

  useEffect(() => {
    if (!loading && !authenticated) router.replace("/admin");

    if (
      !loading &&
      authenticated &&
      !canAccess(permissions, ["VIEW_DASHBOARD"])
    ) {
      router.replace("/admin/dashboard");
    }
  }, [loading, authenticated, router, permissions]);

  if (loading || !authenticated) return <SpinnerLoading />;

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Bem-vindo ao painel administrativo!</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
          <InfoBox
            title="Usuários Totais"
            totalItems={countUsers}
            icon={<FontAwesomeIcon className="text-4xl" icon={faUserGroup} />}
          />

          <InfoBox
            title="Experiências"
            totalItems={countExperiences}
            icon={<FontAwesomeIcon className="text-4xl" icon={faBriefcase} />}
          />

          <InfoBox
            title="Categorias de Banner"
            totalItems={countBannerCategories}
            icon={<FontAwesomeIcon className="text-4xl" icon={faImages} />}
          />
        </div>
      </div>
    </div>
  );
}
