/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChartsBar from './ChartsBar';
import styled from 'styled-components';

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

const ListItemStyled = styled(({ button, ...props }) => <ListItem {...props} />)`
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

const NutritionGoalCard = ({ progress, toggled, handleChange, handleSubmit, quantities, dates }) => {
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
                Current Progress: {progress}
              </Typography>
            </ProgressPaper>
            <Grid container spacing={2}>
              <List>
                {questions.map(([key, text]) => (
                  <Grid item xs={12} key={key}>
                    <ListItemStyled component="div" button dense>
                      <Checkbox
                        value={key}
                        checked={toggled[key]}
                        onChange={handleChange(key)}
                        color="primary"
                        disableRipple
                        tabIndex={-1}
                      />
                      <ListItemText primary={text} />
                    </ListItemStyled>
                  </Grid>
                ))}
              </List>
            </Grid>
            <SubmitButton onClick={handleSubmit} variant="contained">
              Submit
            </SubmitButton>
          </RootPaper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <GraphPaper elevation={1} id="graphPaper">
            <Typography variant="h6" align="center">
              History (Last 7 Days)
            </Typography>
            <ChartsBar quantities={quantities} dates={dates} />
          </GraphPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default NutritionGoalCard;
