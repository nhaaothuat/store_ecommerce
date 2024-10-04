import React from "react";
import "./ExploreMenu.css";
import menu_1 from "../../assets/menu_1.png"
import menu_2 from "../../assets/menu_2.png"
import menu_3 from "../../assets/menu_3.png"
import menu_4 from "../../assets/menu_4.png"
import menu_5 from "../../assets/menu_5.png"
import menu_6 from "../../assets/menu_6.png"
import menu_7 from "../../assets/menu_7.png"
import menu_8 from "../../assets/menu_8.png"

const menu_list = [
  {
    menu_name: "Salad",
    menu_image: menu_1,
  },
  {
    menu_name: "Rolls",
    menu_image: menu_2,
  },
  {
    menu_name: "Deserts",
    menu_image: menu_3,
  },
  {
    menu_name: "Sandwich",
    menu_image: menu_4,
  },
  {
    menu_name: "Cake",
    menu_image: menu_5,
  },
  {
    menu_name: "Rice",
    menu_image: menu_6,
  },
  {
    menu_name: "Potato",
    menu_image: menu_7,
  },
  {
    menu_name: "Noodle",
    menu_image: menu_8,
  },
];

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore the menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis delectus
        voluptatibus, commodi facilis fugiat, totam, fuga nemo quibusdam modi
        officia eius voluptatem. Eum illum debitis voluptas dolorum doloribus
        similique reprehenderit.{" "}
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return <div onClick={()=>{setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}} key={index} className="explore-menu-list-item">
            <img className={category===item.menu_name?"active":""} src={item.menu_image}/>
            <p>{item.menu_name}</p>
          </div>;
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
