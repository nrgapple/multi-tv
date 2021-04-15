import { BrowserView, BrowserWindow } from "electron";
import { startup } from "./constants";
import { IDimensionsSelector, ISettings } from "./types";

export const settings: ISettings = {
  numRows: 2,
  numCols: 2,
};

const setSize = (
  win: BrowserWindow,
  dim: IDimensionsSelector,
  view: BrowserView
) => {
  const [width, height] = win.getContentSize();
  view.setBounds(dim(width, height));
};

export const setupView = (
  win: BrowserWindow,
  dim: IDimensionsSelector
): BrowserView => {
  const view = new BrowserView({
    webPreferences: {
      plugins: true,
      devTools: startup.devTools,
    },
  });
  win.addBrowserView(view);
  const onResize = () => setSize(win, dim, view);
  onResize();
  view.webContents.loadURL(startup.url, {
    userAgent: startup.userAgent,
  });
  // console.log("old", view.webContents.userAgent);
  // const ua = view.webContents.userAgent;
  // view.webContents.userAgent = ua.replace(/Electron\/.* /, "");
  // console.log("ne", view.webContents.userAgent);
  win.on("resize", onResize);
  win.on("closed", () => {
    win.off("resize", onResize);
  });
  return view;
};
