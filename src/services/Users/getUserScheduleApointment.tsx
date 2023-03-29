import { relativeURI } from '../../helper/RelativeURI'

const uriRelative = relativeURI()
export const getUserScheduleApointment = async (userId: any) => {
    const uri = `${uriRelative}users/schedule/${userId}`
    try {
        const response = await fetch(
            uri, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
        const jsonObj = await Promise.resolve(response.json());
        console.log(jsonObj);
        return jsonObj
    } catch (error) {
        console.error(error);
    }
}