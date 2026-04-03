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
	let progress = $derived((currentIndex + 1) / total);

	// Section type colors
	let sectionColor = $derived.by(() => {
		const t = section.content.type;
		if (t === 'parallel') return '#5b7cf7';
		if (t === 'grammar') return '#9b6dff';
		return '#4dcba0';
	});

	// TTS
	let speaking = $state(false);
	let speakingText = $state('');
	let ttsSupported = $state(false);
	let useNativeTts = $state(false);
	let nativeTts: any = null;
	let voices = $state<SpeechSynthesisVoice[]>([]);

	$effect(() => { initTts(); });

	async function initTts() {
		try {
			const mod = await import('@capacitor-community/text-to-speech');
			nativeTts = mod.TextToSpeech;
			useNativeTts = true;
			ttsSupported = true;
			return;
		} catch {}
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
		if (speaking && speakingText === text) { await stopSpeaking(); return; }
		await stopSpeaking();
		speaking = true;
		speakingText = text;
		if (useNativeTts && nativeTts) {
			try { await nativeTts.speak({ text, lang: 'es-ES', rate: 0.85 }); } catch {}
			speaking = false; speakingText = '';
		} else {
			const u = new SpeechSynthesisUtterance(text);
			u.lang = 'es-ES'; u.rate = 0.85;
			const v = getEsVoice(); if (v) u.voice = v;
			u.onend = () => { speaking = false; speakingText = ''; };
			u.onerror = () => { speaking = false; speakingText = ''; };
			window.speechSynthesis.speak(u);
		}
	}

	async function stopSpeaking() {
		if (useNativeTts && nativeTts) { try { await nativeTts.stop(); } catch {} }
		else if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }
		speaking = false; speakingText = '';
	}

	async function speakAll() {
		if (!ttsSupported) return;
		if (speaking) { await stopSpeaking(); return; }
		const c = section.content;
		let texts: string[] = [];
		if (c.type === 'parallel') texts = c.pairs.map(p => p.es);
		else if (c.type === 'grammar') texts = c.pairs.map(p => p.es);
		else if (c.type === 'vocab') texts = c.words.map(w => w.es);
		speaking = true;
		await speakQueue(texts);
	}

	async function speakQueue(texts: string[]) {
		if (texts.length === 0 || !speaking) { speaking = false; speakingText = ''; return; }
		speakingText = texts[0];
		if (useNativeTts && nativeTts) {
			try { await nativeTts.speak({ text: texts[0], lang: 'es-ES', rate: 0.85 }); } catch {}
			if (speaking) await speakQueue(texts.slice(1));
		} else {
			const u = new SpeechSynthesisUtterance(texts[0]);
			u.lang = 'es-ES'; u.rate = 0.85;
			const v = getEsVoice(); if (v) u.voice = v;
			u.onend = () => { if (speaking) speakQueue(texts.slice(1)); };
			u.onerror = () => { speaking = false; speakingText = ''; };
			window.speechSynthesis.speak(u);
		}
	}

	// Swipe for language flip
	let touchStartX = $state(0);
	let deltaX = $state(0);
	let swiping = $state(false);
	let animating = $state(false);

	function toggleLang() {
		if (!canSwipe) return;
		lang = lang === 'es' ? 'ru' : 'es';
	}

	// Vertical swipe for section navigation
	let touchStartY = $state(0);
	let verticalSwiping = $state(false);

	function onTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
		touchStartY = e.touches[0].clientY;
		if (canSwipe && !animating) swiping = true;
		verticalSwiping = true;
		deltaX = 0;
	}

	function onTouchMove(e: TouchEvent) {
		const dx = e.touches[0].clientX - touchStartX;
		const dy = e.touches[0].clientY - touchStartY;
		// Determine dominant direction
		if (Math.abs(dx) > Math.abs(dy) && canSwipe) {
			deltaX = dx;
			verticalSwiping = false;
		} else {
			swiping = false;
		}
	}

	function onTouchEnd() {
		if (swiping && Math.abs(deltaX) > 60) {
			animating = true;
			toggleLang();
			setTimeout(() => { animating = false; }, 300);
		}
		swiping = false;
		verticalSwiping = false;
		deltaX = 0;
	}

	function prevSection() { if (currentIndex > 0) currentIndex--; }
	function nextSection() { if (currentIndex < total - 1) currentIndex++; }

	function selectLesson(i: number) {
		lessonIndex = i;
		currentIndex = 0;
		lang = 'es';
		stopSpeaking();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') { e.preventDefault(); prevSection(); }
		if (e.key === 'ArrowDown') { e.preventDefault(); nextSection(); }
		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); toggleLang(); }
		if (e.key === ' ') { e.preventDefault(); toggleLang(); }
	}

	// Long press to speak
	let longPressTimer: ReturnType<typeof setTimeout> | null = null;

	function onLongPressStart(text: string) {
		longPressTimer = setTimeout(() => speak(text), 400);
	}

	function onLongPressEnd() {
		if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
	}

	let langLabel = $derived(lang === 'es' ? 'ES' : 'RU');
	let footerHint = $derived.by(() => {
		if (canSwipe) return lang === 'es' ? '← свайп → RU' : '← свайп → ES';
		return 'долгое нажатие = озвучить';
	});

	// Section icon
	let sectionIcon = $derived.by(() => {
		const t = section.content.type;
		if (t === 'parallel') return '💬';
		if (t === 'grammar') return '📐';
		return '📖';
	});
</script>

<svelte:window onkeydown={onKeydown} />

<div class="app">
	<!-- Progress bar -->
	<div class="progress-bar">
		<div class="progress-fill" style="width: {progress * 100}%; background: {sectionColor}"></div>
	</div>

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
			{#if canSwipe}
				<button class="lang-pill" onclick={toggleLang}>
					<span class="lang-dot" class:es={lang === 'es'} class:ru={lang === 'ru'}></span>
					{langLabel}
				</button>
			{/if}
		</div>
	</header>

	<!-- Main content -->
	<main
		ontouchstart={onTouchStart}
		ontouchmove={onTouchMove}
		ontouchend={onTouchEnd}
		style="transform: translateX({swiping && canSwipe ? deltaX * 0.3 : 0}px)"
	>
		<div class="card" class:flip-in={animating}>
			<!-- Section title inside card -->
			<div class="section-header">
				<span class="section-icon">{sectionIcon}</span>
				<span class="section-title">{section.title}</span>
			</div>

			{#if section.content.type === 'parallel'}
				<div class="text-block">
					{#each section.content.pairs as pair, i (i)}
						<p
							class="line"
							ontouchstart={() => onLongPressStart(pair.es)}
							ontouchend={onLongPressEnd}
							ontouchcancel={onLongPressEnd}
							class:speaking={speaking && speakingText === pair.es}
						>{lang === 'es' ? pair.es : pair.ru}</p>
					{/each}
				</div>

			{:else if section.content.type === 'grammar'}
				<div class="text-block">
					<div class="explanation">{section.content.explanation}</div>
					{#each section.content.pairs as pair, i (i)}
						<div
							class="example-pair"
							role="button" tabindex="0"
							ontouchstart={() => onLongPressStart(pair.es)}
							ontouchend={onLongPressEnd}
							ontouchcancel={onLongPressEnd}
							class:speaking={speaking && speakingText === pair.es}
						>
							<span class="primary">{pair.es}</span>
							<span class="secondary">{pair.ru}</span>
						</div>
					{/each}
				</div>

			{:else if section.content.type === 'vocab'}
				<div class="text-block">
					{#each section.content.words as w, i (i)}
						<div
							class="vocab-line"
							role="button" tabindex="0"
							ontouchstart={() => onLongPressStart(w.es)}
							ontouchend={onLongPressEnd}
							ontouchcancel={onLongPressEnd}
							class:speaking={speaking && speakingText === w.es}
						>
							<span class="word">{w.es}</span>
							<span class="meaning">{w.ru}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</main>

	<!-- Bottom navigation -->
	<nav class="bottom-nav">
		{#each sections as s, i (s.id)}
			<button
				class="nav-item"
				class:active={i === currentIndex}
				onclick={() => currentIndex = i}
			>
				<span class="nav-icon">{s.content.type === 'parallel' ? '💬' : s.content.type === 'grammar' ? '📐' : '📖'}</span>
				<span class="nav-label">{s.title.length > 12 ? s.title.slice(0, 12) + '…' : s.title}</span>
			</button>
		{/each}
	</nav>

	<!-- FAB for TTS -->
	{#if ttsSupported}
		<button class="fab" class:active={speaking} onclick={speakAll} aria-label="Speak all">
			{speaking ? '◼' : '▶'}
		</button>
	{/if}

	<!-- Hint overlay -->
	<div class="hint">{footerHint}</div>
</div>

<style>
	:global(*, *::before, *::after) { box-sizing: border-box; }
	:global(body) {
		margin: 0;
		font-family: 'Georgia', 'Times New Roman', serif;
		background: #0a0a1a;
		color: #e8e8f0;
		-webkit-font-smoothing: antialiased;
		height: 100dvh;
		overflow: hidden;
		-webkit-tap-highlight-color: transparent;
	}

	.app {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		max-width: 600px;
		margin: 0 auto;
		position: relative;
	}

	/* Progress bar */
	.progress-bar {
		height: 3px;
		background: #1a1a2e;
		flex-shrink: 0;
	}
	.progress-fill {
		height: 100%;
		transition: width 0.3s ease, background 0.3s ease;
		border-radius: 0 2px 2px 0;
	}

	/* Header */
	header {
		flex-shrink: 0;
		padding: 0.6rem 1rem 0.5rem;
		background: #0f0f22;
	}

	.top-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.lesson-tabs {
		display: flex;
		gap: 0.4rem;
	}

	.lesson-tab {
		background: transparent;
		border: 1.5px solid #2a2a4a;
		color: #556;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		font-size: 0.8rem;
		font-weight: 600;
		padding: 0.35rem 0.75rem;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.25s ease;
	}
	.lesson-tab.active {
		background: linear-gradient(135deg, #5b7cf7, #8b5cf6);
		border-color: transparent;
		color: white;
		box-shadow: 0 2px 12px rgba(91, 124, 247, 0.3);
	}

	.lang-pill {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		background: rgba(255,255,255,0.06);
		border: none;
		color: #aab;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.3rem 0.7rem;
		border-radius: 20px;
		cursor: pointer;
		letter-spacing: 0.5px;
		transition: all 0.2s;
	}
	.lang-pill:active { transform: scale(0.95); }

	.lang-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		transition: background 0.3s;
	}
	.lang-dot.es { background: #5b7cf7; }
	.lang-dot.ru { background: #f56585; }

	/* Main */
	main {
		flex: 1;
		overflow: hidden;
		transition: transform 0.15s ease-out;
		padding: 0;
	}

	.card {
		height: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding: 0.75rem 1.25rem 5rem;
		scrollbar-width: none;
	}
	.card::-webkit-scrollbar { display: none; }

	.card.flip-in {
		animation: flipIn 0.3s ease-out;
	}

	@keyframes flipIn {
		0% { opacity: 0; transform: translateX(20px); }
		100% { opacity: 1; transform: translateX(0); }
	}

	/* Section header inside card */
	.section-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}

	.section-icon {
		font-size: 1.1rem;
	}

	.section-title {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		font-size: 0.85rem;
		font-weight: 600;
		color: #889;
	}

	/* Text content */
	.text-block {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	/* Parallel lines */
	.line {
		margin: 0;
		padding: 0.6rem 0.5rem;
		font-size: 1.05rem;
		line-height: 1.65;
		color: #e0e4f8;
		border-radius: 8px;
		transition: background 0.2s;
		cursor: default;
	}
	.line:active { background: rgba(91, 124, 247, 0.08); }
	.line.speaking {
		background: rgba(91, 124, 247, 0.12);
		border-left: 3px solid #5b7cf7;
		padding-left: calc(0.5rem - 3px);
	}

	/* Grammar */
	.explanation {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		font-size: 0.85rem;
		line-height: 1.7;
		color: #99a0c0;
		white-space: pre-line;
		padding: 0.8rem 1rem;
		background: linear-gradient(135deg, rgba(155, 109, 255, 0.06), rgba(91, 124, 247, 0.04));
		border-radius: 12px;
		border-left: 3px solid #9b6dff;
		margin-bottom: 0.8rem;
	}

	.example-pair {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		border-radius: 8px;
		transition: background 0.2s;
		cursor: default;
	}
	.example-pair:active { background: rgba(155, 109, 255, 0.08); }
	.example-pair.speaking {
		background: rgba(155, 109, 255, 0.1);
		border-left: 3px solid #9b6dff;
		padding-left: calc(0.5rem - 3px);
	}

	.primary {
		font-size: 1.05rem;
		color: #d0d8ff;
		line-height: 1.55;
		font-weight: 500;
	}

	.secondary {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		font-size: 0.82rem;
		color: #667;
		line-height: 1.4;
		margin-top: 2px;
	}

	/* Vocabulary */
	.vocab-line {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.75rem;
		padding: 0.55rem 0.5rem;
		border-radius: 8px;
		font-size: 1rem;
		line-height: 1.45;
		transition: background 0.2s;
		cursor: default;
	}
	.vocab-line:active { background: rgba(77, 203, 160, 0.08); }
	.vocab-line.speaking {
		background: rgba(77, 203, 160, 0.1);
		border-left: 3px solid #4dcba0;
		padding-left: calc(0.5rem - 3px);
	}

	.word {
		color: #b0c8ff;
		font-weight: 600;
		flex-shrink: 0;
	}

	.meaning {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		color: #667;
		text-align: right;
		font-size: 0.88rem;
	}

	/* Bottom navigation */
	.bottom-nav {
		flex-shrink: 0;
		display: flex;
		background: #0f0f22;
		border-top: 1px solid #1a1a2e;
		padding: 0.3rem 0.25rem 0.5rem;
		overflow-x: auto;
		scrollbar-width: none;
		gap: 0;
	}
	.bottom-nav::-webkit-scrollbar { display: none; }

	.nav-item {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;
		background: none;
		border: none;
		color: #445;
		padding: 0.3rem 0.15rem;
		cursor: pointer;
		transition: color 0.2s;
		border-radius: 8px;
	}
	.nav-item.active {
		color: #c0c8ff;
		background: rgba(91, 124, 247, 0.08);
	}

	.nav-icon { font-size: 1rem; }

	.nav-label {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		font-size: 0.55rem;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
		line-height: 1.2;
	}

	/* FAB */
	.fab {
		position: absolute;
		bottom: 4.5rem;
		right: 1rem;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: linear-gradient(135deg, #5b7cf7, #8b5cf6);
		border: none;
		color: white;
		font-size: 1.1rem;
		cursor: pointer;
		box-shadow: 0 4px 16px rgba(91, 124, 247, 0.35);
		transition: all 0.2s;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.fab:active { transform: scale(0.92); }
	.fab.active {
		background: linear-gradient(135deg, #f56585, #e44d6e);
		box-shadow: 0 4px 16px rgba(245, 101, 133, 0.35);
	}

	/* Hint */
	.hint {
		position: absolute;
		bottom: 4rem;
		left: 50%;
		transform: translateX(-50%);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		font-size: 0.6rem;
		color: #334;
		pointer-events: none;
		white-space: nowrap;
		z-index: 5;
	}
</style>
