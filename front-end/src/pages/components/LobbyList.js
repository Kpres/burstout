import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

const styles = theme => ({
	root: {
		width: "100%"
	}
})

function LobbyList({ players, classes }) {
	return (
		<Fragment>
			<List
				subheader={
					<ListSubheader>
						Lobby List
					</ListSubheader>
				}
				className={classes.root}
			>
			{
				players.map((player, index) => (
					<ListItem key={player.name + index}>
						<Avatar>
						</Avatar>
						<ListItemText
							primary={player.name}
						/>
					</ListItem>
				))
			}
			</List>
		</Fragment>
	)
}

export default withStyles(styles)(LobbyList)