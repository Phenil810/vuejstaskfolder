import axios from 'axios';
export default class PostmanagementService {

    async getProductList(data) {
        
        return await axios .post('admin/products', data);
    
    }

    async getProductpurchaseList(data) {
        
        return await axios .post('admin/products/purchase-list', data);
    
    }

    async productchange_status(data) {
        
        return await axios .post('admin/products/status', data);
    
    }

    async productview(data) {
        return await axios .post('admin/products/view', data);
    
    }


    async delete(data) {
        return await axios .post('admin/products/delete', data);
    
    }


    async productstatus(data) {
        return await axios .post('admin/products/coupon-status', data);
    
    }


    async getApartmentList(data) {
        
        return await axios .post('admin/apartment/', data);
    
    }
}