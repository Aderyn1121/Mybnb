/* eslint-disable no-unused-vars */
const ADD_LOCATION = 'locations/ADD_LOCATION'
const GET_ONE_LOCATION = 'locations/GET_ONE_LOCATION'
const GET_ALL_LOCATIONS = 'locations/GET_ALL_LOCATIONS'
const REMOVE_LOCATION = 'locations/REMOVE_LOCATION'
const EDIT_LOCATION = 'locations/EDIT_LOCATION'


/*-------------ACTIONS-------------*/

const addOneLocation = location =>({
    type:ADD_LOCATION,
    
    location
})

const getALocation = location =>({
    type:GET_ONE_LOCATION,
    
    location
})

const getAllLocations = location =>({
    type:GET_ALL_LOCATIONS,
    
    location
})

const removeLocation = location =>({
    type:REMOVE_LOCATION,
    
    location
})

const editALocation = location =>({
    type:EDIT_LOCATION,
    
    location
})

/*-------------THUNKS-------------*/

export const newLocation = (payload) => async (dispatch) => {
    const response = await fetch(`/api/locations`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
          },
        body: JSON.stringify(payload)
    })
    // let result = await response.json()
    // console.log("*****",result)
    // if (response.ok) {
    //     const location = await response.json()
    //     dispatch(addOneLocation(location))
    // }
}

export const AllLocations = (locations) => async(dispatch)=> {
    const response = await fetch(`/api/locations`);
	const data = await response.json();
	dispatch(getAllLocations(data));
}

export const getSingleLocation = (locationId) => async (dispatch) => {
    const res = await fetch(`/api/locations/${locationId}`)
    const oneLocation= await res.json();
    dispatch(getALocation(oneLocation))
}

export const editLocation = (location, locationId) => async (dispatch) => {
    const response = await fetch(`/api/locations/${locationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      });
  
      if (response.ok) {
        const spot = await response.json();
        dispatch(editALocation(location));
        return location;
      }
}

export const deleteLocation = (locationId) => async (dispatch) =>{
    const response = await fetch(`/api/locations/${locationId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',}
    })
    dispatch(removeLocation(locationId))
    return response;
}

/*-------------REDUCER-------------*/
const initialState = {}
const LocationReducer = (state = initialState, action) =>{
    console.log("%%%%%", action)
    switch(action.type) {
        
        case GET_ALL_LOCATIONS:
            const newState = {...state}
            action.locations.forEach(location => {
                newState[location] = location
            });
            return newState;
            
            
        case ADD_LOCATION:
            console.log("######",action)
            // return {
            //     ...state,
            //     [action.location?.id]: action.location
            // }
            return{ state }
            
            
        case REMOVE_LOCATION: {
            const newState = { ...state };
            delete newState[action.location];
            return newState;
            }
            
            
        case EDIT_LOCATION: {
            return{
            ...state,
            [action.location.id]: action.location
        }}
        
        
        case GET_ONE_LOCATION:
            return {
                ...state,
             [action.location.id]: action.location
         }
         
         
        default:
            return state;
    }
}
export default LocationReducer