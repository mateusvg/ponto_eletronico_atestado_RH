import { relativeURI } from '../../helper/RelativeURI'

const uriRelative = relativeURI()
export const getUserPointByDate = async (userId: any) => {
    const uri = `${uriRelative}users/point/date/${userId}`
    try {
        await fetch(
            uri, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
    } catch (error) {
        console.error(error);
    }
}