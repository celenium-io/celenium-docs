export const nodeToText = (node) => {
	let text = ""

	function recurse(node) {
		if (node.type === "text") {
			text += `${node.value}`
		}

		if (node.children && node.tag !== "style") {
			for (const child of node.children) {
				recurse(child)
			}
		}
	}

	recurse(node)

	return text
}

export const parseArticles = (articles) => {
	const result = {}
	articles
		.filter((a) => a.body)
		.forEach((article) => {
			let prevTag = null
			result[article._id] = {
				sections: {},
				plainText: "",
				title: article.name,
				path: article._path,
			}

			let page = article

			/** ul's -> p's */
			article.body.children
				.filter((child) => child.tag === "ul")
				.forEach((a) => {
					const ulIdx = article.body.children.findIndex((c) => c.tag === "ul")
					let newParagraphs = []
					if (article.body.children[ulIdx]) {
						newParagraphs = article.body.children[ulIdx].children.map((c) => {
							return {
								type: "element",
								tag: "p",
								props: {},
								children: [{ type: "text", value: nodeToText(c) }],
							}
						})
					}
					page.body.children.splice(ulIdx, 1, ...newParagraphs)
				})

			if (page.body.children[0].tag === "h1")
				page.body.children.forEach((el) => {
					if (["h1", "h2", "h3", "h4", "h5"].includes(el.tag)) {
						const title = nodeToText(el)
						result[page._id].plainText = !result[page._id].plainText.length
							? `${title}`
							: `${result[page._id].plainText}\n\n${title}`
						result[page._id].sections[el.props.id] = {
							content: "",
							title,
						}

						prevTag = el.props.id
					}

					if (["p", "ul"].includes(el.tag)) {
						const text = nodeToText(el)

						if (result[page._id].sections[prevTag].content.length) {
							result[page._id].sections[prevTag].content = `${result[page._id].sections[prevTag].content}\n\n${text}`
						} else {
							result[page._id].sections[prevTag].content = text
						}

						result[page._id].plainText = `${result[page._id].plainText}\n\n${text}`
					}
				})
		})

	return result
}
