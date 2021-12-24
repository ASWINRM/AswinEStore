import React from 'react'
import './ProducteditScreen.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Message } from '../components/Message';
import Loader from '../components/Loader'
import axios from 'axios'
import { creteproductaction } from '../Actions/productActions'
const CreateProductScreen = () => {
  const dispatch = useDispatch()
  const [name, setname] = useState("")
  const [price, setprice] = useState("")
  const [category, setcategory] = useState("")
  const [brand, setbrand] = useState("")
  const [description, setdescription] = useState("")
  const [rating, setrating] = useState("")
  const [numReviews, setnumReviews] = useState("")
  const [countInstock, setcountInstock] = useState("")
  const [image, setimage] = useState("")
  const [uploading, setuploading] = useState("")
  const [imageinput, setimageinput] = useState(false)
  const submithandler = () => {
    dispatch(creteproductaction({
      name, price, image, category, brand,
      description, numReviews, countInstock
    }))
  }
  const imageupload = async (e) => {
    const file = e.target.files[0]
    const formdata = new FormData()
    formdata.append('image', file)
    setuploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('https://aswinestoreww.herokuapp.com/api/uploads/image', formdata, config)
      console.log(data)

      setimage(data)
      setuploading(false)
      setimageinput(true)
    } catch (e) {
      setuploading(false)
      console.log(e)
    }
  }

  const productcreatereducer = useSelector(state => state.productcreatereducer)
  const { successCreate, loading } = productcreatereducer
  return (
    <div className="container my-5" style={{ display: "flex", flexDirection: "column" }}>

      {successCreate && <Message variant="success">The Procduct is Successfully created </Message>}

      <div style={{ alignSelf: "center" }}>
        <div>

          <h1>Create Your Product</h1>
        </div>
        {loading && <Loader></Loader>}
        {!loading &&
          <div className="formcard">
            <form action="" method="POST" >


              <div className="form-group">
                <label><p>Name</p></label>
                <input
                  type="text"
                  placeholder="name"
                  className="control"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><p>Price</p></label>
                <input
                  type="text"
                  placeholder="price"
                  className="control"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><p>Description</p></label>
                <textarea
                  type="text"
                  placeholder="description"
                  className="control"
                  rows='5'
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><p>Image</p></label>
                {uploading && <Loader></Loader>}
                <input
                  type="file"
                  placeholder={image}
                  className="control"
                  value=""
                  name="image"
                  onChange={(e) => imageupload(e)}
                />
                {uploading && <Loader></Loader>}
                {imageinput &&
                  <input
                    type="text"
                    placeholder={image}
                    className="control"
                    value={image}
                  />
                }
              </div>
              <div className="form-group">
                <label><p>Category</p></label>
                <input
                  type="text"
                  placeholder="category"
                  className="control"
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><p>Brand</p></label>
                <input
                  type="text"
                  placeholder="brand"
                  className="control"
                  value={brand}
                  onChange={(e) => setbrand(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><p>Rating</p></label>
                <select
                  type="text"
                  placeholder="rating"
                  className="control"
                  value={rating}
                  onChange={(e) => setrating(e.target.value)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <div className="form-group">
                <label><p>Number of Reviews</p></label>
                <input
                  type="text"
                  placeholder="Number of Reviews"
                  className="control"
                  value={numReviews}
                  onChange={(e) => setnumReviews(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><p>Count In Stock</p></label>
                <input
                  type="text"
                  placeholder="Count In Stock"
                  className="control"
                  value={countInstock}
                  onChange={(e) => setcountInstock(e.target.value)}
                />
              </div>
              <Button className="btn btn-dark my-3"
                onClick={() => submithandler()}
              >Submit</Button>
            </form>
          </div>
        }

      </div>


    </div>
  )
}

export default CreateProductScreen
