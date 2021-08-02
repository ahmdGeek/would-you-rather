import { questionsConstants } from './questions.constants';
import { login } from '../user';
import { getUsers } from '../users';
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from '../../API';
import {
  store,
} from '../store';

/**
 * Thunk action creator
 * dispatch action for getting all question from API
 * @returns Thunk function
 */
const getAllQ = () => async (dispatch) => {
  dispatch({
    type: questionsConstants.GET_Q_REQUEST,
  });

  const questions = await _getQuestions();
  dispatch({
    type: questionsConstants.GET_Q_SUCCESS,
    payload: {
      questions,
    },
  });
};

/**
 * Thunk action creator
 * dispatch action for saving question answer into the API
 * @param {{answer: string, qId: string }} user answer and question id
 * @returns Thunk function
 */
const saveAnswer = ({ answer, qId }) => async (dispatch) => {
  const { user: { user = {} } } = store.getState();
  await _saveQuestionAnswer({ authedUser: user.id, answer, qid: qId });
  dispatch({
    type: questionsConstants.RESET,
  });
  dispatch(getUsers()).then(({ payload: { users } } = { payload: { users: {} } }) => {
    dispatch(login({ users, userId: user.id }));
  });
  dispatch(getAllQ());
};

/**
 * Thunk action creator
 * dispatch action for adding question into the API
 * @param {{optionOneText: string, optionTwoText: string, user: user Object}}
 * @returns Thunk function
 */
const saveNewQ = ({ optionOneText, optionTwoText, user }) => async (dispatch) => {
  dispatch({
    type: questionsConstants.SAVE_NEW_Q_REQUEST,
  });

  await _saveQuestion({ optionOneText, optionTwoText, author: user.id });
  dispatch({
    type: questionsConstants.SAVE_NEW_Q_SUCCESS,
  });
  dispatch({
    type: questionsConstants.RESET,
  });
  dispatch(getUsers()).then(({ payload: { users } } = { payload: { users: {} } }) => {
    dispatch(login({ users, userId: user.id }));
  });
  dispatch(getAllQ());
};

export {
  getAllQ,
  saveAnswer,
  saveNewQ,
};
