import type { Card } from '$lib/types';

export const cards: Card[] = [
	// Диалог
	{ id: 'd1', category: 'Диалог', spanish: '— José, ayúdame en mis tareas — pide Carmencita.', russian: '— Хосэ, помоги мне в моих заданиях.' },
	{ id: 'd2', category: 'Диалог', spanish: '— Bueno, ¿cuánto es una por una?', russian: '— Хорошо. Сколько будет одинажды один?' },
	{ id: 'd3', category: 'Диалог', spanish: '— Una por una es una.', russian: '— Одинажды один — один.' },
	{ id: 'd4', category: 'Диалог', spanish: '— Y ¿cuánto son tres por dos?', russian: '— А сколько — трижды два?' },
	{ id: 'd5', category: 'Диалог', spanish: '— Tres por dos son seis.', russian: '— Трижды два — шесть.' },
	{ id: 'd6', category: 'Диалог', spanish: '— Y ¿una más seis?', russian: '— А один прибавить шесть?' },
	{ id: 'd7', category: 'Диалог', spanish: '— Una más seis igual a siete.', russian: '— Один прибавить шесть равняется семь.' },
	{ id: 'd8', category: 'Диалог', spanish: '— Y ¿dieciséis menos once?', russian: '— А шестнадцать отнять одиннадцать?' },
	{ id: 'd9', category: 'Диалог', spanish: '— Dieciséis menos once igual a cinco, pero, José...', russian: '— Шестнадцать отнять одиннадцать равняется пять, но Хосэ...' },
	{ id: 'd10', category: 'Диалог', spanish: '— Espera, contesta primero. ¿Ciento entre veinte?', russian: '— Подожди, сначала отвечай: сто разделить на двадцать?' },
	{ id: 'd11', category: 'Диалог', spanish: '— ¿Por qué no lo dijiste en seguida?', russian: '— Почему же ты об этом сразу не сказала?' },
	{ id: 'd12', category: 'Диалог', spanish: '— Porque no me dejabas decírtelo.', russian: '— Потому что ты мне не позволил сказать.' },

	// Предлог A
	{ id: 'a1', category: 'Предлог A', spanish: 'a casa', russian: 'домой' },
	{ id: 'a2', category: 'Предлог A', spanish: 'a las dos', russian: 'в два часа' },
	{ id: 'a3', category: 'Предлог A', spanish: 'a la española', russian: 'по-испански' },
	{ id: 'a4', category: 'Предлог A', spanish: 'Doy el libro a mi maestro.', russian: 'Я даю книгу учителю.' },
	{ id: 'a5', category: 'Предлог A', spanish: 'Veo a Juana.', russian: 'Я вижу Хуану.' },
	{ id: 'a6', category: 'Предлог A', spanish: 'Al entrar en el cuarto vi a Juan.', russian: 'Войдя в комнату, я увидел Хуана.' },
	{ id: 'a7', category: 'Предлог A', spanish: 'A ser esto verdad, te diría...', russian: 'Если бы это была правда, я бы тебе сказала...' },

	// Предлог DE
	{ id: 'de1', category: 'Предлог DE', spanish: 'Lo recibí de Juan.', russian: 'Я получил это от Хуана.' },
	{ id: 'de2', category: 'Предлог DE', spanish: 'Salí de casa.', russian: 'Я вышел из дому.' },
	{ id: 'de3', category: 'Предлог DE', spanish: 'La niña de los ojos negros.', russian: 'Черноглазая девочка.' },
	{ id: 'de4', category: 'Предлог DE', spanish: 'El libro de Juan.', russian: 'Книга Хуана.' },

	// Предлог EN
	{ id: 'en1', category: 'Предлог EN', spanish: 'Estoy en casa.', russian: 'Я дома.' },
	{ id: 'en2', category: 'Предлог EN', spanish: 'Entro en casa.', russian: 'Я вхожу в дом.' },
	{ id: 'en3', category: 'Предлог EN', spanish: 'De día en día.', russian: 'День ото дня; с каждым днём.' },

	// Предлог PARA
	{ id: 'p1', category: 'Предлог PARA', spanish: 'para ganar', russian: 'чтобы заработать' },
	{ id: 'p2', category: 'Предлог PARA', spanish: 'para Juan', russian: 'для Хуана' },
	{ id: 'p3', category: 'Предлог PARA', spanish: 'estoy para ir', russian: 'я готов пойти' },

	// Числительные
	{ id: 'n1', category: 'Числительные', spanish: 'doscientos hombres', russian: 'двести мужчин' },
	{ id: 'n2', category: 'Числительные', spanish: 'doscientas mujeres', russian: 'двести женщин' },
	{ id: 'n3', category: 'Числительные', spanish: 'quinientos', russian: 'пятьсот' },
	{ id: 'n4', category: 'Числительные', spanish: 'mil', russian: 'тысяча' },
	{ id: 'n5', category: 'Числительные', spanish: 'un millón', russian: 'миллион' },
	{ id: 'n6', category: 'Числительные', spanish: 'mil millones', russian: 'миллиард' },
	{ id: 'n7', category: 'Числительные', spanish: 'el primero de junio', russian: 'первое июня' },
	{ id: 'n8', category: 'Числительные', spanish: 'el primer piso', russian: 'первый этаж' },

	// Словарь
	{ id: 'v1', category: 'Словарь', spanish: 'ayudar', russian: 'помогать' },
	{ id: 'v2', category: 'Словарь', spanish: 'la tarea', russian: 'работа, задача, задание' },
	{ id: 'v3', category: 'Словарь', spanish: 'dividir', russian: 'делить, разделить' },
	{ id: 'v4', category: 'Словарь', spanish: 'el siglo', russian: 'столетие, век' },
	{ id: 'v5', category: 'Словарь', spanish: 'la edad', russian: 'возраст; век' },
	{ id: 'v6', category: 'Словарь', spanish: 'el historiador', russian: 'историк' },
	{ id: 'v7', category: 'Словарь', spanish: 'el astrónomo', russian: 'астроном' },
	{ id: 'v8', category: 'Словарь', spanish: 'el militar', russian: 'военный' },
	{ id: 'v9', category: 'Словарь', spanish: 'la campaña', russian: 'кампания' },
	{ id: 'v10', category: 'Словарь', spanish: 'el actor', russian: 'актёр' },
	{ id: 'v11', category: 'Словарь', spanish: 'el cantante', russian: 'певец' },
	{ id: 'v12', category: 'Словарь', spanish: 'las elecciones', russian: 'выборы' },
	{ id: 'v13', category: 'Словарь', spanish: 'caer', russian: 'падать; терять' },
	{ id: 'v14', category: 'Словарь', spanish: 'el ministerio', russian: 'министерство' },

	// Месяцы
	{ id: 'm1', category: 'Месяцы', spanish: 'enero', russian: 'январь' },
	{ id: 'm2', category: 'Месяцы', spanish: 'febrero', russian: 'февраль' },
	{ id: 'm3', category: 'Месяцы', spanish: 'marzo', russian: 'март' },
	{ id: 'm4', category: 'Месяцы', spanish: 'abril', russian: 'апрель' },
	{ id: 'm5', category: 'Месяцы', spanish: 'mayo', russian: 'май' },
	{ id: 'm6', category: 'Месяцы', spanish: 'junio', russian: 'июнь' },
	{ id: 'm7', category: 'Месяцы', spanish: 'julio', russian: 'июль' },
	{ id: 'm8', category: 'Месяцы', spanish: 'agosto', russian: 'август' },
	{ id: 'm9', category: 'Месяцы', spanish: 'septiembre', russian: 'сентябрь' },
	{ id: 'm10', category: 'Месяцы', spanish: 'octubre', russian: 'октябрь' },
	{ id: 'm11', category: 'Месяцы', spanish: 'noviembre', russian: 'ноябрь' },
	{ id: 'm12', category: 'Месяцы', spanish: 'diciembre', russian: 'декабрь' },

	// Математика
	{ id: 'math1', category: 'Математика', spanish: 'tres por dos son seis', russian: '3 × 2 = 6' },
	{ id: 'math2', category: 'Математика', spanish: 'una más seis igual a siete', russian: '1 + 6 = 7' },
	{ id: 'math3', category: 'Математика', spanish: 'dieciséis menos once igual a cinco', russian: '16 − 11 = 5' },
	{ id: 'math4', category: 'Математика', spanish: 'ciento entre veinte', russian: '100 ÷ 20' },
];

export const categories = [...new Set(cards.map((c) => c.category))];
