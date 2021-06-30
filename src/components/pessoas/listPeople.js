import React,{useEffect, useState} from 'react'

import { FiTrash2, FiEdit } from 'react-icons/fi'
import { format, formatDistance, subDays  } from 'date-fns'

import { useDispatch } from 'react-redux'


import { loadPeople, deletePerson, editPerson} from '../../thunks/personThunk'

import styles from './styles.module.scss'

const ListPeople = ({listStore}) =>{

    const [isEditting, setIsEditting] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [cpf, setCpf] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    
    
    
    const dispatch = useDispatch()

    useEffect(()=>{
        setIsLoading(true)
        dispatch(loadPeople()).then(()=>setIsLoading(false))

        
    },[dispatch, setIsLoading])
    


    const handleDelete = (cpf) =>{    
        const [deleted] = listStore.filter(person => person.cpf === cpf)   
        dispatch(deletePerson(deleted))
        
    }



    const edit = (target) =>{
        
        setIsEditting(!isEditting)
        const editedPerson = listStore.filter(person => person.cpf === target.cpf)
        
        localStorage.setItem('editedPerson',JSON.stringify(editedPerson))   
        
        setName(target.name)
        setCpf(target.cpf)
        setPhone(target.phone)
        setBirthdate(target.birthdate)

    }

    const handleEdit = (event) =>{
        event.preventDefault()
        const Person = localStorage.getItem('editedPerson')
        const editedPerson = JSON.parse(Person)
        

        const data = {
            name,
            birthdate,
            phone,
            cpf
        }
        dispatch(editPerson({editedPerson:editedPerson[0], data}))
        clearFields()

        setIsEditting(!isEditting)
        
    }


    const clearFields = () =>{
        setName('')
        setPhone('')
        setCpf('')
        setBirthdate('')

    }


    const formatUpdateDate = (date) =>{
        const newFormatedDate = formatDistance(subDays(new Date(date), 0), new Date(), { addSuffix: true })
        return newFormatedDate
    }

    
    return(
        <div className={styles.ListContainer}>
            {!isLoading ?
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Data de Aniversário</th>
                        <th>Delete</th>
                        <th>Editar</th>
                        <th>Data de Criação</th>
                        <th>Data de modificação</th>
                    </tr>
                </thead>
                <tbody>

                    { listStore?.map(person => (
                        
                        <tr key={`list_people${person.cpf}`}>
                            <td>{person.name}</td> 
                            <td>{person.cpf}</td> 
                            <td>{person.phone}</td> 
                            <td>{person.birthdate}</td>
                            <td><button onClick={() => handleDelete(person.cpf)}><FiTrash2 color="white"/></button></td>
                            <td><button onClick={() => edit(person)}><FiEdit color="white"/></button></td>
                            <td>{format(new Date(person.createdAt), 'dd/MM/yyyy')}</td>
                            <td>{formatUpdateDate(person.updatedAt)}</td>
                        </tr>

                        
                        
                         
                        ))
                    }
                </tbody>
                

                    {isEditting && (
                    <div className={styles.modal}>
                        <div>
                            <h3>Reescreva os campos que quiser editar</h3>
                            <form type='submit'>
                                <label htmlFor="name">Nome</label>
                                <input type='text' name='name'  value={name} onChange={e=>setName(e.target.value)}/> 
                                <label htmlFor="cpf">CPF</label>
                                <input type='text' name='cpf'  value={cpf} onChange={e=>setCpf(e.target.value)}/> 
                                <label htmlFor="phone">Telefone</label>
                                <input type='text' name='phone'  value={phone} onChange={e=>setPhone(e.target.value)}/> 
                                <label htmlFor="birthdate">Data de Aniversário</label>
                                <input type='text' name='birthdate' value={birthdate} onChange={e=>setBirthdate(e.target.value)}/>

                                <button type='submit' onClick={(event) => handleEdit(event)}>Editar</button>
                            </form>
                        </div>
                        
                        
                    </div>
                    )}
                    

            </table>
            : "Loading ..."
    }
        </div>
    )
}

export default ListPeople