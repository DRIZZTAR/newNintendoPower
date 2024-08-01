import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Experience } from './components/Experience';
import { UI } from './components/UI';
import {
	DepthOfField,
	EffectComposer,
	Vignette,
} from '@react-three/postprocessing';
import { Analytics } from '@vercel/analytics/react';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

function App() {
	return (
		<>
			<UI />
			<Loader />
			<Canvas shadows camera={{ position: [-0.5, 2, 4], fov: 35 }}>
				<group position-y={0.1}>
					<Suspense fallback={null}>
						<Experience />
					</Suspense>
				</group>
				<EffectComposer>
					<DepthOfField
						focusDistance={0.001}
						focalLength={0.02}
						bokehScale={2}
					/>
					<Vignette eskil={true} offset={0.6} darkness={2} />
					{/* <ToneMapping
						blendFunction={BlendFunction.NORMAL} // blend mode
						adaptive={true} // toggle adaptive luminance map usage
						resolution={1080} // texture resolution of the luminance map
						middleGrey={0.1} // middle grey factor
						maxLuminance={6.0} // maximum luminance
						averageLuminance={1.0} // average luminance
						adaptationRate={1.0} // luminance adaptation rate
					/> */}
					{/* <DotScreen
						blendFunction={BlendFunction.NORMAL} // blend mode
						angle={4} // angle of the dot pattern

					/> */}
				</EffectComposer>
			</Canvas>
			<Analytics />
		</>
	);
}

export default App;
