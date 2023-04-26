export const ProgressBarComponent = (props:
    { nbQuestion: number,
      currentQuestion: number,
      progress: number}
  ) => {

    return(
        <>
            
            <div>
                Question {props.currentQuestion} / {props.nbQuestion}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div style={{ width: `${props.progress}%` }} className="bg-blue-600 h-2.5 rounded-full"></div>
            </div>
        </> 
    )
}