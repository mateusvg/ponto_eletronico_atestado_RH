import { relativeURI } from '../../helper/RelativeURI'
const uriRelative = relativeURI()
export const deletePersonStatusCertificateId = async (id:any) => {
    const uri = `${uriRelative}admin/user/status/certificate/delete/${id.idMedical}`
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