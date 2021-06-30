
const INITIAL_STATE = {
    data:[],
    loading:false,
    error:null
   
 };
 
 export default function personReducer(state = INITIAL_STATE, action){
     switch(action.type){
        case'INSERT_PERSON_STARTED':
            return {
                ...state,
                loading:action.loading
            } 
        
        
        case 'INSERT_PERSON_SUCCESS':
             return {data:[...state.data, { 
                 name:action.name,
                 cpf:action.cpf, 
                 phone:action.phone,
                 birthdate:action.birthdate
                 
             }],
             loading:false,
             error:null 
         }

         case 'INSERT_PERSON_FAILURE':
             return{
                 
                 data:action.data,
                 error:action.error
             }



         case 'DELETE_PERSON':
             return {
                 ...state,
                 data:action.store
                   
             }


         case 'EDIT_PERSON':
           console.log(action.store)
             const result = action.store.map((person) => {
                 if(person.cpf === action.editedPerson.cpf){
                    person.cpf = action.data.cpf
                    person.name = action.data.name
                    person.phone = action.data.phone
                    person.birthdate = action.data.birthdate
                 }
                 console.log(person)
                 return person
             }
             )
             console.log(result)
            return {
                data:result
                 
            }

            case 'SET_PERSON':
                return {
                    ...state,
                    data: action.data
                }

         default:
             return state;
     }
 }
