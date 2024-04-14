import axios from 'axios';
export default class SubscriptionpathmanagementService {

    async getSubscriptionpathmanagementList(data) {

        return await axios.post('admin/recomendation/', data);

    }

    async Subscriptionpathmanagementchange_status(data) {

        return await axios.post('admin/recomendation/status', data);

    }

    async delete(data) {

        return await axios.post('/admin/recomendation/delete', data);

    }
}