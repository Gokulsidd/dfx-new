import { create } from "zustand";

const useStore = create((set) => ({
  selectedTabs: { options: [] },
  user: null,
  documentsList: null,
  selectedDocumentId: null,
  documentData: null,
  apiError: null,

  /**
   * Sets the selected document ID and fetches document data.
   * @param {number|null} selectedDocumentId - The ID of the selected document.
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
            credentials: "include", // Required for NTLM authentication
            headers: {
              "Content-Type": "application/json",
            },
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
   * @param {Array<number>} ids - List of document IDs.
   * @param {File|null} file - Optional file to upload.
   */
  setDocumentsList: async (ids, file = null) => {
    set({ ids, documentsList: null, apiError: null });
  
    if (!ids || ids.length === 0) {
      set({ apiError: "IDs are required" });
      return;
    }
  
    try {
      const formData = new FormData();
      const documentIds = ids.join(",")
      // Construct JSON payload
      const payload = {
        Repository: process.env.REPOSITORY_NAME || "LFRepo", // Fallback value
        Columns: [[
          {
            SearchFieldType: 0,
            BaseField: "ID",
            Value: documentIds,
            Condition: 0
          }
        ]],
        Page: 1,
        No: 25,
        ColumnSortType: 1,
        ColumnName: "CreationDateTime",
        ColumnSortOrder: 0,
        AllData: false,
        CacheId: "50TVwyv3ef",
        DeletedFiles: false
      };
  
      // Append JSON payload as a Blob to FormData
      const jsonBlob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      formData.append("payload", jsonBlob);
  
      // Append file if provided
      if (file) {
        formData.append("file", file);
      }
  
      // Debugging: Log FormData contents
      console.log("FormData payload:", payload);
      if (file) console.log("FormData file:", file.name);
  
      const response = await fetch(
        `http://localhost/DFXDMSLite/dfxapi_demo/DMS/Documents/Query/75`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(payload),
          mode: "cors"  // No need for headers; FormData automatically sets multipart/form-data
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      const data = await response.json();
      set({ documentsList: data.documents });
  
    } catch (error) {
      console.error("Error fetching documents:", error);
      set({ apiError: error.message });
    }
  },
  

  /**
   * Toggles an item in the selectedTabs category.
   * @param {string} category - Category name.
   * @param {Object} item - Item to toggle.
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

  /**
   * Sets the user object.
   * @param {Object} user - User data.
   */
  setUser: (user) => set({ user }),

  /**
   * Clears the user data.
   */
  clearUser: () => set({ user: null }),
}));

export default useStore;
