import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
const List = ({url}) => {
 
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/list`);
    if (res.data.success) {
      setList(res.data.data);
      // console.log(res.data);
    } else {
      toast.error("Error!");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    const res = await axios.delete(`${url}/api/food/remove/${foodId}`);
    if(res.data.success){
      await fetchList();
      toast.success("Delete Successfully!")
    }else{
      toast.error("No deleted")
    }
   
    console.log(foodId);
  };

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b className="">Image</b>
          <b className="">Name</b>
          <b className="">Category</b>
          <b className="">Price</b>
          <b className="">Action</b>
        </div>

        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <MdDelete
                className="cursor"
                onClick={() => removeFood(item._id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
