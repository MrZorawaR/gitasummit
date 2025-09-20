"use client";

import Loading from "@/components/layout/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminDashboard from "./dashboard/page";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session || session.user.role !== "admin") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status !== "authenticated" || session.user.role !== "admin") {
    return <Loading />;
  }

  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;