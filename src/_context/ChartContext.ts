import { createContext } from "react";

interface IAppContext {
  data: any[];
  aes: [string, string];
  width: number;
  height: number;
  padding: number;
}

const ChartContext = createContext<IAppContext | null>(null);

export default ChartContext;
