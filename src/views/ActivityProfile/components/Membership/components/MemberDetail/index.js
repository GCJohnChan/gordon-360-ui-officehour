import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { gordonColors } from '../../../../../../theme';
import user from '../../../../../../services/user';

export default class MemberDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEdit: false,
      admin: true,
      groupAdmin: true,
      participationLevel: '',
      titleComment: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleText = this.handleText.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  async componentWillMount() {
    this.setState({
      groupAdmin: this.props.groupAdmin,
      participationLevel: this.props.member.ParticipationDescription,
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClick() {
    this.setState({ openEdit: true });
  }

  handleSelect = name => event => {
    this.setState({ participationLevel: event.target.value });
  };

  handleText = event => {
    this.setState({ titleComment: event.target.value });
  };

  onChange = event => {
    this.setState({ participationLevel: event.target.value });
  };

  onClose() {
    this.setState({
      openEdit: false,
      participationLevel: this.props.member.ParticipationDescription,
      titleComment: '',
    });
  }

  render() {
    const leaveButton = {
      background: gordonColors.secondary.red,
      color: 'white',
    };
    const { id } = user.getLocalInfo();
    let showLeaveButton = false;
    if (this.props.member.IDNumber.toString() === id) {
      showLeaveButton = true;
    } else {
      showLeaveButton = false;
    }

    let leave;
    if (showLeaveButton) {
      leave = (
        <Button style={leaveButton} raised>
          LEAVE
        </Button>
      );
    } else {
      leave = (
        <Typography>You do not have permission to see any details about this member</Typography>
      );
    }
    const formControl = {
      padding: 10,
    };
    if (this.state.admin) {
      let disabled = false;
      if (this.state.participationLevel === 'Guest') {
        disabled = true;
      }
      leave = (
        <Grid container>
          <Grid item>
            <Button color="primary" onClick={this.handleClick} raised>
              Edit
            </Button>
            <Dialog open={this.state.openEdit} keepMounted align="center">
              <DialogContent>
                <Grid container align="center" padding={6}>
                  <Grid item xs={12} sm={12} md={12} lg={12} padding={6}>
                    <DialogTitle>
                      Edit {this.props.member.FirstName} {this.props.member.LastName}
                    </DialogTitle>
                    <Typography>Participation (Required)</Typography>
                    <Grid item padding={6} align="center">
                      <FormControl fullWidth style={formControl}>
                        <Select
                          value={this.state.participationLevel}
                          onChange={this.handleSelect('participationLevel')}
                          renderValue={value => `${value}`}
                        >
                          <MenuItem value="Advisor">Advisor</MenuItem>
                          <MenuItem value="Guest">Guest</MenuItem>
                          <MenuItem value="Leader">Leader</MenuItem>
                          <MenuItem value="Member">Member</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item align="center">
                      <Typography>Title/Comment: (Optional)</Typography>
                      <TextField
                        fullWidth
                        onChange={this.handleText}
                        style={formControl}
                        value={this.state.titleComment}
                      />
                    </Grid>
                    <Grid item style={formControl}>
                      <Button color="primary" raised>
                        SUBMIT CHANGES
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} style={formControl}>
                      <Button color="primary" onClick={this.onClose} raised>
                        CANCEL
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </Grid>
          <Grid item>
            <Button style={leaveButton} raised>
              Remove
            </Button>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.groupAdmin}
                  color="primary"
                  disabled={disabled}
                  onChange={this.handleChange('groupAdmin')}
                />
              }
              label="Group Admin"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography>TITLE/COMMENT:</Typography>
          </Grid>
        </Grid>
      );
    }
    return (
      <ExpansionPanel defaultExpanded={showLeaveButton || this.state.admin}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container>
            <Grid item xs={8} sm={9} md={10}>
              <Typography>
                {this.props.member.FirstName} {this.props.member.LastName}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <Typography>{this.props.member.ParticipationDescription} </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{leave}</ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

MemberDetail.propTypes = {
  member: PropTypes.shape({
    AccountPrivate: PropTypes.number,
    ActivityCode: PropTypes.string.isRequired,
    ActivityDescription: PropTypes.string.isRequired,
    ActivityImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string,
    EndDate: PropTypes.string,
    FirstName: PropTypes.string.isRequired,
    GroupAdmin: PropTypes.bool.isRequired,
    IDNumber: PropTypes.number,
    LastName: PropTypes.string.isRequired,
    MembershipID: PropTypes.number,
    Participation: PropTypes.string.isRequired,
    ParticipationDescription: PropTypes.string.isRequired,
    Privacy: PropTypes.string,
    SessionCode: PropTypes.string.isRequired,
    SessionDescription: PropTypes.string.isRequired,
    StartDate: PropTypes.string.isRequired,
  }).isRequired,
};
