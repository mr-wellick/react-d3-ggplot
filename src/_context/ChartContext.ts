import { createContext } from "react";

interface IDimensions {
  width: number;
  height: number;
  padding: number;
}

export interface IAppContext {
  data: any[];
  aes: [string, string];
  dimensions: IDimensions;
}

const ChartContext = createContext<IAppContext | null>(null);

export default ChartContext;
