import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error";
import { addCliente } from "../data/clientes";


export async function action({ request }) {
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);

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

    await addCliente(datos)
    
    return redirect("/")
}

function NuevoCliente() {

    const navigate = useNavigate()

    const errores = useActionData();

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
            <p>Indica todos los datos del cliente para registrarlo</p>
            <div className="flex justify-end">
                <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase" onClick={() => navigate(-1)}>Volver</button>
            </div>
            <div className="bg-white shadow rounded-md md:w-4/4 mx-auto px-5 py-10 mt-5">

                {errores?.length && errores.map( (error, i) => (<Error key={i}>{error}</Error>))}
                <Form method="POST" noValidate>
                    <Formulario />
                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                        value="Registrar cliente" />
                </Form>

            </div>
        </>
    )
}

export default NuevoCliente