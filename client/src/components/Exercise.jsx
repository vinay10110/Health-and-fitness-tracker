/* eslint-disable react/prop-types */

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
import ChartsBar from './ChartsBar';


const Root = styled(Paper)`
  padding-top: 16px;
  padding-bottom: 16px;
  margin: 5% 4% -1% 4%;
`;

const TextFieldStyled = styled(TextField)`
  margin-left: 8px;
  margin-right: 8px;
`;

const FormControlStyled = styled(FormControl)`
  margin: 8px;
  min-width: 120px;
`;

const ProgressPaper = styled(Paper)`
  background-color: #825eb9b5;
  margin-left: 19%;
  margin-right: 19%;
  margin-bottom: 28px;
  margin-top: 19px;
  padding: 4px;
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
  text-align: center;
`;

const GraphPaper = styled(Paper)`
  padding-top: 16px;
  padding-bottom: 16px;
  margin: 5% 4% 16% 4%;
`;

const ExerciseGoalCard = ({
  activity,
  handleExerciseChange,
  minutes,
  handleDurationChange,
  addExercise,
  totalActivity,
  todaysActivities,
  quantities,
  dates
}) => {

  const renderTableRows = (arr) => (
    arr.map((element, index) => (
      <TableRow key={`${element.exercise}-${index}`}>
        <TableCell>{element.exercise}</TableCell>
        <TableCell>{element.duration} Minutes</TableCell>
      </TableRow>
    ))
  );

  return (
    <div>
      <Grid container spacing={4}>
  <Grid item xs={12} md={6}>
    <Root elevation={1}>
      <Typography variant="h5" align="center">
        Exercise Tracker
      </Typography>
      <Typography align="center">
        Select a workout below and choose the duration of the activity.
        Each activity will be tracked in minutes. Your daily workouts are displayed
        below along with a historic graph of the last 7 days. 
      </Typography>

      <ProgressPaper>
        <Typography align="center" variant="body2">
          Current Progress: {totalActivity} mins
        </Typography>
      </ProgressPaper>

      <Grid container spacing={5}>
        <Grid item xs={12}>
          <form autoComplete="off">
            <FormControlStyled fullWidth>
              <InputLabel htmlFor="workout-simple">Workouts</InputLabel>
              <Select
                value={activity}
                onChange={handleExerciseChange}
                inputProps={{ name: 'activity', id: 'workout-simple' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'Walking'}>Walking</MenuItem>
                <MenuItem value={'Jogging'}>Jogging</MenuItem>
                <MenuItem value={'Running'}>Running</MenuItem>
                <MenuItem value={'Swimming'}>Swimming</MenuItem>
                <MenuItem value={'Cycling'}>Cycling</MenuItem>
                <MenuItem value={'Yoga'}>Yoga</MenuItem>
                <MenuItem value={'HIIT'}>HIIT</MenuItem>
                <MenuItem value={'Strength Training'}>Strength Training</MenuItem>
                <MenuItem value={'stairStepper'}>Stair Stepper</MenuItem>
                <MenuItem value={'boxing'}>Boxing</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
              </Select>
              <FormHelperText>Select the workout and duration</FormHelperText>
            </FormControlStyled>
          </form>
        </Grid>

        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextFieldStyled
              id="addMinutes"
              label="Enter Minutes"
              value={minutes}
              onChange={handleDurationChange}
              type="number"
              fullWidth
            />
          </form>
        </Grid>

        <Grid item xs={12}>
          <SubmitButton onClick={addExercise} variant="contained">
            Submit
          </SubmitButton>
        </Grid>
      </Grid>
    </Root>
  </Grid>

 
  <Grid item xs={12} md={6}>
    <Root elevation={1}>
      <Typography variant="h5" align="center">
        Today
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Exercises</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTableRows(todaysActivities)}
        </TableBody>
      </Table>
    </Root>
    <GraphPaper elevation={1}>
      <Typography variant="h6" align="center">History (Last 7 Days)</Typography>
      <ChartsBar quantities={quantities} dates={dates} />
    </GraphPaper>
  </Grid>
</Grid>
    </div>
  );
};

export default ExerciseGoalCard;
