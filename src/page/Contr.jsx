import React, { useState, useEffect } from "react";

function Contr() {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Load array from localStorage when the component is first mounted
  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("myArray"));
    if (storedArray) {
      setArray(storedArray);
    }
  }, []);

  // Function to handle the input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to add new item to the array
  const addItemToArray = () => {
    if (inputValue.trim() !== "") {
      const trimmedPlayer = inputValue.trim();
      const newArray = [...array, trimmedPlayer];
      setArray(newArray);
      localStorage.setItem("myArray", JSON.stringify(newArray));
      setInputValue(""); // Clear the input field
    }
  };

  // Function to remove item from the array
  const removeItemFromArray = (index) => {
    const newArray = array.filter((_, i) => i !== index); // Create new array without the item
    setArray(newArray);
    localStorage.setItem("myArray", JSON.stringify(newArray)); // Update localStorage
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Nhập vào các phần tử theo ý:</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="border p-2 rounded mr-2"
        placeholder="Nhập phần tử"
      />
      <button
        onClick={addItemToArray}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm
      </button>
      <ul className="mt-4">
        {array.map((item, index) => (
          <li
            key={index}
            className="border-b py-2 flex justify-between items-center"
          >
            {item}
            <button
              onClick={() => removeItemFromArray(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contr;
