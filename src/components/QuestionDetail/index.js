import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveAnswer } from "../../store";
import { questionsSelector, usersSelector, userSelector } from '../../utils'
import { NotFound } from "../NotFound";
import { QuestionDetailComponent } from "./QuestionDetail.component";

const QuestionDetail = () => {
  const { id } = useParams();
  const { questions } = useSelector(questionsSelector);
  const question = useRef(questions[id]);
  const dispatch = useDispatch();

  const { users } = useSelector(usersSelector);
  const {
    user: currentUser
  } = useSelector(userSelector);
  const [checkedItem, setCheckedItem] = useState('');
  const authorUser = useRef(users[question?.current?.author] || {});
  const [totalVotes, setTotalVotes] = useState(question?.current?.optionOne?.votes?.length + question?.current?.optionTwo?.votes?.length);
  useEffect(() => {
    question.current = questions[id];
    setTotalVotes(question?.current?.optionOne?.votes?.length + question?.current?.optionTwo?.votes?.length)
  }, [questions, id]);
  useEffect(() => {
    authorUser.current = users[question?.current?.author] || {};
  }, [users, question]);

  const handleChangeCheck = useCallback((e, { value }) => {
    setCheckedItem(value);
  }, [setCheckedItem]);

  const submitAnswer = useCallback((e) => {
    e.preventDefault();
    dispatch(saveAnswer({ answer: checkedItem, qId: id }))
  }, [checkedItem, id, dispatch]);

  return (
    question.current
      ? <QuestionDetailComponent
        question={question.current}
        submitAnswer={submitAnswer}
        handleChangeCheck={handleChangeCheck}
        id={id}
        currentUser={currentUser}
        checkedItem={checkedItem}
        user={authorUser.current}
        totalVotes={totalVotes}
      />
      : <NotFound />
  );
}


export default QuestionDetail;

export {
  QuestionDetail,
}