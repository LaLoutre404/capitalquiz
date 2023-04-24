import { useEffect, useState, useCallback } from "react"

interface Country {
    name: string,
    capital: string
}

export const QuizManagerComponents = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [currentCountry, setCurrentCountry] = useState<Country>();


    const fetchCountries = useCallback(() => {
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
    }, [countries]); 

    const selectRandomCountry = useCallback(() => {
        if (countries.length != 0) {
            const randomId = Math.floor(Math.random() * countries.length);
            const newCountry: Country = countries[randomId];
            if (newCountry != null) {
                setCurrentCountry(newCountry);
            }
            console.log(currentCountry);
        }
        else {
            console.log("La liste est vide, on récupère les pays"); 
            fetchCountries(); 
            
        }
    }, [currentCountry, countries, fetchCountries]); 

    useEffect(() => {
        if (countries.length == 0) {
            fetchCountries(); 
        }
        if (currentCountry == null) {
            selectRandomCountry(); 
        }
    }, [countries.length, currentCountry, fetchCountries, selectRandomCountry ]);

    return (
        <button onClick={selectRandomCountry}>
            {currentCountry?.name}
        </button>
    )
}