export const measObject = {
    name: 'measObject',
    properties: {
        name: 'string?',
        value: 'int?'
    }
}

export const measurementSchema = {
    name: 'measurement',
    properties: {
        _id: 'objectId',
        name: 'string',
        gender: 'string?',
        dueDate: 'date?',
        mest: 'measObject[]',
        completed: {
            type: 'bool',
            default: false
        },
        realm_id: 'string?', 
    },
    primaryKey: '_id',
}