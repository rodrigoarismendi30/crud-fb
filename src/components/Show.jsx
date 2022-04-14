import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs ,getDoc, deleteDoc } from 'firebase/firestore'
import {db} from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {

  //configurar hooks
  const [productos, setProductos] = useState([])


  //referencia db firestore

  const productoCollection = collection(db, "products")

  // funcion para mostrar todos los datos

  const getProductos = async () => {
    const data = await getDocs(productoCollection)

    setProductos(
      data.docs.map( (doc) =>( {...doc.data(), id:doc.id}))
    )
    console.log(productos);
  }

  // funcion para eliminar doc

  const eleminarProducto = async (id) => {
    const productDoc = doc(db, "prodcuts" , id)
    await deleteDoc(productDoc)
    getProductos()
  }

  // funcion de confirmacion para sweet alert

  //useeffect

  useEffect( () =>{
    getProductos()
  },[])

  
  //devolvemos la vista del componente



  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='d-grid gap-2'>
            <Link to="/Create" className="btn btn-secondary mt-2 mb-2">Crear</Link>
          </div>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Descipcion</th>
                <th>Stock</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {
                productos.map( (product) => (
                  <tr key={product.id}>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                      <button onClick={ () => {eleminarProducto(product.id)} } className=" btn btn-danger"><i className="fa-solid fa-trash-can"></i></button>
                    </td>
                  </tr>
                )

                )
              }
            </tbody>

          </table>
        </div>
      </div>
    </div>
    
    
    
    </>
  )
}

export default Show