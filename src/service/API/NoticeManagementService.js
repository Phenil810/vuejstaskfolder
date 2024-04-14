import axios from 'axios';
export default class NoticeManagementService {

    async getNoticeManagementList(data) {

        return await axios.post('admin/notice/', data);

    }

    async noticeview(id) {
        return await axios.post('admin/notice/view', {
            id: id,
        });

    }

    async complexchange_banner(data) {

        return await axios.post('admin/notice/show_at_once', data);

    }

    async delete(data) {

        return await axios.post('/admin/notice/delete', data);

    }
}