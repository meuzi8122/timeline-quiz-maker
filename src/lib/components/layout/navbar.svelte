<script lang="ts">
	import { goto } from "$app/navigation";
	import { authClient, signOut } from "$lib/infrastructures/auth/auth-client";

	const session = authClient.useSession();
	const data = $derived($session.data);

	async function handleCreateButtonClick() {
		if (!data) {
			alert("クイズを投稿するにはログインが必要です。");
			goto("/login");
			return;
		}

		try {
			const res = await fetch("/editor/new", { method: "POST" });
			const { id } = await res.json();
			goto(`/editor/${id}`);
		} catch (error) {
			alert("時間を置いて再度お試しください。");
			return;
		}
	}
</script>

<div class="navbar bg-base-300">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">一方その頃</a>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-left">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					></path>
				</svg>
			</div>
			<ul
				tabindex="-1"
				class="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
			>
				<li><a href="/">クイズを探す</a></li>
				<li><a href="/my-questions">クイズを管理</a></li>
				<li><button onclick={handleCreateButtonClick}>クイズを投稿</button></li>
				<li><a href="/about">クイズの遊び方</a></li>
				{#if data}
					<li><button onclick={signOut}>ログアウト</button></li>
				{:else}
					<li><a href="/login">ログイン</a></li>
				{/if}
			</ul>
		</div>
	</div>
</div>
