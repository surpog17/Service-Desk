const KEYS = {
    users: 'users',
    userId: 'userId'
}

export const getLevelCollection = () => ([
    { id: '1', title: 'Level 1'},
    { id: '2', title: 'Level 2'},
    { id: '3', title: 'Level 3'},
    { id: '4', title: 'Level 4'},
])

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

export function insertUser(data) {
    let users = getAllUsers();
    data['id'] = generateUserId()
    users.push(data)
    localStorage.setItem(KEYS.users, JSON.stringify(users))
}

export function updateUser(data) {
    
}

export function deleteUser(id) {
    let users = getAllUsers();
    users = users.filter(x => x.id !== id)
    localStorage.setItem(KEYS.users, JSON.stringify(users));
}

export function generateUserId() {
    if (localStorage.getItem(KEYS.userId) == null)
        localStorage.setItem(KEYS.userId, '0')
    var id = parseInt(localStorage.getItem(KEYS.userId))
    localStorage.setItem(KEYS.userId, (++id).toString())
    return id;
}

export function getAllUsers() {
    if (localStorage.getItem(KEYS.users) == null)
        localStorage.setItem(KEYS.users, JSON.stringify([]))
    let users = JSON.parse(localStorage.getItem(KEYS.users));
    //map departmentID to department title
    let level = getLevelCollection();
    return users.map(x => ({
        ...x,
        // level: level[x.levelId - 1].title
    }))
}