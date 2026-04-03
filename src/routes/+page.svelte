<script lang="ts">
	import { lessons } from '$lib/data';
	import type { Language } from '$lib/types';

	let lessonIndex = $state(0);
	let currentIndex = $state(0);
	let lang = $state<Language>('es');

	let lesson = $derived(lessons[lessonIndex]);
	let sections = $derived(lesson.sections);
	let total = $derived(sections.length);
	let section = $derived(sections[currentIndex]);
	let canSwipe = $derived(section.swipeable);

	// TTS — native Capacitor plugin on Android, Web Speech API in browser
	let speaking = $state(false);
	let speakingText = $state('');
	let ttsSupported = $state(false);
	let useNativeTts = $state(false);
	let nativeTts: any = null;

	// Web Speech API state
	let voices = $state<SpeechSynthesisVoice[]>([]);

	$effect(() => {
		initTts();
	});

	async function initTts() {
		// Try Capacitor native TTS first
		try {
			const mod = await import('@capacitor-community/text-to-speech');
			nativeTts = mod.TextToSpeech;
			useNativeTts = true;
			ttsSupported = true;
			return;
		} catch {}

		// Fallback to Web Speech API
		if ('speechSynthesis' in window) {
			ttsSupported = true;
			function loadVoices() { voices = window.speechSynthesis.getVoices(); }
			loadVoices();
			window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
		}
	}

	function getEsVoice(): SpeechSynthesisVoice | undefined {
		return voices.find(v => v.lang === 'es-ES')
			|| voices.find(v => v.lang === 'es-MX')
			|| voices.find(v => v.lang.startsWith('es'));
	}

	async function speak(text: string) {
		if (!ttsSupported) return;

		if (speaking && speakingText === text) {
			await stopSpeaking();
			return;
		}

		await stopSpeaking();
		speaking = true;
		speakingText = text;

		if (useNativeTts && nativeTts) {
			try {
				await nativeTts.speak({ text, lang: 'es-ES', rate: 0.85 });
			} catch {}
			speaking = false;
			speakingText = '';
		} else {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = 'es-ES';
			utterance.rate = 0.85;
			const esVoice = getEsVoice();
			if (esVoice) utterance.voice = esVoice;
			utterance.onend = () => { speaking = false; speakingText = ''; };
			utterance.onerror = () => { speaking = false; speakingText = ''; };
			window.speechSynthesis.speak(utterance);
		}
	}

	async function stopSpeaking() {
		if (useNativeTts && nativeTts) {
			try { await nativeTts.stop(); } catch {}
		} else if ('speechSynthesis' in window) {
			window.speechSynthesis.cancel();
		}
		speaking = false;
		speakingText = '';
	}

	async function speakAll() {
		if (!ttsSupported) return;
		if (speaking) { await stopSpeaking(); return; }

		const content = section.content;
		let texts: string[] = [];
		if (content.type === 'parallel') {
			texts = content.pairs.map(p => p.es);
		} else if (content.type === 'grammar') {
			texts = content.pairs.map(p => p.es);
		} else if (content.type === 'vocab') {
			texts = content.words.map(w => w.es);
		}
		await speakQueue(texts);
	}

	async function speakQueue(texts: string[]) {
		if (texts.length === 0 || !speaking) { speaking = false; speakingText = ''; return; }
		const text = texts[0];
		const rest = texts.slice(1);
		speakingText = text;

		if (useNativeTts && nativeTts) {
			try { await nativeTts.speak({ text, lang: 'es-ES', rate: 0.85 }); } catch {}
			if (speaking) await speakQueue(rest);
		} else {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = 'es-ES';
			utterance.rate = 0.85;
			const esVoice = getEsVoice();
			if (esVoice) utterance.voice = esVoice;
			utterance.onend = () => { if (speaking) speakQueue(rest); };
			utterance.onerror = () => { speaking = false; speakingText = ''; };
			window.speechSynthesis.speak(utterance);
		}
	}

	// Swipe state
	let touchStartX = $state(0);
	let deltaX = $state(0);
	let swiping = $state(false);
	let animating = $state(false);

	function toggleLang() {
		if (!canSwipe) return;
		lang = lang === 'es' ? 'ru' : 'es';
	}

	function prevSection() { if (currentIndex > 0) currentIndex--; }
	function nextSection() { if (currentIndex < total - 1) currentIndex++; }

	function selectLesson(i: number) {
		lessonIndex = i;
		currentIndex = 0;
		lang = 'es';
		window.speechSynthesis?.cancel();
		speaking = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') { e.preventDefault(); prevSection(); }
		if (e.key === 'ArrowDown') { e.preventDefault(); nextSection(); }
		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); toggleLang(); }
		if (e.key === ' ') { e.preventDefault(); toggleLang(); }
	}

	function onTouchStart(e: TouchEvent) {
		if (animating || !canSwipe) return;
		touchStartX = e.touches[0].clientX;
		swiping = true;
		deltaX = 0;
	}

	function onTouchMove(e: TouchEvent) {
		if (!swiping) return;
		deltaX = e.touches[0].clientX - touchStartX;
	}

	function onTouchEnd() {
		if (!swiping) return;
		swiping = false;
		if (Math.abs(deltaX) > 60) {
			animating = true;
			toggleLang();
			setTimeout(() => { animating = false; }, 300);
		}
		deltaX = 0;
	}

	let langLabel = $derived(lang === 'es' ? 'Espanol' : 'Русский');
	let footerHint = $derived.by(() => {
		if (canSwipe) return lang === 'es' ? '← свайп → Русский' : '← свайп → Espanol';
		return '';
	});
</script>

<svelte:window onkeydown={onKeydown} />

<div class="app">
	<header>
		<div class="top-row">
			<div class="lesson-tabs">
				{#each lessons as l, i (l.id)}
					<button
						class="lesson-tab"
						class:active={i === lessonIndex}
						onclick={() => selectLesson(i)}
					>{l.title}</button>
				{/each}
			</div>
			<div class="top-right">
				<button class="speak-all-btn" class:active={speaking} onclick={speakAll} aria-label="Read all aloud">
					{speaking ? '◼' : '▶'} ES
				</button>
				{#if canSwipe}
					<div class="lang-indicator" class:es={lang === 'es'} class:ru={lang === 'ru'}>
						{langLabel}
					</div>
				{/if}
			</div>
		</div>
		<div class="subtitle">{lesson.subtitle}</div>
		<div class="sections-nav">
			{#each sections as s, i (s.id)}
				<button
					class="section-btn"
					class:active={i === currentIndex}
					onclick={() => currentIndex = i}
				>{s.title}</button>
			{/each}
		</div>
	</header>

	<main
		ontouchstart={onTouchStart}
		ontouchmove={onTouchMove}
		ontouchend={onTouchEnd}
		style="transform: translateX({swiping && canSwipe ? deltaX * 0.4 : 0}px)"
	>
		<div class="card" class:flip-in={animating}>
			{#if section.content.type === 'parallel'}
				<div class="text-block">
					{#each section.content.pairs as pair, i (i)}
						<div class="line-row">
							<p class="line">{lang === 'es' ? pair.es : pair.ru}</p>
							<button
								class="speak-btn"
								class:active={speaking && speakingText === pair.es}
								onclick={() => speak(pair.es)}
								aria-label="Read aloud"
							>&#9835;</button>
						</div>
					{/each}
				</div>

			{:else if section.content.type === 'grammar'}
				<div class="text-block">
					<div class="explanation">{section.content.explanation}</div>
					<div class="examples-header">Примеры:</div>
					{#each section.content.pairs as pair, i (i)}
						<div class="example-pair">
							<div class="example-row">
								<span class="primary">{pair.es}</span>
								<button
									class="speak-btn"
									class:active={speaking && speakingText === pair.es}
									onclick={() => speak(pair.es)}
									aria-label="Read aloud"
								>&#9835;</button>
							</div>
							<span class="secondary">{pair.ru}</span>
						</div>
					{/each}
				</div>

			{:else if section.content.type === 'vocab'}
				<div class="text-block vocab">
					{#each section.content.words as w, i (i)}
						<div class="vocab-line">
							<button
								class="speak-btn"
								class:active={speaking && speakingText === w.es}
								onclick={() => speak(w.es)}
								aria-label="Read aloud"
							>&#9835;</button>
							<span class="word">{w.es}</span>
							<span class="meaning">{w.ru}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</main>

	<footer>
		<button class="footer-nav" onclick={prevSection} disabled={currentIndex === 0}>&#9650;</button>
		<div class="footer-center">
			<span class="counter">{currentIndex + 1} / {total}</span>
			{#if footerHint}
				<span class="swipe-hint">{footerHint}</span>
			{/if}
		</div>
		<button class="footer-nav" onclick={nextSection} disabled={currentIndex === total - 1}>&#9660;</button>
	</footer>
</div>

<style>
	:global(*, *::before, *::after) { box-sizing: border-box; }
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		background: #0d0d1a;
		color: #e8e8f0;
		-webkit-font-smoothing: antialiased;
		height: 100dvh;
		overflow: hidden;
	}

	.app {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		max-width: 600px;
		margin: 0 auto;
	}

	header {
		flex-shrink: 0;
		padding: 0.4rem 0.6rem 0.3rem;
		background: #111128;
		border-bottom: 1px solid #1e1e3a;
	}

	.top-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.top-right {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.lesson-tabs {
		display: flex;
		gap: 0.25rem;
	}

	.lesson-tab {
		background: #1a1a3a;
		border: 1px solid #2a2a50;
		color: #667;
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s;
	}
	.lesson-tab.active {
		background: linear-gradient(135deg, #667eea, #764ba2);
		border-color: transparent;
		color: white;
	}

	.subtitle {
		font-size: 0.65rem;
		color: #556;
		margin-top: 0.2rem;
	}

	.speak-all-btn {
		background: #1a1a3a;
		border: 1px solid #2a2a50;
		color: #7a8;
		font-size: 0.65rem;
		font-weight: 700;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s;
		letter-spacing: 0.5px;
	}
	.speak-all-btn.active {
		background: rgba(100, 200, 130, 0.15);
		border-color: #4a8;
		color: #6cb;
	}
	.speak-all-btn:hover { border-color: #4a8; }

	.lang-indicator {
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		transition: background 0.3s, color 0.3s;
	}
	.lang-indicator.es {
		background: rgba(102, 126, 234, 0.2);
		color: #8da0ff;
	}
	.lang-indicator.ru {
		background: rgba(245, 87, 108, 0.2);
		color: #f5879c;
	}

	.sections-nav {
		display: flex;
		gap: 0;
		margin-top: 0.35rem;
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.sections-nav::-webkit-scrollbar { display: none; }

	.section-btn {
		flex-shrink: 0;
		background: none;
		border: none;
		color: #555;
		font-size: 0.65rem;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		border-bottom: 2px solid transparent;
		transition: color 0.2s, border-color 0.2s;
		white-space: nowrap;
	}
	.section-btn.active {
		color: #b8c4ff;
		border-bottom-color: #667eea;
	}

	main {
		flex: 1;
		overflow: hidden;
		transition: transform 0.15s ease-out;
	}

	.card {
		height: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding: 0.6rem 0.75rem 1.5rem;
		scrollbar-width: thin;
		scrollbar-color: #222 transparent;
	}

	.card.flip-in {
		animation: flipIn 0.3s ease-out;
	}

	@keyframes flipIn {
		0% { opacity: 0; transform: scale(0.97); }
		100% { opacity: 1; transform: scale(1); }
	}

	.text-block {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	/* TTS button */
	.speak-btn {
		background: none;
		border: none;
		color: #445;
		font-size: 0.75rem;
		cursor: pointer;
		padding: 0.15rem 0.3rem;
		border-radius: 4px;
		flex-shrink: 0;
		transition: color 0.2s;
		line-height: 1;
	}
	.speak-btn:hover { color: #6cb; }
	.speak-btn.active { color: #6cb; }

	/* Parallel lines with speaker */
	.line-row {
		display: flex;
		align-items: flex-start;
		gap: 0.25rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.03);
	}
	.line-row:last-child { border-bottom: none; }

	.line {
		margin: 0;
		padding: 0.3rem 0;
		font-size: 0.92rem;
		line-height: 1.5;
		color: #d8dcf0;
		flex: 1;
	}

	.explanation {
		font-size: 0.82rem;
		line-height: 1.6;
		color: #b0b4cc;
		white-space: pre-line;
		padding: 0.6rem;
		background: rgba(102, 126, 234, 0.06);
		border-radius: 8px;
		border-left: 3px solid #4a5a9e;
		margin-bottom: 0.6rem;
	}

	.examples-header {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: #556;
		margin-bottom: 0.3rem;
		font-weight: 600;
	}

	.example-pair {
		display: flex;
		flex-direction: column;
		padding: 0.3rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.03);
	}
	.example-pair:last-child { border-bottom: none; }

	.example-row {
		display: flex;
		align-items: flex-start;
		gap: 0.25rem;
	}

	.primary {
		font-size: 0.9rem;
		color: #c8d0f8;
		line-height: 1.45;
		flex: 1;
	}

	.secondary {
		font-size: 0.78rem;
		color: #666;
		line-height: 1.4;
		font-style: italic;
		margin-top: 1px;
	}

	.vocab { gap: 0; }

	.vocab-line {
		display: flex;
		align-items: baseline;
		gap: 0.35rem;
		padding: 0.35rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.03);
		font-size: 0.88rem;
		line-height: 1.4;
	}
	.vocab-line:last-child { border-bottom: none; }

	.word {
		color: #b8c4ff;
		font-weight: 600;
		flex-shrink: 0;
	}

	.meaning {
		color: #888;
		margin-left: auto;
		text-align: right;
	}

	footer {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		padding: 0.3rem 0.75rem;
		background: #111128;
		border-top: 1px solid #1e1e3a;
		gap: 0.5rem;
	}

	.footer-nav {
		background: none;
		border: 1px solid #2a2a50;
		color: #667;
		border-radius: 6px;
		width: 32px;
		height: 28px;
		font-size: 0.7rem;
		cursor: pointer;
		flex-shrink: 0;
	}
	.footer-nav:disabled { opacity: 0.2; cursor: default; }
	.footer-nav:hover:not(:disabled) { border-color: #444; color: #aaa; }

	.footer-center {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
	}

	.counter {
		font-size: 0.72rem;
		color: #556;
		font-variant-numeric: tabular-nums;
	}

	.swipe-hint {
		font-size: 0.65rem;
		color: #445;
	}
</style>
