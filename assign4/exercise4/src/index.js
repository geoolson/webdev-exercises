import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

var model = {
    countriesAll: null,
    main: null,
    populous: null,
    regions: null
};

const formatPop = num => {
    const reversedStr = num.toString().split('').reverse().join('');
    const commas = reversedStr.match(/.{1,3}/g).join(',');
    return commas.split('').reverse().join('');
};

const url = 'https://restcountries.eu/rest/v2/all';
const res = fetch(url).then(res => res.json());

function App() {
    return (
        <Router>
            <div>
                <nav className="bg-dark">
                    <ul className="list-inline text-center">
                        <li className="list-inline-item">
                            <Link className="text-light" to="/main">Main</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link className="text-light" to="/populous">Populous</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link className="text-light" to="/regions">Regions</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link className="text-light" to="/custom">Custom</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/main">
                        <Main />
                    </Route>
                    <Route path="/populous">
                        <Populous />
                    </Route>
                    <Route path="/regions">
                        <Regions />
                    </Route>
                    <Route path="/custom">
                        <Custom />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

const Section = props => {
    return (
        <section className="container border rounded bg-light w-50 mx-auto mt-5 p-3">
            {props.children}
        </section>
    );
}

const Home = () => {
    return (
        <Section>
            <h2 className="mt-2 mb-4">REST Countries</h2>
            <ul className="list-inline text-center">
                <li className="list-inline-item">
                    <Link className="text-dark" to="/main">Main</Link>
                </li>
                <li className="list-inline-item">
                    <Link className="text-dark" to="/populous">Populous</Link>
                </li>
                <li className="list-inline-item">
                    <Link className="text-dark" to="/regions">Regions</Link>
                </li>
                <li className="list-inline-item">
                    <Link className="text-dark" to="/custom">Custom</Link>
                </li>
            </ul>
        </Section>
    );
}

const Main = () => {
    const [list, setList] = useState('Loading...');
    useEffect(() => {
        if (model.main === null) {
            res
                .then(data => {
                    model.main = data.map((curr) => {
                        const { name, capital } = curr;
                        return <li key={name}>{`${name}: ${capital}`}</li>;
                    });
                    setList(model.main);
                })
        } else
            setList(model.main);
    }, []);
    return (
        <Section>
            <h2 className="mt-2 mb-4">REST Countries</h2>
            <ol>{list}</ol>
        </Section>
    );
}

const Populous = () => {
    const [list, setList] = useState('Loading...');
    useEffect(() => {
        if (model.populous === null) {
            res
                .then(data => {
                    model.populous = data
                        .filter(country => country.population >= 20000000)
                        .map((curr) => {
                            const { name, population } = curr;
                            return <li key={name}>{`${name}: ${formatPop(population)}`}</li>;
                        });
                    setList(model.populous);
                })
        } else
            setList(model.populous);
    }, []);
    return (
        <Section>
            <h2 className="mt-2 mb-4">Populous Countries</h2>
            <ul>{list}</ul>
        </Section>
    );
}

const Regions = () => {
    const [list, setList] = useState('Loading...');
    useEffect(() => {
        if (model.regions === null) {
            res
                .then(data => {
                    model.regions = [];
                    const regions = data.reduce((acc, country) => {
                        const region = country.region === "" ? "N/A" : country.region;
                        if (acc.has(region)) {
                            const value = acc.get(region) + 1;
                            acc.set(region, value);
                        }
                        else
                            acc.set(region, 1);
                        return acc;
                    }, new Map());
                    regions.forEach((num, region) => {
                        model.regions.push(<li key={region}>{`${region}: ${num}`}</li>);
                    });
                    setList(model.regions);
                })
        } else
            setList(model.regions);
    }, []);
    return (
        <Section>
            <h2 className="mt-2 mb-4">Country Regions</h2>
            <ul>{list}</ul>
        </Section>
    );
}

const Custom = () => {
    const country = data => {
        const { name, capital, region, population } = data;
        return (
            <li key={name}>
                <h3>{name}</h3>
                <ul>
                    <li key={("Capital_" + name)}>{`Captial: ${capital}`}</li>
                    <li key={("Region_" + name)}>{`Region: ${region}`}</li>
                    <li key={("Population_" + name)}>{`Population: ${formatPop(population)}`}</li>
                </ul>
            </li>
        );
    }
    const [list, setList] = useState('');
    useEffect(() => {
        const createCountryList = () => model.countriesAll.map(country);
        if (model.countriesAll === null)
            res.then(data => {
                model.countriesAll = data;
                setList(createCountryList)
            })
        else
            setList(createCountryList());
    }, []);
    return (
        <Section>
            <h2 className="mt-2 mb-4">Countries Search</h2>
            <form onSubmit={e => e.preventDefault()}>
                Country Name: <input type="text"
                    onChange={e => {
                        const newList = (() => {
                            try {
                                return model.countriesAll
                                    .filter(country => {
                                        const regex = new RegExp(`^${e.target.value.toLocaleLowerCase()}`);
                                        return country.name.toLowerCase().match(regex);
                                    })
                                    .map(country)
                            }
                            catch (e) {
                                return
                            }
                        })();
                        // VScode says this is unreachable, but it is reachable.
                        // It's a known bug with the linter with IIFE with try catch statements: https://github.com/microsoft/TypeScript/issues/36828
                        setList(newList);
                    }}
                />
            </form>
            <ul>{list}</ul>
        </Section>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
