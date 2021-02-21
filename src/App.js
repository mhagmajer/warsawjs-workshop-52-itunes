import logo from './logo.svg';
import styles from './App.module.css';
import { Counter } from './counter';

function LearnReactBanner({ topic }) {
    return (
        <a
            className={styles['App-link']}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn {topic} with WarsawJS
        </a>
    );
}

function App() {
    return (
        <div className={styles['App']}>
            <header className={styles['App-header']}>
                <Counter />
            </header>
        </div>
    );
}

export default App;
