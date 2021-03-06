import React from "react";

import db from "../../db.json";
import GitHubCorner from "../../src/components/GitHubCorner";
import QuizBackground from "../../src/components/QuizBackground";
//import QuizLogo from "../../src/components/QuizLogo";
import Widget from "../../src/components/Widget";
import Button from "../../src/components/Button";
import QuizContainer from "../../src/components/QuizContainer";
import AlternativesForm from "../../src/components/AlternativesForm";
import BackLinkArrow from "../../src/components/BackLinkArrow";

function ResultWidget({ results }) {
  const CorrectAnswers = results.filter((x) => x).length;
  return (
    <Widget>
      <Widget.Header>Resultado</Widget.Header>

      <Widget.Content>
        <h2>{`Você acertou ${CorrectAnswers} perguntas`}</h2>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #{index + 1} Pergunta: {result === true ? 'Certa resposta' : 'Resposta errada'}
            </li>
          ))}
        </ul>
        <a href="/quiz"><Button>Jogar Novamente</Button></a>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        <iframe src="https://giphy.com/embed/lRjwXH9Thxz6DiWmyG" width="100%" height="100%" frameBorder="0">
        </iframe>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ 
  question, 
  questionIndex, 
  totalQuestions,
  onSubmit,
  addResult,
 }) {
   const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
   const [isQuestionSubmited, setIsQuestionSubmited] = React.useState();
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm 
          onSubmit={(eventInfo) => {
            eventInfo.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const alternativeStatus =  isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>
          {isQuestionSubmited && isCorrect }
          {isQuestionSubmited && !isCorrect }
        </AlternativesForm>
        
        {/*<pre>
          {JSON.stringify(question, null, 4)}
        </pre>*/}

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING:'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    // results.push(result);
    setResults([
       ...results,
       result,
    ]);
  }

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2 * 1000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget 
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/marilira/wandaVision-aluraquiz" />
    </QuizBackground>
  );
}
