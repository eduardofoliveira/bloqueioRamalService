const axios = require("axios")

const api = axios.create({
    baseURL: "https://api.cloudcom.com.br/timeclass"
})
const LogRepository = require("../repository/logRepository")

class apiBasixService {
    async execute({ domain, user, class_key }) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.post("/apply", {
                    domain,
                    user,
                    class_key
                })

                const logRepository = new LogRepository()
                await logRepository.addInformation({
                    domain,
                    user,
                    information: data.message
                })

                resolve(data)
            } catch (error) {
                if (error.response) {
                    if (error.response.data) {
                        if (error.response.data.error) {
                            const logRepository = new LogRepository()
                            await logRepository.addInformation({
                                domain,
                                user,
                                information: error.response.data.error
                            })
                        }
                    }
                }

                reject(error)
            }
        })
    }
}

module.exports = apiBasixService
