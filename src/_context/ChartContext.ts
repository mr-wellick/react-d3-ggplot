import { createContext } from "react";

interface IDimensions {
  width: number;
  height: number;
  padding: number;
}

interface IAppContext {
  data: any[];
  aes: [string, string];
  dimension: IDimensions;
}

const ChartContext = createContext<IAppContext | null>(null);

export default ChartContext;
