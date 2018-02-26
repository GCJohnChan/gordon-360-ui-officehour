import { DialogContent, DialogTitle } from 'material-ui/Dialog';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import React, { Component } from 'react';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';

// import activity from '../../../../services/activity';

export default class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityDescription: null,
    };
  }

  render() {
    const { activityDescription } = this.props;
    let content = (
      <DialogContent>
        <Typography>Participation</Typography>
        <FormControl>
          <InputLabel>Please select</InputLabel>
          <Select
            value=""
            // onChange={this.handleChange}
          />
          <MenuItem value="">
            {' '}
            <em>None</em>
          </MenuItem>
          <MenuItem value="Advisor" />
          <MenuItem value="Guest" />
          <MenuItem value="Leader" />
          <MenuItem value="Member" />
        </FormControl>
        <FormControl />
      </DialogContent>
    );
    return { content };
  }
}