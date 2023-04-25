import { useEffect, useState, useCallback } from "react"
import { AnswerComponent } from "./AnswerComponents";
import { ProgressBarComponent } from "./ProgressBarComponents";
import { QuestionComponent } from "./QuestionComponent";

interface Country {
    name: string,
    capital: string
}

export const QuizManagerComponents = () => {
    const [countries, setCountries] = useState<Country[]>([]); //Tout les pays
    const [currentCountry, setCurrentCountry] = useState<Country>(); //pays choisi
    const [propositions, setPropositions] = useState<string[]>([]); // selection de 4 capitales
    const [progress, setProgress] = useState(10); //progres de la barre de progression
    const [currentQuestion, setCurrentQuestion] = useState(1) //numero de la question en cours
    const [nbQuestion] = useState(10)
    const [answerSubmited, setAnswerSubmited] = useState<string | null>(null);
    const [answer, setAnswer] = useState<string>();
    const [score, setScore] = useState<number>(0);

    const fetchCountries = useCallback(() => {
        fetch("https://restcountries.com/v2/all")
            .then((response) => response.json())
            .then((data) => {
                const mycountries: Country[] = data.map((country: Country) => ({
                    name: country.name,
                    capital: country.capital || "N/A",
                }));
                //console.log("les pays que j'ai récupéré : " + mycountries);
                setCountries(mycountries);
                //console.log("les pays que j'ai assigné : " + countries);
            })
            .catch((error) => console.error(error));
    }, [countries]);

    const selectPropositions = useCallback(() => {
        if (currentCountry != null && countries.length > 0) {
            setPropositions([])
            const newPropositions: string[] = [];
            console.log('currentCountry ' + currentCountry.name)
            newPropositions.push(currentCountry?.capital);
            setAnswer(currentCountry?.capital)
            while (newPropositions.length < 4) {
                const randomId = Math.floor(Math.random() * countries.length);
                const newCountry: Country = countries[randomId];
                if (newPropositions.includes(newCountry.capital)) {
                    console.log("Non cette capitale est déjà selectionné");
                }
                else {
                    newPropositions.push(newCountry.capital);
                    console.log("la capitale ajoutée : " + newCountry.capital);
                }
            }
            console.log("les capitales que j'ai récupéré : " + newPropositions);
            setPropositions(newPropositions.sort(() => Math.random() - 0.5));
            console.log("les capitales que j'ai assigné : " + newPropositions);
            console.log(propositions);
        }

    }, [countries, currentCountry, propositions]);

    const selectRandomCountry = useCallback(() => {
        if (countries.length > 0) {
            const randomId = Math.floor(Math.random() * countries.length);
            const newCountry: Country = countries[randomId];
            if (newCountry != null) {
                console.log('newCountry '+ newCountry.name)
                setCurrentCountry(newCountry);
            }
            console.log("le pays que j'ai assigné : " + currentCountry);
        }

    }, [currentCountry, countries]);

    useEffect(() => {
        if (countries.length == 0) {
            fetchCountries();
        }
        if (currentCountry == null) {
            selectRandomCountry();
        }
    }, [countries.length, currentCountry, fetchCountries, selectRandomCountry, selectPropositions, propositions]);

    useEffect(() => {
        selectPropositions();
    }, [currentCountry]);
      

    const move = (end: number, total: number) => {
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
        
    };

    const submit = () => {
        if (answerSubmited){
            if (currentQuestion < nbQuestion){
                move(progress + 10, nbQuestion * 10)
                selectRandomCountry()
                if (answer == answerSubmited){
                    setScore(score + 1)
                }
                setAnswerSubmited('')
            }
        }
       
    }
    function handleAnswerSelected(value: string) {
        setAnswerSubmited(value);
    }

    return (
        <div>
            {currentCountry != null &&
            <div>
                <QuestionComponent name={currentCountry?.name} />    
                <AnswerComponent answer={propositions} onSelect={handleAnswerSelected} />
                <button onClick={() => submit()}>Valider</button>
                <ProgressBarComponent nbQuestion={nbQuestion} currentQuestion={currentQuestion} progress={progress}/>
                Votre score est de : { score }
            </div>}
        </div>
    )
}