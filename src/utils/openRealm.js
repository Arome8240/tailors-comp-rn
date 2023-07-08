import Realm from "realm"
import {measurementSchema, measObject} from "../schemas/measSchema"

const realm = Realm.open({
    path: 'dba',
    schema: [measurementSchema, measObject],
    schemaVersion: 10
})

export default realm