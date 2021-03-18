const { connection } = require("../database/connection")

class schedulerRepository {
    async getSchedule({ dia_semana, hora, minuto }) {
        return new Promise(async (resolve, reject) => {
            try {
                const [schedules] = await connection.raw(`
                    SELECT
                        r.dia_semana,
                        r.hora,
                        r.minuto,
                        r.service_class_name,
                        r.service_class_key,
                        u.name,
                        d.domain
                    FROM
                        timeclass_rules r,
                        timeclass_grupos g,
                        timeclass_grupos_usuarios gu,
                        timeclass_usuarios u,
                        timeclass_dominios d
                    WHERE
                        r.fk_id_group = g.id and
                        g.id = gu.fk_id_group and
                        gu.fk_id_user = u.id and
                        u.fk_id_domain = d.id and
                        r.dia_semana = ${dia_semana} and
                        r.hora = ${hora} and
                        r.minuto = ${minuto}
                `)

                resolve(schedules)
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = schedulerRepository
