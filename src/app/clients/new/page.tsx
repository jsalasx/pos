'use client'
import { ApiResponseDto } from '@/services/apiResponse/apiResponse.dto'
import { Article } from '@/services/article.service'
import { FormEvent, useEffect, useState } from 'react'
import { redirect } from 'next/navigation';
import ClientService, { Client } from '@/services/client.service';
export default function Home() {
    const [client, setClient] = useState<Client>();
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const client = {
        identification: formData.get('identification'),
        name: formData.get('name'),
        address: formData.get('address'),
        telephone: formData.get('telephone'),
    }
 
    // Handle response if necessary
    const data: ApiResponseDto<Client> = await ClientService.save(client)

    if (data.status == 200) {
        setClient(data.data);
    }

  }
    useEffect(()=>{
        if (client?.id !== undefined){
            redirect('/clients');
        }
    }, [client])

    return <>
        <h1>Nuevo Cliente</h1>
        <form onSubmit={onSubmit}>
            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                        <div className="">
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
                                        placeholder="Nombre de cliente"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="identification" className="block text-sm font-medium leading-6 text-white">
                                Identificación
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="identification"
                                        id="identification"
                                        autoComplete="identification"
                                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Cédula o RUC"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                                Teléfono
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="telephone"
                                        id="telephone"
                                        autoComplete="telephone"
                                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Telefono del cliente"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                                Dirección
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        autoComplete="address"
                                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Direccion del Cliente"
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