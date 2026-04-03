<script lang="ts">
	import type { Card, Language } from '$lib/types';

	let { card, frontLang }: { card: Card; frontLang: Language } = $props();

	let flipped = $state(false);

	let frontText = $derived(frontLang === 'es' ? card.spanish : card.russian);
	let backText = $derived(frontLang === 'es' ? card.russian : card.spanish);
	let frontLabel = $derived(frontLang === 'es' ? 'ES' : 'RU');
	let backLabel = $derived(frontLang === 'es' ? 'RU' : 'ES');

	function toggle() {
		flipped = !flipped;
	}

	// Reset flip when card changes
	$effect(() => {
		card;
		flipped = false;
	});
</script>

<button class="card-container" onclick={toggle} aria-label="Flip card">
	<div class="card" class:flipped>
		<div class="face front">
			<span class="lang-badge">{frontLabel}</span>
			<p>{frontText}</p>
		</div>
		<div class="face back">
			<span class="lang-badge">{backLabel}</span>
			<p>{backText}</p>
		</div>
	</div>
</button>

<style>
	.card-container {
		perspective: 800px;
		width: 100%;
		max-width: 440px;
		height: 260px;
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
		font: inherit;
	}

	.card {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 0.5s ease;
		transform-style: preserve-3d;
	}

	.card.flipped {
		transform: rotateY(180deg);
	}

	.face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem 1.5rem;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
	}

	.front {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.back {
		background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
		color: white;
		transform: rotateY(180deg);
	}

	.lang-badge {
		position: absolute;
		top: 12px;
		right: 16px;
		font-size: 0.75rem;
		font-weight: 700;
		background: rgba(255, 255, 255, 0.25);
		padding: 2px 10px;
		border-radius: 999px;
		letter-spacing: 1px;
	}

	p {
		font-size: 1.25rem;
		line-height: 1.6;
		text-align: center;
		margin: 0;
	}
</style>
