"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const foodStorageFilePath = path.join(os.homedir(), '.pastry-helper', 'fridge.json');
const categoryStorageFilePath = path.join(os.homedir(), '.pastry-helper', 'categories.json');
function ensureStorageFile() {
    const dir = path.dirname(foodStorageFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(foodStorageFilePath)) {
        fs.writeFileSync(foodStorageFilePath, '[]');
    }
    if (!fs.existsSync(categoryStorageFilePath)) {
        fs.writeFileSync(categoryStorageFilePath, '[]');
    }
}
electron_1.ipcMain.handle('load-fridge-items', () => {
    const content = fs.readFileSync(foodStorageFilePath, 'utf-8');
    return JSON.parse(content);
});
electron_1.ipcMain.handle('save-fridge-items', (_event, items) => {
    fs.writeFileSync(foodStorageFilePath, JSON.stringify(items));
});
electron_1.ipcMain.handle('load-categories', () => {
    const content = fs.readFileSync(categoryStorageFilePath, 'utf-8');
    return JSON.parse(content);
});
electron_1.ipcMain.handle('save-categories', (_event, items) => {
    fs.writeFileSync(categoryStorageFilePath, JSON.stringify(items));
});
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 900,
        height: 600,
        titleBarStyle: 'hidden',
        ...(process.platform !== 'darwin' ? { titleBarOverlay: {
                color: 'rgba(0, 0, 0, 0)',
                symbolColor: '#000000',
                height: 43,
            } } : {}),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    win.loadFile('dist/pastry-helper/browser/index.html');
}
electron_1.app.whenReady().then(() => {
    ensureStorageFile();
    createWindow();
});
