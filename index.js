const chalk = require('chalk')
const readlineSync = require('readline-sync')
const fs = require('fs-extra')
const ffmpeg = require('fluent-ffmpeg')
const ytdl = require('ytdl-core')
const ytsr = require('ytsr')
const exec = require('await-exec')
const fetch = require('node-fetch')
const {
	Client
} = require('youtubei')
const youtube = new Client()

async function start() {

	// JIKA INGIN MERUBAH TEMPAT FOLDER OUTPUT VIDEO/AUDIONYA, SILAHKAN RUBAH DIBAWAH INI
	const patch = '/sdcard/yt-downloader'

	console.log(`${chalk.white('MENU')}\n${chalk.green('1.Baixar Audio YouTube MP3 [URL]')}\n${chalk.green('2.Baixar Video Youtube MP4 [URL]')}\n${chalk.green('3.Baixar Playlist No YouTube MP3 [URL]')}\n${chalk.green('4.Baixar Playlist No YouTube MP4 [URL]')}${chalk.green('\n5.Pesquisa Musica Baixar Em MP3')}\n${chalk.green('6.Pesquisa Musica Baixar Em MP4')}\n`)

	const pilihan = readlineSync.questionInt(chalk.red("Qual menu de números você deseja escolher?:"))
	if (pilihan > 6) return console.log('Existem apenas 1-6 opções!!!')

	try {
		if (pilihan == '1') {
			const linknya = readlineSync.question(chalk.red("Entre no link do youtube: "))
			if (fs.existsSync(`${patch}`)) {
				var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
				console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet e da duração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
				let stream = await ytdl(ytmp3ID, {
					quality: 'highestaudio'
				});
				const video = await ytdl.getInfo(ytmp3ID)
				ffmpeg(stream)
					.audioBitrate(128)
					.save(`/sdcard/yt-downloader/${video.videoDetails.title}.mp3`)
					.on('end', () => {
						console.log(chalk.green('finished downloading!'))
					});
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Masukkan link youtubenya: "))
				fs.mkdir(`${patch}`)
				var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				let stream = await ytdl(ytmp3ID, {
					quality: 'highestaudio'
				});
				const video = await ytdl.getInfo(ytmp3ID)
				ffmpeg(stream)
					.audioBitrate(128)
					.save(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp3`)
					.on('end', () => {
						console.log(chalk.green('finished downloading!'))
					});
			}
		} else if (pilihan == '2') {
			const linknya = readlineSync.question(chalk.yellow("- Masukkan link youtubenya: "))
			if (fs.existsSync(`${patch}`)) {
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				const video = await ytdl.getInfo(linknya)
				var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
				const response = await fetch(video.formats[0].url);
				const buffer = await response.buffer();
				await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.title}.mp4`, buffer, () =>
					console.log(chalk.green('finished downloading!')))
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Masukkan link youtubenya: "))
				fs.mkdir(`${patch}`)
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				const video = await ytdl.getInfo(linknya)
				var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
				const response = await fetch(video.formats[0].url);
				const buffer = await response.buffer();
				await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp4`, buffer, () =>
					console.log(chalk.green('finished downloading!')))
			}
		} else if (pilihan == '3') {
			const linknya = readlineSync.question(chalk.yellow("- Masukkan link youtubenya: "))
			if (fs.existsSync(`${patch}`)) {
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				var getID = linknya.replace('https://youtube.com/playlist?list=', '').replace('http://youtube.com/playlist?list=', '')
				const playlist = await youtube.getPlaylist(getID)
				for (let i = 0; i < playlist.videos.length; i++) {
					let stream = await ytdl(playlist.videos[i].id, {
						quality: 'highestaudio'
					});
					const video = await ytdl.getInfo(playlist.videos[i].id)
					ffmpeg(stream)
						.audioBitrate(128)
						.save(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp3`)
						.on('end', () => {
							console.log(chalk.green('finished downloading!'))
						});
				}
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Masukkan link youtubenya: "))
				fs.mkdir(`${patch}`)
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				var getID = linknya.replace('https://youtube.com/playlist?list=', '').replace('http://youtube.com/playlist?list=', '')
				const playlist = await youtube.getPlaylist(getID)
				for (let i = 0; i < playlist.videos.length; i++) {
					let stream = await ytdl(playlist.videos[i].id, {
						quality: 'highestaudio'
					});
					const video = await ytdl.getInfo(playlist.videos[i].id)
					ffmpeg(stream)
						.audioBitrate(128)
						.save(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp3`)
						.on('end', () => {
							console.log(chalk.green('finished downloading!'))
						});
				}
			}
		} else if (pilihan == '4') {
			const linknya = readlineSync.question(chalk.yellow("- Masukkan link youtubenya: "))
			if (fs.existsSync(`${patch}`)) {
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				var getID = linknya.replace('https://youtube.com/playlist?list=', '').replace('http://youtube.com/playlist?list=', '')
				const playlist = await youtube.getPlaylist(getID)
				for (let i = 0; i < playlist.videos.length; i++) {
					const video = await ytdl.getInfo(playlist.videos[i].id)
					const response = await fetch(video.formats[0].url);
					const buffer = await response.buffer();
					await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp4`, buffer, () =>
						console.log(chalk.green('finished downloading!')))
				}
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Masukkan link youtubenya: "))
				fs.mkdir(`${patch}`)
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				var getID = linknya.replace('https://youtube.com/playlist?list=', '').replace('http://youtube.com/playlist?list=', '')
				const playlist = await youtube.getPlaylist(getID)
				for (let i = 0; i < playlist.videos.length; i++) {
					const video = await ytdl.getInfo(playlist.videos[i].id)
					const response = await fetch(video.formats[0].url);
					const buffer = await response.buffer();
					await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp4`, buffer, () =>
						console.log(chalk.green('finished downloading!')))
				}
			}
		} else if (pilihan == '5') {
			const linknya = readlineSync.question(chalk.yellow("- Masukkan query youtubenya: "))
			if (fs.existsSync(`${patch}`)) {
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				const playOptions = {
					limit: 1,
					gl: 'BR',
					hl: 'pt'
				}
				const res = await ytsr(linknya, playOptions).catch(err => {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				})
				const videoResult = res.items.filter(item => item.type === 'video')[0]
				if (!videoResult) {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				}
				let stream = await ytdl(videoResult.url, {
					quality: 'highestaudio'
				});
				const playInfo = await ytdl.getInfo(videoResult.url)
				ffmpeg(stream)
					.audioBitrate(128)
					.save(`/sdcard/yt-downloader/${playInfo.videoDetails.videoId}.mp3`)
					.on('end', () => {
						console.log(chalk.green('finished downloading!'))
					});
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Masukkan query youtubenya: "))
				fs.mkdir(`${patch}`)
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				const playOptions = {
					limit: 1,
					gl: 'BR',
					hl: 'pt'
				}
				const res = await ytsr(linknya, playOptions).catch(err => {
					return client.reply(from, 'Lagu yang kamu cari tidak ditemukan', id)
				})
				const videoResult = res.items.filter(item => item.type === 'video')[0]
				if (!videoResult) {
					return client.reply(from, 'Lagu yang kamu cari tidak ditemukan', id)
				}
				let stream = await ytdl(videoResult.url, {
					quality: 'highestaudio'
				});
				const playInfo = await ytdl.getInfo(videoResult.url)
				ffmpeg(stream)
					.audioBitrate(128)
					.save(`/sdcard/yt-downloader/${playInfo.videoDetails.videoId}.mp3`)
					.on('end', () => {
						console.log(chalk.green('finished downloading!'))
					});
			}
		} else if (pilihan == '6') {
			const linknya = readlineSync.question(chalk.yellow("- Masukkan query youtubenya: "))
			if (fs.existsSync(`${patch}`)) {
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				const playOptions = {
					limit: 1,
					gl: 'BR',
					hl: 'pt'
				}
				const res = await ytsr(linknya, playOptions).catch(err => {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				})
				const videoResult = res.items.filter(item => item.type === 'video')[0]
				if (!videoResult) {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				}
				const video = await ytdl.getInfo(videoResult.url)
				const response = await fetch(video.formats[0].url);
				const buffer = await response.buffer();
				await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp4`, buffer, () =>
					console.log(chalk.green('finished downloading!')))
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Masukkan query youtubenya: "))
				fs.mkdir(`${patch}`)
				console.log(chalk.yellow('\nLagi proses download...\n\nlama proses tergantung kecepatan internet dan durasi yang kamu ingin download\n\nNanti letak video/audionya ada di folder "yt-downloader"'))
				const playOptions = {
					limit: 1,
					gl: 'BR',
					hl: 'pt'
				}
				const res = await ytsr(linknya, playOptions).catch(err => {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				})
				const videoResult = res.items.filter(item => item.type === 'video')[0]
				if (!videoResult) {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				}
				const video = await ytdl.getInfo(videoResult.url)
				const response = await fetch(video.formats[0].url);
				const buffer = await response.buffer();
				await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp4`, buffer, () =>
					console.log(chalk.green('finished downloading!')))
			}
		} else {
			console.log(chalk.red('Pilihannya cuma 1 - 6'))
		}
	} catch (err) {
		console.log(err)
	}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})


start()
