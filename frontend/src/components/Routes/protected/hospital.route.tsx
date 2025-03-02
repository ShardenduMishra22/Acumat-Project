  /* eslint-disable @typescript-eslint/no-explicit-any */
  import Loader from "@/components/Loader";
  import { Navigate } from "react-router-dom";
  import axiosInstance from "@/lib/axiosInstance";
  import { useUserStore } from "@/components/store/userStore";
  import React, { ReactNode, useEffect, useState } from "react";

  interface ProtectedHospitalProps {
    children: ReactNode;
  }

  const ProtectedHospital: React.FC<ProtectedHospitalProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const setUser = useUserStore((state: any) => state.setUser);

    useEffect(() => {
      const checkAuthentication = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        try {
          const response = await axiosInstance.get("/hospital/verifyHospital", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setUser(response.data.data);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Authentication check failed:", error);
          setIsAuthenticated(false);
        }
      };

      checkAuthentication();
    }, [setUser]);

    if (isAuthenticated === null) {
      return <Loader />;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };

  export default ProtectedHospital;
