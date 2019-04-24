import React from 'react'
import { Dropdown, Header, Loader, Container } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Skills } from '../../api/skill/skill';

class ProfileSkillsDropdown extends React.Component {
  render() {
    return (this.props.ready) ? this.renderDropdown() : <Loader active>Retrieving data</Loader>;
  }

  skillOptions = this.props.skills.map((skill) => ({
    key: skill._id,
    text: skill.name,
    value: skill.name,
    description: skill.description,
  }));

  renderDropdown() {
    return (
      <Container>


        <Dropdown
          placeholder='Skill'
          fluid
          multiple
          search
          selection
          options={this.skillOptions}
        />
      </Container>
    )
  }
}

ProfileSkillsDropdown.propTypes = {
  skills: PropTypes.array.isRequired,
  // currProfile: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(() => {
  const skillsSub = Meteor.subscribe('Skills');
  return {
    skills: Skills.find({}).fetch(),
    ready: skillsSub.ready(),
  };
})(ProfileSkillsDropdown);
