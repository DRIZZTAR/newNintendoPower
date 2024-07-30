import { atom, useAtom } from 'jotai';
import { pictures } from './bookData.js';
import { useEffect, useState } from 'react';

export const pageAtom = atom(0);
export const pages = [
	{
		front: 'cover',
		back: pictures[0],
	},
];
for (let i = 1; i < pictures.length - 1; i += 2) {
	pages.push({
		front: pictures[i % pictures.length],
		back: pictures[(i + 1) % pictures.length],
	});
}

pages.push({
	front: pictures[pictures.length - 1],
	back: 'back',
});

export const UI = () => {
	const [page, setPage] = useAtom(pageAtom);
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				menuOpen &&
				!event.target.closest('.menu') &&
				!event.target.closest('.hamburger')
			) {
				closeMenu();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuOpen]);

	useEffect(() => {
		const audio = new Audio('/audios/page-flip-01a.mp3');
		audio.play();
	}, [page]);

	return (
		<>
			<main className='pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col'>
				<a
					className='pointer-events-auto mt-10 ml-10 text-red-500 text-2xl uppercase font-extralight'
					href='https://www.tysonskakun.dev'
					target='_blank'
				>
					TysonSkakun.dev
				</a>
				<div className='w-full overflow-auto pointer-events-auto flex justify-center'>
					<div className='overflow-auto flex items-center gap-4 max-w-full p-10'>
						{[...pages].map((_, index) => (
							<button
								key={index}
								className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
									index === page
										? 'bg-white/90 text-black'
										: 'bg-black/30 text-white'
								}`}
								onClick={() => setPage(index)}
							>
								{index === 0 ? 'Cover' : `Page ${index}`}
							</button>
						))}
						<button
							className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
								page === pages.length
									? 'bg-white/90 text-black'
									: 'bg-black/30 text-white'
							}`}
							onClick={() => setPage(pages.length)}
						>
							Back Cover
						</button>
					</div>
				</div>
			</main>

			<div className='fixed inset-0 flex items-center -rotate-12 select-none'>
				<div className='relative'>
					<div className='bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8'>
						<h1 className='shrink-0 text-white text-10xl font-light  '>
							Tyson Skakun
						</h1>
						<h2 className='shrink-0 text-white text-8xl italic font-light'>
							Build
						</h2>
						<h2 className='shrink-0 text-transparent text-12xl font-bold italic outline-text'>
							Something
						</h2>
						<h2 className='shrink-0 text-white text-12xl font-bold'>
							Different
						</h2>
						<h2 className='shrink-0 text-white text-9xl font-light italic'>
							Get
						</h2>
						<h2 className='shrink-0 text-white text-9xl font-medium'>
							UP
						</h2>
					</div>
					<div className='absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max'>
						<h1 className='shrink-0 text-white text-10xl font-light  '>
							Tyson Skakun
						</h1>
						<h2 className='shrink-0 text-white text-8xl italic font-light'>
							Build
						</h2>
						<h2 className='shrink-0 text-transparent text-12xl font-bold italic outline-text'>
							Something
						</h2>
						<h2 className='shrink-0 text-white text-12xl font-bold'>
							Different
						</h2>
						<h2 className='shrink-0 text-white text-9xl font-light italic'>
							Get
						</h2>
						<h2 className='shrink-0 text-white text-9xl font-medium'>
							UP
						</h2>
					</div>
				</div>
			</div>

			<div
				className={`hamburger ${menuOpen ? 'active' : ''}`}
				onClick={toggleMenu}
			>
				<div />
				<div />
				<div />
			</div>
			<div className={`menu ${menuOpen ? 'active' : ''}`}>
				<div className='menu-close' onClick={closeMenu}></div>
				<div className='menu-content p-10'>
					<div className='menu-item font-extrabold'>
						<a
							href='https://www.linkedin.com/in/tyson-skakun-tail/'
							target='_blank'
							rel='noopener noreferrer'
						>
							Hire Me
						</a>
					</div>
					<div className='menu-item font-bold'>Issues</div>
					<div className='menu-item font-bold'>Need to Buy</div>
					<div className='menu-item font-bold'>Bat Services</div>
				</div>
			</div>
		</>
	);
};
