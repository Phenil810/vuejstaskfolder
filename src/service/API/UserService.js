import axios from 'axios';
//samsung
export default class UserService {
    async getUserList(nname, uname, hchild, agechild, gend, agGrp, marrStat,status,hpet, minPoint, maxPoint, sdate, edate) {
        return await axios
            .post(`/user/all`, {
                nickname: nname,
                username: uname,
                has_children: hchild,
                children_age: agechild,
                gender: gend,
                age_group: agGrp,
                marital_status: marrStat,
                status: status,
                has_pet: hpet,
                min_point: minPoint,
                max_point: maxPoint,
                start_date: sdate,
                end_date: edate,
            })
            .then((res) => res.data.data);
    }
    async getUserListsingle(startdate) {
        return await axios.post(`/user`, { status: 'active', startDate: startdate }).then((res) => res.data.data.users);
    }

    async addUser(name, mobile, email, gender, pass, confirm_pass) {
        return await axios.post(`/user/add`, { name: name, mobile: mobile, email: email, gender: gender, password: pass, confirm_password: confirm_pass }).then((res) => res.data.data[0]);
    }
    async updateUser(ids, nick, nm, gend, ag_grp, marr_stat, stat, child, childList, pets, petType) {
        return await axios.patch(`/user/update`, { id: ids, nickname: nick, name: nm, gender: gend, age_group: ag_grp, married: marr_stat, status: stat, has_children: child, children: childList, has_pets: pets, pets: petType }).then((res) => res);
    }

    async deleteUser(id) {
        return await axios.delete(`/user/delete`, { deleteIdArray: id }).then((res) => res);
    }
    async viewUser(ids) {
        return await axios.get(`/user/${ids}`).then((res) => res.data);
    }
    // async downloadExcel(name, mobile, email, startdate, enddate, idary) {
    //     // http://dvcon-admin-nodejs.dvconsulting.org:4545/dvcon-dev/api/v1/admin/user//generate-excel/?status=active&page=1&limit=20&name=Elinasn
    //     return await axios({
    //         url: `/user//generate-excel/?status=active&page=&limit=&name=${name}&mobile=${mobile}&email=${email}&startDate=${startdate == null ? '' : startdate}&&endDate=${enddate == null ? '' : enddate}&idArray=${idary}`,
    //         method: 'GET',
    //         responseType: 'blob', // important
    //     }).then((res) => res);
    // }
    async getExcel(nName, uName, hChild, AgeChild, gend, AgeGp, mStatus, hPet, mPoint, mxPoint, sdate, edate) {
        return await axios({
            url: `/user/download`,
            method: 'POST',
            responseType: 'blob', // important
            data: {
                nickname: nName,
                username: uName,
                has_children: hChild,
                children_age: AgeChild,
                gender: gend,
                age_group: AgeGp,
                marital_status: mStatus,
                has_pet: hPet,
                min_point: mPoint,
                max_point: mxPoint,
                start_date: sdate,
                end_date: edate,
            },
        }).then((res) => res);
    }
    async getPointHistoryExcel(uid) {
        return await axios({
            url: `/user/points_history/download`,
            method: 'POST',
            responseType: 'blob', // important
            data: {
                user_id:uid
            },
        }).then((res) => res);
    }
    
}
