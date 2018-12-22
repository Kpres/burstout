import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import {
    BrowserRouter as Router, Route, Switch, Redirect
  } from "react-router-dom";
  import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  startButton: {
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: "20%"
  }
});

let id = 0;
function createData(name, points) {
  id += 1;
  return { id, name, points };
}

var rows = [];

const handleClick = handleReset => event => {
  rows = []
  handleReset(event)
}


function SimpleTable({ classes, players, handleReset}) {
    for (var i = 0; i < players.length; i++){
      rows.push(createData(players[i].name, players[i].points));
    }

    if(players.length > 1){
        var min = players[0].points;
        var minPlayer = players[0].name;
        var max = players[0].points;
        var maxPlayer = players[0].name;

        for(var i = 0; i< players.length; i++){
            if (players[i].points > max) {
                max = players[i].points
                maxPlayer = players[i].name
            } if (players[i].points < min) {
                min = players[i].points
                minPlayer = players[i].name
            }
        }
      rows.push(createData("MVP: " + maxPlayer, max));
      rows.push(createData("Biggest Loser: " + minPlayer, min))
    }
    console.log(rows)
    return (
        <div>
            <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align = 'right'>Points</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => {
                    return (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align = 'right'>{row.points}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            </Paper>

            <div className={classes.startButton}>
              <Button
                variant="outlined"
                onClick={handleClick(handleReset)}
                color="primary"
                size="large"
                style={{
                    width: "100%"
                }}
              >
                Home
              </Button>
            </div>
        </div>

    );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);