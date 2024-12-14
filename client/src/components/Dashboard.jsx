/* eslint-disable react/prop-types */
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import FontAwesome from 'react-fontawesome';
import ChartsPie from './../ChartsPie';

// Inline styles
const styles = {
  cardUser: { margin: "5%" },
  tableCellStyle: { padding: 0 },
  waterAvatar: { backgroundColor: '#63c5e4', margin: '5%', marginLeft: "17%" },
  nutritionAvatar: { backgroundColor: '#10953bb8', margin: '5%', marginLeft: "17%" },
  exerciseAvatar: { backgroundColor: '#825eb9b5', margin: '5%', marginLeft: "17%" },
  weightAvatar: { backgroundColor: '#4d66f08a', margin: '5%', marginLeft: "17%" },
  info: { margin: "4% 0" },
  nameTitle: { marginTop: "8%" },
};

function Dashboard({ firstName, lastName, water, nutrition, exercise, weight }) {
  return (
    <div>
      <Card style={styles.cardUser}>
        <CardContent>
          <Typography variant="h3" align="center">
            Dashboard
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <ChartsPie
                waterChart={water}
                nutritionChart={nutrition}
                exerciseChart={exercise}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" align="center" style={styles.nameTitle}>
                {firstName} {lastName}
              </Typography>
              <Typography style={styles.info} align="center">
                All your daily health tracking information is displayed below.
                Click on the icons to access the goal pages.
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={styles.tableCellStyle}>Water (Cups)</TableCell>
                    <TableCell style={styles.tableCellStyle}>{water}</TableCell>
                    <TableCell>
                      <Tooltip title="Go to Water Page" placement="right">
                        <Avatar style={styles.waterAvatar}>
                          <a href="/water" style={{ textDecoration: 'none', color: 'white' }}>
                            <FontAwesome className="fas fa-tint" size="lg" />
                          </a>
                        </Avatar>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={styles.tableCellStyle}>Nutrition (Points)</TableCell>
                    <TableCell style={styles.tableCellStyle}>{nutrition}</TableCell>
                    <TableCell>
                      <Tooltip title="Go to Nutrition Page" placement="right">
                        <Avatar style={styles.nutritionAvatar}>
                          <a href="/nutrition" style={{ textDecoration: 'none', color: 'white' }}>
                            <FontAwesome className="fas fa-utensils" size="lg" />
                          </a>
                        </Avatar>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={styles.tableCellStyle}>Exercise (Duration)</TableCell>
                    <TableCell style={styles.tableCellStyle}>{exercise}</TableCell>
                    <TableCell>
                      <Tooltip title="Go to Exercise Page" placement="right">
                        <Avatar style={styles.exerciseAvatar}>
                          <a href="/exercise" style={{ textDecoration: 'none', color: 'white' }}>
                            <FontAwesome className="fas fa-dumbbell" size="lg" />
                          </a>
                        </Avatar>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={styles.tableCellStyle}>Weight (LBS)</TableCell>
                    <TableCell style={styles.tableCellStyle}>{weight}</TableCell>
                    <TableCell>
                      <Tooltip title="Go to Weight Page" placement="right">
                        <Avatar style={styles.weightAvatar}>
                          <a href="/weight" style={{ textDecoration: 'none', color: 'white' }}>
                            <FontAwesome className="fas fa-weight" size="lg" />
                          </a>
                        </Avatar>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
