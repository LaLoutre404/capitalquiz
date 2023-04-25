import { useState } from 'react';

export const ProgressBarComponent = (props:
    { nbQuestion: number}
  ) => {

    const [progress, setProgress] = useState(10);
    const [currentQuestion, setCurrentQuestion] = useState(1)

    const move = (end: number, total: number) => {
        if (currentQuestion < props.nbQuestion){
            const goal = 100 * end / total;
            const id = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= goal) {
                clearInterval(id);
                return prevProgress;
                } else {
                return prevProgress + 1;
                }
            });
            setCurrentQuestion(currentQuestion + 1);
            }, 10); //delay = vitesse de progression de la bar
        }
    };

   
    return(
        <>
            <button onClick={() => move(progress + 10, props.nbQuestion * 10)}>Valider</button>
            <div>
                Question {currentQuestion} / {props.nbQuestion}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div style={{ width: `${progress}%` }} className="bg-blue-600 h-2.5 rounded-full"></div>
            </div>
        </> 
    )
}