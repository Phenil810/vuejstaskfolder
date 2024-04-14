import axios from 'axios';
export default class HotPostManagementService {

    async gethotPostManagementList(data) {

        return await axios.post('/admin/post/list-hot-issue', data);

    }

    async gethotPostList(data) {

        return await axios.post('/admin/post/hot-promotional-post-list', data);

    }

    async gethotPostManagementview(id) {
        return await axios.post('/admin/post/view-hot-issue', {
            id: id,
        });
    }

    async getApartmentList(data) {

        return await axios.post('admin/apartment/', data);

    }

    async promotionalPostManagementchange_status(data) {

        return await axios.post('admin/post/promotional-status', data);

    }

    async complexchange_status(data) {

        return await axios.post('admin/post/hot-post-status', data);

    }




}