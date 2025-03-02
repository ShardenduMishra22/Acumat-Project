/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/Loader";
import { Navigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import { useUserStore } from "@/components/store/userStore";
import React, { ReactNode, useEffect, useState } from "react";

interface UnprotectedRoutesProps {
  children: ReactNode;
}

const UnprotectedRoutes: React.FC<UnprotectedRoutesProps> = ({ children }) => {
  const [isUnauthenticated, setIsUnauthenticated] = useState<boolean | null>(null);
  const setUser = useUserStore((state: any) => state.setUser);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsUnauthenticated(true);
        return;
      }

      try {
        const results = await Promise.allSettled([
          axiosInstance.get("/hospital/verifyHospital", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/patient/verifyPatient", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const hospitalResult = results[0];
        const patientResult = results[1];

        let isAuthenticated = false;

        if (
          hospitalResult.status === "fulfilled" &&
          hospitalResult.value.status === 200
        ) {
          setUser(hospitalResult.value.data.data);
          isAuthenticated = true;
        }

        if (
          patientResult.status === "fulfilled" &&
          patientResult.value.status === 200
        ) {
          setUser(patientResult.value.data.data);
          isAuthenticated = true;
        }

        if (isAuthenticated) {
          setIsUnauthenticated(false);
        } else {
          setIsUnauthenticated(true);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setIsUnauthenticated(true);
      }
    };

    checkAuthentication();
  }, [setUser]);

  if (isUnauthenticated === null) {
    return <Loader />;
  }

  if (!isUnauthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default UnprotectedRoutes;
