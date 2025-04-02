import { create } from "zustand";

const useStore = create((set) => ({
  selectedTabs: { options: [] },
  user: null,
  documentsList: null,
  selectedDocumentId: null,
  documentData: null,
  apiError: null,
  loading: true,
  IsAddSourceDialogOpen : false,

  /**
   * Fetches user details from the API.
   */
  fetchUser: async () => {
    try {
      const response = await fetch(
        "http://localhost/DFXDMSLite/dfxapi_demo/App/User",
        {
          credentials: "include", // Windows Authentication
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const userData = await response.json();
      set({ user: userData, loading: false, apiError: null });
    } catch (error) {
      set({ user: null, loading: false, apiError: error.message });
    }
  },


  /**
   * Sets the user object manually (if needed).
   */
  setUser: (user) => {
    set({ user });
  },


  clearUser: () => set({ user: null }),

  /**
   * Fetches document data when a document is selected.
   */
  setSelectedDocumentId: async (selectedDocumentId) => {
    set({ selectedDocumentId, documentData: null, apiError: null });

    if (selectedDocumentId !== null) {
      set({ selectedTabs: { options: [{ id: 2, label: "Preview" }] } });

      try {
        const response = await fetch(
          `http://localhost/DFXDMSLite/dfxapi_demo/DMS/Document/DataVersion/LFRepo/${selectedDocumentId}`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        set({ documentData: data });
      } catch (error) {
        set({ apiError: error.message });
      }
    } else {
      set({ selectedTabs: { options: [] } });
    }
  },

  /**
   * Fetches the documents list by sending a FormData payload.
   */
  setDocumentsList: async (ids, file = null) => {
    set({ ids, documentsList: null, apiError: null });

    if (!ids || ids.length === 0) {
      set({ apiError: "IDs are required" });
      return;
    }

    try {
      const payload = {
        Repository: process.env.REPOSITORY_NAME || "LFRepo",
        Columns: [[{ SearchFieldType: 0, BaseField: "ID", Value: ids.join(","), Condition: 0 }]],
        Page: 1,
        No: 25,
        ColumnSortType: 1,
        ColumnName: "CreationDateTime",
        ColumnSortOrder: 0,
        AllData: false,
        CacheId: "50TVwyv3ef",
        DeletedFiles: false,
      };

      const response = await fetch(
        `http://localhost/DFXDMSLite/dfxapi_demo/DMS/Documents/Query/75`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      set({ documentsList: data });
    } catch (error) {
      set({ apiError: error.message });
    }
  },

  /**
   * Toggles an item in the selectedTabs category.
   */
  toggleItem: (category, item) =>
    set((state) => {
      const categoryItems = state.selectedTabs[category] || [];
      const updatedItems = categoryItems.some((i) => i.id === item.id)
        ? categoryItems.filter((i) => i.id !== item.id)
        : [...categoryItems, item];

      return {
        selectedTabs: {
          ...state.selectedTabs,
          [category]: updatedItems,
        },
      };
    }),
  

}));

export default useStore;
