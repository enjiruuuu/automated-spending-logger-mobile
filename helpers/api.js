import axios from "axios"

export class Api {

    async updateSheet(logs) {
        const request = this.formatRequest(logs)
        return await axios.post('http://192.168.1.102:8080/update', request).then(res => {
            console.log(res.data)
            return Promise.resolve(res.data)
        });
    }

    formatRequest(logs) {
        const request = []

        for (let i = 0; i < logs.length; i++) {
            const temp = []
            temp.push(logs[i].date)
            temp.push(logs[i].category)
            temp.push(logs[i].description)
            temp.push(logs[i].amountSpent)
            temp.push(logs[i].convertedAmount)

            request.push(temp)
        }

        return request;
    }
}