import { relativeURI } from '../../helper/RelativeURI'

const uriRelative = relativeURI()
export const getPointDateByUserAllHistory = async (userId: any) => {
    const uri = `${uriRelative}users/point/date/all/${userId}`
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