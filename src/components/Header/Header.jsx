import { useDispatch, useSelector } from "react-redux";
import { arrayShuffer, resetGame } from "../../redux/slice/memoryGameSlice";

export default function Header() {
  const items = useSelector((state) => state.cards);
  const points = useSelector((state) => state.points);
  const clone = [...items];
  const finder = clone.filter((item) => item.completed == false);
  const dispatch = useDispatch();
  const resetgame = () => {
    dispatch(resetGame());
    dispatch(arrayShuffer());
  };
  return (
    <div>
      {points}
      <div>
        <button
          hidden={finder.length <= 0 || points == 0 ? false : true}
          onClick={resetgame}
        >
          Yeniden Oyna
        </button>
      </div>
    </div>
  );
}
