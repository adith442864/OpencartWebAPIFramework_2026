import {APIRequestContext} from '@playwright/test'


export class ApiHelper {

    private readonly request:APIRequestContext
    private readonly baseURL : string

    constructor(request:APIRequestContext, baseURL:string){
        this.request = request
        this.baseURL = baseURL
    }

    //GET
    async get(endpoint: string, headers?:Record<string,string>) {
        const response = await this.request.get(`${this.baseURL}${endpoint}`, 
          { headers: headers });
        //onsole.log(response);
        return {
          status: response.status(),
          body: await response.json(),
          headers: response.headers()
          
        }
    }
    //POST
    async post(endpoint: string, data: object, headers?:Record<string,string>) {
        const response = await this.request.post(`${this.baseURL}${endpoint}`, 
          { data, headers: headers })
        return {
          status: response.status(),
          body: await response.json(),
          headers: response.headers()
          
        }
    }
    //PUT
    async put(endpoint: string, data: object, headers?:Record<string,string>) {
        const response = await this.request.put(`${this.baseURL}${endpoint}`, { data, headers: headers })
        return {
          status: response.status(),
          body: await response.json(),
          headers: response.headers()
        }
    }

    //DELETE
    async delete(endpoint: string, headers?:Record<string,string>) {
        const response = await this.request.delete(`${this.baseURL}${endpoint}`, { headers: headers })
        return {
          status: response.status()
        }
    }
    //PATCH
    async patch(endpoint: string, data: object, headers?:Record<string,string>) {
        const response = await this.request.patch(`${this.baseURL}${endpoint}`, { data, headers: headers })
        return {
          status: response.status(),
          body: await response.json(),
          headers: response.headers()
        }
    }





}




