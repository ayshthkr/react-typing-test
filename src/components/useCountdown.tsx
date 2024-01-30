import { useEffect, useState } from 'react';

function useCountdown(
	initialTime: number,
	callback: () => void,
	interval = 1000
) {
	const [time, setTime] = useState<number>(initialTime);

	useEffect(() => {
		const customInterval = setInterval(() => {
			if (time > 0) setTime(prev => prev - interval);
		}, interval);
		if (time == 0) callback();
		return () => clearInterval(customInterval);
	}, [time]);

	return time;
}

export default useCountdown;
