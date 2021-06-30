export function insertPersonStarted(data){
    
    return {
        type:'INSERT_PERSON_STARTED',
        loading:data[1]
        
    }   
    
}


export function insertPersonSuccess(data){
    return {
        type:'INSERT_PERSON_SUCCESS',
                name: data.name,
                cpf: data.cpf,
                phone: data.phone,
                birthdate: data.birthdate
            }
                     
    }



    export function insertPersonFailure(data){
      
        return{
            type:'INSERT_PERSON_FAILURE',
            error:data.error,
            data:data.state
            
        }
    }



export function updateStoreAfterDelerte(data){
    return {
        type:'DELETE_PERSON',
        store:data
    }
}


export function editPersonAction(data){
    
    
    return {
        type:'EDIT_PERSON',
        editedPerson:data.editedPerson,
        store:data.store,
        data:data.data
        
    }
}

export function setPerson(data){
    return {
        type:'SET_PERSON',
        data:data
    }
}