import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  arrayShuffer,
  openCard,
  holderChanger,
  cardCompleter,
  closeCard,
  addPoint,
  removePoint,
} from "../../redux/slice/memoryGameSlice";

export default function Cards() {
  const items = useSelector((state) => state.cards);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (item) => {
    choiceOne ? setChoiceTwo(item) : setChoiceOne(item);
    dispatch(openCard(item.id));
    dispatch(holderChanger(item));
  };

  useEffect(() => {
    dispatch(arrayShuffer());
  }, []);

  const matched = () => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.url === choiceTwo.url) {
        setTimeout(() => {
          dispatch(cardCompleter({ choiceOne, choiceTwo }));
          dispatch(addPoint());
        }, 500);
        setChoiceOne(null);
        setChoiceTwo(null);
      } else {
        setTimeout(() => {
          dispatch(closeCard({ choiceOne, choiceTwo }));
          dispatch(removePoint());
        }, 500);

        setChoiceOne(null);
        setChoiceTwo(null);
      }
    }
  };
  useEffect(() => {
    matched();
  }, [choiceOne, choiceTwo]);

  return (
    <div>
      <div className="playground">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={`card ${item.opened === true && " opened"} ${
                item.completed == true && "matched"
              }`}
            >
              <div className="front" onClick={() => handleClick(item)}>
                ?
              </div>
              <div className="back">
                <img src={item.url} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
