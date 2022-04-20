const KEYS = {
    clients: 'clients',
    clientId: 'clientId'
}
export const getRoleCollection = () => ([
    { id: '1', title: 'Support Engineer' },
    { id: '2', title: 'Support Engineer 1' },
    { id: '3', title: 'Support Engineer 2' },
    { id: '4', title: 'Support Engineer 3' },
])

export const getProjectCollection = () => ([
    { id: '1', title: 'Project 1' },
    { id: '2', title: 'Project 2' },
    { id: '3', title: 'Project 3' },
    { id: '4', title: 'Project 4' },
])
export const getLevelCollection = () => ([
    { id: '1', title: 'Level 1' },
    { id: '2', title: 'Level 2' },
    { id: '3', title: 'Level 3' },
    { id: '4', title: 'Level 4' },
])
export const getPriorityCollection = () => ([
    { id: '1', title: 'High' },
    { id: '2', title: 'Medium' },
    { id: '3', title: 'Low' },
])
export const getTagsCollection = () => ([
    { id: '1', title: 'SLA' },
    { id: '2', title: 'PMR' },
    { id: '3', title: 'Lesson Learned' },
])
export const getStatusCollection = () => ([
    { id: '1', title: 'New' },
    { id: '2', title: 'Open' },
    { id: '3', title: 'In progress' },
    { id: '4', title: 'Close' },
])
export const getAssignCollection = () => ([
    { id: '1', title: 'Messay' },
    { id: '2', title: 'Teferi' },
    { id: '3', title: 'Nati' },
    { id: '4', title: 'On hold' },
    { id: '5', title: 'Done' },
])
export function insertClient(data) {
    let clients = getAllClients();
    data['id'] = generateClientId()
    clients.push(data)
    localStorage.setItem(KEYS.clients, JSON.stringify(clients))
}

export function updateClient(data) {
    let clients = getAllClients();
    let recordIndex = clients.findIndex(x => x.id === data.id);
    clients[recordIndex] = { ...data }
    localStorage.setItem(KEYS.clients, JSON.stringify(clients));
}

export function deleteClient(id) {
    let clients = getAllClients();
    clients = clients.filter(x => x.id !== id)
    localStorage.setItem(KEYS.clients, JSON.stringify(clients));
}

export function generateClientId() {
    if (localStorage.getItem(KEYS.clientId) == null)
        localStorage.setItem(KEYS.clientId, '0')
    var id = parseInt(localStorage.getItem(KEYS.clientId))
    localStorage.setItem(KEYS.clientId, (++id).toString())
    return id;
}

export function getAllClients() {
    if (localStorage.getItem(KEYS.clients) == null)
        localStorage.setItem(KEYS.clients, JSON.stringify([]))
    let clients = JSON.parse(localStorage.getItem(KEYS.clients));
    //map departmentID to department title
    // let level = getLevelCollection();
    return clients.map(x => ({
        ...x,
        // level: level[x.levelId - 1].title
    }))
}