import axios from 'axios';
export default class PostmanagementService {

    async getPostList(data) {
        
        return await axios .post('admin/post/', data);
    
    }

    async getApartmentList(data) {
        
        return await axios .post('admin/apartment/', data);
    
    }

    async gettagList(data) {
        
        return await axios .post('admin/tags/', data);
    
    }

    async postview(id) {
        return await axios .post('admin/post/view', {
            id: id,
        });
    
    }

    async delete(data) {
       
        return await axios .post('/admin/post/delete', data);
    
        }
}