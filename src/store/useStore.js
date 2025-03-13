import { create } from "zustand";

const useStore = create((set) => ({
  selectedTabs: { options: [] },
  user: null,
  selectedDocumentId: null,
  setSelectedDocumentId: (selectedDocumentId) =>
    set((state) => {
      const updatedTabs =
        selectedDocumentId !== null ? { options: [{ id: 2, label: "Preview" }] } : { options: [] };
      return { selectedDocumentId, selectedTabs: updatedTabs };
    }),
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
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useStore;
