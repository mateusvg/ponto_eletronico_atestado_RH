import { relativeURI } from '../../../helper/RelativeURI'
const uriRelative = relativeURI()
export const deleteScheduleApointmentByAdmin= async (id:any) => {
    console.log(id.scheduleId)
    const uri = `${uriRelative}admin/schedule/delete/${id.scheduleId}`
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