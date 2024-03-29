'use client'
import ArticleService, { Article } from "@/services/article.service";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await ArticleService.getAll();
            res.data.sort((a, b) => b.id - a.id);
            setArticles(res.data);
        };

        fetchArticles();
    }, []); 

    return <>

        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-0">Artículos </h1>
                    <p className="mt-2 text-sm text-gray-0">Lista de Artículos</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href={"articles/new"}> <button type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Añadir Artículo </button></Link>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-0 sm:pl-0">Id</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Nombre</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Precio</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {articles.map((article) => {
                                    return (
                                        <tr key={article.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-0 sm:pl-0">{article.id}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{article.name}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{article.price}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </>
}


