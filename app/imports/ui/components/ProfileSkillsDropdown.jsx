import React from 'react';
import { Dropdown, Loader, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Skills } from '../../api/skill/skill';

class ProfileSkillsDropdown extends React.Component {
  state = {
    currentValues: [],
  };

  handleChange = (e, { value }) => {
    this.setState(
      { currentValues: value },
      () => Meteor.call('updateUserSkills', this.state.currentValues),
    );
  };

  render() {
    return (this.props.ready) ? this.renderDropdown() : <Loader active>Retrieving data</Loader>;
  }

  renderDropdown() {
    const descriptionMaxLen = 75;
    const skillOptions = this.props.skills.map((skill, index) => ({
      key: index,
      text: skill.name,
      value: skill.name,
      description: `${skill.description.substring(0, descriptionMaxLen)}...`,
    }));

    return (
      <Container>
        <Dropdown
          placeholder='Add a skill'
          fluid
          multiple
          search
          selection
          defaultValue={this.props.userSkills}
          options={skillOptions}
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

ProfileSkillsDropdown.propTypes = {
  skills: PropTypes.array.isRequired,
  ready: PropTypes.bool,
  userSkills: PropTypes.array,
};

export default withTracker(() => {
  const skillsSub = Meteor.subscribe('Skills');
  return {
    skills: Skills.find({}).fetch(),
    ready: skillsSub.ready(),
  };
})(ProfileSkillsDropdown);
