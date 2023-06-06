import React, { useEffect, useState } from "react";
import "./style.css";
import logo from "./todo.jpg";

// get the localstorage data back //

const holdData = () => {
  const list = localStorage.getItem("todolist");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(holdData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [showCheckList, setShowCheckList] = useState(true);

  // add the items function

  const addItem = () => {
    // console.log("hii");
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          } else return { ...curElem };
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]); //(...)save old data and add new data //
      setInputData("");
      // console.log(setItems);
      // console.log(items);
      // console.log(inputdata);
    }
  };

  //    how to delete items section //

  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItem);
  };

  // all delete items //

  const alldelete = () => {
    setItems([]);
    setShowCheckList((prev) => !prev);
  };

  // edit items //

  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });

    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // adding local storage //

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
    if (items.length) setShowCheckList(false);
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure className="todo-logo">
            <img src={logo} alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              style={{ fontSize: 20 }}
              type="text"
              placeholder="✍ ADD ITEMS "
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
              className="form-control"
            />
            {toggleButton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show our items */}

          {items.map((curElem) => {
            // console.log(curElem.name);
            // console.log(index);
            return (
              <div className="showItems" key={curElem.id}>
                <div className="eachItem">
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}

          {/* remove all button */}

          <div className="showItems">
            <button
              className="effect04"
              onClick={alldelete}
            >
              <span className="check-list">
                {showCheckList ? "CHECK LIST" : "Remove All"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
