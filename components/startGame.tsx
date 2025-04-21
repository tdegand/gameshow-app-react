import type React from 'react';

interface StartGameProps {
	handleStartGame: () => void;
}

const StartGame: React.FC<StartGameProps> = ({ handleStartGame }) => {
	return (
		<div className={'start overlay'}>
			<h2 className='title'>Phrase Hunter</h2>
			<button id='btn__reset' type='button' onClick={handleStartGame}>
				Start Game
			</button>
		</div>
	);
};

export default StartGame;
