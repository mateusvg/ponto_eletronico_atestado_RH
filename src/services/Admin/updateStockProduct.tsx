var relativeURI2 = require('../../helper/RelativeURI').relativeURI()
export const updateStockProduct = async (...props: any) => {
    console.log(JSON.stringify(props))
    const uri = `${relativeURI2}admin/stock/update`
    try {
        const response = await fetch(
            uri, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props[0]),
        })
        if (response.ok) {
            console.log("Formulario enviado")
            return ("Formulario Enviado")
        }
    } catch (error) {
        console.error(error);
    }
}