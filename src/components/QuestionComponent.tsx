

export const QuestionComponent = (props:
    { pays: string}
  ) => {
    return(
        <div>
            <h2>Quel est la capitale de ce pays : {props.pays} ?</h2>
        </div>
    )
}
