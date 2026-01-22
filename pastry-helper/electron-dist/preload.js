"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('foodApi', {
    loadFridgeItems: () => electron_1.ipcRenderer.invoke('load-fridge-items'),
    saveFridgeItems: (items) => electron_1.ipcRenderer.invoke('save-fridge-items', items),
});
electron_1.contextBridge.exposeInMainWorld('categoryApi', {
    loadCategories: () => electron_1.ipcRenderer.invoke('load-categories'),
    saveCategories: (items) => electron_1.ipcRenderer.invoke('save-categories', items),
});
