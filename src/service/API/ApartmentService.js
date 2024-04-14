import axios from 'axios';
export default class ApartmentService {

    async getApartmentList(data) {
        
        return await axios .post('admin/apartment/', data);
    
    }

    async getStateList(data) {
        
        return await axios .post('admin/apartment/state', data);
    
    }

    async getDistrictList(data) {
        
        return await axios .post('admin/apartment/dist', data);
    
    }

    async getcitytList(data) {
        
        return await axios .post('admin/apartment/city', data);
    
    }

    async complexchange_status(data) {
        
            return await axios .post('admin/apartment/status', data);
    
    }

    async complexview(id) {
        return await axios .post('admin/apartment/view', {
            id: id,
        });
    
    }

    async delete(data) {
       
        return await axios .post('/admin/apartment/delete', data);
    
        }
}