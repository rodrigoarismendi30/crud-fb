import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {  getDocs , updateDoc, doc, getDoc} from 'firebase/firestore'

import {db} from '../firebaseConfig/firebase'
import { async } from '@firebase/util'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const Edit = () => {

  const [ description, setDescription ] = useState( '' )
  const [ stock, setStock ] = useState(0)
  const navigate = useNavigate()
  const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, "products", id)
    const data = { description: description, stock:stock }
    await  updateDoc(product, data)
    navigate('/')
  }

  const getProductById = async (id) => {
   const product = await getDoc( doc(db, "products", id) )
   if(product.exists()) {
    setDescription(product.data().description)
    setStock(product.data().stock)
   }else{
    MySwal.fire('El Producto no existe')
   }
  }


  useEffect( () =>{
    getProductById(id)
  },[])
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
            <h1>Editar Producto</h1>

            <form onSubmit={update}>
              <div className='mb-3'>
                <label className='form-label'>Descripcion</label>
                <input 
                  value={description}
                  onChange= { (e) => setDescription(e.target.value)}
                  type= 'text'
                  className='form-control'        
                />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Stock</label>
                <input 
                  value={stock}
                  onChange= { (e) => setStock(e.target.value)}
                  type= 'number'
                  className='form-control'        
                />
              </div>
              <button type='submit' className='btn btn-primary'>Actualizar</button>

            </form>
        </div>
      </div>
    </div>
  )
}

export default Edit