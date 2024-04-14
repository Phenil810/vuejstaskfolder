import axios from 'axios';
export default class HoneyTransferHistoryService {

    async gethoneyTransferHistoryList(data) {
        

        return await axios.post('admin/reward/honey-transfer-history', data);

    }

    async getApartmentList(data) {
        
        return await axios .post('admin/apartment/', data);
    
    }

    async getexcel(obj) {
        var params = new URLSearchParams(obj).toString();
        console.log(params)
        return await axios.get(`admin/reward/honey-transfer-history-excel-export/${params}`,{responseType:"arraybuffer"})
            .then((res) => res)
            .catch((err) => err)


    }


    async honeyTransferHistoryview(id) {
        return await axios.post('admin/reward/honey-transfer-history-details', {
            id: id,
        });

    }


}