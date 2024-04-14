import axios from 'axios';
export default class TagManagementService {

    async getTagManagementList(data) {

        return await axios.post('admin/tags/', data);

    }

    async tagchange_status(data) {

        return await axios.post('admin/tags/status', data);

    }

    async tagreorder(data) {

        return await axios.post('admin/tags/reorderrows', data);

    }



    async tagManagementview(id) {
        return await axios.post('admin/tags/view', {
            id: id,
        });

    }

    async delete(data) {

        return await axios.post('/admin/tags/delete', data);

    }
}