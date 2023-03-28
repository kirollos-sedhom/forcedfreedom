const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const screenshot = require("desktop-screenshot");

let mainWindow,
  count = 0;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
  });

  mainWindow.loadFile("index.html");
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    console.log("hello from main");
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("ready", () => {
  setInterval(captureScreenshot, 3000);
});

function captureScreenshot() {
  console.log(`Capturing Count: ${count}`);
  screenshot("screenshot.png", function (error, complete) {
    if (error) {
      console.log("Screenshot failed", error);
    } else {
      console.log("Screenshot succeeded");
      count++;

      // Reload the HTML content of the main window after taking a screenshot
      mainWindow.reload();
    }
  });
}
