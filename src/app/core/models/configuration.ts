interface Api {
    baseUrl: string;
  }
  
  export interface Configuration {
    api: Api;
  }
  
  export type Environment =  {
    env: 'development' | 'production';
  }
  