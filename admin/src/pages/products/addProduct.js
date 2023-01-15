/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Select from "../../components/select";
import { BsImage, BsImages } from "react-icons/bs";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import ReactTagInput from "@pathofdev/react-tag-input";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setcategories] = useState([]);
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState({
    name: "",
    desc: "",
    shortDesc: "",
    price: 0,
    category: {},
    thumbnail: "",
    gallery: [],
    sku: "",
    quantity: "",
    isSale: false,
    sale: "",
    published: true,
    colors: []
  });

  const handleImageUpload = async (e) => {
    e.preventDefault();
    toast.loading("מעלה תמונה...");
    setloading(true);
    const { files } = e.target;
    const file = files[0];
    const formData = new FormData();
    formData.append("img", file);
    try {
      const { data } = await axios.post("/api/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setstate({ ...state, thumbnail: data.url });
      toast.dismiss();
      toast.success("תמונה הועלתה בהצלחה");
      setloading(false);
    } catch (error) {
      toast.dismiss();
      toast.error("שגיאה בהעלאת תמונה");
      setloading(false);
      if (error.response.data) {
        return console.log(error.response);
      }
      console.log(error);
    }
  };

  const handleGalleryImageUpload = async (e) => {
    e.preventDefault();
    toast.loading("מעלה תמונה...");
    setloading(true);
    const { files } = e.target;
    const file = files[0];
    const formData = new FormData();
    formData.append("img", file);
    try {
      const { data } = await axios.post("/api/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setstate({ ...state, gallery: [...state.gallery, data.url] });
      toast.dismiss();
      toast.success("תמונה הועלתה בהצלחה");
      setloading(false);
    } catch (error) {
      toast.dismiss();
      toast.error("שגיאה בהעלאת תמונה");
      setloading(false);
      if (error.response.data) {
        return console.log(error.response);
      }
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.sale > state.price) {
      return toast.error("מבצע לא יכול להיות גבוה ממחיר רגיל");
    }

    if (state.thumbnail === "") {
      return toast.error("העלה תמונת ראווה");
    }

    toast.loading("Loading...");
    setloading(true);
    try {
      const { data } = await axios.post("/api/products", state);
      toast.dismiss();
      toast.success("מוצר התווסף בהצלחה");
      setloading(false);
      navigate("/edit-product/" + data.product._id);
    } catch (error) {
      toast.dismiss();
      setloading(false);
      if (error.response.data) {
        toast.error(error.response.data.message);
        return console.log(error.response);
      }
      console.log(error);
      toast.error("שגיאה בהוספת מוצר");
    }
  };

  useEffect(async () => {
    try {
      const { data } = await axios.get("/api/categories");
      let newData = [];
      for (let i of data) {
        newData = [...newData, { value: i.slug, label: i.name }];
      }
      setcategories(newData);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="container">
      <div className="page-header">
        <h3 className="page-title">הוספת מוצר/שירות חדש</h3>
      </div>
      <form onSubmit={handleSubmit} className="add-produc-form">
        <div className="col1">
          <div className="detail-box">
            <h6>פרטים</h6>
            <div className="form-group">
              <label htmlFor="name">
                שם מוצר/שירות <span>(required)</span>
              </label>
              <input
                type="text"
                id="name"
                value={state.name}
                onChange={(e) => setstate({ ...state, name: e.target.value })}
                placeholder="שם"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sku">מספר סידורי</label>
                <input
                  type="text"
                  id="sku"
                  value={state.sku}
                  onChange={(e) => setstate({ ...state, sku: e.target.value })}
                  placeholder="מספר סידורי"
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">כמות</label>
                <input
                  type="number"
                  id="quantity"
                  value={state.quantity}
                  onChange={(e) =>
                    setstate({ ...state, quantity: e.target.value })
                  }
                  placeholder="כמות"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="short-description">תיאור קצר</label>
              <textarea
                onChange={(e) =>
                  setstate({ ...state, shortDesc: e.target.value })
                }
                name="short-desc"
                id="short-desc"
                rows="10"
                value={state.shortDesc}>
              </textarea>
            </div>
            <div className="form-group">
              <label htmlFor="description">תיאור מוצר/שירות</label>
              <ReactQuill
                onChange={(e) => setstate({ ...state, desc: e })}
                theme="snow"
              />
            </div>
          </div>
          <div className="detail-box">
            <h6>מחיר</h6>
            <div className="form-group">
              <label htmlFor="price">
                מחיר <span>(required)</span>
              </label>
              <input
                type="number"
                id="price"
                value={state.price}
                onChange={(e) => setstate({ ...state, price: e.target.value })}
                placeholder=""
                required
              />
            </div>
            {/* <div className="form-switch">
              <input
                type="checkbox"
                checked={state.isSale}
                onChange={(e) =>
                  setstate({
                    ...state,
                    isSale: e.target.checked ? true : false,
                  })
                }
                id="sale"
              />
              <label htmlFor="sale">On Sale</label>
            </div>
            <div className="form-group">
              <label htmlFor="saleprice">sale price</label>
              <input
                type="number"
                id="saleprice"
                value={state.sale}
                onChange={(e) => setstate({ ...state, sale: e.target.value })}
                placeholder="sale"
              />
            </div> */}
          </div>
        </div>
        <div className="col2">
          <div className="detail-box">
            <div className="btns-wrapper">
              {loading ? (
                <button type="button" className="btn" disabled>
                  <Loader />
                </button>
              ) : (
                <button className="btn">פרסם מוצר</button>
              )}
            </div>
          </div>
          <div className="detail-box">
            <h6>קטגוריות</h6>
            <Select
              onChange={(e) => setstate({ ...state, category: e })}
              options={categories}
            />
          </div>
          <div className="detail-box">
            <h6>אופציות צבעים</h6>
            <ReactTagInput 
              tags={state.colors} 
              onChange={(e) => setstate({...state, colors: e})}
              placeholder="ENTER הקלד ולחץ"
            />
          </div>
          <div className="detail-box">
            <h6>תמונת ראווה</h6>
            <div className="thumbnail-picker">
              {state.thumbnail && <img src={state.thumbnail} alt="" />}
              <input
                type="file"
                className="thumbnail"
                onChange={handleImageUpload}
              />
              <label htmlFor="thumbnail">
                <BsImage className="icon" /> בחר תמונת ראווה
              </label>
            </div>
          </div>
          <div className="detail-box">
            <h6>גלריית תמונות</h6>
            <div className="image-gallery">
              <div className="thumbnail-picker">
                <input
                  type="file"
                  className="thumbnail"
                  onChange={handleGalleryImageUpload}
                />
                <label htmlFor="thumbnail">
                  <BsImages className="icon" /> העלאת תמונות גלרייה
                </label>
              </div>
              <div className="gallery-images-previews"></div>
            </div>
            <div className="product-gallery">
              {state.gallery.map((image) => (
                <img src={image} alt="" />
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
