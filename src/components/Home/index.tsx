import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './Home.css';
import { getWords } from '../words';

function mapString(ans: string, text: string) {
	// var ans = [];
	// for (let i = 0; i < str.length; i++) {
	// 	if (text[i] == str[i]) {
	// 		if (str[i] == ' ')
	// 			ans.push(<span className='space'>{str[i]}</span>);
	// 		else ans.push(<span>{str[i]}</span>);
	// 	} else {
	// 		if (text[i] == ' ')
	// 			ans.push(<span className='wrong space'>{text[i]}</span>);
	// 		else ans.push(<span className='wrong'>{text[i]}</span>);
	// 	}
	// }
	// return ans;

	var lis = [];
	for (var i = 0; i < text.length; i++) {
		if (i < ans.length) {
			if (ans[i] == text[i]) {
				if (ans[i] == ' ')
					lis.push(<span className='space'>{ans[i]}</span>);
				else lis.push(<span className='correct'>{ans[i]}</span>);
			} else {
				if (text[i] == ' ')
					lis.push(<span className='wrong space'>{text[i]}</span>);
				else lis.push(<span className='wrong'>{text[i]}</span>);
			}
		} else if (i == ans.length)
			lis.push(
				<span className={(text[i] == ' ' ? 'space' : '') + ' active'}>
					{text[i]}
				</span>
			);
		else
			lis.push(
				<span className={text[i] == ' ' ? 'space' : ''}>{text[i]}</span>
			);
	}
	return lis;
	type psType = {
		content: string;
		correct: boolean;
		space: boolean;
		wrong: boolean;
		active: boolean;
	};
	var lis: psType[] = [];
	for (var i = 0; i < text.length; i++) {
		var ps = {
			content: '',
			correct: false,
			space: false,
			wrong: false,
			active: false,
		};
		if (i < ans.length) {
			if (ans[i] == text[i]) {
				if (ans[i] == ' ') ps = { ...ps, content: ans[i], space: true };
				else ps = { ...ps, content: ans[i], correct: true };
			} else {
				if (text[i] == ' ')
					ps = { ...ps, content: text[i], wrong: true, space: true };
				else ps = { ...ps, content: text[i], wrong: true };
			}
		} else if (i == ans.length)
			ps = {
				...ps,
				content: text[i],
				space: text[i] == ' ',
				active: true,
			};
		else
			ps = {
				...ps,
				content: text[i],
				space: text[i] == ' ',
			};
		lis.push(ps);
	}
	// var ret = [<span>Hello</span>];
	var span: JSX.IntrinsicElements['span'] = <span>Hello</span>
	for (var j = 0; j < lis.length; j++) {
	}
	return lis;

	// var textLis = text.split(' ');
	// var ansLis = ans.split(' ');
	// var ret = [];
	// for (var i = 0; i < textLis.length; i++) {
	// 	if (i >= ansLis.length) {
	// 		ret.push(
	// 			<span>
	// 				{textLis[i].split('').map(letter => (
	// 					<span>{letter}</span>
	// 				))}
	// 			</span>
	// 		);
	// 	} else {
	// 		if (textLis[i] == ansLis[i]) {
	// 			ret.push(
	// 				<span>
	// 					{textLis[i].split('').map(letter => (
	// 						<span className='correct'>{letter}</span>
	// 					))}
	// 				</span>
	// 			);
	// 		} else {

	// 		}
	// 	}
	// }
	// return ret;
	// var returnLis = textLis.map(word => (
	// 	<span>
	// 		{word.split('').map(letter => (
	// 			<span>{letter}</span>
	// 		))}
	// 		&nbsp;
	// 	</span>
	// ));

	// return returnLis;
}

function match(ans: string, text: string) {
	var points = 0;
	var ansList = ans.split(' ');
	var textList = text.split(' ');
	for (var i = 0; i < ansList.length; i++) {
		if (ansList[i] == textList[i]) points++;
	}
	return points * 2;
}

function Home() {
	const [ans, setAns] = useState<string>('');
	const [text] = useState<string>(getWords());
	const textRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setAns(_prev => e.target.value);
		if (!started) setStarted(true);
	};
	const [started, setStarted] = useState<boolean>(false);

	const callback = () => {
		// alert('Completed the test');
		// const dialog = document.querySelector('.dialog');
		const points = match(ans, text);
		alert(points);
	};

	useEffect(() => {
		inputRef.current?.focus();
		const boo = document.activeElement == inputRef.current;
		console.log(boo);
	}, [inputRef]);

	return (
		<>
			<div className='dialog'></div>
			<div>
				<Timer
					initial={30 * 1000}
					started={started}
					callback={callback}
				/>
			</div>
			<div className='container' spellCheck={false}>
				<div className='text' ref={textRef}>
					{mapString(ans, text).map(elem => elem)}
				</div>
				<textarea
					className='input'
					ref={inputRef}
					value={ans}
					onChange={handleChange}
				/>
				{/* <div className='answer-div' ref={ansRef}>
					{mapString(ans, text).map(elem => elem)}
				</div> */}
			</div>
		</>
	);
}

function Timer({
	started,
	initial,
	callback,
}: {
	started: boolean;
	initial: number;
	callback: () => void;
}) {
	const [elapsed, setElapsed] = useState<number>(initial);

	useEffect(() => {
		// let interval: number = 0;

		// if (active) {
		// 	interval = setInterval(() => {
		// 		setElapsed(old => old - 10);
		// 	}, 10);
		// } else {
		// 	clearInterval(interval);
		// }

		// if (elapsed <= 0) {
		// 	setActive(_old => false);
		// 	setElapsed(0);
		// }

		// return () => {
		// 	clearInterval(interval);
		// };

		if (started) {
			if (elapsed <= 0) {
				callback();
				return;
			}

			const timer = setInterval(() => setElapsed(old => old - 10), 10);

			return () => clearInterval(timer);
		}
	}, [elapsed, started]);

	return <span>{(elapsed / 1000).toFixed(2)}</span>;
}

export default Home;
