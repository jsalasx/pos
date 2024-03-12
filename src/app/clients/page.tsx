'use client'
import ArticleService, { Article } from "@/services/article.service";
import ClientService, { Client } from "@/services/client.service";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        const fetchClient = async () => {
            const res = await ClientService.getAll();
            res.data.sort((a, b) => b.id - a.id);
            setClients(res.data);
        };

        fetchClient();
    }, []); 

    return <>

        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-0">Clientes </h1>
                    <p className="mt-2 text-sm text-gray-0">Lista de Clientes</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href={"clients/new"}> <button type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Añadir Cliente </button></Link>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-0 sm:pl-0">Id</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Identificación</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Nombre</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Dirección</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Teléfono</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {clients.map((client) => {
                                    return (
                                        <tr key={client.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-0 sm:pl-0">{client.id}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.identification}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.name}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.address}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.telephone}</td>
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


