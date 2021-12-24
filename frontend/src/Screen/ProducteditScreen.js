import React from 'react'
import './ProducteditScreen.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { editproductaction } from '../Actions/productActions'
import { Message } from '../components/Message';
import Loader from '../components/Loader'
import { PRODUCT_EDIT_RESET } from '../constants/constants'
import axios from 'axios'
const ProducteditScreen = ({ match }) => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { products } = productList
  console.log(match.params.id)
  const product = products.filter((product) => product._id === match.params.id)[0]
  console.log(product)
  const [name, setname] = useState(product.name)
  const [id, setid] = useState(product._id)
  const [price, setprice] = useState(product.price)
  const [category, setcategory] = useState(product.category)
  const [brand, setbrand] = useState(product.brand)
  const [description, setdescription] = useState(product.description)
  const [rating, setrating] = useState(product.rating)
  const [numReviews, setnumReviews] = useState(product.numReviews)
  const [countInstock, setcountInstock] = useState(product.countInstock)
  const [image, setimage] = useState(product.image)
  const producteditreducer = useSelector(state => state.producteditreducer)
  const { successEdit, loading } = producteditreducer
  const [imageinput, setimageinput] = useState(false)
  const [uploading, setuploading] = useState(false)
  useEffect(() => {
    dispatch({ type: PRODUCT_EDIT_RESET })
  }, [dispatch])
  const submithandler = () => {
    dispatch(editproductaction({
      id, name, price, category, brand, image,
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

  return (
    <div>
      {loading && <Loader></Loader>}
      {!loading &&
        <div className="container my-5" style={{ display: "flex", flexDirection: "column" }}>

          {successEdit && <Message variant="success">The Procduct is Updated </Message>}

          <div style={{ alignSelf: "center" }}>
            <div>

              <h1>Edit Product</h1>
            </div>
            <div className="formcard">
              <form action="" method="POST" >
                <div className="form-group">
                  <label><p>ID</p></label>
                  <input
                    type="text"
                    placeholder={id}
                    className="control"
                    value={id}
                    onChange={(e) => setid(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label><p>Name</p></label>
                  <input
                    type="text"
                    placeholder={name}
                    className="control"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label><p>Price</p></label>
                  <input
                    type="text"
                    placeholder={price}
                    className="control"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label><p>Description</p></label>
                  <textarea
                    type="text"
                    placeholder={description}
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
                    placeholder={category}
                    className="control"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label><p>Brand</p></label>
                  <input
                    type="text"
                    placeholder={brand}
                    className="control"
                    value={brand}
                    onChange={(e) => setbrand(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label><p>Rating</p></label>
                  <select
                    type="text"
                    placeholder={rating}
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
                  <label><p>Count In Stock</p></label>
                  <input
                    type="text"
                    placeholder={countInstock}
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
          </div>


        </div>
      }

    </div>
  )
}

export default ProducteditScreen
