require("dotenv").config()
const CronJob = require("cron").CronJob
const SchedulerRepository = require("./repository/schedulerRepository")
const ApiBasixService = require("./service/apiBasixService")

let job = new CronJob(
    "0 * * * * *",
    async () => {
        agora = new Date()
        let diaSemana = agora.getDay()
        let hora = agora.getHours()
        let minuto = agora.getMinutes()

        const schedulerRepository = new SchedulerRepository()

        try {
            const schedules = await schedulerRepository.getSchedule({
                dia_semana: diaSemana,
                hora,
                minuto
            })

            if (schedules.length > 0) {
                const apiBasixService = new ApiBasixService()

                for (let i = 0; i < schedules.length; i++) {
                    const schedule = schedules[i]

                    try {
                        await apiBasixService.execute({
                            domain: schedule.domain,
                            user: schedule.name,
                            class_key: schedule.service_class_key
                        })
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    null,
    true,
    "America/Sao_Paulo"
)
