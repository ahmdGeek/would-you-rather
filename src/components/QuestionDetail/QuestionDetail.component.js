import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Item, Progress } from "semantic-ui-react";

const QuestionDetailComponent = ({
  id, dispatch, questions, users, currentUser, checkedItem, question, user, totalVotes,
  handleChangeCheck, submitAnswer,
}) => {
  return (
    <Item>
      <Item.Image size='small' src={user?.avatarUrl} />
      <Item.Content>
        {
          currentUser?.answers?.[id]
            ? (
              <>
                <Item.Header as='a'>
                  {
                    user.name
                  }, asks Would You Rather &#63;
                </Item.Header>
                <Item.Description>
                  <Progress percent={((question.optionOne.votes.length / totalVotes) * 100)} progress>
                    {
                      question?.optionOne?.text
                    }
                  </Progress>
                  <hr />
                  <Progress percent={((question?.optionTwo?.votes.length / totalVotes) * 100)} progress>
                    {
                      question?.optionTwo?.text
                    }
                  </Progress>            </Item.Description>
                <Link to="/dashboard">
                  <Button>
                    Back to Dashboard
                  </Button>
                </Link>
              </>)
            : (
              <>
                <Item.Header as='a'>
                  {
                    user.name
                  }, asks Would You Rather &#63;
                </Item.Header>
                <Item.Description>
                  <Form>
                    <Form.Field>
                      Selected value:
                      {' '}
                      <b>
                        {
                          checkedItem === 'optionOne'
                            ? question.optionOne.text
                            : checkedItem === 'optionTwo'
                              ? question.optionTwo.text
                              : ''
                        }
                      </b>
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        radio
                        label={question.optionOne.text}
                        name='checkboxRadioGroup'
                        value='optionOne'
                        checked={checkedItem === 'optionOne'}
                        onChange={handleChangeCheck}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        radio
                        label={question.optionTwo.text}
                        name='checkboxRadioGroup'
                        value='optionTwo'
                        checked={checkedItem === 'optionTwo'}
                        onChange={handleChangeCheck}
                      />
                    </Form.Field>
                  </Form>
                </Item.Description>
                <Button onClick={submitAnswer}>
                  Answer
                </Button>
              </>)
        }
      </Item.Content>
    </Item>
  );
}


export default QuestionDetailComponent;

export {
  QuestionDetailComponent,
}