import { createContext } from "react";

export interface IContext {
  data: any[];
  aes: string[];
  dimensions?: { width: number; height: number; padding: number };
  x_format?: string;
  y_format?: string;
}

const ChartContext = createContext<IContext>({
  data: [],
  aes: [],
  dimensions: { width: window.innerWidth, height: window.innerHeight, padding: 50 },
  x_format: "",
  y_format: ""
});

export default ChartContext;
