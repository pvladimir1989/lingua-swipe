<script lang="ts">
	import { sections, type Section, type SectionContent } from '$lib/data/leccion-59';
	import type { Language } from '$lib/types';

	let currentIndex = $state(0);
	let frontLang = $state<Language>('es');
	let total = sections.length;

	let section = $derived(sections[currentIndex]);

	// Touch/swipe
	let touchStartX = $state(0);
	let swiping = $state(false);
	let deltaX = $state(0);

	function prev() {
		if (currentIndex > 0) currentIndex--;
	}
	function next() {
		if (currentIndex < total - 1) currentIndex++;
	}
	function toggleLang() {
		frontLang = frontLang === 'es' ? 'ru' : 'es';
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
		if (e.key === ' ') { e.preventDefault(); toggleLang(); }
	}

	function onTouchStart(e: TouchEvent) {
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
		if (deltaX > 80) prev();
		else if (deltaX < -80) next();
		deltaX = 0;
	}

	function first(lang: Language): Language {
		return frontLang === 'es' ? lang : (lang === 'es' ? 'ru' : 'es');
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="app">
	<!-- Top bar -->
	<header>
		<div class="header-row">
			<h1>Leccion 59</h1>
			<button class="lang-btn" onclick={toggleLang}>
				{frontLang === 'es' ? 'ES → RU' : 'RU → ES'}
			</button>
		</div>
		<div class="nav-row">
			<button class="nav-btn" onclick={prev} disabled={currentIndex === 0}>←</button>
			<span class="section-title">{section.title}</span>
			<button class="nav-btn" onclick={next} disabled={currentIndex === total - 1}>→</button>
		</div>
		<div class="dots">
			{#each sections as s, i (s.id)}
				<button
					class="dot"
					class:active={i === currentIndex}
					onclick={() => currentIndex = i}
					aria-label="Go to {s.title}"
				></button>
			{/each}
		</div>
	</header>

	<!-- Content -->
	<main
		ontouchstart={onTouchStart}
		ontouchmove={onTouchMove}
		ontouchend={onTouchEnd}
	>
		{#if section.content.type === 'parallel'}
			<div class="parallel-text">
				{#each section.content.pairs as pair, i (i)}
					<div class="pair">
						<p class="es">{frontLang === 'es' ? pair.es : pair.ru}</p>
						<p class="ru">{frontLang === 'es' ? pair.ru : pair.es}</p>
					</div>
				{/each}
			</div>
		{:else if section.content.type === 'grammar'}
			<div class="grammar">
				<div class="explanation">{section.content.explanation}</div>
				<div class="divider"></div>
				{#each section.content.pairs as pair, i (i)}
					<div class="pair">
						<p class="es">{frontLang === 'es' ? pair.es : pair.ru}</p>
						<p class="ru">{frontLang === 'es' ? pair.ru : pair.es}</p>
					</div>
				{/each}
			</div>
		{:else if section.content.type === 'vocab'}
			<div class="vocab-grid">
				{#each section.content.words as w, i (i)}
					<div class="vocab-row">
						<span class="vocab-es">{frontLang === 'es' ? w.es : w.ru}</span>
						<span class="vocab-sep">—</span>
						<span class="vocab-ru">{frontLang === 'es' ? w.ru : w.es}</span>
					</div>
				{/each}
			</div>
		{/if}
	</main>

	<footer>
		<span>{currentIndex + 1} / {total}</span>
		<span class="hint">← → листать · пробел = язык</span>
	</footer>
</div>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
		background: #0d0d1a;
		color: #e8e8f0;
		-webkit-font-smoothing: antialiased;
		overflow: hidden;
		height: 100dvh;
	}

	.app {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		max-width: 600px;
		margin: 0 auto;
	}

	/* Header */
	header {
		flex-shrink: 0;
		padding: 0.5rem 0.75rem 0.25rem;
		background: #13132a;
		border-bottom: 1px solid #222244;
	}

	.header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	h1 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 700;
		background: linear-gradient(135deg, #7c8cf5, #e87cac);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.lang-btn {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.3rem 0.7rem;
		font-size: 0.75rem;
		font-weight: 700;
		cursor: pointer;
		letter-spacing: 0.5px;
	}

	.nav-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.35rem;
	}

	.section-title {
		flex: 1;
		text-align: center;
		font-size: 0.8rem;
		font-weight: 600;
		opacity: 0.85;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nav-btn {
		background: #1e1e40;
		color: #ccc;
		border: 1px solid #333;
		border-radius: 6px;
		width: 32px;
		height: 28px;
		font-size: 0.9rem;
		cursor: pointer;
		flex-shrink: 0;
	}
	.nav-btn:disabled {
		opacity: 0.25;
		cursor: default;
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 6px;
		margin-top: 0.35rem;
		padding-bottom: 0.15rem;
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		border: none;
		background: #333;
		cursor: pointer;
		padding: 0;
		transition: background 0.2s;
	}
	.dot.active {
		background: #7c8cf5;
	}

	/* Main scrollable content */
	main {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 0.75rem;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
		scrollbar-color: #333 transparent;
	}

	/* Parallel text (dialogue) */
	.parallel-text {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.pair {
		padding: 0.4rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
	}
	.pair:last-child {
		border-bottom: none;
	}

	.pair .es {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.45;
		color: #b8c4ff;
		font-weight: 500;
	}

	.pair .ru {
		margin: 0.15rem 0 0;
		font-size: 0.82rem;
		line-height: 1.4;
		color: #999;
		font-style: italic;
	}

	/* Grammar sections */
	.grammar {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.explanation {
		font-size: 0.82rem;
		line-height: 1.55;
		color: #c8c8d8;
		white-space: pre-line;
		padding: 0.5rem 0.6rem;
		background: rgba(102, 126, 234, 0.08);
		border-radius: 8px;
		border-left: 3px solid #667eea;
		margin-bottom: 0.5rem;
	}

	.divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
		margin: 0.25rem 0;
	}

	/* Vocabulary */
	.vocab-grid {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.vocab-row {
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
		padding: 0.4rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
		font-size: 0.88rem;
		line-height: 1.4;
	}
	.vocab-row:last-child {
		border-bottom: none;
	}

	.vocab-es {
		color: #b8c4ff;
		font-weight: 600;
		flex-shrink: 0;
	}

	.vocab-sep {
		color: #444;
		flex-shrink: 0;
	}

	.vocab-ru {
		color: #999;
	}

	/* Footer */
	footer {
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.35rem 0.75rem;
		font-size: 0.7rem;
		color: #555;
		background: #13132a;
		border-top: 1px solid #222244;
	}

	.hint {
		opacity: 0.6;
	}
</style>
