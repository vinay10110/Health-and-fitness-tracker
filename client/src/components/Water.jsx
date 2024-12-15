import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';  // Updated to @mui/material
import TextField from '@mui/material/TextField';  // Updated to @mui/material
import Grid from '@mui/material/Grid';  // Updated to @mui/material
import ChartsBar from './ChartsBar';
import styled from 'styled-components';

// Styled Components
const RootPaper = styled(Paper)`
  text-align: center;
  padding-top: 16px;
  padding-bottom: 16px;
  margin: 4% 4% 3% 4%;
`;

const RootGraphPaper = styled(Paper)`
  text-align: center;
  padding-top: 16px;
  padding-bottom: 16px;
  margin: 4% 4% 3% 4%;
`;

const ProgressPaper = styled(Paper)`
  background-color: #63c5e4;
  margin-left: 19%;
  margin-right: 19%;
  margin-bottom: 28px;
  margin-top: 19px;
  padding: 1%;
`;

const InfoTypography = styled(Typography)`
  margin: 3% 8% 0% 8%;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
`;

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TextFieldStyled = styled(TextField)`
  margin: 16px;
  width: 100%;
`;

class WaterGoalCard extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <RootPaper elevation={1}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Typography variant="h4">Water Goal</Typography>
                  <InfoTypography>
                    Drink at least 8 glasses of 8 fluid ounces each day.
                  </InfoTypography>
                  <ProgressPaper>
                    <Typography align="center" variant="body2">
                      Current Progress: {this.props.glasses}
                    </Typography>
                  </ProgressPaper>
                </Grid>
                <Grid item xs={4}>
                  <ButtonStyled
                    onClick={() => { this.props.addGlass(1) }}
                    variant="outlined"
                    size="small"
                  >
                    +1 Glass
                  </ButtonStyled>
                </Grid>
                <Grid item xs={4}>
                  <ButtonStyled
                    onClick={() => { this.props.addGlass(3) }}
                    variant="outlined"
                    size="small"
                  >
                    +3 Glasses
                  </ButtonStyled>
                </Grid>
                <Grid item xs={4}>
                  <ButtonStyled
                    onClick={() => { this.props.addGlass(6) }}
                    variant="outlined"
                    size="small"
                  >
                    +6 Glasses
                  </ButtonStyled>
                </Grid>
                <Grid item xs={12}>
                  <FormContainer noValidate autoComplete="off">
                    <TextFieldStyled
                      id="addGlasses"
                      label="Enter Water"
                      type="number"
                      onChange={this.props.handleChange}
                    />
                  </FormContainer>
                </Grid>
                <Grid item xs={12}>
                  <ButtonStyled
                    onClick={this.props.handleClick}
                    variant="contained"
                  >
                    Submit
                  </ButtonStyled>
                </Grid>
              </Grid>
            </RootPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <RootGraphPaper elevation={1}>
              <Typography variant="h6" align="center">History (Last 7 Days)</Typography>
              <ChartsBar quantities={this.props.quantities} dates={this.props.dates} />
            </RootGraphPaper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

WaterGoalCard.propTypes = {
  glasses: PropTypes.number.isRequired,
  addGlass: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  quantities: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired,
};

export default WaterGoalCard;
