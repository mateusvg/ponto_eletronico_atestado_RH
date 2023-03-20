import { relativeURI } from '../../helper/RelativeURI'

const uriRelative = relativeURI()
export const insertTimePointUser = async (...props: any) => {
    console.log(`PAYLOAD REGISTER${JSON.stringify(props)}`)
    const uri = `${uriRelative}users/point/insert`
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
    } catch (error) {
        console.error(error);
    }
}