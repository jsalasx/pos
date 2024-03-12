'use client'
import { ApiResponseDto } from '@/services/apiResponse/apiResponse.dto'
import { Article } from '@/services/article.service'
import { FormEvent, useEffect, useState } from 'react'
import { redirect } from 'next/navigation';
export default function Home() {
    const [article, setArticle] = useState<Article>();
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const article = {
        name: formData.get('name'),
        price: formData.get('price')
    }
    const response = await fetch('http://localhost:8080/v1/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article),
    })
 
    // Handle response if necessary
    const data: ApiResponseDto<Article> = await response.json()

    if (data.status == 200) {
        setArticle(data.data);
       
    }


  }
    useEffect(()=>{
        if (article?.id !== undefined){
            redirect('/articles');
        }
    }, [article])

    return <>
        <h1>Nuevo Artículo</h1>
        <form onSubmit={onSubmit}>
            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                                Nombre
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Producto 1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-white">
                                Precio
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        id="price"
                                        autoComplete="price"
                                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-white">
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Guardar
                </button>
            </div>

        </form>
    </>

}