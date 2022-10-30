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
const patch = '/sdcard/yt-downloader'

	console.log(`${chalk.green('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓')}\n${chalk.green('┃')}${chalk.white('MENU YOUTUBE DOWNLOAD')}\n${chalk.green('┃')}${chalk.green('1.')}${chalk.white('Baixar Audio YouTube MP3')}${chalk.green('[URL]')}\n${chalk.green('┃')}${chalk.green('2.')}${chalk.white('Baixar Video Youtube MP4')}${chalk.green('[URL]')}\n${chalk.green('┃')}${chalk.green('3.')}${chalk.white('Baixar Playlist No YouTube MP3')}${chalk.green('[URL]')}\n${chalk.green('┃')}${chalk.green('4.')}${chalk.white('Baixar Playlist No YouTube MP4')}${chalk.green('[URL]')}\n${chalk.green('┃')}${chalk.green('5.')}${chalk.white('Pesquisa Musica Baixar Em')}${chalk.green'[MP3]')}\n${chalk.green('┃')}${chalk.green('6.')}${chalk.white('Pesquisa Musica Baixar Em')}${chalk.green('[MP4]')}\n${chalk.green('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')}\n`))
  const pilihan = readlineSync.questionInt(chalk.white("Qual menu de números você deseja escolher?:"))
	if (pilihan > 6) return console.log('Existem apenas 1-6 opções!!!')
	try {
	if (pilihan == '1') {
	const linknya = readlineSync.question(chalk.white("Cole O Link Do YouTube: "))
	if (fs.existsSync(`${patch}`)) {
	var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
	let stream = await ytdl(ytmp3ID, {
	quality: 'highestaudio'
	});
	const video = await ytdl.getInfo(ytmp3ID)
	const str = `${video.videoDetails.title}`;
	const noSpecialCharacters = str.replace(/^a-zA-Z0-9 /g, '');
	ffmpeg(stream)
	.audioBitrate(128)
	.save(`/sdcard/yt-downloader/${noSpecialCharacters}.mp3`)
	.on('end', () => {
	console.log(chalk.green(`${video.videoDetails.title} DOWNLOAD CONCLUÍDO!`))
	clear;
	});
	} else {
	const linknya = readlineSync.question(chalk.white("Cole O Link Do YouTube: "))
	fs.mkdir(`${patch}`)
	var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
	let stream = await ytdl(ytmp3ID, {
	quality: 'highestaudio'
	});
	const video = await ytdl.getInfo(ytmp3ID)
	const str = `${video.videoDetails.title}`;
	const noSpecialCharacters = str.replace(/^a-zA-Z0-9 /g, '');
	ffmpeg(stream)
	.audioBitrate(128)
	.save(`/sdcard/yt-downloader/${noSpecialCharacters}.mp3`)
	.on('end', () => {
	console.log(chalk.green(`${video.videoDetails.title} DOWNLOAD CONCLUÍDO!`))
	clear();
	
	});
	}
	} else if (pilihan == '2') {
	const linknya = readlineSync.question(chalk.white("Cole O Link Do YouTube: "))
	if (fs.existsSync(`${patch}`)) {
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
	const video = await ytdl.getInfo(linknya)
	var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
	const response = await fetch(video.formats[0].url);
	const buffer = await response.buffer();
	const str = `${video.videoDetails.title}`;
	const noSpecialCharacters = str.replace(/^a-zA-Z0-9 /g, '');
	await fs.writeFile(`/sdcard/yt-downloader/${noSpecialCharacters}.mp4`, buffer, () =>
	console.log(chalk.green(`${video.videoDetails.title} DOWNLOAD CONCLUÍDO!`)))
	clear();
	} else {
	const linknya = readlineSync.question(chalk.white("Cole O Link Do YouTube: "))
	fs.mkdir(`${patch}`)
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
	const video = await ytdl.getInfo(linknya)
	var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
	const response = await fetch(video.formats[0].url);
	const buffer = await response.buffer();
	await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp4`, buffer, () =>
	console.log(chalk.green(`${video.videoDetails.title} DOWNLOAD CONCLUÍDO!`)))
	clear();
	}
	} else if (pilihan == '3') {
	const linknya = readlineSync.question(chalk.white("Cole O Link Do YouTube: "))
	if (fs.existsSync(`${patch}`)) {
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
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
	console.log(chalk.green(`${video.videoDetails.title} DOWNLOAD CONCLUÍDO!`))
	process.exit();
	});
	}
	} else {
	const linknya = readlineSync.question(chalk.white("Cole O Link Do YouTube: "))
	fs.mkdir(`${patch}`)
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
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
	console.log(chalk.green(`${video.videoDetails.title} DOWNLOAD CONCLUÍDO!`))
	process.exit();
	});
	}
	}
	} else if (pilihan == '4') {
	const linknya = readlineSync.question(chalk.white("Cole O Link Do YouTube: "))
	if (fs.existsSync(`${patch}`)) {
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
	var getID = linknya.replace('https://youtube.com/playlist?list=', '').replace('http://youtube.com/playlist?list=', '')
	const playlist = await youtube.getPlaylist(getID)
	for (let i = 0; i < playlist.videos.length; i++) {
	const video = await ytdl.getInfo(playlist.videos[i].id)
	const response = await fetch(video.formats[0].url);
	const buffer = await response.buffer();
	await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp4`, buffer, () =>
	console.log(chalk.green(`${video.videoDetails.title} DOWNLOAD CONCLUÍDO!`)))
	process.exit();
	}
	} else {
	const linknya = readlineSync.question(chalk.white("Cole O Link Do YouTube: "))
	fs.mkdir(`${patch}`)
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
	var getID = linknya.replace('https://youtube.com/playlist?list=', '').replace('http://youtube.com/playlist?list=', '')
	const playlist = await youtube.getPlaylist(getID)
	for (let i = 0; i < playlist.videos.length; i++) {
	const video = await ytdl.getInfo(playlist.videos[i].id)
	const response = await fetch(video.formats[0].url);
	const buffer = await response.buffer();
	await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp4`, buffer, () =>
	console.log(chalk.green(`${video.videoDetails.title} DOWNLOAD CONCLUÍDO!`)))
	process.exit();
	}
	}
	} else if (pilihan == '5') {
	const linknya = readlineSync.question(chalk.white("Pesquise O Nome Da Música: "))
	if (fs.existsSync(`${patch}`)) {
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
	const playOptions = {
	limit: 1,
	gl: 'BR',
	hl: 'pt'
	}
	const res = await ytsr(linknya, playOptions).catch(err => {
	return client.reply(from, 'A consulta que você está procurando não foi encontrada', id)
	})
	const videoResult = res.items.filter(item => item.type === 'video')[0]
	if (!videoResult) {
	return client.reply(from, 'A consulta que você está procurando não foi encontrada', id)
	}
	let stream = await ytdl(videoResult.url, {
	quality: 'highestaudio'
	});
	const playInfo = await ytdl.getInfo(videoResult.url)
	ffmpeg(stream)
	.audioBitrate(128)
	.save(`/sdcard/yt-downloader/${playInfo.videoDetails.videoId}.mp3`)
	.on('end', () => {
	console.log(chalk.green(`DOWNLOAD CONCLUÍDO!`))
	process.exit();
	});
	} else {
	const linknya = readlineSync.question(chalk.white("Pesquise O Nome Da Música: "))
	fs.mkdir(`${patch}`)
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
	const playOptions = {
	limit: 1,
	gl: 'BR',
	hl: 'pt'
	}
	const res = await ytsr(linknya, playOptions).catch(err => {
	return client.reply(from, 'A música que você está procurando não pode ser encontrada', id)
	})
	const videoResult = res.items.filter(item => item.type === 'video')[0]
	if (!videoResult) {
	return client.reply(from, 'A música que você está procurando não pode ser encontrada', id)
	}
	let stream = await ytdl(videoResult.url, {
	quality: 'highestaudio'
	});
	const playInfo = await ytdl.getInfo(videoResult.url)
	ffmpeg(stream)
	.audioBitrate(128)
	.save(`/sdcard/yt-downloader/${playInfo.videoDetails.videoId}.mp3`)
	.on('end', () => {
	console.log(chalk.green(`DOWNLOAD CONCLUÍDO!`))
	process.exit();
	});
	}
	} else if (pilihan == '6') {
	const linknya = readlineSync.question(chalk.white("Pesquise O Nome Da Música: "))
	if (fs.existsSync(`${patch}`)) {
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
	const playOptions = {
	limit: 1,
	gl: 'BR',
	hl: 'pt'
	}
	const res = await ytsr(linknya, playOptions).catch(err => {
	return client.reply(from, 'A consulta que você está procurando não foi encontrada', id)
	})
	const videoResult = res.items.filter(item => item.type === 'video')[0]
	if (!videoResult) {
	return client.reply(from, 'A consulta que você está procurando não foi encontrada', id)
	}
	const video = await ytdl.getInfo(videoResult.url)
	const response = await fetch(video.formats[0].url);
	const buffer = await response.buffer();
	await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp4`, buffer, () =>
	console.log(chalk.green(`DOWNLOAD CONCLUÍDO!`)))
	process.exit();
	} else {
	const linknya = readlineSync.question(chalk.yellow("Pesquise O Nome Da Música: "))
	fs.mkdir(`${patch}`)
	console.log(chalk.white('\nO processo de download!\nA duração do processo depende da velocidade da internet\nduração que você deseja baixar\nO vídeo/áudio estará localizado na "pasta yt-downloader"'))
	const playOptions = {
	limit: 1,
	gl: 'BR',
	hl: 'pt'
	}
	const res = await ytsr(linknya, playOptions).catch(err => {
	return client.reply(from, 'A consulta que você estava procurando não foi encontrada', id)
	})
	const videoResult = res.items.filter(item => item.type === 'video')[0]
	if (!videoResult) {
	return client.reply(from, 'A consulta que você está procurando não foi encontrada', id)
	}
	const video = await ytdl.getInfo(videoResult.url)
	const response = await fetch(video.formats[0].url);
	const buffer = await response.buffer();
	await fs.writeFile(`/sdcard/yt-downloader/${video.videoDetails.videoId}.mp4`, buffer, () =>
	console.log(chalk.green(`DOWNLOAD CONCLUÍDO!`)))
	process.exit();
	}
	} else {
	console.log(chalk.white('A escolha é apenas 1 - 6'))
	}
	} catch (err) {
	console.log(err)
	}
}

start()