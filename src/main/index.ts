import { app, BrowserView, BrowserWindow } from "electron";
import { startup } from "../util/constants";
import { settings, setupView } from "../util/helpers";

settings.numRows = 1;
settings.numCols = 1;

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    title: "window",
    width: startup.width,
    height: startup.height,
  });
  const views = [] as BrowserView[];

  views.push(
    setupView(win, (width, height) => ({
      x: 0,
      y: 0,
      width: Math.floor(width / settings.numRows),
      height: Math.floor(height / settings.numCols),
    }))
  );

  // views.push(
  //   setupView(win, (width, height) => ({
  //     x: Math.floor(width / settings.numRows),
  //     y: 0,
  //     width: Math.floor(width / settings.numRows),
  //     height: Math.floor(height / settings.numCols),
  //   }))
  // );

  // views.push(
  //   setupView(win, (width, height) => ({
  //     x: 0,
  //     y: Math.floor(height / settings.numCols),
  //     width: Math.floor(width / settings.numRows),
  //     height: Math.floor(height / settings.numCols),
  //   }))
  // );

  // views.push(
  //   setupView(win, (width, height) => ({
  //     x: Math.floor(width / settings.numRows),
  //     y: Math.floor(height / settings.numCols),
  //     width: Math.floor(width / settings.numRows),
  //     height: Math.floor(height / settings.numCols),
  //   }))
  // );
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("widevine-ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
