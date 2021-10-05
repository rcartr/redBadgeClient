type StateType = {
    login: boolean,
    email: string,
    password?: string,
    username?: string,
    role?: string,
    name?: string,
    description?: string,
    owner?: number,
    eventName?: string,
    eventDate?: string,
    eventDescription?: string,
    createdBy?: string,
    clanId?: number
    eventsArray?: any,
    sessionToken: string,
}


export default StateType