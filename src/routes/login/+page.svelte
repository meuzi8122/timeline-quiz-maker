<script lang="ts">
	import { signIn } from "$lib/infrastructures/auth/auth-client";
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
	<div class="p-8 rounded bg-base-200 shadow-md w-full max-w-md">
		<button
			onclick={signIn}
			class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
		>
			Googleアカウントでログイン
		</button>
	</div>
</div>
