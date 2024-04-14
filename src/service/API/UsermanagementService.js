import axios from 'axios';
export default class UsermanagementService {

    async getUserList(data) {

        return await axios.post('admin/user/', data);

    }

    async getAdminUserManagementList(data) {

        return await axios.post('admin/user/admin-list/', data);

    }



    async getSubscriptionpathmanagementList(data) {

        return await axios.post('admin/recomendation/', data);

    }



    async getApartmentList(data) {

        return await axios.post('admin/apartment/', data);

    }

    async userview(id) {
        return await axios.post('admin/user/view', {
            id: id,
        });

    }

    async vipstatus(data) {

        return await axios.post('admin/user/save-vip-user', data);

    }

    // async getExcel(username, apartment_name, dob_year, subscription,mobile , gender, persons_in_family, have_children, create_date) {
    //     return await axios({
    //         url: `admin/user/download-excel`,
    //         method: 'POST',
    //         responseType: 'blob', // important
    //         data: {
    //             username: username,
    //             apartment_name: apartment_name,
    //             dob_year: dob_year,
    //             subscription: subscription,
    //             mobile: mobile,
    //             gender: gender,
    //             persons_in_family: persons_in_family,
    //             have_children: have_children,
    //             create_date: create_date,

    //         },
    //     }).then((res) => res);
    // }

    async complexchange_status(data) {

        return await axios.post('admin/user/status-update', data);

    }

    async complexview(id) {
        return await axios.post('admin/apartment/view', {
            id: id,
        });

    }

    async delete(data) {

        return await axios.post('/admin/apartment/delete', data);

    }
}