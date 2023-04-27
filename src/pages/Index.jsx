import { useLoaderData } from "react-router-dom"
import Cliente from "../components/Cliente";
import { getClientes } from "../data/clientes";


export function loader() {
    const clientes = getClientes()
    return clientes
}

const Index = () => {

    const clientes = useLoaderData();
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
            <p>Administra tus clientes</p>

            {clientes.length ? (
                <table className="w-full bg-white shadow, mt-5 table-auto text-left">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-6">Cliente</th>
                            <th className="p-6">Contacto</th>
                            <th className="p-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map(cliente => (
                                <Cliente 
                                    key={cliente.id}
                                    cliente={cliente}
                                />
                            ))
                        }
                    </tbody>


                </table>
            ) : (
                <p>No hay clientes aún</p>
            )}
        </>

    )
}

export default Index