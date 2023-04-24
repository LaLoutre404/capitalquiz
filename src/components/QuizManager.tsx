import { useEffect, useState } from "react"

interface Country {
    name: string,
    capital: string
}

export const QuizManagerComponents = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [currentCountry, setCurrentCountry] = useState<Country>();
    const [isRightAnswer, setAnswer] = useState(false);


    const fetchCountries = () => {
        fetch("https://restcountries.com/v2/all")
            .then((response) => response.json())
            .then((data) => {
                const mycountries: Country[] = data.map((country: Country) => ({
                    name: country.name,
                    capital: country.capital || "N/A",
                }));
                console.log(mycountries);
                setCountries(mycountries);
                console.log(countries);
            })
            .catch((error) => console.error(error));
    }

    const selectRandomCountry = () => {
        if (countries.length != 0) {
           const randomId = Math.floor(Math.random() * countries.length); 

        }
        else {
            console.log("La liste est vide")
        }
    }

    useEffect(() => {
        fetchCountries()
    }, []);

    return (
        <button onClick={fetchCountries}>
            clickMe
        </button>
    )
}