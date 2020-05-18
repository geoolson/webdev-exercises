import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

var model = {
    main: null,
    populous: null,
    regions: null
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

function Home() {
    return (
        <Section>
            <h2 className="mt-2 mb-4">REST Countries</h2>
            <ol></ol>
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
    const formatPop = num => {
        const reversedStr = num.toString().split('').reverse().join('');
        const commas = reversedStr.match(/.{1,3}/g).join(',');
        return commas.split('').reverse().join('');
    };
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
            <h2 className="mt-2 mb-4">REST Countries Populous</h2>
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
                        const { region } = country
                        if (region === "")
                            return acc;
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
            <h2 className="mt-2 mb-4">REST Countries Regions</h2>
            <ul>{list}</ul>
        </Section>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
