export interface ISettings {
  numRows: number;
  numCols: number;
}

export type IDimensionsSelector = (
  width: number,
  height: number
) => Electron.Rectangle;
