<template>
	<div>
		<h1>hi</h1>
		<form @submit.prevent="submitForm">
			<input v-model="query" placeholder="Search Now" />
		</form>

		<div ref="container"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			query: "",
			prefix: "/~/",
		};
	},
	created() {
		if (process.browser && "serviceWorker" in navigator) {
			const registerSW = async () => {
				const registrations = await navigator.serviceWorker.getRegistrations();
				for (const registration of registrations) {
					await registration
						.unregister()
						.then((success) => {
							console.log("[INFO]: Service Worker Succesfully Unregistered");
						})
						.catch((error) => {
							console.error(
								`[INFO] Service Worker Unregistration Has Failed: ${error}`
							);
						});
				}

				await navigator.serviceWorker
					.register("/sw.js", {
						scope: this.prefix,
					})
					.then((registration) => {
						console.log(
							`[INFO] Service Worker Succesfully Registered With Scope "${registration.scope}"`
						);
					})
					.catch((error) => {
						console.log(`[INFO] Service Worker Failed to Register: ${error}`);
					});
			};
			registerSW();
		}
	},
	methods: {
		submitForm() {
			if (this.query) {
				if (!this.isUrl(this.query))
					this.query = `https://www.google.com/search?q=${this.query}`;
				else if (
					!(
						this.query.startsWith("https://") ||
						this.query.startsWith("http://")
					)
				)
					this.query = `http://${this.query}`;

				this.loadLink(this.query);
			} else {
				alert("Please enter a value.");
			}
		},
		encode(str) {
			if (!str) return str;
			return encodeURIComponent(
				str
					.toString()
					.split("")
					.map((char, ind) =>
						ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
					)
					.join("")
			);
		},
		loadLink(link) {
			if (process.browser) {
				const iframe = document.createElement("iframe");
				iframe.src = location.origin + this.prefix + this.encode(link);
				iframe.width = "100%";
				iframe.height = "100vh";

				const container = this.$refs.container;
				if (container) {
					container.appendChild(iframe);
				}
			}
		},
		isUrl(val) {
			if (
				/^http(s?):\/\//.test(val) ||
				(val.includes(".") && val.substr(0, 1) !== " ")
			)
				return true;
			return false;
		},
	},
};
</script>
