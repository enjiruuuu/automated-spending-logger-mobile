import axios from "axios"

export class Api {

    baseUrl = 'https://automated-spending-logger-api.glitch.me';

    async updateSheet(logs) {
        const request = {
            logs: this.formatRequest(logs),
            sheetId: '14cXyuhFZoUnIRBczdtYJQ49IDS0I4sFDiWzsiApoWU4',
        }

        return await axios.post(this.baseUrl + '/update', request).then(res => {
            return Promise.resolve(res.data)
        })
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