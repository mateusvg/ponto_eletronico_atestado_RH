import { relativeURI } from '../../helper/RelativeURI'

const uriRelative = relativeURI()
export const saleProduct = async (...props: any) => {
    console.log(...props)
    const uri = `${uriRelative}admin/sale`
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