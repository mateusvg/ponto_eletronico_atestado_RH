import { relativeURI } from '../../helper/RelativeURI'

const uriRelative = relativeURI()
export const getAllUsers = async (...props: any) => {
    const uri = `${uriRelative}users/all`
    try {
        const response = await fetch(
            uri, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
        const jsonObj = await response.json();
        return jsonObj
    } catch (error) {
        console.error(error);
    }
}