<script lang="ts">
	import { cards, categories } from '$lib/data/leccion-59';
	import SwipeCard from '$lib/components/feature/SwipeCard.svelte';
	import type { Language } from '$lib/types';

	let currentIndex = $state(0);
	let frontLang = $state<Language>('es');
	let selectedCategory = $state('all');

	let filtered = $derived(
		selectedCategory === 'all' ? cards : cards.filter((c) => c.category === selectedCategory)
	);
	let current = $derived(filtered[currentIndex]);
	let total = $derived(filtered.length);

	// Touch/swipe state
	let touchStartX = $state(0);
	let touchDeltaX = $state(0);
	let swiping = $state(false);

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
		if (e.key === ' ') {
			e.preventDefault();
			toggleLang();
		}
	}

	function onTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
		swiping = true;
		touchDeltaX = 0;
	}

	function onTouchMove(e: TouchEvent) {
		if (!swiping) return;
		touchDeltaX = e.touches[0].clientX - touchStartX;
	}

	function onTouchEnd() {
		if (!swiping) return;
		swiping = false;
		if (touchDeltaX > 60) prev();
		else if (touchDeltaX < -60) next();
		touchDeltaX = 0;
	}

	// Reset index when category changes
	$effect(() => {
		selectedCategory;
		currentIndex = 0;
	});
</script>

<svelte:window onkeydown={onKeydown} />

<div class="app">
	<header>
		<h1>Lección 59</h1>
		<p class="subtitle">Предлоги a, de, en, para · Числительные 100+</p>
	</header>

	<div class="controls">
		<select bind:value={selectedCategory}>
			<option value="all">Все ({cards.length})</option>
			{#each categories as cat}
				<option value={cat}>{cat}</option>
			{/each}
		</select>

		<button class="lang-toggle" onclick={toggleLang}>
			{frontLang === 'es' ? 'ES → RU' : 'RU → ES'}
		</button>
	</div>

	{#if current}
		<div
			class="swipe-area"
			ontouchstart={onTouchStart}
			ontouchmove={onTouchMove}
			ontouchend={onTouchEnd}
			role="region"
			aria-label="Card swipe area"
			style="transform: translateX({swiping ? touchDeltaX * 0.3 : 0}px)"
		>
			<SwipeCard card={current} {frontLang} />
		</div>

		<div class="nav">
			<button onclick={prev} disabled={currentIndex === 0} aria-label="Previous card">←</button>
			<span class="counter">{currentIndex + 1} / {total}</span>
			<button onclick={next} disabled={currentIndex === total - 1} aria-label="Next card">→</button>
		</div>

		<p class="category-badge">{current.category}</p>
	{/if}

	<footer>
		<p>← → навигация · тап = перевернуть · пробел = сменить язык</p>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		background: #0f0f23;
		color: #e0e0e0;
		min-height: 100dvh;
	}

	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		padding: 1.5rem 1rem;
		max-width: 520px;
		margin: 0 auto;
		min-height: 100dvh;
	}

	header {
		text-align: center;
	}

	h1 {
		margin: 0;
		font-size: 1.75rem;
		background: linear-gradient(135deg, #667eea, #f5576c);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.subtitle {
		margin: 0.25rem 0 0;
		font-size: 0.85rem;
		opacity: 0.6;
	}

	.controls {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	select {
		background: #1a1a3e;
		color: #e0e0e0;
		border: 1px solid #333;
		border-radius: 8px;
		padding: 0.5rem 0.75rem;
		font-size: 0.9rem;
		cursor: pointer;
	}

	.lang-toggle {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		border-radius: 8px;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.lang-toggle:hover {
		opacity: 0.85;
	}

	.swipe-area {
		transition: transform 0.15s ease-out;
		width: 100%;
		display: flex;
		justify-content: center;
		user-select: none;
		-webkit-user-select: none;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.nav button {
		background: #1a1a3e;
		color: #e0e0e0;
		border: 1px solid #333;
		border-radius: 50%;
		width: 44px;
		height: 44px;
		font-size: 1.25rem;
		cursor: pointer;
		transition: background 0.2s;
	}

	.nav button:hover:not(:disabled) {
		background: #2a2a5e;
	}

	.nav button:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.counter {
		font-variant-numeric: tabular-nums;
		font-size: 0.9rem;
		opacity: 0.7;
		min-width: 60px;
		text-align: center;
	}

	.category-badge {
		background: rgba(102, 126, 234, 0.15);
		color: #667eea;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
		font-size: 0.8rem;
		margin: 0;
	}

	footer {
		margin-top: auto;
		text-align: center;
		font-size: 0.75rem;
		opacity: 0.4;
	}

	footer p {
		margin: 0;
	}
</style>
