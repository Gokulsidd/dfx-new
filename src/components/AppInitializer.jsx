"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useStore from "@/store/useStore";

const AppInitializer = () => {
  const searchParam = useSearchParams();
  const { setDashboardId } = useStore();

  useEffect(() => {
    const id = searchParam.get('id');
    console.log(id, 'inside AppInitializer')
    if (id) {
      setDashboardId(id);
    }
  }, [searchParam, setDashboardId]);
 
  return null
};

export default AppInitializer;
