import { relativeURI } from '../../helper/RelativeURI'
const uriRelative = relativeURI()
export const getAllStock = async () => {
    const uri = `${uriRelative}admin/stock/all`
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