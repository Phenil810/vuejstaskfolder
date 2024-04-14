import axios from 'axios';
export default class HoneyManagementListService {

    async getRewardList(data) {
        
        return await axios .post('admin/reward/', data);
    
    }

    async getmanageList(data) {
        
        return await axios .post('admin/reward/history', data);
    
    }
}