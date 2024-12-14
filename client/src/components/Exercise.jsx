/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import styled from 'styled-components';
import TableRow from '@material-ui/core/TableRow';
import ChartsBar from './../ChartsBar';

// Styled Components
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

class ExerciseGoalCard extends React.Component {
  renderTableRows(arr) {
    return (
      arr.map((element) => (
        <TableRow key={element.exercise}>
          <TableCell>{element.exercise}</TableCell>
          <TableCell>{element.duration} Minutes</TableCell>
        </TableRow>
      ))
    );
  }

  render() {
    const { classes } = this.props;

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
                  Current Progress: {this.props.totalActivity} mins
                </Typography>
              </ProgressPaper>

              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <form  autoComplete="off">
                    <FormControlStyled fullWidth>
                      <InputLabel htmlFor="workout-simple">Workouts</InputLabel>
                      <Select
                        value={this.props.activity}
                        onChange={this.props.handleExerciseChange}
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
                      value={this.props.minutes}
                      onChange={this.props.handleDurationChange}
                      type="number"
                      fullWidth
                    />
                  </form>
                </Grid>

                <Grid item xs={12}>
                  <SubmitButton onClick={this.props.addExercise} variant="contained">
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
                  {this.renderTableRows(this.props.todaysActivities)}
                </TableBody>
              </Table>
            </Root>
          </Grid>

          <Grid item xs={12} md={6}>
            <GraphPaper elevation={1}>
              <Typography variant="h6" align="center">History (Last 7 Days)</Typography>
              <ChartsBar quantities={this.props.quantities} dates={this.props.dates} />
            </GraphPaper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ExerciseGoalCard.propTypes = {
  classes: PropTypes.object.isRequired,
  activity: PropTypes.string.isRequired,
  handleExerciseChange: PropTypes.func.isRequired,
  minutes: PropTypes.number.isRequired,
  handleDurationChange: PropTypes.func.isRequired,
  addExercise: PropTypes.func.isRequired,
  totalActivity: PropTypes.number.isRequired,
  todaysActivities: PropTypes.array.isRequired,
  quantities: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired,
};

export default ExerciseGoalCard;
