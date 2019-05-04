import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';

const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export default function Notification(props) {
  return (
    <Comment style={{ padding: '1em', backgroundColor: '#f1f1f1', borderRadius: '5px' }}>
      <Comment.Avatar as='a' src={props.notice.image} />
      <Comment.Content>
        <Comment.Author>{props.notice.company}</Comment.Author>
        <Comment.Metadata>
          <span>{props.notice.datetime.toLocaleDateString('en-US', options)}</span>
        </Comment.Metadata>
        <Comment.Text>
          {props.notice.content}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
}

Notification.propTypes = {
  notice: PropTypes.object,
};
