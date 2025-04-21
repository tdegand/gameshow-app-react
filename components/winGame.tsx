import type React from 'react';

interface WinGameProps {
	gameOverMessage: string;
	handleStartGame: () => void;
}

const WinGame: React.FC<WinGameProps> = ({
	gameOverMessage,
	handleStartGame,
}) => {
	return (
		<div className={'win overlay'}>
			<h2 className='title'>Phrase Hunter</h2>
			<h1 id='game-over-message'>{gameOverMessage}</h1>
			<button id='btn__reset' type='button' onClick={handleStartGame}>
				Restart Game
			</button>
		</div>
	);
};

export default WinGame;
