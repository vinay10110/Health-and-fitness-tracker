/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';  // Updated to @mui/material
import Checkbox from '@mui/material/Checkbox';  // Updated to @mui/material
import Grid from '@mui/material/Grid';  // Updated to @mui/material
import List from '@mui/material/List';  // Updated to @mui/material
import ListItem from '@mui/material/ListItem';  // Updated to @mui/material
import ListItemText from '@mui/material/ListItemText';  // Updated to @mui/material
import ChartsBar from './ChartsBar';  // Assuming this is your custom component
import styled from 'styled-components'

// Styled Components
const RootPaper = styled(Paper)`
  padding: 16px;
  margin: 4% 5% 0% 5%;
`;

const Header = styled(Typography)`
  text-align: center;
  margin-bottom: 16px;
`;

const ProgressPaper = styled(Paper)`
  margin-top: 16px;
  padding: 8px;
  text-align: center;
`;

const ListItemStyled = styled(ListItem)`
  padding: 8px 0;
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
  display: block;
  width: 100%;
`;

const GraphPaper = styled(Paper)`
  padding: 16px;
  margin-top: 16px;
`;

class NutritionGoalCard extends React.Component {
  render() {
    const { classes } = this.props;
    const questions = [
      ['fruitAndVegs', 'Had 5-9 Servings of fruits and vegetables'],
      ['healthyFat', 'Consumed at least 26 grams of healthy fat'],
      ['proteinBreakfast', 'Eat at least 15 grams of protein for breakfast'],
      ['newFruit', 'Tried a new fruit or vegetable'],
      ['newReceipe', 'Experimented with a new healthy recipe'],
      ['fastFood', 'Avoided fast food'],
      ['noMeat', 'Refrained from eating meat'],
      ['skipBreakfast', "Didn't skip breakfast"],
      ['noSugar', 'Avoided sugar'],
      ['noAlcohol', 'Refrained from alcohol']
    ];

    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <RootPaper elevation={1}>
              <Header variant="h5">Nutrition Goal</Header>
              <Typography align="center">
                Each goal below counts as +1 point. See if you can meet all your goals!
              </Typography>
              <ProgressPaper id="progress">
                <Typography variant="body2">
                  Current Progress: {this.props.progress}
                </Typography>
              </ProgressPaper>
              <Grid container spacing={2}>
                <List>
                  {questions.map(question => (
                    <Grid item xs={12} key={question[0]}>
                      <ListItemStyled dense button>
                        <Checkbox
                          value={question[0]}
                          checked={this.props.toggled[question[0]]}
                          onChange={this.props.handleChange(question[0])}
                          color="primary"
                          disableRipple
                          tabIndex={-1}
                        />
                        <ListItemText primary={question[1]} />
                      </ListItemStyled>
                    </Grid>
                  ))}
                </List>
              </Grid>
              <SubmitButton onClick={this.props.handleSubmit} variant="contained">
                Submit
              </SubmitButton>
            </RootPaper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <GraphPaper elevation={1} id="graphPaper">
              <Typography variant="h6" align="center">
                History (Last 7 Days)
              </Typography>
              <ChartsBar quantities={this.props.quantities} dates={this.props.dates} />
            </GraphPaper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NutritionGoalCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default NutritionGoalCard;
