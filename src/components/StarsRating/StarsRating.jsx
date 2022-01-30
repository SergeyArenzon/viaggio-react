import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import { useParams } from "react-router-dom";


import { useEffect } from "react";


const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});



const StarsRating = ({currentRating})=> {

  const [value, setValue] = useState(currentRating);
  const [hover, setHover] = useState(-1);
  const classes = useStyles();
  const { id } = useParams();



  useEffect(() => {
    setValue(currentRating);
  }, [currentRating])

  const onRatingClickHandler = async() => {
    const data = {  rating: value };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/location/${id}/rating`, {
      method: "PUT",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });    
  };
 
  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      )}

      <button onClick={onRatingClickHandler}>rate!</button>
    </div>
  );
}

export default StarsRating;