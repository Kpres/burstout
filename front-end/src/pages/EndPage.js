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
    width: '50%',
    marginTop: theme.spacing.unit * 3,
    margin: 'auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
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

function handleClick(){
    rows = [];
}

function SimpleTable({ classes, players}) {

    
    for (var i = 0; i < players.length; i++){
        rows.push(createData(players[i].name, 0));
    }

    return (
        <div>
            <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Points</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => {
                    return (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            </Paper>

            <div className={classes.startButton}>
                
                <Link to = "/">
                    <Button
                        variant="outlined"
                        onClick = {handleClick}
                        color="primary"
                        size="large"
                        style={{
                            width: "100%"
                        }}
                    > HOME
                    </Button>
                </Link>
            </div>
        </div>

    );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);