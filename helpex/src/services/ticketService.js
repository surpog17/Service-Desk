const KEYS = {
    tickets: 'tickets',
    ticketId: 'ticketId'
}


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

export function insertTicket(data) {
    let tickets = getAllTickets();
    data['id'] = generateTicketId()
    tickets.push(data)
    localStorage.setItem(KEYS.tickets, JSON.stringify(tickets))
}

export function updateTicket(data) {
    let tickets = getAllTickets();
    let recordIndex = tickets.findIndex(x => x.id == data.id);
    tickets[recordIndex] = { ...data }
    localStorage.setItem(KEYS.tickets, JSON.stringify(tickets));
}

export function deleteTicket(id) {
    let tickets = getAllTickets();
    tickets = tickets.filter(x => x.id != id)
    localStorage.setItem(KEYS.tickets, JSON.stringify(tickets));
}

export function generateTicketId() {
    if (localStorage.getItem(KEYS.ticketId) == null)
        localStorage.setItem(KEYS.ticketId, '0')
    var id = parseInt(localStorage.getItem(KEYS.ticketId))
    localStorage.setItem(KEYS.ticketId, (++id).toString())
    return id;
}

export function getAllTickets() {
    if (localStorage.getItem(KEYS.tickets) == null)
        localStorage.setItem(KEYS.tickets, JSON.stringify([]))
    let tickets = JSON.parse(localStorage.getItem(KEYS.tickets));
    return tickets.map(x => ({
        ...x,
    }))
}