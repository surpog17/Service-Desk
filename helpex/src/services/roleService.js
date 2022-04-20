const KEYS = {
    roles: 'roles',
    roleId: 'roleId'
}


export function insertRole(data) {
    let roles = getAllRoles();
    data['id'] = generateRoleId()
    roles.push(data)
    localStorage.setItem(KEYS.roles, JSON.stringify(roles))
}

export function updateRole(data) {
    let roles = getAllRoles();
    let recordIndex = roles.findIndex(x => x.id == data.id);
    roles[recordIndex] = { ...data }
    localStorage.setItem(KEYS.roles, JSON.stringify(roles));
}

export function deleteRole(id) {
    let roles = getAllRoles();
    roles = roles.filter(x => x.id != id)
    localStorage.setItem(KEYS.roles, JSON.stringify(roles));
}

export function generateRoleId() {
    if (localStorage.getItem(KEYS.roleId) == null)
        localStorage.setItem(KEYS.roleId, '0')
    var id = parseInt(localStorage.getItem(KEYS.roleId))
    localStorage.setItem(KEYS.roleId, (++id).toString())
    return id;
}

export function getAllRoles() {
    if (localStorage.getItem(KEYS.roles) == null)
        localStorage.setItem(KEYS.roles, JSON.stringify([]))
    let roles = JSON.parse(localStorage.getItem(KEYS.roles));
    //map departmentID to department title
    // let level = getLevelCollection();
    return roles.map(x => ({
        ...x,
        // level: level[x.levelId - 1].title
    }))
}