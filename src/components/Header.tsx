import React from 'react';
import '../styles/Header.css';

export default function Header(): JSX.Element {
    return (
        <header className="header">
            <div className="header__content">
                <a href="https://gastongit.com/lurk" className="header__link">
                    Lurk
                </a>
            </div>
        </header>
    );
}
