import { Order } from "@/services/order.service";

interface Props {
    order?: Order
    setIsShown: (isShown: boolean) => void
}

export default function Modal({ order, setIsShown }: Props) {
    const setIsShownModal = () => {
        setIsShown(false);
    }
    if (order) {
        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                <div className="p-8 border w-96 shadow-lg rounded-md bg-gray-900">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-0">OC - {order.id} </h3>
                        <div className="mt-2 px-7 py-3">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">ID</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Nombre</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Cantidad</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Precio Unitario</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {order.orderDetail.map((det) => {
                                        return (<tr key={det.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{det.id}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{det.article.name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{det.quantity}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{det.unitPrice}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{det.totalPrice}</td>
                                                </tr>)
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={setIsShownModal}
                                className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Cerrar
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}