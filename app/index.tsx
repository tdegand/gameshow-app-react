import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Game from '../hooks/Game';
import '../css/styles.css';
import WinGame from '@/components/winGame';
import LoseGame from '@/components/loseGame';
import StartGame from '@/components/startGame';

const App = () => {
	const [game, setGame] = useState<Game | null>(null);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const [gameOverMessage, setGameOverMessage] = useState('');
	const [activePhrase, setActivePhrase] = useState<string | null>(null); // State for the active phrase
	const [win, setWin] = useState(''); // State for win condition

	useEffect(() => {
		// Initialize the game when the component mounts
		const newGame = new Game();
		setGame(newGame);
	}, []);

	const handleStartGame = () => {
		if (game) {
			const activePhrase = game.startGame();
			setActivePhrase(activePhrase.toString()); // Convert Phrase to string
		}
		setIsGameStarted(true);
		setIsGameOver(false);
		setGameOverMessage('');
		setWin(''); // Reset win state
	};

	const handleKeyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (game) {
			game.handleInteraction(event.target as HTMLButtonElement);
			checkGameOver();
		}
	};

	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			if (game) {
				const buttons: NodeListOf<HTMLButtonElement> =
					document.querySelectorAll('#qwerty button');
				// biome-ignore lint/complexity/noForEach: <explanation>
				buttons.forEach((button: HTMLButtonElement) => {
					if (button.textContent === event.key && button.disabled === false) {
						game.handleInteraction(button);
						checkGameOver();
					}
				});
			}
		},
		[game]
	);

	const checkGameOver = () => {
		if (game?.checkForWin()) {
			setIsGameOver(true);
			setGameOverMessage('You won!');
			setWin('won');
		} else if (game && game.missed >= 5) {
			setIsGameOver(true);
			setGameOverMessage('Game over! You lost.');
			setWin('lost');
		}
	};

	useEffect(() => {
		// Add keydown event listener
		document.addEventListener('keydown', handleKeyPress);

		// Cleanup event listener on component unmount
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	// Conditional rendering based on whether the game has started
	if (!isGameStarted) {
		return <StartGame handleStartGame={handleStartGame} />;
	}

	if (isGameOver) {
		if (win === 'won') {
			return (
				<WinGame
					gameOverMessage={gameOverMessage}
					handleStartGame={handleStartGame}
				/>
			);
		}
		return (
			<LoseGame
				gameOverMessage={gameOverMessage}
				handleStartGame={handleStartGame}
			/>
		);
	}

	return (
		<div className='main-container'>
			<div id='banner' className='section'>
				<h2 className='header'>Phrase Hunter</h2>
			</div>
			<div id='phrase' className='section'>
				{/* Render the active phrase */}
				{activePhrase?.split(' ').map((word, wordIndex) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<ul key={wordIndex} className='word'>
						{word.split('').map((char, charIndex) => (
							<li
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={charIndex}
								className={char === ' ' ? 'space' : 'letter hide'}
							>
								{char}
							</li>
						))}
					</ul>
				))}
			</div>
			<div id='qwerty' className='section'>
				{/* Render the keyboard dynamically in rows */}
				{[
					['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], // First row
					['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], // Second row
					['z', 'x', 'c', 'v', 'b', 'n', 'm'], // Third row
				].map((row, rowIndex) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={rowIndex} className='keyrow'>
						{row.map((key, keyIndex) => (
							<button
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={keyIndex}
								className='key'
								type='button'
								onClick={handleKeyClick}
							>
								{key}
							</button>
						))}
					</div>
				))}
			</div>
			<div id='scoreboard' className='section'>
				<ol>
					{Array.from({ length: 5 }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<li key={index} className='tries'>
							<img
								src='../icons/liveHeart.png'
								className='heart'
								alt='Heart Icon'
								height='35'
								width='35'
							/>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};

export default App;
