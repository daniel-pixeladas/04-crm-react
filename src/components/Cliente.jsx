import { Form, useNavigate, redirect } from "react-router-dom";
import { deleteCliente } from "../data/clientes";

export async function action ({params}){
    await deleteCliente(params.clienteId)
    return redirect('/')
}


function Cliente({ cliente }) {
    const { nombre, empresa, email, telefono, id, notas } = cliente;

    const navigate = useNavigate();

    return (
        <tr>
            <td className="p-6 space-y-2">
                <p className="text-2xl">{nombre}</p>
                <p>{empresa}</p>
            </td>
            <td className="p-6">
                <p className="text-gray-600">EMAIL: <a href={`mailto:${email}`}>{email}</a></p>
                <p className="text-gray-600">TELÉFONO: <a href={`tel:${telefono}`}>{telefono}</a></p>
            </td>
            <td className="p-6 flex gap-3">
                <button type="button"
                    className="text-blue-600 hover:text-blue-800 uppercase font-bold"
                    onClick={() => navigate(`/clientes/${id}/editar`)}>
                    Editar
                </button>
                <Form
                    method="POST"
                    onSubmit={(e) => {
                        if (!confirm('¿Estás seguro de eliminar este cliente?')) {
                            e.preventDefault();
                        }
                    }}
                    action={`/clientes/${id}/eliminar`}>
                    <button type="submit" className="text-red-600 hover:text-red-800 uppercase font-bold">Eliminar</button>
                </Form>
                
            </td>
        </tr>
    )
}

export default Cliente