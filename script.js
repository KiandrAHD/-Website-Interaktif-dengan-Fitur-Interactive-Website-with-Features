        // Inisialisasi variabel global
        let currentTab = 'calc';
        let currentLang = 'id';
        let isDarkMode = false;
        let calcInput = '';
        let currentPlayer = 'X';
        let board = ['', '', '', '', '', '', '', '', ''];
        let scores = { X: 0, O: 0 };
        let gameActive = true;

        // Objek terjemahan untuk bahasa Indonesia dan English
        const translations = {
            id: {
                headerTitle: 'Website Interaktif dengan Fitur',
                langSwitch: 'English (EN)',
                themeToggle: 'Mode Gelap',
                tabCalc: 'Kalkulator',
                tabCipher: 'Caesar Cipher',
                tabTtt: 'Tic Tac Toe',
                calcTitle: 'Kalkulator',
                calcDesc: 'Lakukan operasi matematika dasar seperti penjumlahan, pengurangan, perkalian, dan pembagian.',
                cipherTitle: 'Caesar Cipher',
                cipherDesc: 'Masukkan teks dan nomor pergeseran untuk mengenkripsi teks menggunakan sandi Caesar.',
                cipherInputPlaceholder: 'Masukkan teks di sini',
                shiftPlaceholder: 'Nomor pergeseran (contoh: 3)',
                encryptBtn: 'Enkripsi',
                cipherOutputPlaceholder: 'Teks terenkripsi akan muncul di sini',
                tttTitle: 'Tic Tac Toe',
                tttDesc: 'Permainan bagi 2 pemain dengan skor yang dilacak untuk pemain X dan O.',
                playerTurnX: 'Giliran pemain X',
                playerTurnO: 'Giliran pemain O',
                tieMessage: 'Permainan seri!',
                winMessageX: 'Pemain X menang!',
                winMessageO: 'Pemain O menang!',
                scoreX: 'Kemenangan X: ',
                scoreO: 'Kemenangan O: ',
                lightMode: 'Mode Terang',
                darkMode: 'Mode Gelap'
            },
            en: {
                headerTitle: 'Interactive Website with Features',
                langSwitch: 'Indonesian (ID)',
                themeToggle: 'Dark Mode',
                tabCalc: 'Calculator',
                tabCipher: 'Caesar Cipher',
                tabTtt: 'Tic Tac Toe',
                calcTitle: 'Calculator',
                calcDesc: 'Perform basic mathematical operations like addition, subtraction, multiplication, and division.',
                cipherTitle: 'Caesar Cipher',
                cipherDesc: 'Enter text and shift number to encrypt using Caesar cipher.',
                cipherInputPlaceholder: 'Enter text here',
                shiftPlaceholder: 'Shift number (e.g., 3)',
                encryptBtn: 'Encrypt',
                cipherOutputPlaceholder: 'Encrypted text will appear here',
                tttTitle: 'Tic Tac Toe',
                tttDesc: 'A 2-player game with scoreboard tracking wins for Player X and O.',
                playerTurnX: 'Player X turn',
                playerTurnO: 'Player O turn',
                tieMessage: 'It\'s a tie!',
                winMessageX: 'Player X wins!',
                winMessageO: 'Player O wins!',
                scoreX: 'Wins X: ',
                scoreO: 'Wins O: ',
                lightMode: 'Light Mode',
                darkMode: 'Dark Mode'
            }
        };

        // Fungsi untuk menukar bahas
        function switchLanguage() {
            currentLang = currentLang === 'id' ? 'en' : 'id';
            updateLanguage();
        }

        // Fungsi untuk memperbarui bahasa di seluruh UI
        function updateLanguage() {
            document.getElementById('headerTitle').textContent = translations[currentLang].headerTitle;
            document.getElementById('langSwitch').textContent = translations[currentLang].langSwitch;
            document.getElementById('darkSwitch').textContent = translations[currentLang][isDarkMode ? 'lightMode' : 'darkMode'];
            document.getElementById('tabCalc').textContent = translations[currentLang].tabCalc;
            document.getElementById('tabCipher').textContent = translations[currentLang].tabCipher;
            document.getElementById('tabTtt').textContent = translations[currentLang].tabTtt;
            document.querySelector('#calc h2').textContent = translations[currentLang].calcTitle;
            document.querySelector('#calc p').textContent = translations[currentLang].calcDesc;
            document.querySelector('#cipher h2').textContent = translations[currentLang].cipherTitle;
            document.querySelector('#cipher p').textContent = translations[currentLang].cipherDesc;
            document.getElementById('cipherInput').placeholder = translations[currentLang].cipherInputPlaceholder;
            document.getElementById('shiftInput').placeholder = translations[currentLang].shiftPlaceholder;
            document.querySelector('#cipher button').textContent = translations[currentLang].encryptBtn;
            document.getElementById('cipherOutput').placeholder = translations[currentLang].cipherOutputPlaceholder;
            document.querySelector('#ttt h2').textContent = translations[currentLang].tttTitle;
            document.querySelector('#ttt p').textContent = translations[currentLang].tttDesc;
            document.getElementById('status').textContent = currentPlayer === 'X' ? translations[currentLang].playerTurnX : translations[currentLang].playerTurnO;
            document.getElementById('scoreX').textContent = translations[currentLang].scoreX + scores.X;
            document.getElementById('scoreO').textContent = translations[currentLang].scoreO + scores.O;
        }

        // Fungsi untuk menukar mode tampilan
        function toggleDarkMode() {
            isDarkMode = !isDarkMode;
            document.documentElement.classList.toggle('dark');
            updateLanguage(); // Memperbarui teks tombol
        }

        // Fungsi untuk menampilkan tab
        function switchTab(tab) {
            document.querySelector('.section.active').classList.remove('active');
            document.querySelector('.tab.active').classList.remove('active');
            document.getElementById(tab).classList.add('active');
            document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
            currentTab = tab;
        }

        // Fungsi kalkulator: tambahkan ke display
        function appendToDisplay(value) {
            if (calcInput === '' && isNaN(value)) return; // Hindari memulai dengan operator
            calcInput += value;
            document.getElementById('calcDisplay').value = calcInput;
        }

        // Fungsi kalkulator: bersihkan display
        function clearDisplay() {
            calcInput = '';
            document.getElementById('calcDisplay').value = '';
        }

        // Fungsi kalkulator: hitung
        function calculate() {
            try {
                const result = eval(calcInput);
                document.getElementById('calcDisplay').value = result;
                calcInput = result.toString();
            } catch {
                document.getElementById('calcDisplay').value = 'Error';
                calcInput = '';
            }
        }

        // Fungsi Caesar Cipher: enkripsi
        function encryptCaesar() {
            const text = document.getElementById('cipherInput').value;
            const shift = parseInt(document.getElementById('shiftInput').value) || 0;
            let result = '';
            for (let char of text) {
                if (char.match(/[a-z]/)) {
                    result += String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
                } else if (char.match(/[A-Z]/)) {
                    result += String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
                } else {
                    result += char;
                }
            }
            document.getElementById('cipherOutput').value = result;
        }

        // Fungsi Tic Tac Toe: cek pemenang
        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (let pattern of winPatterns) {
                if (board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[1]] === board[pattern[2]]) {
                    return board[pattern[0]];
                }
            }
            if (board.every(cell => cell)) return 'tie';
            return null;
        }

        // Fungsi Tic Tac Toe: lakukan gerakan
        function makeMove(index) {
            if (!gameActive || board[index]) return;
            board[index] = currentPlayer;
            document.getElementById('gameBoard').children[index].textContent = currentPlayer;
            const winner = checkWinner();
            if (winner) {
                if (winner === 'tie') {
                    document.getElementById('status').textContent = translations[currentLang].tieMessage;
                } else {
                    scores[winner]++;
                    document.getElementById('status').textContent = winner === 'X' ? translations[currentLang].winMessageX : translations[currentLang].winMessageO;
                    document.getElementById('scoreX').textContent = translations[currentLang].scoreX + scores.X;
                    document.getElementById('scoreO').textContent = translations[currentLang].scoreO + scores.O;
                }
                gameActive = false;
                setTimeout(resetGame, 2000);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                document.getElementById('status').textContent = currentPlayer === 'X' ? translations[currentLang].playerTurnX : translations[currentLang].playerTurnO;
            }
        }

        // Fungsi Tic Tac Toe: reset permainan
        function resetGame() {
            board.fill('');
            gameActive = true;
            document.getElementById('status').textContent = translations[currentLang].playerTurnX;
            for (let i = 0; i < 9; i++) {
                document.getElementById('gameBoard').children[i].textContent = '';
            }
        }

        // Event listeners untuk tombol
        document.getElementById('langSwitch').addEventListener('click', switchLanguage);
        document.getElementById('darkSwitch').addEventListener('click', toggleDarkMode);
        document.getElementById('tabCalc').addEventListener('click', () => switchTab('calc'));
        document.getElementById('tabCipher').addEventListener('click', () => switchTab('cipher'));
        document.getElementById('tabTtt').addEventListener('click', () => switchTab('ttt'));