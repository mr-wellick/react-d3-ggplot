import { createContext } from "react";

export interface IAppContext {
  data: { [key: string]: string | number | Date }[];
  aes: [string, string];
  dimensions: { width: number; height: number; padding: number };
}

const ChartContext = createContext<IAppContext>({
  data: [],
  aes: ["", ""],
  dimensions: { width: window.innerWidth, height: window.innerHeight, padding: 50 }
});

export default ChartContext;
