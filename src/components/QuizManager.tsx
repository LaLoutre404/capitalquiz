import { useEffect, useState, useCallback } from "react"

interface Country {
    name: string,
    capital: string
}

export const QuizManagerComponents = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [currentCountry, setCurrentCountry] = useState<Country>();
    const [propositions, setPropositions] = useState<string[]>([]);


    const fetchCountries = useCallback(() => {
        fetch("https://restcountries.com/v2/all")
            .then((response) => response.json())
            .then((data) => {
                const mycountries: Country[] = data.map((country: Country) => ({
                    name: country.name,
                    capital: country.capital || "N/A",
                }));
                console.log("les pays que j'ai récupéré : " + mycountries);
                setCountries(mycountries);
                console.log("les pays que j'ai assigné : " + countries);
            })
            .catch((error) => console.error(error));
    }, [countries]);

    const selectPropositions = useCallback(() => {
        if( currentCountry != null) {
            const newPropositions: string[] = [];
            newPropositions.push(currentCountry?.capital);
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
            setPropositions(newPropositions);
            console.log("les capitales que j'ai assigné : " + newPropositions);
            console.log(propositions);
        }
       
    }, [countries, currentCountry, propositions]);

    const selectRandomCountry = useCallback(() => {
        if (countries.length != 0) {
            const randomId = Math.floor(Math.random() * countries.length);
            const newCountry: Country = countries[randomId];
            if (newCountry != null) {
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
        if (propositions.length == 0) {
            selectPropositions();
        }

    }, [countries.length, currentCountry, fetchCountries, selectRandomCountry, selectPropositions, propositions]);

    return (
        <div>
            <button onClick={selectPropositions}>
                {propositions}
            </button>
            <button onClick={selectRandomCountry}>
                {currentCountry?.name}
            </button>
        </div>
    )
}