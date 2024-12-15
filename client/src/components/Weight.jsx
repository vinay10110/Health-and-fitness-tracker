import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ChartsLine from '../components/ChartsLine';
import styled from 'styled-components';

const RootPaper = styled(Paper)`
  padding: 16px;
  margin: 5% 4% -3% 4%;
`;

const CenteredTypography = styled(Typography)`
  text-align: center;
`;

const ProgressPaper = styled(Paper)`
  background-color: #4d66f08a;
  margin: 19px 20% 28px 20%;
  padding: 4%;
`;

const InfoTypography = styled(Typography)`
  margin: 3% 8% 0% 8%;
`;

const WeightTextField = styled(TextField)`
  margin-left: 8px;
  margin-right: 8px;
  width: 100%;
`;

const SubmitButton = styled(Button)`
  margin-top: 4%;
`;

class WeightGoalsComponent extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <RootPaper elevation={1}>
              <CenteredTypography variant="h4">
                Weight Tracker
              </CenteredTypography>
              <InfoTypography>
                Enter your current weight below. Track as often as needed
              </InfoTypography>
              <ProgressPaper>
                <CenteredTypography variant="body2">
                  Current Weight: {this.props.weight} kgs
                </CenteredTypography>
              </ProgressPaper>

              <form noValidate autoComplete="off" >
                <WeightTextField
                  id="addWeight"
                  label="Enter Weight"
                  type="number"
                  onChange={this.props.handleChange}
                  value={this.props.updatedWeight}
                />
              </form>
              <SubmitButton
                onClick={this.props.handleClick}
                variant="contained"
                color="primary"
              >
                Submit
              </SubmitButton>
            </RootPaper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <RootPaper elevation={1}>
              <CenteredTypography variant="h6">
                History (Last 30 Days)
              </CenteredTypography>
              <ChartsLine quantities={this.props.quantities} dates={this.props.dates} />
            </RootPaper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

WeightGoalsComponent.propTypes = {
  weight: PropTypes.number.isRequired,
  updatedWeight: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  quantities: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired,
};

export default WeightGoalsComponent;
