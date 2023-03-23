import { relativeURI } from '../../helper/RelativeURI'

const uriRelative = relativeURI()
export const getAllSchedules = async (...props: any) => {

    console.log(JSON.stringify(props))
    const uri = `${uriRelative}admin/schedule/allSchedules`
    try {
        const response = await fetch(
            uri, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        })
        const jsonObj = await Promise.resolve(response.json())
        return jsonObj
    } catch (error) {
        console.error(error);
    }
}