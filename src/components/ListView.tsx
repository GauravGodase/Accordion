import React, { useState, useEffect, useMemo } from "react";
import "../styles/ListView.scss";
import Accordian from "./accordian/Accordian";
import famousCelebrities from "../json/celebrities.json";
import { Celebrity } from "../model/celebrity.model";

function ListView() {
  let [celebrities, setCelebrities] = useState<Celebrity[]>(famousCelebrities);
  const [updatedCelebrity, setUpdatedCelebrity] = useState<Celebrity>();

  // manages the state of accordian
  const [isActive, setActive] = useState(
    Array(celebrities.length - 1).fill(false)
  );
  const [isEdit, setEdit] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [isDeleted, setDeleted] = useState<number>();
  const [inputText, setInputText] = useState("");

  // toggles the accordian state when clicked on another accordian
  const handleAccordionClick = (index: any) => {
    const newState = isActive.map((state, i) => (i === index ? !state : false));
    setActive(newState);
  };

  useEffect(() => {
    if (updatedCelebrity && isSaved) {
      var indexToUpdate = celebrities.findIndex(
        (obj) => obj.id === updatedCelebrity?.id
      );
      celebrities[indexToUpdate] = updatedCelebrity;
    }
  }, [celebrities, isSaved, updatedCelebrity]);

  // removes the deleted data from json
  const filteredCelebsNotToBeDeleted = useMemo(() => {
    if (isDeleted) {
      return celebrities.filter((obj) => obj.id !== isDeleted);
    }
    return celebrities;
  }, [isDeleted]);

  useEffect(() => {
    setCelebrities(filteredCelebsNotToBeDeleted);
    setActive(isActive.fill(false));
  }, [filteredCelebsNotToBeDeleted]);

  // contains the search input text
  let inputHandler = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  // filters data from json based on the search input
  const filteredCelebs = celebrities.filter((celebs) => {
    if (inputText === "") {
      return celebs;
    } else {
      return celebs.first.toLowerCase().includes(inputText);
    }
  });

  return (
    <div style={{ width: "40%", marginTop: "3rem" }}>
      <div className={"searchBar"}>
        <div className="search-icon"></div>
        <input
          className={"search-input"}
          type="text"
          placeholder="Search...."
          onChange={inputHandler}
        />
      </div>

      <div>
        {filteredCelebs &&
          filteredCelebs?.map((celebrity) => {
            return (
              <Accordian
                key={celebrity.id}
                celebrity={celebrity}
                onClick={() => handleAccordionClick(celebrity?.id)}
                isActive={isActive[celebrity.id]}
                setEdit={setEdit}
                isEdit={isEdit}
                setUpdatedCelebrity={setUpdatedCelebrity}
                updatedCelebrity={updatedCelebrity}
                setSaved={setSaved}
                setDeleted={setDeleted}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ListView;
