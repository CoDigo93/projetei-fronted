import api from '../services/api'

import {
    setPerson ,
    insertPersonStarted, 
    insertPersonSuccess, 
    insertPersonFailure,
    updateStoreAfterDelerte,
    editPersonAction
} from '../actions/personActions'


 export const loadPeople = () => async (dispatch, getState) =>{

    try{
         await api.get('/index')
            .then(response => dispatch(setPerson(response.data)))
            
        
    }catch(error){
        const response = error.response.data.error
        console.log(error.response.data.error)
        alert(response) 
    }
        
        
 
}


export const savePeople = () => async (dispatch, getState) => {
    const people = getState().personReducer.data
    try{
         await api.post('/insert', ...people)
        alert("success!")
    }catch(error){
        const response = error.response.data.error
        console.log(response)
        alert(response)
        
    }
    
    
}


export const deletePerson = (data) => async(dispatch, getState) =>{
    const list = getState().personReducer.data

    const newStore = list.filter(person => person.cpf !== data.cpf)
    
    try{
        await api.delete(`/${data.id}`)
        dispatch(updateStoreAfterDelerte(newStore))

        console.log("sucesso ao deletar")
        

    }catch(error){
        console.log(error.response.data.error)
    }

    
    
}



export const insertPerson = (data) => async (dispatch, getState) => {
    const state = getState().personReducer.data
    console.log(state)
    dispatch(insertPersonStarted(data))


    try{
         await api.post('/insert', ...data)
            .then(response => dispatch(insertPersonSuccess(response.data)))
            
        

    }catch(error){
        const response = error.response.data.error
        dispatch(insertPersonFailure({state:state, error:response}))
        
        console.log(response)
        alert(response)
        
    }
    
    
}



export const editPerson = (data) => async (dispatch, getState) =>{
    const store = getState().personReducer.data

    
    try{
        
        await api.put(`/${data.editedPerson.id}`, data.data)
        dispatch(editPersonAction({data:data.data, editedPerson:data.editedPerson, store}))
        
        
    }catch(error){
        const response = error
        console.log(response)
        alert('Falha ao realizar a edição. Tente novamente!')
    }
    


}