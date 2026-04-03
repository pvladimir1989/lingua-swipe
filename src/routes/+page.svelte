<script lang="ts">
	import { sections } from '$lib/data/leccion-59';
	import type { Language } from '$lib/types';

	let currentIndex = $state(0);
	let lang = $state<Language>('es');
	let total = sections.length;
	let section = $derived(sections[currentIndex]);

	// Swipe state
	let touchStartX = $state(0);
	let deltaX = $state(0);
	let swiping = $state(false);
	let animating = $state(false);

	function showEs() { lang = 'es'; }
	function showRu() { lang = 'ru'; }
	function toggleLang() { lang = lang === 'es' ? 'ru' : 'es'; }

	function prevSection() { if (currentIndex > 0) currentIndex--; }
	function nextSection() { if (currentIndex < total - 1) currentIndex++; }

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') { e.preventDefault(); prevSection(); }
		if (e.key === 'ArrowDown') { e.preventDefault(); nextSection(); }
		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); toggleLang(); }
		if (e.key === ' ') { e.preventDefault(); toggleLang(); }
	}

	function onTouchStart(e: TouchEvent) {
		if (animating) return;
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
	let otherLangHint = $derived(lang === 'es' ? '← свайп → Русский' : '← свайп → Espanol');
</script>

<svelte:window onkeydown={onKeydown} />

<div class="app">
	<header>
		<div class="top-row">
			<h1>Leccion 59</h1>
			<div class="lang-indicator" class:es={lang === 'es'} class:ru={lang === 'ru'}>
				{langLabel}
			</div>
		</div>
		<!-- Section dots -->
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
		style="transform: translateX({swiping ? deltaX * 0.4 : 0}px)"
	>
		<div class="card" class:flip-in={animating}>
			{#if section.content.type === 'parallel'}
				<div class="text-block">
					{#each section.content.pairs as pair, i (i)}
						<p class="line">{lang === 'es' ? pair.es : pair.ru}</p>
					{/each}
				</div>

			{:else if section.content.type === 'grammar'}
				<div class="text-block">
					<div class="explanation">{section.content.explanation}</div>
					<div class="examples-header">Примеры:</div>
					{#each section.content.pairs as pair, i (i)}
						<div class="example-pair">
							<span class="primary">{lang === 'es' ? pair.es : pair.ru}</span>
							<span class="secondary">{lang === 'es' ? pair.ru : pair.es}</span>
						</div>
					{/each}
				</div>

			{:else if section.content.type === 'vocab'}
				<div class="text-block vocab">
					{#each section.content.words as w, i (i)}
						<div class="vocab-line">
							<span class="word">{lang === 'es' ? w.es : w.ru}</span>
							<span class="meaning">{lang === 'es' ? w.ru : w.es}</span>
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
			<span class="swipe-hint">{otherLangHint}</span>
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

	/* === HEADER === */
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

	h1 {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		color: #8890c7;
	}

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

	/* === MAIN CARD === */
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

	/* === TEXT CONTENT === */
	.text-block {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	/* Parallel (dialogue) */
	.line {
		margin: 0;
		padding: 0.3rem 0;
		font-size: 0.92rem;
		line-height: 1.5;
		color: #d8dcf0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.03);
	}
	.line:last-child { border-bottom: none; }

	/* Grammar */
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

	.primary {
		font-size: 0.9rem;
		color: #c8d0f8;
		line-height: 1.45;
	}

	.secondary {
		font-size: 0.78rem;
		color: #666;
		line-height: 1.4;
		font-style: italic;
		margin-top: 1px;
	}

	/* Vocabulary */
	.vocab {
		gap: 0;
	}

	.vocab-line {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.5rem;
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
		text-align: right;
	}

	/* === FOOTER === */
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
