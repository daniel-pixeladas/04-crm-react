import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario";
import { getCliente, updateCliente } from "../data/clientes"
import Error from "../components/Error"


export async function loader({ params }) {
    const cliente = await getCliente(params.clienteId);
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: "El cliente no existe"
        })
    }
    return cliente
}

export async function action({request, params}){
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    console.log(datos)

    // Validación
    const errores = []
    if (Object.values(datos).includes('')){
        errores.push("Todos los campos son obligatorios")
    }

    let regexEmail = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regexEmail.test(datos.email)) {
        errores.push("El email no es válido")
    }

    if (Object.keys(errores).length){
        return errores;
    }

    await updateCliente(params.clienteId, datos)
    
    return redirect("/")

}

function EditarCliente() {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p>Indica todos los datos del cliente para guardarlo</p>
            <div className="flex justify-end">
                <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase" onClick={() => navigate(-1)}>Volver</button>
            </div>
            <div className="bg-white shadow rounded-md md:w-4/4 mx-auto px-5 py-10 mt-5">
                {errores?.length && errores.map((error, i) => (<Error key={i}>{error}</Error>))}
                <Form method="POST" 
                    noValidate>
                    <Formulario cliente={cliente}/>
                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                        value="Guardar cliente" />
                </Form>

            </div>
        </>
    )
}

export default EditarCliente