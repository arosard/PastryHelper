import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

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

ipcMain.handle('load-fridge-items', () => {
	const content = fs.readFileSync(foodStorageFilePath, 'utf-8');
	return JSON.parse(content);
});

ipcMain.handle('save-fridge-items', (_event, items) => {
	fs.writeFileSync(foodStorageFilePath, JSON.stringify(items));
});

ipcMain.handle('load-categories', () => {
	const content = fs.readFileSync(categoryStorageFilePath, 'utf-8');
	return JSON.parse(content);
});

ipcMain.handle('save-categories', (_event, items) => {
	fs.writeFileSync(categoryStorageFilePath, JSON.stringify(items));
});

function createWindow() {
	const win = new BrowserWindow({
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

app.whenReady().then(() => {
	ensureStorageFile();
	createWindow();
});