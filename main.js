const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

let mainWindow;
let splash;

function createSplashScreen() {
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    center: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  splash.loadFile("splash.html");
  splash.show();
}

function createMainWindow() {
  // Get the display size for full-screen on the primary display
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width,
    height,
    fullscreen: false, // Make the window full-screen
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "src", "splash", "splash1.html"));

  // When main window is ready, close the splash screen and show the main window
  mainWindow.once("ready-to-show", () => {
    if (splash) {
      splash.close();
    }
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  createSplashScreen();

  setTimeout(() => {
    createMainWindow();
  }, 3000); // Adjust the timeout as needed for the splash screen to display
});

// For macOS: Recreate a window if the dock icon is clicked and no windows are open
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.on("window-all-closed", () => {
  // Close the app completely on all platforms except macOS
  if (process.platform !== "darwin") {
    app.quit();
  }
});
