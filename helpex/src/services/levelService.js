const KEYS = {
    levels: 'levels',
    levelId: 'levelId'
}


export function insertLevel(data) {
    let levels = getAllLevels();
    data['id'] = generateLevelId()
    levels.push(data)
    localStorage.setItem(KEYS.levels, JSON.stringify(levels))
}

export function updateLevel(data) {
    let levels = getAllLevels();
    let recordIndex = levels.findIndex(x => x.id == data.id);
    levels[recordIndex] = { ...data }
    localStorage.setItem(KEYS.levels, JSON.stringify(levels));
}

export function deleteLevel(id) {
    let levels = getAllLevels();
    levels = levels.filter(x => x.id != id)
    localStorage.setItem(KEYS.levels, JSON.stringify(levels));
}

export function generateLevelId() {
    if (localStorage.getItem(KEYS.levelId) == null)
        localStorage.setItem(KEYS.levelId, '0')
    var id = parseInt(localStorage.getItem(KEYS.levelId))
    localStorage.setItem(KEYS.levelId, (++id).toString())
    return id;
}

export function getAllLevels() {
    if (localStorage.getItem(KEYS.levels) == null)
        localStorage.setItem(KEYS.levels, JSON.stringify([]))
    let levels = JSON.parse(localStorage.getItem(KEYS.levels));

    return levels.map(x => ({
        ...x,
    }))
}