
// import { enableLiveReload } from 'electron-compile';
import path from 'path';
import electron from 'electron';
import vueDevTools from 'vue-devtools';

const { app, BrowserWindow } = electron;

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
});

// enableLiveReload();

const url = require('url');

let mainWindow;

// require('lasso').configure({
//     outputDir: './src/static',
//     urlPrefix: './static',
//     fingerprintsEnabled: false,
//     // minify: false,
//     // bundlingEnabled: false,
//     plugins: [
//         'lasso-marko',
//         // 'lasso-less',
//     ],
// });

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        titleBarStyle: 'hiddenInset',
        show: false,
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.webContents.openDevTools();
    vueDevTools.install();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
    app.quit();
    // }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
