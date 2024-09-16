import React, { useState, useEffect } from "react";

const Home = () => {
  // Danh sách ban đầu
  const [list, setList] = useState([]);

  // Mảng chứa thứ tự quay cố định, lấy từ localStorage
  const [predefinedOrder, setPredefinedOrder] = useState([]);

  const [currentPlayer, setCurrentPlayer] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [newPlayer, setNewPlayer] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0); // Điều khiển thứ tự quay
  const [displayedPlayers, setDisplayedPlayers] = useState([]); // Danh sách đã hiển thị

  // Load predefinedOrder from localStorage when the component is first mounted
  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("myArray"));
    if (storedOrder) {
      setPredefinedOrder(storedOrder);
    } else {
      // Nếu không có mảng trong localStorage, sử dụng mảng mặc định
      setPredefinedOrder(["11a1", "11a6", "11a3", "11a2", "11a4", "11a5"]);
    }
  }, []);

  // Bắt đầu quay theo thứ tự định sẵn
  const startDisplaying = () => {
    if (displayedPlayers.length === predefinedOrder.length) {
      alert("Không còn người chơi nào trong danh sách định sẵn.");
      return;
    }
    if (predefinedOrder.length === 0) {
      alert("Không còn người chơi nào trong danh sách định sẵn.");
      return;
    }

    setIsRolling(true);
    let counter = 0;

    const interval = setInterval(() => {
      // Hiển thị người chơi theo thứ tự đã định sẵn
      setCurrentPlayer(predefinedOrder[displayOrder]);

      counter++;
      if (counter > 20) {
        clearInterval(interval);
        setIsRolling(false);

        // Thêm người chơi vào danh sách đã hiển thị
        setDisplayedPlayers((prevPlayers) => [
          ...prevPlayers,
          predefinedOrder[displayOrder],
        ]);

        // Xóa người chơi khỏi danh sách ban đầu
        const updatedList = list.filter(
          (player) => player !== predefinedOrder[displayOrder]
        );
        setList(updatedList);

        // Chuyển đến người chơi tiếp theo
        setDisplayOrder(
          (prevOrder) => (prevOrder + 1) % predefinedOrder.length
        );
      }
    }, 100);
  };

  // Thêm người chơi mới
  const addPlayer = () => {
    const trimmedPlayer = newPlayer.trim(); // Xóa khoảng trắng 2 bên
    if (trimmedPlayer && !list.includes(trimmedPlayer)) {
      setList([...list, trimmedPlayer]);
      setNewPlayer("");
    }
  };

  return (
    <div className="flex items-start space-x-8 bg-gray-100 p-8 min-h-screen">
      <div className="flex flex-col fixed right-[50%] translate-x-[50%] items-center space-y-4">
        <div className="border-2 border-blue-500 p-4 text-center w-32 h-32 flex items-center justify-center rounded-lg bg-white shadow-md">
          {isRolling ? (
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          ) : (
            currentPlayer || "Chờ..."
          )}
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={startDisplaying}
          disabled={isRolling || displayOrder >= predefinedOrder.length}
        >
          {isRolling ? "Đang quay..." : "Bắt đầu quay ngẫu nhiên"}
        </button>

        <div className="flex space-x-2">
          <input
            className="border border-gray-300 p-2 rounded w-64"
            type="text"
            placeholder="Thêm đội mới"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={addPlayer}
          >
            Thêm
          </button>
        </div>

        <ul className="mt-4 w-64 bg-white border border-gray-300 rounded-lg shadow-md">
          {list.map((player, index) => (
            <li key={index} className="border-b py-2 px-4">
              {player}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-64 fixed top-0 right-0">
        <h2 className="text-xl font-bold mb-4">Thứ tự các đội đã quay ra:</h2>
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Tên đội</th>
            </tr>
          </thead>
          <tbody>
            {displayedPlayers.map((player, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{player}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
