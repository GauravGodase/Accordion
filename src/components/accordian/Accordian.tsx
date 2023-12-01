import React, { useEffect, useState } from "react";
import ViewDetails from "../ViewDetails";
import "../../styles/accordian/Accordian.scss";
import { Celebrity } from "../../model/celebrity.model";

function Accordian(props: {
  celebrity: Celebrity;
  onClick: Function;
  isActive: any[];
  setEdit: Function;
  isEdit: boolean;
  setUpdatedCelebrity: Function;
  updatedCelebrity: Celebrity | undefined;
  setSaved: Function;
  setDeleted: Function;
}) {
  const {
    celebrity,
    onClick,
    isActive,
    setEdit,
    isEdit,
    setUpdatedCelebrity,
    updatedCelebrity,
    setSaved,
    setDeleted,
  } = props;
  const { first, last, picture, id } = celebrity;
  const [isEditState, setEditState] = useState(false);
  const [isUpdated, setUpdated] = useState(false);
  const [areEmpty, setEmpty] = useState(false);

  useEffect(() => {
    if (isEditState) {
      setEdit(true);
    } else setEdit(false);
  }, [isEditState]);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <div
          className="accordion-title"
          style={
            isActive
              ? {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderBottomStyle: "none",
                }
              : {}
          }
        >
          <div className="avatar">
            <img src={picture} alt="" />
          </div>
          <div className="title">
            <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
              {isEditState ? (
                <input
                  type="text"
                  defaultValue={`${first} ${last}`}
                  className="edit-input"
                  onChange={(e) => {
                    setEmpty(false);
                    setUpdated(true);
                    if (e.target.value === "") {
                      setEmpty(true);
                    } else if (/\d/.test(e.target.value)) {
                      // checks for number in text field
                      alert("Number not allowed in name");
                    } else {
                      const name = e.target.value.split(" ");
                      updatedCelebrity
                        ? setUpdatedCelebrity({
                            ...updatedCelebrity,
                            first: name[0],
                            last: name[1] ?? "",
                          })
                        : setUpdatedCelebrity({
                            ...celebrity,
                            first: name[0],
                            last: name[1] ?? "",
                          });
                    }
                  }}
                />
              ) : (
                <h2>{`${first} ${last}`}</h2>
              )}
            </div>
            <div
              className={`div-${id}`}
              style={{ paddingLeft: "1rem", paddingRight: "2rem" }}
              onClick={() => {
                !isEdit && onClick();
              }}
              title={isEditState ? "Save or Discard the unsaved changes" : ""}
            >
              <h2>{isActive ? "-" : "+"}</h2>
            </div>
          </div>
        </div>
        {isActive ? (
          <div>
            <ViewDetails
              celebrity={celebrity}
              isEditState={isEditState}
              setEditState={setEditState}
              setUpdated={setUpdated}
              isUpdated={isUpdated}
              setEmpty={setEmpty}
              areEmpty={areEmpty}
              setUpdatedCelebrity={setUpdatedCelebrity}
              updatedCelebrity={updatedCelebrity}
              setSaved={setSaved}
              setDeleted={setDeleted}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Accordian;
