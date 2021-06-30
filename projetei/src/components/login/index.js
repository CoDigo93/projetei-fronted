/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import logo from '../../assets/logo.webp'
import { FiEye, FiEyeOff, FiHelpCircle} from 'react-icons/fi'

import styles from './styles.module.scss';

import api from '../../services/api'

const login = () => {

  const [isPassVisible, setIsPassVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [erro, _] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isHelping, setIsHelping] = useState(false)

  const history = useHistory()


  const activeHelpMode = () =>{
    setIsHelping(true)
  }



  const togglePasswordVisibility = () =>{
    setIsPassVisible(!isPassVisible)
  }


  const handleSubmit = async (event) =>{
    event.preventDefault()

    const data = {
      username,
      password
    }
    
    try{
      const response = await api.post('/autenticar', data)

      localStorage.setItem('token',response.data.token);
      console.log(response)

      history.push('/')
    }catch(error){
      const erro = error.response.data.error
      setHasError(true)
      
    }
    
    
  }


  return (

      <div className={styles.login}>
        
        <img src={logo} alt=''logo/>

          <form>
            <div>
              <input type="text" 
                     name="name"
                     placeholder=" "
                     required
                     onChange={event => setUsername(event.target.value)}
                     value={username}
              />

              <label htmlFor="name">username</label> 
              
            </div>
            

          <div>
            
          <button 
            type="button" 
            onClick={togglePasswordVisibility}>{isPassVisible ?  <FiEye color="#78D1E1"/> : <FiEyeOff/>}
          </button>
            
            <input type={isPassVisible ? "text" : "password"}
                   name="pass"
                   placeholder=" "
                   required
                   onChange={event => setPassword(event.target.value)}
                   value={password}
            />
                   
            <label htmlFor="pass">password</label> 
            
          </div>
          {hasError 
                ? <span className={styles.messageError}>Credenciais incorretas! Tente novamente!</span> 
                : '' 
              }

          <button onClick={handleSubmit} type="submit">Entrar</button>
          </form>
         
         <footer>
          <span onMouseOver={() => activeHelpMode()} onMouseOut={() => setIsHelping(false)}>
              {isHelping &&
                <div className={styles.help}>
                  <h5>Credenciais de acesso</h5>
                  <p>username:admin</p>
                  <p>senha:admin</p>
                </div>
              }
              <FiHelpCircle size={20} />
          </span>
         
         </footer>
         
      </div>

      
    
  )
}

export default login;