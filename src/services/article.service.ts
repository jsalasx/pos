export interface Article {
  id: number
  name: string
  price: number
  tax: number
}
import { ApiResponseDto } from './apiResponse/apiResponse.dto';

const ArticleService = {
  getAll: async (): Promise<ApiResponseDto<Article[]>> => {
    const res = await fetch('http://localhost:8080/v1/articles');
    return res.json()
  },

  save: async (Article : any): Promise<ApiResponseDto<Article>> => {
    const res =  await fetch('http://localhost:8080/v1/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Article),
    
    });
    return res.json();
  }
};

export default ArticleService;