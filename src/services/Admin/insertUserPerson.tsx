import { relativeURI } from '../../helper/RelativeURI'

const uriRelative = relativeURI()
export const insertNewUserPerson = async (...props: any) => {
    const uri = `${uriRelative}admin/user/insert`
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
        const jsonObj = await response.json();
        return jsonObj
    } catch (error) {
        console.error(error);
    }
}