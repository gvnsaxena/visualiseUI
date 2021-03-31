
export const getAPIData = (payload) => {
    return {
        type: 'GET_API_DATA',
        payload
    }
}

export const setAPIData = (payload) => {
    return {
        type: 'SET_API_DATA' ,
        payload
    }
}