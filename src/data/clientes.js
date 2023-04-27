export async function getClientes() {
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    const resultado = await respuesta.json();
    return resultado;
}

export async function getCliente(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const resultado = await respuesta.json();
    return resultado;
}

export async function addCliente(newclient) {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: "post",
            body: JSON.stringify(newclient),
            headers: {
                "content-type": "application/json"
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }

}

export async function updateCliente(id, datos) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json"
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }

}

export async function deleteCliente(id) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "DELETE",
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }
}