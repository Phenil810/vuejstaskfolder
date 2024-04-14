import axios from 'axios';
export default class InquiryService {
    async getInquiryList(inqTitl,uid,nckName,contentype, sdate, edate,stat) {
        return await axios
            .post(`/inquiry/inquiryByperiod`, {
                inquiry_title:inqTitl,
                user_id:uid,
                nickname:nckName,
                type_id: contentype,
                from_date: sdate,
                to_date: edate,
                status:stat,
            })
            .then((res) => res.data);
    }
    async getInquiryType() {
        return await axios.get(`/inquiry/inquiryType`).then((res) => res.data.inquiryTypeData);
    }
    async inquiryReply(ids, rplyTxt, stat) {
        return await axios
            .patch(`/inquiry/admin/${ids}`, {
                reply_text: rplyTxt,
                status: stat,
            })
            .then((res) => res.data);
    }
    // async addInquiryType(titl) {
    //     return await axios
    //         .post(`/inquery_type/add`, {
    //             title: titl,
    //             status: 'active',
    //         })
    //         .then((res) => res);
    // }
    // async viewInquiryType(ids) {
    //     return await axios
    //         .post(`/inquiry/inquiryType/${ids}`, {
    //             id: ids,
    //         })
    //         .then((res) => res.data);
    // }
    async viewInquiry(ids) {
        return await axios.get(`/inquiry/inquiryDetails/${ids}`).then((res) => res.data.data.reportData[0]);
    }
    async getExcel(inqTitl,uid,nckName,contentype, sdate, edate,stat) {
        return await axios({
            url: `/inquiry/download`,
            method: 'POST',
            responseType: 'blob', // important
            data: {
                inquiry_title:inqTitl,
                user_id:uid,
                nickname:nckName,
                type_id: contentype,
                from_date: sdate,
                to_date: edate,
                status:stat,
            },
        }).then((res) => res);
    }
}
