export default defineNitroPlugin((nitroApp) => {
	let files = {}

	nitroApp.hooks.hook("content:file:beforeParse", (file) => {
		if (file._id.endsWith(".md")) {
			files[file._id] = file.body
		}
	})

	nitroApp.hooks.hook("content:file:afterParse", (file) => {
		if (file._id.endsWith(".md")) {
			file.name = file.title
			file.title = `${file.name} - Celenium Docs`
			console.log(file.title)
			file.plainText = files[file._id]
		}
	})
})
