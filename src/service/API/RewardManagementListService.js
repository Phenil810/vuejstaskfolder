import axios from 'axios';
export default class RewardManagementListService {

    async gethoneyList(data) {
        
        return await axios .post('/admin/reward/honey-list', data);
    
    }

    async getpostregistrationrewardList(data) {
        
        return await axios .post('/admin/reward/post-register-honey-list', data);
    
    }



    async gethoneyview(id) {
        return await axios .post('/admin/reward/honey-view', {
            id: id,
        });
    }

    async getPostRegistrationRewardsview(id) {
        return await axios .post('/admin/reward/post-register-honey-view', {
            id: id,
        });
    }

    
}