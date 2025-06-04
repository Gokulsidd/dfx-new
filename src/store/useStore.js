// store/useStore.js
import { create } from "zustand";
import {
  getMockCollections,
  getMockTabsResponse,
  getMockUploadDocumentResponse,
  mockTabsData,
} from "@/lib/constants";
import {
  fetchUser,
  fetchDocumentData,
  fetchDocumentsList,
  fetchTabsList,
  uploadFiles,
  saveWorkSpaceCollection,
} from "@/services/api";

const useStore = create((set, get) => ({
  user: null,
  configs: {},
  apiError: null,
  loading: true,
  dashboardId: null,

  //tabs
  tabsList: null,
  selectedTabs: { options: [] },

  //documents
  documentsList: null,
  selectedDocumentId: null,
  documentData: null,

  //UI ( dialogs and sidebar )
  isAddSourceDialogOpen: false,
  isUploadDocumentDialogOpen: false,
  isDeleteCollectionDialogOpen: false,
  isEditCollectionDialogOpen: false,
  isSourcesDialogOpen: false,
  isCollapsed: true,

  //collections ( existing collection / new collection )
  collections: [],
  selectedCollection: null,
  newCollectionName: "",
  showNewCollectionInput: false,

  //tags (search doc ID tags)
  tags: [],
  collectionTags: [],

  //drag-and-drop
  uploadedFiles: [],

  // Setters
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setConfigs: (data) => set({ configs: data }),
  setDashboardId: (id) => set({ dashboardId: id }),

  setAddSourceDialog: (value) => set({ isAddSourceDialogOpen: value }),
  setUploadDocumentDialog: (value) =>
    set({ isUploadDocumentDialogOpen: value }),
  setDeleteCollectionDialog: (value) => set({ isDeleteCollectionDialogOpen: value }),
  setEditCollectionDialog: (value) => set({ isEditCollectionDialogOpen: value }),
  setIsSourcesDialogOpen: (value) => set({ isSourcesDialogOpen: value }),

  setTags: (values) => set({ tags: values }),
  setCollectionTags: (values) => set({ collectionTags: values }),

  sortCollections: (collections, isSorted) => {
    const updatedCollections = isSorted
      ? [...collections].sort((a, b) =>
          b.workspaceName.localeCompare(a.workspaceName)
        ) 
      : [...collections].sort((a, b) =>
          a.workspaceName.localeCompare(b.workspaceName)
        );

    set(() => ({ collections: updatedCollections }));
  },

  setSelectedCollection: (value) => set({ selectedCollection: value }),
  setNewCollectionName: (value) => set({ newCollectionName: value }),
  setShowNewCollectionInput: (value) =>
    set({ showNewCollectionInput: value, collectionTags: [] }),

  setUploadedFiles: (values) => set({ uploadedFiles: values }),

  setIsCollapsed: (value) =>
    set((state) => {
      let updatedTabs = { ...state.selectedTabs };

      if (!value && updatedTabs.options.length >= 3) {
        updatedTabs.options = updatedTabs.options.filter(
          (tab) => tab.name !== "Chat"
        );
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

      const shouldCollapse =
        updatedItems.length === 3 ? true : state.isCollapsed;

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
    const { tabsList, selectedTabs } = get();

    if (!id) {
      set({
        selectedDocumentId: null,
        documentData: null,
        apiError: null,
        selectedTabs: { options: [] },
        isCollapsed: true,
      });
      return;
    }

    // Reset the state
    set({
      selectedDocumentId: id,
      documentData: null,
      apiError: null,
      selectedTabs: {
        options:
          id && selectedTabs?.options.length === 0
            ? tabsList?.filter(
                (item) => item.name === "Preview" || item.name === "Chat"
              ) || []
            : selectedTabs?.options,
      },
      isCollapsed: true,
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

  setDocumentsList: async (ids = [], columnDetailMasterId) => {
    set({ documentsList: null, apiError: null });

    if (!ids.length) {
      set({ apiError: "IDs are required" });
      return;
    }

    try {
      const res = await fetchDocumentsList(ids, columnDetailMasterId);
      set({
        selectedDocumentId: null,
        selectedTabs: { options: [] },
        documentsList: res.data.Documents,
        isCollapsed: true,
      });
      return res;
    } catch (err) {
      set({ apiError: err.message });
    }
  },


  fetchTabsListForDashboard: async () => {
    set({ tabsList: null, apiError: null });

    const dashboardId = get().dashboardId;

    if (!dashboardId) {
      set({ apiError: "Dashboard ID is required" });
      return;
    }

    try {
      // const res = await fetchTabsList(dashboardId);
      const res = await getMockTabsResponse();
      set({ tabsList: res?.data.dashboardPageColumn });
      console.log(tabsList);
    } catch (err) {
      set({ apiError: err.message });
    }
  },

  uploadFilesFromDnD: async (files) => {
    set({ documentsList: null, apiError: null });
    if (files.length != 0) {
      try {
        // const res = await uploadFiles(files);
        const res = await getMockUploadDocumentResponse();
        console.log(res?.data.DocumentList, "pppppppppppppppppppp");
        set({ documentsList: res?.data.DocumentList });
        return res;
      } catch (error) {
        set({ apiError: error.message });
      }
    }
  },

  getWorkspaceCollections: async () => {
    set({ collections: [], apiError: null });

    try {
      const res = getMockCollections();
      // const res = await fetchWorkspaceCollections()
      set({ collections: res.workspaces });
      return res.workspaces;
    } catch (error) {
      set({ apiError: error.message });
    }
  },

  saveWorkSpaceCollection: async (
    tags,
    workspaceId,
    workspaceName,
    isNew,
    userId,
    workSpace
  ) => {
    set({ apiError: null });

    const newInputTags = get().tags;
    const collectionTags = get().collectionTags;

    const updatedExistingWorkspaceDocuments = workSpace?.documents.map(
      (doc) => {
        if (!collectionTags.includes(doc.documentID)) {
          return { ...doc, status: "I" };
        }
        return doc;
      }
    );

    const NewDocuments = newInputTags?.map((tag, index) => {
      return {
        id: -1,
        workspaceId: -1,
        status: "A",
        documentID: tag,
        createdOn: "2025-05-28T20:36:40.327Z",
        modifiedOn: "2025-05-28T20:36:40.327Z",
      };
    });


    const payload = {
      id: isNew ? -1 : workSpace.id,
      workspaceName: workspaceName,
      userId: userId,
      status: "A",
      createdOn: "2025-05-28T20:36:40.327Z",
      modifiedOn: "2025-05-28T20:36:40.327Z",
      documents: isNew
        ? NewDocuments
        : [...updatedExistingWorkspaceDocuments, ...NewDocuments],
    };

    try {
      // const res = await saveWorkSpaceCollection(payload);
      console.log(payload, "this is sample payload of workspace");
      return;
    } catch (error) {}
  },

  deleteWorkSpaceCollection: async (workSpace) => {
      set({ apiError: null });

      const payload = {...workSpace, status: 'I'}

      try{
        // const res = await saveWorkSpaceCollection(payload)
        console.log(payload, 'delete payload')
        return
      } catch (error) {}
  },

  updateWorkSpaceCollection: async (newName, workSpace) => {
    set({ apiError: null  })
    const collections = get().collections
    const payload = {...workSpace, workspaceName: newName}

    try{
      // const res = await saveWorkSpaceCollection(payload)
      console.log(payload, 'edit payload')
      
      return
    }catch(err) {}
  },

  saveUploadedFilesToCollection: async (ids, workspaceId, workspaceName, isNew, userId, WorkSpace) => {
    set({ apiError: null })

    const uploadedDocuments = ids?.map((id) => {
      return {
        id: -1,
        workspaceId: isNew ? -1 : workspaceId,
        status: "A",
        documentID: id,
        createdOn: "2025-05-28T20:36:40.327Z",
        modifiedOn: "2025-05-28T20:36:40.327Z"
      }
    });

    const payload = {
      id: isNew ? -1 : workspaceId,
      workspaceName: workspaceName,
      userId: userId,
      status: "A",
      createdOn: "2025-05-28T20:36:40.327Z",
      modifiedOn: "2025-05-28T20:36:40.327Z",
      documents: uploadedDocuments,
    };

    try {
      // const res = await saveWorkSpaceCollection(payload);
      console.log(payload, "this is sample payload of upload documents save collection");
      return;
    } catch (error) {}
  }
}));

export default useStore;
