import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CountUp from "react-countup";

const Cards = ({ title, casesValue, Update, className }) => {
  return (
    <div>
      <Card className={className + " py-3"}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            <CountUp separator="," end={casesValue} />
          </Typography>
          <Typography color="textSecondary">
            {new Date(Update).toDateString()}
          </Typography>
          <Typography variant="body2" component="p">
            Number of active cases from COVID-19.
            <br />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
