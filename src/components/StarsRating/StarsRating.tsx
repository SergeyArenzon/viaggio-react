import { makeStyles } from "@mui/styles";
import { Rating } from "@mui/material";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RatingApi } from '../../services/api/index';

const labels: Record<number,string> = {
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

const useStyles:any = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

type StarsRatingProps = {
  currentRating: number | null;
};

const StarsRating = ({ currentRating }: StarsRatingProps): JSX.Element => {
  const [value, setValue] = useState<number | null>(currentRating);
  const [hover, setHover] = useState<number>(-1);
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    setValue(currentRating);
  }, [currentRating]);

  const onRatingClickHandler = async () => {
    
    const data = { rating: Number(value) };
    if(!id){
      return
    }
    await RatingApi.update(id, data);
    
  };

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(Number(newValue));
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box ml={2}>{labels[hover !== -1 ? (hover) : value]}</Box>
      )}

      <button onClick={onRatingClickHandler}>rate!</button>
    </div>
  );
};

export default StarsRating;
