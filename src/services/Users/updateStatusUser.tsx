var relativeURI2 = require('../../helper/RelativeURI').relativeURI()
export const updateStatusUser = async (...props: any) => {
    const uri = `${relativeURI2}users/status/update`
    try {
        const response = await fetch(
            uri, {
            method: 'POST',
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