const ADD_REVIEW = '/reviews/ADD_REVIEW'
const GET_ONE_REVIEW = '/reviews/GET_ONE_REVIEW'
const GET_ALL_REVIEWS = '/reviews/GET_ALL_REVIEWS'
const REMOVE_REVIEW = '/reviews/REMOVE_REVIEW'
const EDIT_REVIEW = '/reviews/EDIT_REVIEW'

/*-------------ACTIONS-------------*/

const addReview = review =>({
    type:ADD_REVIEW,
    
    review
})

const getOneReview = review =>({
    type:GET_ONE_REVIEW,
    
    review
})

const getAllReviews = review =>review =>({
    type:GET_ALL_REVIEWS,
    
    review
})

const removeReview = review =>({
    type:REMOVE_REVIEW,
    
    review
})

const editAReview = review =>({
    type:EDIT_REVIEW,
    
    review
})

/*-------------THUNKS-------------*/

export const newReview = (payload, userId) => async (dispatch) => {
    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
          },
        body: JSON.stringify({...payload, userId})
    })
    if (response.ok) {
        const review = await response.json()
        dispatch(addReview(review))
    }
}

export const AllReviews = (reviews) => async(dispatch)=> {
    const response = await fetch(`/api/reviews`);
	const data = await response.json();
	dispatch(getAllReviews(data));
}

export const getReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`)
    const oneReview= await res.json();
    dispatch(getOneReview(oneReview))
}

export const editReview = (review, reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
  
      if (response.ok) {
        const data = await response.json();
        dispatch(editAReview(review));
        return review;
      }
}

export const deleteReview = (reviewId) => async (dispatch) =>{
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',}
    })
    dispatch(removeReview(reviewId))
    return response;
}

/*-------------REDUCER-------------*/

const ReviewsReducer = (state = {}, action) =>{
    let newState;
    switch(action.type) {
        
        
        case GET_ALL_REVIEWS:
            newState = {...state}
            action.reviews.forEach(review => {
                newState[review?.id] = review
            });
            return newState;
            
            
        case ADD_REVIEW:
            return {
                ...state,
                [action.review?.id]: action.review
            }
            
            
        case REMOVE_REVIEW: {
            const newState = { ...state };
            delete newState[action.review];
            return newState;
            }
            
            
        case EDIT_REVIEW: {
            return{
            ...state,
            [action.review.id]: action.review
        }}
        
        
        case GET_ONE_REVIEW:
            return {
                ...state,
             [action.review.id]: action.review
         }
         
         
        default:
            return state;
    }
}

export default ReviewsReducer