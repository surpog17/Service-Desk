const KEYS = {
    projects: 'projects',
    projectId: 'projectId'
}


export const getProjectsCollection = () => ([
    { id: '1', title: 'Project 1' },
    { id: '2', title: 'Project 2' },
    { id: '3', title: 'Project 3' },
    { id: '4', title: 'Project 4' },
])


export function insertProject(data) {
    let projects = getAllProjects();
    data['id'] = generateProjectId()
    projects.push(data)
    localStorage.setItem(KEYS.projects, JSON.stringify(projects))
}

export function updateProject(data) {
    let projects = getAllProjects();
    let recordIndex = projects.findIndex(x => x.id == data.id);
    projects[recordIndex] = { ...data }
    localStorage.setItem(KEYS.projects, JSON.stringify(projects));
}

export function deleteProject(id) {
    let projects = getAllProjects();
    projects = projects.filter(x => x.id != id)
    localStorage.setItem(KEYS.projects, JSON.stringify(projects));
}

export function generateProjectId() {
    if (localStorage.getItem(KEYS.projectId) == null)
        localStorage.setItem(KEYS.projectId, '0')
    var id = parseInt(localStorage.getItem(KEYS.projectId))
    localStorage.setItem(KEYS.projectId, (++id).toString())
    return id;
}

export function getAllProjects() {
    if (localStorage.getItem(KEYS.projects) == null)
        localStorage.setItem(KEYS.projects, JSON.stringify([]))
    let projects = JSON.parse(localStorage.getItem(KEYS.projects));
    //map departmentID to department title
    // let level = getLevelCollection();
    return projects.map(x => ({
        ...x,
        // level: level[x.levelId - 1].title
    }))
}