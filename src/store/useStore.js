// store/useStore.js
import { create } from "zustand";
import { getMockTabsResponse, mockTabsData } from "@/lib/constants";
import {
  fetchUser,
  fetchDocumentData,
  fetchDocumentsList,
  fetchTabsList,
} from "@/services/api";

const useStore = create((set, get) => ({
  selectedTabs: { options: [] },
  user: null,
  documentsList: null,
  selectedDocumentId: null,
  documentData: null,
  apiError: null,
  loading: true,
  isAddSourceDialogOpen: false,
  isCollapsed: false,
  dashboardId: null,
  tabsList: null,

  // Setters
  setDashboardId: (id) => set({ dashboardId: id }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setAddSourceDialog: (value) => set({ isAddSourceDialogOpen: value }),

  setIsCollapsed: (value) =>
    set((state) => {
      let updatedTabs = { ...state.selectedTabs };

      if (!value && updatedTabs.options.length >= 3) {
        updatedTabs.options = updatedTabs.options.filter((tab) => tab.name !== "Chat" && tab.name !== "Action");
      } else if (value && updatedTabs.options.length >= 3) {
        updatedTabs.options = mockTabsData;
      }

      return {
        isCollapsed: value,
        selectedTabs: updatedTabs,
      };
    }),

  toggleItem: (category, item) =>
    set((state) => {
      const categoryItems = state.selectedTabs[category] || [];
      const updatedItems = categoryItems.some((i) => i.id === item.id)
        ? categoryItems.filter((i) => i.id !== item.id)
        : [...categoryItems, item];

      const shouldCollapse = updatedItems.length === 3 ? true : state.isCollapsed;

      return {
        selectedTabs: {
          ...state.selectedTabs,
          [category]: updatedItems,
        },
        isCollapsed: shouldCollapse,
      };
    }),

  // API Calls
  fetchUser: async () => {
    set({ loading: true, apiError: null });

    try {
      const res = await fetchUser();
      set({ user: res.data, loading: false });
    } catch (err) {
      set({ user: null, loading: false, apiError: err.message });
    }
  },

  setSelectedDocumentId: async (id) => {
    const { tabsList } = get();
  
    // Reset the state
    set({
      selectedDocumentId: id,
      documentData: null,
      apiError: null,
      selectedTabs: {
        options: id
          ? tabsList?.filter((item) => item.name === "Preview") || []
          : [],
      },
    });
  
    // Fetch document data
    if (id) {
      try {
        const res = await fetchDocumentData(id);
        set({ documentData: res.data });
      } catch (err) {
        set({ apiError: err.message });
      }
    }
  },
  

  setDocumentsList: async (ids = []) => {
    set({ documentsList: null, apiError: null });

    if (!ids.length) {
      set({ apiError: "IDs are required" });
      return;
    }

    try {
      const res = await fetchDocumentsList(ids);
      set({ documentsList: res.data });
      set({ isCollapsed: false });
    } catch (err) {
      set({ apiError: err.message });
    }
  },

  fetchTabsListForDashboard: async () => {
    console.log('fetchTabsListForDashboard')
    set({ tabsList: null, apiError: null });
   
    const dashboardId = get().dashboardId;
    console.log(dashboardId, 'dashboardID')

    // console.log(tabsList, 'inside fetchTabsListForDashboard')
    if (!dashboardId) {
      set({ apiError: "Dashboard ID is required" });
      return;
    }

    try {
      // const res = await fetchTabsList(dashboardId);
      const res = await getMockTabsResponse()
      set({ tabsList: res.dashboardPageColumn })
      console.log(tabsList)
    } catch (err) {
      set({ apiError: err.message });
    }


  },
}));

export default useStore;
