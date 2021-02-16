import Component from './Component';
import {connect} from 'react-redux';

const logout = () => dispatch => dispatch({type: 'LOGOUT'});

const Request = data => dispatch => dispatch({type: 'REQUEST', payload: data});
const ClearRequest = () => (dispatch, getState) => {
  const acceptedStatus = getState().app.acceptedStatus;

  if (acceptedStatus) {
    dispatch({type: 'SET_ACCEPTED', payload: false});
    return;
  }

  dispatch({type: 'CLEAR_REQUEST'});
};
const setAcceptedStatus = status => dispatch =>
  dispatch({type: 'SET_ACCEPTED', payload: status});
const clearChat = payload => dispatch => dispatch({type: 'CLEAR_CHAT'});

const setChatz = (msg, append) => (dispatch, getState) => {
  const chat = getState().app.chat;

  return dispatch({
    type: 'SET_CHAT',
    payload: append(chat, {
      _id: chat.length,
      text: msg.get('text'),
      createdAt: msg.createdAt,
      user: {
        _id: msg.get('sender') === 'driver' ? 1 : 2,
      },
    }),
  });
};

const mapStateToProps = state => ({
  user: state.app.user,
  request: state.app.request,
  acceptedStatus: state.app.acceptedStatus,
  chatz: state.app.chat,
});

export default connect(
  mapStateToProps,
  {logout, Request, ClearRequest, setAcceptedStatus, setChatz, clearChat},
)(Component);
