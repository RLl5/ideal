let navbarItem = document.querySelectorAll('.item')
let contentItem = document.querySelectorAll('.content')
for (let i = 0; i < navbarItem.length; i++) {
	navbarItem[i].addEventListener('click', function () {
		for (let i = 0; i < navbarItem.length; i++) {
			navbarItem[i].classList.remove('active');
		}
		for (let j = 0; j < contentItem.length; j++) {
			contentItem[j].classList.add('hide');
		}
		this.classList.add('active')
		if (i <= 3) {
			contentItem[i].classList.remove('hide');
		}
		if (i > 3) {
			contentItem[i - 4].classList.remove('hide');
		}
	})
}
for (let i = 1; i < contentItem.length; i++) {
	contentItem[i].classList.add('hide');
}


var typed = new Typed(".multiple-text", {
	strings: ['Music', 'Notes', 'Webs'],
	typeSpeed: 100,
	backSpeed: 100,
	backDelay: 1000,
	loop: true
})

// //监听页面尺寸变化，动态设置 html 下 font-size大小
// window.onresize=() =>{
// 	setHtmlFontSize();
// }

// function setHtmlFontSize() {
// 	const clientWidth= document.body.clientWidth;
// 	document.querySelector('html').style.fontSize=clientWidth /100+'px'
// }

// setHtmlFontSize();

window.addEventListener('DOMContentLoaded', (event) => {
	// 获取图片元素
	var image = document.getElementById('myImage');

	// 添加点击事件监听器
	image.addEventListener('click', function () {
		if (audio.paused) {
			playSong(); // 暂停时点击播放
		} else {
			pauseSong(); // 播放时点击暂停
		}
	});

	// 监听所有导航链接的点击
	document.querySelectorAll('.navbar a, .drop a').forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault(); // 阻止默认跳转（避免跳顶部）

			// 1. 获取目标界面的ID（从href中取，如"#home" → "home"）
			const targetId = this.getAttribute('href').slice(1);

			// 2. 隐藏所有内容区块
			document.querySelectorAll('.content').forEach(content => {
				content.style.display = 'none';
			});

			// 3. 显示目标界面
			document.getElementById(targetId).style.display = 'block';

			// 4. 更新导航高亮（给当前点击的链接加active，移除其他）
			document.querySelectorAll('.navbar a, .drop a').forEach(item => {
				item.classList.remove('active');
			});
			this.classList.add('active');
		});
	});

	window.addEventListener('hashchange', () => {
		const targetId = window.location.hash.slice(1);
		// 调用导航切换逻辑，更新高亮和内容显示
		document.querySelectorAll('.navbar a, .drop a').forEach(link => {
			if (link.getAttribute('href') === `#${targetId}`) {
				link.click(); // 触发已写好的点击逻辑
			}
		});
	});

	// 歌曲信息数组
	const playlist = [
		{
			id: '0',
			title: 'sleep',
			author: 'me',
			path: 'musics/sleep.mp3',
			time: "0:31"
		},
	{
		id: '1',
		title: 'bgm',
		author: 'me',
		path: 'musics/bgm.mp3',
		time: "0:21"
	},
	{
		id: '2',
		title: 'love',
		author: 'joy',
		path: 'musics/love',
		time: "4:04"
	},
		{
			id: '3',
			title: 'always online',
			author: 'me',
			path: 'musics/always online.mp3',
			time: "1:16"
		},
	];

	//当前播放歌曲
	let currentSongIndex = 0;

	//初始化
	function init() {
		render(playlist[currentSongIndex]);
	}

	const playButton = document.getElementById('play');
	const breadButton = document.getElementById('bread');
	const audio = document.getElementById('audio');
	const progressBar = document.getElementById('bar');
	const progressOverlay = document.getElementById('overlay');
	const startTime = document.getElementById('start');
	const endTime = document.getElementById('end');
	const title = document.getElementById('title');
	const author = document.getElementById('author');
	const previousButton = document.getElementById('previous');
	const nextButton = document.getElementById('next');
	const listButton = document.getElementById('list');
	const songNum = document.getElementById('num');
	const volumeButton = document.getElementById('volume');

	const drop = document.querySelector('.drop');
	breadButton.addEventListener('click', () => {
		drop.classList.toggle('open');
	});
	document.addEventListener('click', (event) => {
		const target = event.target;
		const isBreadButton = target.closest('#bread');
		const isDrop = target.closest('#drop');

		if (!isBreadButton && !isDrop) {
			drop.classList.remove('open');
		}
	});

	//播放事件
	playButton.addEventListener('click', () => {
		if (audio.paused) {
			playSong();
		} else {
			pauseSong();
		}
	});

	//歌曲列表功能
	const sidebar = document.querySelector('.sidebar');
	// 生成歌曲列表项
	function generatePlaylistItems(playlist) {
		// 清空列表项
		sidebarList.innerHTML = '';
		// 遍历歌曲列表数据
		var num = 0;
		playlist.forEach((song) => {
			// 创建列表项元素
			const listItem = document.createElement('li');
			listItem.textContent = song.title + '-' + song.author;
			// 添加点击事件，播放对应的歌曲
			listItem.addEventListener('click', () => {
				currentSongIndex = song.id;
				loadSong(currentSongIndex);
				playSong();
			});
			// 将列表项添加到侧边栏列表中
			sidebarList.appendChild(listItem);
			num++;
		});
		songNum.innerHTML = num;
	}
	//调用函数生成歌曲列表项
	generatePlaylistItems(playlist);
	//播放列表按钮点击事件
	listButton.addEventListener('click', toggleSidebar);

	function toggleSidebar() {
		sidebar.classList.toggle('open');
	}

	//播放完成自动播放下一首事件
	audio.addEventListener('ended', function () {
		// 增加当前歌曲索引
		currentSongIndex++;
		// 检查当前歌曲索引是否超出了播放列表的范围
		if (currentSongIndex >= playlist.length) {
			currentSongIndex = 0; // 如果超出范围，回到第一首歌曲
		}
		// 播放下一首歌曲
		loadSong(currentSongIndex);
		playSong();
	});

	//音量按钮点击事件
	volumeButton.addEventListener('click', toggleVolume);

	function toggleVolume() {
		if (audio.volume === 0) {
			audio.volume = 0.7; // 设置音量为默认值
			volumeButton.classList.remove('bx-volume-mute'); // 移除静音图标类名
			volumeButton.classList.add('bx-volume-full'); // 添加音量图标类名
		} else {
			audio.volume = 0; // 静音
			volumeButton.classList.remove('bx-volume-full'); // 移除音量图标类名
			volumeButton.classList.add('bx-volume-mute'); // 添加静音图标类名
		}
	}

	//上一首事件
	previousButton.addEventListener('click', () => {
		previousSong();
	});
	//下一首事件
	nextButton.addEventListener('click', () => {
		nextSong();
	});
	//进度条功能
	audio.addEventListener('timeupdate', () => {
		const progress = (audio.currentTime / audio.duration) * 100;
		startTime.textContent = formatTime(audio.currentTime);
		//根据进度条调整颜色
		progressOverlay.style.width = `${progress}%`;
	});

	function formatTime(time) {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${padZero(minutes)}:${padZero(seconds)}`;
	}

	function padZero(number) {
		return number.toString().padStart(2, '0');
	}
	//上一首方法
	function previousSong() {
		currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
		loadSong(currentSongIndex);
		playSong();
	}
	//下一首方法
	function nextSong() {
		currentSongIndex = (currentSongIndex + 1) % playlist.length;
		loadSong(currentSongIndex);
		playSong();
	}
	//播放方法
	function playSong(songPath) {
		audio.play();
		playButton.classList.remove('bx-play');
		playButton.classList.add('bx-pause');
		image.src = 'img/a1.jpg';
		const audio = document.getElementById('audio');
		audio.src = songPath; // 动态设置路径
		audio.play(); // 播放
	}
	//暂停方法
	function pauseSong() {
		audio.pause();
		playButton.classList.remove('bx-pause');
		playButton.classList.add('bx-play');
		image.src = 'img/a1.jpg';
	}
	
	//加载歌曲方法
	function loadSong(index) {
		const song = playlist[index];
		title.innerHTML = song.title;
		author.innerHTML = song.author;
		endTime.innerHTML = song.time;
		audio.src = song.path;
		audio.volume = 0.7; //音量0~1;
	}

	init();
});