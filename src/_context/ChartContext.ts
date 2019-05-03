import { createContext } from "react";

export interface IAppContext<T> {
  data: T[];
  aes: [string, string];
  dimensions: { width: number; height: number; padding: number };
}

const ChartContext = createContext<IAppContext<string | number | object>>({
  data: [],
  aes: ["", ""],
  dimensions: { width: window.innerWidth, height: window.innerHeight, padding: 50 }
});

export default ChartContext;
