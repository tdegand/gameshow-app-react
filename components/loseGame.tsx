import type React from 'react';

interface LoseGameProps {
	gameOverMessage: string;
	handleStartGame: () => void;
}

const LoseGame: React.FC<LoseGameProps> = ({
	gameOverMessage,
	handleStartGame,
}) => {
	return (
		<div className={'lose overlay'}>
			<h2 className='title'>Phrase Hunter</h2>
			<h1 id='game-over-message'>{gameOverMessage}</h1>
			<button id='btn__reset' type='button' onClick={handleStartGame}>
				Restart Game
			</button>
		</div>
	);
};

export default LoseGame;
