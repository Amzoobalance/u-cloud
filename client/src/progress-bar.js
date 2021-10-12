const { SingleBar, Presets } = require("cli-progress")
const { Transform } = require("stream")

class ProgressBarStream extends Transform {
	constructor(options) {
		super(options)
		this.barLength = options.barLength
		this.bar = new SingleBar({}, Presets.shades_classic)
	}

	_transform(chunk, _, callback) {
		this.bar.increment(chunk.length)
		callback(null, chunk)
	}

	_construct(callback) {
		this.bar.start(this.barLength, 0)
		callback(null)
	}

	_final(callback) {
		this.bar.stop()
		callback(null)
	}
}

const createProgressStream = (barLength) => new ProgressBarStream({ barLength })

module.exports = {
	ProgressBarStream,
	createProgressStream,
}
