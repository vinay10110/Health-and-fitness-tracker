/* eslint-disable react/prop-types */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ChartsBar from './ChartsBar';
import styled from 'styled-components';


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

const WaterGoalCard = ({
  glasses,
  addGlass,
  handleChange,
  handleClick,
  quantities,
  dates,
}) => {
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
                    Current Progress: {glasses}
                  </Typography>
                </ProgressPaper>
              </Grid>
              <Grid item xs={4}>
                <ButtonStyled
                  onClick={() => addGlass(1)}
                  variant="outlined"
                  size="small"
                >
                  +1 Glass
                </ButtonStyled>
              </Grid>
              <Grid item xs={4}>
                <ButtonStyled
                  onClick={() => addGlass(3)}
                  variant="outlined"
                  size="small"
                >
                  +3 Glasses
                </ButtonStyled>
              </Grid>
              <Grid item xs={4}>
                <ButtonStyled
                  onClick={() => addGlass(6)}
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
                    onChange={handleChange}
                  />
                </FormContainer>
              </Grid>
              <Grid item xs={12}>
                <ButtonStyled
                  onClick={handleClick}
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
            <ChartsBar quantities={quantities} dates={dates} />
          </RootGraphPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default WaterGoalCard;
