import { GETConfig, POSTConfig } from "./config.ts";

export class BaseAPI {
  basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async GET(
    path: string,
    queryString: string = "",
    config: RequestInit = GETConfig
  ): Promise<any> {
    const apiUrl = `${this.basePath}${path}${queryString}`;
    const fetchConfig = {
      ...config,
    };
    return await fetch(apiUrl, fetchConfig);
  }

  async POST(
    path: string,
    requireContent: Object,
    config: RequestInit = POSTConfig
  ): Promise<any> {
    const apiUrl = `${this.basePath}${path}`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(requireContent),
      ...config,
    };
    return await fetch(apiUrl, fetchConfig);
  }
}
