import { relativeURI } from '../../helper/RelativeURI'
const uriRelative = relativeURI()
export const getAllSales= async () => {
    const uri = `${uriRelative}admin/sales/all`
    try {
        const response = await fetch(
            uri, {
            method: 'GET',
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