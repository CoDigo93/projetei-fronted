import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import ListPeople from './listPeople'



import { loadPeople, insertPerson } from '../../thunks/personThunk'

 import styles from './styles.module.scss';

const Pessoas = () => {

  const history = useHistory()
  
  const SESSION = localStorage.getItem('token')

  if(SESSION == null) history.push('/login')

  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [birthdate, setBirthdate] = useState('')
  
  
  const personStore = useSelector(state => state.personReducer.data)
  
  const dispatch = useDispatch()


  useEffect(()=>{
    loadPeople()
  },[dispatch])

  

  const handleSubmit = async (event) =>{
    event.preventDefault()

    const data = {
      name,
      cpf,
      phone,
      birthdate
    }

    dispatch(insertPerson([data ,{loading:true}]))
    

    setName('')
    setCpf('')
    setPhone('')
    setBirthdate('')


  }


  return (
    <div className={styles.mainContainer}>
    <aside className={styles.formContainer}>
      <h4>Cadastre uma Pessoa!</h4>
      
        <form>

          <div>
          <label htmlFor="name">Nome</label>
            <input
              type='text'
              onChange={event => setName(event.target.value)}
              value={name}
              name='name'
            />
              
          </div>

          <div>
          <label htmlFor="cpf">CPF</label>
            <input
              type='text'
              onChange={event => setCpf(event.target.value)}
              value={cpf}
              name='cpf'
            />
              
          </div>

          <div>
          <label htmlFor="birthdate">Data de Nascimento</label>
            <input
              type='text'
              onChange={event => setBirthdate(event.target.value)}
              value={birthdate}
              name='birthdate'
            />
              
          </div>

          <div>
          <label htmlFor="phone">Telefone</label>
            <input
              type='text'
              onChange={event => setPhone(event.target.value)}
              value={phone}
              name='phone'
            />
              
          </div>

          <button onClick={handleSubmit} type='submit'>submit</button>
        </form>
        
      
      </aside>
    <div>
      <ListPeople 
        listStore={personStore} 
        
      />
    </div>
  </div>
  )
}

export default Pessoas
