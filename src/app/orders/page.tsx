'use client'
import OrderService, { Order } from "@/services/order.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "./modal";
import { convertirFechaString } from "@/utils/DateFormat";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Swal from 'sweetalert2'
export default function Page() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderSelected, setOrderSelected] = useState<Order>();
    const [isShown, setIsShown] = useState(false);

    const fetchOrders = async () => {
        const res = await OrderService.getAll();
        res.data.sort((a, b) => b.id - a.id);
        setOrders(res.data);
    };
    useEffect(() => {
        const fetchOrders = async () => {
            const res = await OrderService.getAll();
            res.data.sort((a, b) => b.id - a.id);
            setOrders(res.data);
        };

        fetchOrders();
    }, []);

    const deleteOrder = async (order: any) => {
        console.log(order.id)
        Swal.fire({
            title: "Esta seguro de eliminar la OC - " + order.id.toString() + "?",
            showCancelButton: true,
            confirmButtonText: "Save",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const res = await OrderService.delete(order.id)
                if (res.status == 200) {
                    Swal.fire("Eliminado!", "", "success");
                    fetchOrders();
                }
            } else if (result.isDenied) {
                //Swal.fire("Changes are not saved", "", "info");
            }
        });


    }

    const verDetalle = (order: Order) => {
        setIsShown(true);
        setOrderSelected(order);
        console.log(order.orderDetail)
    }

    return <>

        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-0">Ordenes de Compra </h1>
                    <p className="mt-2 text-sm text-gray-0">Lista de Ordenes de Compra</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href={"orders/new"}> <button type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Añadir Orden de Compra </button></Link>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-0 sm:pl-0">Id</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Cliente</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Descripcion</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Total</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Fecha Creación</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Fecha Actualizaciónn</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-0">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order) => {
                                    return (
                                        <tr key={order.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-0 sm:pl-0">OC - {order.id}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{order.client.name}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{order.description}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{order.total}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{convertirFechaString(order.createdAt)}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{convertirFechaString(order.updatedAt)}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
                                                <div className="grid gap-2 grid-cols-3">
                                                    <button onClick={e => verDetalle(order)}
                                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                        <EyeIcon className="h-6 w-6 text-gray-100" ></EyeIcon></button>
                                                    <Link href={"/orders/edit/" + order.id.toString()}><button
                                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                        <PencilIcon className="h-6 w-6 text-gray-100" ></PencilIcon></button>
                                                    </Link>

                                                    <button onClick={e => deleteOrder(order)}
                                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                        <TrashIcon className="h-6 w-6 text-gray-100" ></TrashIcon></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {isShown && <Modal order={orderSelected} setIsShown={setIsShown} />}
    </>
}


