import { createContext } from "react";

export interface IContext {
  data: any[];
  aes: string[];
  dimensions: { width: number; height: number; padding: number };
}

const ChartContext = createContext<IContext>({
  data: [],
  aes: ["", ""],
  dimensions: { width: window.innerWidth, height: window.innerHeight, padding: 50 }
});

export default ChartContext;
