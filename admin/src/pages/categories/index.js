/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ReactTable from "react-table-v6";
import { IoMdAdd } from "react-icons/io";
import Drawer from "../../components/drawer";
import OptionDropdown from "../../components/optionDropdown";
import { BsImage } from "react-icons/bs";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import Loader from "../../components/loader";

function ImgCell(props) {
  return <img src={props.value} alt="thumb" className="category-thumbnail" />;
}

const Categories = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [state, setstate] = useState({
    name: "",
    slug: "",
    thumbnail: "",
  });
  const [categories, setcategories] = useState([]);
  const [loading, setloading] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [isEdit, setisEdit] = useState(false);

  const ActionCell = (p) => {
    return (
      <OptionDropdown>
        <ul className="action-options">
          <li onClick={() => showEditCategory(p.value)} className="edit">
            עריכה
          </li>
          <li onClick={() => handleDeleteCategory(p.value)} className="delete">
            מחיקה
          </li>
        </ul>
      </OptionDropdown>
    );
  };

  const showEditCategory = (id) => {
    const cat = categories.filter((e) => e._id === id);
    setstate({
      name: cat[0].name,
      _id: cat[0]._id,
      thumbnail: cat[0].thumbnail,
    });
    setisEdit(true);
    setShowAddCategory(true);
  };

  const columns = [
    {
      Header: "תמונת ראווה",
      accessor: "thumbnail",
      Cell: ImgCell,
    },
    {
      Header: "שם",
      accessor: "name",
    },
    {
      Header: "כמות",
      accessor: "products",
    },
    {
      Header: "אפשרויות",
      accessor: "_id",
      Cell: ActionCell,
    },
  ];

  const handleNameChange = (e) => {
    const { value } = e.target;
    const slug = value.toLowerCase().replace(/\s/g, "-");
    setstate({ ...state, name: value, slug });
  };

  const handleSlugChange = (e) => {
    const { value } = e.target;
    const slug = value.toLowerCase().replace(/\s/g, "-");
    setstate({ ...state, slug });
  };

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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!state.thumbnail) {
      toast.error("אנא הכנס תמונת ראווה");
      return;
    }
    if (!state.name) {
      toast.error("נא למלא שם");
      return;
    }
    if (!state.slug) {
      toast.error("נא למלא מקט");
      return;
    }
    toast.loading("מוסיף קטגוריה");
    setloading(true);
    try {
      await axios.post("/api/categories", state);
      toast.dismiss();
      toast.success("קטגוריה הועלתה בהצלחה");
      setloading(false);
      setstate({
        name: "",
        slug: "",
        thumbnail: "",
      });
      setrefresh(true);
      setShowAddCategory(false)
    } catch (error) {
      toast.dismiss();
      setloading(false);
      if (error.response.data) {
        toast.error(error.response.data.message);
        return console.log(error.response);
      }
      console.log(error);
      toast.error("שגיאה בהוספת קטגוריה");
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!state.thumbnail) {
      toast.error("אנא העלה תמונה");
      return;
    }
    if (!state.name) {
      toast.error("אנא הכנס שם");
      return;
    }
    toast.loading("מעדכן קטגוריה...");
    setloading(true);
    try {
      await axios.put(`/api/categories/${state._id}`, state);
      toast.dismiss();
      toast.success("קטגוריה התעדכנה בהצלחה");
      setloading(false);
      setstate({
        name: "",
        slug: "",
        thumbnail: "",  
      });
      setrefresh(true);
      setShowAddCategory(false)
    } catch (error) {
      toast.dismiss();
      setloading(false);
      if (error.response.data) {
        toast.error(error.response.data.message);
        return console.log(error.response);
      }
      console.log(error);
      toast.error("שגיאה בעדכון קטגוריה");
    }
  };

  const handleDeleteCategory = async (id) => {
    toast.loading("מוחק קטגוריה...");
    setloading(true);
    try {
      await axios.delete(`/api/categories/${id}`);
      toast.dismiss();
      toast.success("קטגוריה נמחקה בהצלחה");
      setloading(false);
      setrefresh(true);
    } catch (error) {
      toast.dismiss();
      setloading(false);
      if (error.response.data) {
        toast.error(error.response.data.message);
        return console.log(error.response);
      }
      console.log(error);
      toast.error("שגיאהה במחיקת קטגוריה");
    }
  };

  const ShowAddCategory = () => {
    setisEdit(false);
    setShowAddCategory(true)
  }

  useEffect(async () => {
    try {
      const { data } = await axios.get("/api/categories");
      setcategories(data);
      setrefresh(false);
    } catch (error) {
      setrefresh(false);
      if (error.response) {
        toast.error(error.response.data.message);
        return console.log(error.response);
      }
      console.log(error);
    }
  }, [refresh]);

  return (
    <div className="container">
      <div className="page-header">
        <h3 className="page-title">קטגוריות</h3>
        <button
          onClick={ShowAddCategory}
          className="btn add-category-btn">
          <IoMdAdd className="icon" /> הוסף קטגוריה
        </button>
      </div>
      <Drawer show={showAddCategory} setShow={setShowAddCategory}>
        <form onSubmit={isEdit ? handleEditCategory : handleAddCategory} className="add-categories">
          <h3>{ isEdit ? 'עריכת קטגוריה' :  'הוספת קטגוריה'}</h3>
          <input
            type="text"
            placeholder="הכנס שם"
            value={state.name}
            onChange={handleNameChange}
          />
          {!isEdit && (
            <input
              type="text"
              placeholder="תת-קטגוריה"
              value={state.slug}
              onChange={handleSlugChange}
            />
          )}
          <input type="file" id="cat-thumb" onChange={handleImageUpload} />
          <label className="image-input" htmlFor="cat-thumb">
            <BsImage className="icon" /> העלאת תמונת קטגוריה
          </label>
          {state.thumbnail && (
            <img
              className="thumbnail-preview-category"
              src={state.thumbnail}
              alt="thumbnail"
            />
          )}
          {loading ? (
            <button type="button" className="btn" disabled>
              <Loader />
            </button>
          ) : (
            <button className="btn">{ isEdit ? 'עריכת קטגוריה' :  'הוספת קטגוריה'}</button>
          )}
        </form>
      </Drawer>
      <div className="data-table categories__table">
        <ReactTable
          data={categories}
          columns={columns}
          minRows={0}
          defaultPageSize={15}
          showPageJump={true}
          previousText={""}
          nextText={""}
          resizable={false}
        />
      </div>
    </div>
  );
};

export default Categories;
