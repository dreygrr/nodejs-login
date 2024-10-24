INSERT INTO `users` (`username`, `name`, `password`, `birthdate`) VALUES
('drey', 'andrey', '$2a$10$vbR7ycd/T1iIfacFv2T8vOIkBk06iXFDfHIUYSt45X/w1.MNB3M.e', '2005-03-16');

#############################################################################

INSERT INTO `shelves` (`id`, `name`, `author`, `color`) VALUES
(1, 'Biografias', 'drey', '#ff0000'),
(2, 'Afazeres', 'drey', '#0000ff'),
(3, 'Ficção científica', 'drey', '#00ff00');

#############################################################################

INSERT INTO `books` (`id`, `title`, `color`, `content`, `author`, `created_at`) VALUES
(1, 'Duna', '#ff9500', 'Set on the desert planet of Arrakis, \'Duna\' follows young Paul Atreides as he navigates a world of political intrigue, prophecy, and ecological challenges, ultimately becoming the pivotal figure in a battle for control of the universe\'s most valuable resource: the spice melange.', 'drey', '2024-10-23 20:48:33'),
(2, 'The Diary of a Young Girl', '#ff5733', 'A poignant diary reflecting on the life of a young Jewish girl during the Holocaust.', 'drey', '2024-10-24 02:07:25'),
(3, 'Neuromancer', '#4caf50', 'A groundbreaking science fiction novel that explores artificial intelligence and cyberspace.', 'drey', '2024-10-24 02:07:25'),
(4, 'Getting Things Done', '#2196f3', 'A guide to personal productivity and managing tasks efficiently.', 'drey', '2024-10-24 02:07:25'),
(5, 'Sapiens: A Brief History of Humankind', '#ffeb3b', 'An exploration of the history and impact of Homo sapiens.', 'drey', '2024-10-24 02:07:25'),
(6, 'Dune Messiah', '#673ab7', 'A sequel that continues the epic tale of Paul Atreides and his journey.', 'drey', '2024-10-24 02:07:25'),
(7, 'The Immortal Life of Henrietta Lacks', '#9c27b0', 'The story of Henrietta Lacks and the immortal cell line, HeLa, derived from her.', 'drey', '2024-10-24 02:07:25'),
(8, 'Foundation', '#8bc34a', 'A classic science fiction series about the rise and fall of civilizations.', 'drey', '2024-10-24 02:07:25'),
(9, 'The Art of War', '#ff9800', 'An ancient Chinese military treatise attributed to Sun Tzu, focusing on strategy and tactics.', 'drey', '2024-10-24 02:07:25'),
(10, 'Atomic Habits', '#e91e63', 'A guide to building good habits and breaking bad ones through small changes.', 'drey', '2024-10-24 02:07:25'),
(11, 'Becoming', '#3f51b5', 'A memoir by Michelle Obama, reflecting on her life, values, and experiences.', 'drey', '2024-10-24 02:07:25'),
(12, 'The Hitchhiker\'s Guide to the Galaxy', '#795548', 'A comedic science fiction adventure through space and time.', 'drey', '2024-10-24 02:07:25'),
(13, 'The Last Voyage', '#007bff', 'In \'The Last Voyage\', a crew of explorers sets out on a perilous journey across the galaxy, facing cosmic storms and alien civilizations...', 'drey', '2024-10-24 03:08:39'),
(14, 'Whispers of the Forest', '#3cb371', 'In \'Whispers of the Forest\', an ancient guardian awakens to protect the secrets of nature from encroaching darkness...', 'drey', '2024-10-24 03:11:17'),
(15, 'Echoes of Time', '#ff4500', 'In \'Echoes of Time\', a time traveler unravels the threads of history, discovering hidden truths that could alter the future...', 'drey', '2024-10-24 03:14:55'),
(16, 'Starlit Dreams', '#6a5acd', 'In \'Starlit Dreams\', a young artist journeys through a world where imagination shapes reality, encountering wonders and challenges along the way...', 'drey', '2024-10-24 03:17:44'),
(17, 'Beneath the Waves', '#00bfff', 'In \'Beneath the Waves\', a deep-sea explorer uncovers ancient mysteries and confronts the unknown dangers lurking in the ocean\'s depths...', 'drey', '2024-10-24 03:19:36'),
(18, 'The Forgotten Realm', '#8a2be2', 'In \'The Forgotten Realm\', a brave hero ventures into a land lost to time, battling dark forces to reclaim its magic and history...', 'drey', '2024-10-24 03:20:44'),
(19, 'todo1', '#bdbdbd', 'afazer 1', 'drey', '2024-10-24 19:05:59'),
(20, 'eita', '#ff0000', 'eita!!', 'drey', '2024-10-24 19:11:18'),
(22, 'todo2', '#000000', 'teste', 'drey', '2024-10-24 19:35:05'),
(23, 'todo3', '#dedede', 'aa', 'drey', '2024-10-24 19:35:44'),
(24, 'todo4', '#121212', 'testando', 'drey', '2024-10-24 19:45:12'),
(25, 'teste final!!!', '#ff0000', 'eita pegas', 'drey', '2024-10-24 21:14:45');

#############################################################################

INSERT INTO `shelves_books` (`id_shelf`, `id_book`) VALUES
(2, 1),
(1, 2),
(2, 3),
(3, 4),
(1, 5),
(2, 6),
(1, 7),
(2, 8),
(3, 9),
(3, 10),
(1, 11),
(2, 12),
(3, 13),
(3, 14),
(3, 15),
(3, 16),
(3, 17),
(3, 18),
(2, 19),
(2, 20),
(2, 22),
(2, 23),
(2, 24),
(3, 25);