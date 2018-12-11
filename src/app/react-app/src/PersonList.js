import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

export   class PersonList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {person: []};
    }

    componentDidMount() {

        this.UserList();

    }
    UserList() {
        axios.get(`http://localhost:8000`)
                .then(res => {
                    console.log(res.data.results);
                    this.setState({person: res.data.results});
                })
    }

    render() {
        const {classes} = this.props;
        // const usersList = this.state.person;

      const persons = this.state.person.map((item, i) => (
        <Grid item xs={4}  style={{  paddingBottom: 30 }}>
          <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="{item.name}"
          className={classes.media}
          height="140"
          image={ item.image }
        />
        <CardContent>
          
          <Typography component="p">
           <ul>
       
      </ul>
    { item.desc }
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {item.street}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {item.gender}
        </Button>
        <Button size="small" color="primary">
          {item.postcode}
        </Button>
      </CardActions>
    </Card>

           </Grid>          
                    ));

        return (
                <div className={classes.root}>
                <Grid container spacing={8}>
                {persons}
                   
                    <div>
                
                    </div>
                 </Grid>
                </div>
                );
    }
}

PersonList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonList);