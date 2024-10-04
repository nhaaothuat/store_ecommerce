import React, { useState } from "react";
import "./Add.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast} from 'react-toastify';
const Add = ({url}) => {
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const res = await axios.post(`${url}/api/food/add`, formData);

    if (res.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false)
      toast.success("Add successfully!")
    } else {
      toast.error("Error!")
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className=" flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="add-img-upload"
              />
            ) : (
              <FaCloudUploadAlt className="add-img-upload" />
            )}
          </label>
          <input
            type="file"
            name=""
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            id=""
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" id="" onChange={onChangeHandler}>
              {/* Salad, Rolls, Deserts, Sandwich,Cake, Rice, Potato, Noodle */}
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Rice">Rice</option>
              <option value=" Potato">Potato</option>
              <option value="  Noodle">Noodle</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
