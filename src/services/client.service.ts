export interface Client {
  address: string
  id: number
  identification: string
  name: string
  telephone: string
}

export interface ClientToCrete {
  address: string
  id: number
  identification: string
  name: string
  telephone: string
}
import { ApiResponseDto } from './apiResponse/apiResponse.dto';

const ClientService = {
  getAll: async (): Promise<ApiResponseDto<Client[]>> => {
    const res = await fetch('http://localhost:8080/v1/clients');
    return res.json()
  },

  save: async (client : any): Promise<ApiResponseDto<Client>> => {
    const res =  await fetch('http://localhost:8080/v1/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client),
    
    });
    return res.json();
  }
}

export default ClientService;