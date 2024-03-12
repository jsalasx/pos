'use client'
import { ApiResponseDto } from '@/services/apiResponse/apiResponse.dto'
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import OrderService, { CreateNewOrder, DetailOrder, DetailOrderNewOrder, Order } from '@/services/order.service';
import ClientService, { Client } from '@/services/client.service';
import Select, { StylesConfig } from 'react-select';
import ArticleService, { Article } from '@/services/article.service';
import { TrashIcon } from '@heroicons/react/16/solid';
import { convertirFecha } from '@/utils/DateFormat';
import { useRouter } from 'next/navigation';
interface OptionType {
    value: string;
    label: string;
}



const customStyles: StylesConfig<OptionType, false> = {
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    }),
    control: (provided) => ({
        ...provided,
        color: 'white !important',
        backgroundColor: 'black',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'black',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#7986CB' : state.isFocused ? '#3F51B5' : provided.backgroundColor,
        color: state.isFocused ? 'white' : provided.color,
        ':active': {
            ...provided[':active'],
            backgroundColor: state.isSelected ? '#3F51B5' : (state.isFocused ? '#3F51B5' : '#3F51B5'),
        },
    }),
};

export default function Home() {
    const [order, setOrder] = useState<Order>();
    const [currentOrder, setCurrentOrder] = useState<Order>()
    const [clients, setClients] = useState<Client[]>([]);
    const [quantity, setQuantity] = useState(0);
    const [clientsSelect, setClientsSelect] = useState<OptionType[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [articlesSelect, setArticlesSelect] = useState<OptionType[]>([]);
    const [detailOrder, setDetailOrder] = useState<DetailOrderNewOrder[]>([]);
    const [selected, setSelected] = useState<OptionType>();
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [total, setTotal] = useState(0.00);
    const [currentDescription, setCurrentDescription] = useState("");
    const [currentClientId, setCurrentClientId] = useState<OptionType>();

    const orderIdG = usePathname().split("/").pop();
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const clientIdAux = formData.get('clientId')?.toString();
        if (clientIdAux) {
            const clientIdInt = parseInt(clientIdAux);
            const clientAux = clients.find(x => x.id === clientIdInt);
            if (clientAux) {
                if (orderIdG) {
                    const detailOrderAux = detailOrder.map(det => {
                        const detail: DetailOrder = {
                            article: det.article,
                            id: det.id ? det.id : 0,
                            quantity: det.quantity,
                            totalPrice: det.totalPrice,
                            unitPrice: det.unitPrice
                        }
                        return detail;
                    })
                    const descripcionAux = formData.get('description')?.toString()
                    if (descripcionAux) {
                        const order: Order = {
                            id: parseInt(orderIdG),
                            clientId: clientIdInt,
                            description: descripcionAux,
                            orderDetail: detailOrderAux,
                            client: clientAux,
                            subtotal: total,
                            taxes: 0,
                            total: total,
                            createdAt: convertirFecha(new Date()),
                            updatedAt: convertirFecha(new Date())
                        }
                        console.log(order);
                        // // Handle response if necessary
                        const data: ApiResponseDto<Order> = await OrderService.update(order)
                        console.log(data)
                        if (data.status == 200) {
                            setOrder(data.data);
                        }
                    }
                }
            }
        }



    }
    useEffect(() => {
        if (order?.id !== undefined) {
            redirect('/orders');
        }
    }, [order])


    useEffect(() => {
        getClients();
        getArticles();
        getCurrentOrder();
    }, [])

    const getCurrentOrder = async () => {
        if (orderIdG) {
            const res = await OrderService.getOneById(parseInt(orderIdG));
            console.log("current order");
            console.log(res.data);
            setCurrentOrder(res.data)
            setCurrentDescription(res.data.description)
            setDetailOrder(res.data.orderDetail)
            const currentClientIdAux: OptionType = {
                value: res.data.client.id.toString(),
                label: res.data.client.name
            }
            calcTotal(res.data.orderDetail);
            setCurrentClientId(currentClientIdAux)
        }
    }

    const getClients = async () => {
        const res = await ClientService.getAll();
        res.data.sort((a, b) => b.id - a.id);
        console.log(res);
        setClients(res.data);
        const clientSelectAux = res.data.map(client => {
            return {
                value: client.id.toString(),
                label: client.name
            }
        });
        setClientsSelect(clientSelectAux);
    }

    const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value))
    }
    const getArticles = async () => {

        const res = await ArticleService.getAll();
        res.data.sort((a, b) => b.id - a.id);
        console.log(res);
        setArticles(res.data);
        const articlesSelectAux = res.data.map(art => {
            return {
                value: art.id.toString(),
                label: art.id.toString() + " - " + art.name + " - " + art.price.toString()
            }
        })
        setArticlesSelect(articlesSelectAux);
    }

    const addArticle = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("entro");
        console.log(selected);
        if (selected) {
            console.log("entro 2");
            const article = articles.find(x => x.id.toString() === selected.value);
            if (article) {
                const itemToAdd: DetailOrderNewOrder = {
                    article: article,
                    quantity: quantity,
                    totalPrice: quantity * article.price,
                    unitPrice: article.price
                }
                setDetailOrder(prevDetail => [...prevDetail, itemToAdd]);
                calcTotal([...detailOrder, itemToAdd])
            }
        }

    }

    const calcTotal = (detailAux: DetailOrderNewOrder[]) => {
        const totalPriceSum: number = detailAux.reduce((total, orderDetail) => total + orderDetail.totalPrice, 0);
        setTotal(totalPriceSum);
    }

    const handleArticleChange = (selectedOption: any) => {
        //event.preventDefault();
        console.log(selectedOption);
        setSelected(selectedOption);
    };

    const deleteRow = (rowIndex: number) => {
        let detailAux = [...detailOrder];
        detailAux.splice(rowIndex, 1);
        setDetailOrder(detailAux);
        calcTotal(detailAux)
    }

    return <>
        <h1>Editar OC - {orderIdG} </h1>
        <form onSubmit={onSubmit}>
            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                        <div className="sm:col-span-1 lg:col-span-1 md:col-span-1 col-span-1">
                            <label htmlFor="clientId" className="block text-sm font-medium leading-6 text-white">
                                Cliente
                            </label>
                            <div className="mt-2 text-white">
                                <Select
                                    styles={customStyles}
                                    className="text-white"
                                    classNamePrefix="select"
                                    defaultValue={clientsSelect[0]}
                                    isDisabled={isDisabled}
                                    isLoading={isLoading}
                                    isClearable={isClearable}
                                    isRtl={isRtl}
                                    isSearchable={isSearchable}
                                    name="clientId"
                                    id="clientId"
                                    value={currentClientId}
                                    options={clientsSelect}

                                />
                            </div>


                        </div>
                        <div className="sm:col-span-1 lg:col-span-1 md:col-span-1 col-span-1">
                            <label htmlFor="identification" className="block text-sm font-medium leading-6 text-white">
                                Descripción
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        value={currentDescription}
                                        autoComplete="description"
                                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Descripción de la orden de compra"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-1 lg:col-span-1 md:col-span-1 col-span-1">
                            <label htmlFor="identification" className="block text-sm font-medium leading-6 text-white">
                                Productos
                            </label>
                            <div className="mt-2">
                                <Select
                                    styles={customStyles}
                                    className="text-white"
                                    classNamePrefix="select2"
                                    defaultValue={articlesSelect[0]}
                                    isDisabled={isDisabled}
                                    isLoading={isLoading}
                                    isClearable={isClearable}
                                    isRtl={isRtl}
                                    isSearchable={isSearchable}
                                    name="productId"
                                    id="productId"
                                    options={articlesSelect}
                                    onChange={handleArticleChange}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-1 lg:col-span-1 md:col-span-1 col-span-1">
                            <label htmlFor="identification" className="block text-sm font-medium leading-6 text-white">
                                Cantidad
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="number"
                                        name="cantidad"
                                        id="cantidad"
                                        autoComplete="cantidad"
                                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Cantidad del producto"
                                        onChange={handleChangeQuantity}
                                    />
                                </div>
                                <button onClick={e => addArticle(e)} className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >Añadir</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>Total: {total}</h1>
                    </div>
                    <div className="sm:col-span-1 lg:col-span-2 md:col-span-2 col-span-1">
                        <div className="bg-gray-900">
                            <div className="mx-auto max-w-7xl">
                                <div className="bg-gray-900 py-10">
                                    <div className="px-4 sm:px-6 lg:px-8">
                                        <div className="sm:flex sm:items-center">
                                        </div>
                                        <div className="mt-8 flow-root">
                                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                                    <table className="min-w-full divide-y divide-gray-700">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                                                    Id
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                                    Nombre
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                                    Cantidad
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                                    Precio Unitario
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                                    Precio Total
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                                    Acciones
                                                                </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-800">
                                                            {detailOrder.map((det, index) => (
                                                                <tr key={index}>
                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                                                        {det.id}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{det.article.name}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{det.quantity}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{det.unitPrice}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{det.totalPrice}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300"> <TrashIcon onClick={e => deleteRow(index)} className="h-6 w-6 text-blue-500" />   </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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