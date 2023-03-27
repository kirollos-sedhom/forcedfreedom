const { app, BrowserWindow, webContents, ipcRenderer } = require("electron");
const path = require("path");
const fs = require("fs");
const screenshot = require("desktop-screenshot");

let mainWindow,
  count = 0;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
  mainWindow.once("ready-to-show", mainWindow.show);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  console.log("hello from main");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
app.on("ready", () => {
  setInterval(captureScreenshot, 3000);
});

// Helper function to convert a bitmap to a PNG buffer
function captureScreenshot() {
  console.log(`Capturing Count: ${count}`);
  screenshot("screenshot.png", function (error, complete) {
    if (error) {
      console.log("Screenshot failed", error);
    } else {
      console.log("Screenshot succeeded");
      count++;
      //code to classify

      //
    }
  });
}
