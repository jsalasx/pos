export interface Order {
  orderDetail: DetailOrder[]
  client: Client
  clientId: number
  description: string
  id: number
  subtotal: number
  taxes: number
  total: number
  createdAt: string
  updatedAt: string
}

export interface CreateNewOrder {
  orderDetail: DetailOrderNewOrder[]
  client: Client
  clientId?: number
  description?: string
  subtotal: number
  taxes: number
  total: number
  createdAt: string
  updatedAt: string
}
export interface DetailOrder {
    article: Article
    id: number
    quantity: number
    totalPrice: number
    unitPrice: number
}
export interface DetailOrderNewOrder {
    id?: number
    article: Article
    quantity: number
    totalPrice: number
    unitPrice: number
}
import { ApiResponseDto } from './apiResponse/apiResponse.dto';
import { Article } from './article.service'
import { Client } from './client.service'

const OrderService = {
  getAll: async (): Promise<ApiResponseDto<Order[]>> => {
    const res = await fetch('http://localhost:8080/v1/purchaseOrder');
    return res.json()
  },

  save: async (order : any): Promise<ApiResponseDto<Order>> => {
    const res =  await fetch('http://localhost:8080/v1/purchaseOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order),
    
    });
    return res.json();
  },

   update: async (order : any): Promise<ApiResponseDto<Order>> => {
    const res =  await fetch('http://localhost:8080/v1/purchaseOrder/' + order.id.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order),
    
    });
    return res.json();
  },
    getOneById: async (id: number): Promise<ApiResponseDto<Order>> => {
        const res = await fetch('http://localhost:8080/v1/purchaseOrder/'+ id.toString());
        return res.json()
    },

    delete: async (id: number): Promise<ApiResponseDto<any>> => {
    const res = await fetch('http://localhost:8080/v1/purchaseOrder/' + id.toString(), {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.json()
  }


}

export default OrderService;