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

// //����ҳ��ߴ�仯����̬���� html �� font-size��С
// window.onresize=() =>{
// 	setHtmlFontSize();
// }

// function setHtmlFontSize() {
// 	const clientWidth= document.body.clientWidth;
// 	document.querySelector('html').style.fontSize=clientWidth /100+'px'
// }

// setHtmlFontSize();

window.addEventListener('DOMContentLoaded', (event) => {
	// ��ȡͼƬԪ��
	var image = document.getElementById('myImage');

	// ��ӵ���¼�������
	image.addEventListener('click', function () {
		if (image.src.match('img/a1.jpg')) {
			audio.play();
			playButton.classList.remove('bx-play');
			playButton.classList.add('bx-pause');
			image.src = 'img/a1.jpg';
		} else {
			audio.pause();
			playButton.classList.remove('bx-pause');
			playButton.classList.add('bx-play');
			image.src = 'img/a2.jpg';
		}
	});

	// ������Ϣ����
	const playlist = [{
		id: '0',
		title: '��������',
		author: '������',
		path: 'musics/������ - �������ߣ�Live��[mqms].ogg',
		time: "0:33"
	},
	{
		id: '1',
		title: 'С���',
		author: '�մ���',
		path: 'musics/�մ��� - С��裨Live��[mqms].ogg',
		time: "4:33"
	},
	{
		id: '2',
		title: 'Ů��',
		author: '����ũ',
		path: 'musics/����ũ - Ů����Live��[mqms].ogg',
		time: "2:33"
	},
	{
		id: '3',
		title: '����',
		author: '����ͩ',
		path: 'musics/����-����ͩ.mp3',
		time: "2:34"
	}
	];

	//��ǰ���Ÿ���
	let currentSongIndex = 0;

	//��ʼ��
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

	//�����¼�
	playButton.addEventListener('click', () => {
		if (audio.paused) {
			playSong();
		} else {
			pauseSong();
		}
	});

	//�����б���
	const sidebar = document.querySelector('.sidebar');
	// ���ɸ����б���
	function generatePlaylistItems(playlist) {
		// ����б���
		sidebarList.innerHTML = '';
		// ���������б�����
		var num = 0;
		playlist.forEach((song) => {
			// �����б���Ԫ��
			const listItem = document.createElement('li');
			listItem.textContent = song.title + '-' + song.author;
			// ��ӵ���¼������Ŷ�Ӧ�ĸ���
			listItem.addEventListener('click', () => {
				currentSongIndex = song.id;
				loadSong(currentSongIndex);
				playSong();
			});
			// ���б�����ӵ�������б���
			sidebarList.appendChild(listItem);
			num++;
		});
		songNum.innerHTML = num;
	}
	//���ú������ɸ����б���
	generatePlaylistItems(playlist);
	//�����б�ť����¼�
	listButton.addEventListener('click', toggleSidebar);

	function toggleSidebar() {
		sidebar.classList.toggle('open');
	}

	//��������Զ�������һ���¼�
	audio.addEventListener('ended', function () {
		// ���ӵ�ǰ��������
		currentSongIndex++;
		// ��鵱ǰ���������Ƿ񳬳��˲����б�ķ�Χ
		if (currentSongIndex >= playlist.length) {
			currentSongIndex = 0; // ���������Χ���ص���һ�׸���
		}
		// ������һ�׸���
		loadSong(currentSongIndex);
		playSong();
	});

	//������ť����¼�
	volumeButton.addEventListener('click', toggleVolume);

	function toggleVolume() {
		if (audio.volume === 0) {
			audio.volume = 0.7; // ��������ΪĬ��ֵ
			volumeButton.classList.remove('bx-volume-mute'); // �Ƴ�����ͼ������
			volumeButton.classList.add('bx-volume-full'); // �������ͼ������
		} else {
			audio.volume = 0; // ����
			volumeButton.classList.remove('bx-volume-full'); // �Ƴ�����ͼ������
			volumeButton.classList.add('bx-volume-mute'); // ��Ӿ���ͼ������
		}
	}

	//��һ���¼�
	previousButton.addEventListener('click', () => {
		previousSong();
	});
	//��һ���¼�
	nextButton.addEventListener('click', () => {
		nextSong();
	});
	//����������
	audio.addEventListener('timeupdate', () => {
		const progress = (audio.currentTime / audio.duration) * 100;
		startTime.textContent = formatTime(audio.currentTime);
		//���ݽ�����������ɫ
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
	//��һ�׷���
	function previousSong() {
		currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
		loadSong(currentSongIndex);
		playSong();
	}
	//��һ�׷���
	function nextSong() {
		currentSongIndex = (currentSongIndex + 1) % playlist.length;
		loadSong(currentSongIndex);
		playSong();
	}
	//���ŷ���
	function playSong() {
		audio.play();
		playButton.classList.remove('bx-play');
		playButton.classList.add('bx-pause');
		image.src = 'img/a1.jpg';
	}
	//��ͣ����
	function pauseSong() {
		audio.pause();
		playButton.classList.remove('bx-pause');
		playButton.classList.add('bx-play');
		image.src = 'img/a1.jpg';
	}
	//��Ⱦ��������
	function render(song) {
		title.innerHTML = song.title;
		author.innerHTML = song.author;
		endTime.innerHTML = song.time;
		audio.volume = 0.7; //����0~1;
		audio.src = song.path; //������Դ·��
	}
	//���ظ�������
	function loadSong(index) {
		const song = playlist[index];
		title.innerHTML = song.title;
		author.innerHTML = song.author;
		endTime.innerHTML = song.time;
		audio.src = song.path;
	}

	init();
});