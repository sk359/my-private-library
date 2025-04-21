import { Injectable } from '@angular/core';

/**
 * Service that provides wrappers around the fetch function for 
 * methods GET, POST, PUT and DELETE 
 */


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  async get(url: string, params?: any) : Promise<any> {
    let urlObject = new URL(url);
    if (params) {
      Object.keys(params).forEach(key => urlObject.searchParams.append(key, params[key]));
    }    
    try {
      const response = await fetch(url, {method: "GET", headers: {"Content-Type": "application/json"}});
      const json = await response.json();
      return json;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async post(url: string, data: any): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const myRequest = new Request(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders,
    });

    try {
      const response = await fetch(myRequest);
      const json = await response.json();
      return json;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async put(url: string, data: any): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const myRequest = new Request(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: myHeaders,
    });

    try {
      const response = await fetch(myRequest);
      const json = await response.json();
      return json;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async delete(url: string, data?: any): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let body = null;
    if (data) {
      body = JSON.stringify(data);
    }

    const myRequest = new Request(url, {
      method: "DELETE",
      body: body,
      headers: myHeaders,
    });

    try {
      const response = await fetch(myRequest);
      const json = await response.json();
      return json;
    } catch (error: any) {
      console.error(error.message);
    }
  }
  
}
