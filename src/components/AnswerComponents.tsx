export const AnswerComponent = (props:
    { answer: string[]}
  ) => {

    return(
        <div>
             <div>
                    <button>
                        <p>{props.answer[0]}</p>
                    </button>
                    <button>
                        <p>{props.answer[1]}</p>
                    </button>
                    <button>
                        <p>{props.answer[2]}</p>
                    </button>
                    <button>
                        <p>{props.answer[3]}</p>
                    </button>
                </div>
        </div>
    )
}