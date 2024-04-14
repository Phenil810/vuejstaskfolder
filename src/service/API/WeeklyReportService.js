import axios from 'axios';
export default class WeeklyReportService {

    async getweeklyreport(obj) {
        var params = new URLSearchParams(obj).toString();
        return await axios.get(`admin/post/download-weekly-report?${params}`,{responseType:"arraybuffer"})
            .then((res) => res)
            .catch((err) => err)

    }
}