"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useStore from "@/store/useStore";
import { getMockTabsResponse, mockUserData } from "@/lib/constants";

const AppInitializer = () => {
  const searchParam = useSearchParams();
  const { setDashboardId, configs, setConfigs, fetchUser, setUser, fetchTabsListForDashboard,  user, dashboardId } = useStore();

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
        fetchTabsListForDashboard()
      })
      .catch((err) => {
        console.error("Failed to load config.json:", err);
      })

  }, [dashboardId, user]);

  useEffect(() => {
    const id = searchParam.get("id");
    console.log(id, "inside AppInitializer");
    if (id) {
      setDashboardId(id);
    }
  }, [searchParam, setDashboardId]);

  console.log(configs, "this is from app initializer");
  return null;
};

export default AppInitializer;
