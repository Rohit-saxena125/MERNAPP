import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
export default function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.service}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.provider}
        </Typography>
      </CardContent>
      <CardActions style={{display:"flex",justifyContent:"space-between" ,margin:"0 10%"}}>
        <Link to = {props.onbutton2} size="small">{props.button1}</Link>
        <Button onClick={props.onbutton1} size="small">{props.button2}</Button>
      </CardActions>
    </Card>
  );
}