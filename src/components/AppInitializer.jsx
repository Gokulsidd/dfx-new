"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useStore from "@/store/useStore";
import { getMockTabsResponse, mockUserData } from "@/lib/constants";

const AppInitializer = () => {
  const searchParam = useSearchParams();
  const {
    setDashboardId,
    setConfigs,
    fetchUser,
    setUser,
    fetchTabsListForDashboard,
    getWorkspaceCollections
  
  } = useStore();

  const getUser = async () => {
    setUser(mockUserData); // Simulated user data
    // fetchUser();
  };

  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((data) => {
        setConfigs(data);
      })
      .then(() => {
        getUser();
        fetchTabsListForDashboard();
        getWorkspaceCollections()
      })
      .catch((err) => {
        console.error("Failed to load config.json:", err);
      });
  }, []);

  useEffect(() => {
    const id = searchParam.get("id");
    if (id) {
      setDashboardId(id);
    }
  }, [searchParam, setDashboardId]);

  return null;
};

export default AppInitializer;
