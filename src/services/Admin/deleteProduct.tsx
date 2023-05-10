import { relativeURI } from '../../helper/RelativeURI'
const uriRelative = relativeURI()
export const deleteProduct = async (id:any) => {
    const uri = `${uriRelative}admin/stock/delete/${id.idStock}`
    try {
        const response = await fetch(
            uri, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },

        })
        const jsonObj = await response.json();
        return jsonObj
    } catch (error) {
        console.error(error);
    }
};