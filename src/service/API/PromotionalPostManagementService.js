import axios from 'axios';
export default class PostmanagementService {

    async getpromotionalPostManagementList(data) {

        return await axios.post('admin/post/promotional-post-list', data);

    }

    async promotionalPostManagementchange_status(data) {

        return await axios.post('admin/post/promotional-status', data);

    }

    async getApartmentList(data) {
        
        return await axios .post('admin/apartment/', data);
    
    }

    async promotionalPostManagementview(id) {
        return await axios.post('admin/post/promotional-post-list-view', {
            id: id,
        });

    }


}