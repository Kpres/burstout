import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
});

let id = 0;
function createData(name, points) {
  id += 1;
  return { id, name, points };
}

const rows = [];

function SimpleTable({ classes, players}) {
    for (var i = 0; i < players.length; i++){
        rows.push(createData(players[i].name, 0));
    }

    return (
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
    );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);