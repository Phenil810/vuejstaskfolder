import axios from 'axios';
export default class PushNotificationService {
    async getPushNotificationList(data) {
        return await axios
            .post(`/admin/pushnotification/push-notification-mgmt-list`, data)
            .then((res) => res);
    }

    async delete(data) {

        return await axios.post('/admin/pushnotification/push-notification-delete', data);

    }

    async PushNotificationview(id) {
        return await axios.post('/admin/pushnotification//push-notification-mgmt-details', {
            id: id,
        });

    }

    async PushNotificationdetaillist(data) {
        return await axios.post('/admin/pushnotification//push-notification-mgmt-details', data);

    }

    async getPushNotificationuserList(data) {
        return await axios.post('/admin/pushnotification/push-notification-user-list', data);

    }

    async getExcelPushNotificationuserdetailsFinal(obj) {
        var params = new URLSearchParams(obj).toString();
        console.log(params)
        var id = localStorage.getItem('id')
        console.log(id)
        return await axios.get(`/admin/pushnotification/push-notification-user-excell-export/${id}`,{responseType:"arraybuffer"})
            .then((res) => res)
            .catch((err) => err)


    }

    async getSubscriptionpathmanagementList(data) {

        return await axios.post('admin/recomendation/', data);

    }



    async getApartmentList(data) {
        
        return await axios .post('admin/apartment/', data);
    
    }

}