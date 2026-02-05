import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('foodApi', {
  loadFridgeItems: () => ipcRenderer.invoke('load-fridge-items'),
  saveFridgeItems: (items: any[]) =>
    ipcRenderer.invoke('save-fridge-items', items),
});

contextBridge.exposeInMainWorld('categoryApi', {
  loadCategories: () => ipcRenderer.invoke('load-categories'),
  saveCategories: (items: any[]) =>
    ipcRenderer.invoke('save-categories', items),
});