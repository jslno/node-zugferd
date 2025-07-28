function toScreamingSnakeCase(input) {
	return input
		.normalize("NFD")
		.replace(/([a-z0-9])([A-Z])/g, "$1_$2")
		.replace(/[\s\-]+/g, "_")
		.replace(/[^a-zA-Z0-9_]/g, "")
		.toUpperCase();
};

module.exports = {
    toScreamingSnakeCase,
};