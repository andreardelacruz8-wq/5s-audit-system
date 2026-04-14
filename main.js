const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 768,
        icon: path.join(__dirname, 'assets', 'icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        show: false,
        backgroundColor: '#2c3e50'
    });

    // Load the index.html
    mainWindow.loadFile('index.html');

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Open DevTools in development
        if (process.env.NODE_ENV === 'development') {
            mainWindow.webContents.openDevTools();
        }
    });

    // Create custom menu
    createMenu();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createMenu() {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Audit',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.send('new-audit');
                    }
                },
                {
                    label: 'Save Current Quarter',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        mainWindow.webContents.send('save-current');
                    }
                },
                {
                    label: 'Load Audit',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        mainWindow.webContents.send('load-audit');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Export to Excel',
                    accelerator: 'CmdOrCtrl+E',
                    click: () => {
                        mainWindow.webContents.send('export-excel');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Print Report',
                    accelerator: 'CmdOrCtrl+P',
                    click: () => {
                        mainWindow.webContents.print();
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: 'Alt+F4',
                    role: 'quit'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
                { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
                { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectAll' }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'First Quarter',
                    accelerator: 'Ctrl+1',
                    click: () => {
                        mainWindow.webContents.send('switch-quarter', 1);
                    }
                },
                {
                    label: 'Second Quarter',
                    accelerator: 'Ctrl+2',
                    click: () => {
                        mainWindow.webContents.send('switch-quarter', 2);
                    }
                },
                {
                    label: 'Third Quarter',
                    accelerator: 'Ctrl+3',
                    click: () => {
                        mainWindow.webContents.send('switch-quarter', 3);
                    }
                },
                {
                    label: 'Fourth Quarter',
                    accelerator: 'Ctrl+4',
                    click: () => {
                        mainWindow.webContents.send('switch-quarter', 4);
                    }
                },
                { type: 'separator' },
                { label: 'Reload', accelerator: 'CmdOrCtrl+R', role: 'reload' },
                { label: 'Force Reload', accelerator: 'Shift+CmdOrCtrl+R', role: 'forceReload' },
                { label: 'Toggle Developer Tools', accelerator: 'F12', role: 'toggleDevTools' },
                { type: 'separator' },
                { label: 'Toggle Full Screen', accelerator: 'F11', role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About 5S Audit System',
                    click: () => {
                        require('electron').dialog.showMessageBox({
                            type: 'info',
                            title: 'About 5S Audit System',
                            message: '5S Good Housekeeping Program Scoresheet\nVersion 1.0.0\n\nDigital audit system for quarterly 5S assessments.',
                            buttons: ['OK']
                        });
                    }
                },
                {
                    label: 'User Guide',
                    click: () => {
                        const { shell } = require('electron');
                        shell.openExternal('https://example.com/5s-guide');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Check for Updates',
                    click: () => {
                        mainWindow.webContents.send('check-updates');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});