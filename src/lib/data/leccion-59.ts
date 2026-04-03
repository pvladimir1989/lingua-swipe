export interface Section {
	id: string;
	title: string;
	swipeable: boolean;
	content: SectionContent;
}

export type SectionContent =
	| { type: 'parallel'; pairs: { es: string; ru: string }[] }
	| { type: 'grammar'; explanation: string; pairs: { es: string; ru: string }[] }
	| { type: 'vocab'; words: { es: string; ru: string }[] };

export const sections: Section[] = [
	{
		id: 'dialog',
		title: 'Диалог: La division del tiempo',
		swipeable: true,
		content: {
			type: 'parallel',
			pairs: [
				{ es: '— Jose, ayudame en mis tareas — pide Carmencita.', ru: '— Хосэ, помоги мне в моих заданиях — просит Карменсита.' },
				{ es: '— Bueno, ¿cuanto es una por una?', ru: '— Хорошо. Сколько будет одинажды один?' },
				{ es: '— Una por una es una.', ru: '— Одинажды один — один.' },
				{ es: '— Y ¿cuanto son tres por dos?', ru: '— А сколько — трижды два?' },
				{ es: '— Tres por dos son seis.', ru: '— Трижды два — шесть.' },
				{ es: '— Y ¿una mas seis?', ru: '— А один прибавить шесть?' },
				{ es: '— Una mas seis igual a siete.', ru: '— Один прибавить шесть равняется семь.' },
				{ es: '— Y ¿dieciseis menos once?', ru: '— А шестнадцать отнять одиннадцать?' },
				{ es: '— Dieciseis menos once igual a cinco, pero, Jose...', ru: '— Шестнадцать отнять одиннадцать равняется пять, но Хосэ...' },
				{ es: '— Espera, contesta primero. ¿Ciento entre veinte?', ru: '— Подожди, сначала отвечай: сто разделить на двадцать?' },
				{ es: '— A cinco. Escucha, Jose, quiero decirte...', ru: '— Пять, но, послушай, Хосэ, я хочу тебе сказать...' },
				{ es: '— Espera. ¿Y a cuantos estamos?', ru: '— Подожди, а какое сегодня число?' },
				{ es: '— Estamos a doce de enero de dos mil veintidos, pero, Jose, esto es demasiado facil, tengo que escribir algo sobre la division del tiempo en general.', ru: '— Сегодня двенадцатое января 2022 года, но Хосэ, это очень легко, а я должна написать об определении времени вообще.' },
				{ es: '— ¿Por que no lo dijiste en seguida?', ru: '— Почему же ты об этом сразу не сказала?' },
				{ es: '— Porque no me dejabas decirtelo.', ru: '— Потому что ты мне не позволил сказать.' },
				{ es: '— Bueno, escribe pues: „Los historiadores dividen el tiempo en edades, en civilizaciones... los astronomos lo han dividido en siglos, ora en anos, ora en meses, ora en semanas; y las semanas en dias, y los dias en minutos, y los minutos en segundos...', ru: '— Ну, ладно, тогда пиши: „историки определяют время веками и цивилизацией: астрономы поделили его на столетия, годы, месяцы, недели, а недели делят на дни, дни на минуты, а минуты на секунды...' },
				{ es: 'Los militares no cuentan por anos, sino por campanas...', ru: 'Военные считают время не по годам, а по кампаниям...' },
				{ es: 'Los actores y los cantantes tienen tambien sus campanas, que se llaman temporadas...', ru: 'У артистов и певцов тоже кампании, которые называются сезонами...' },
				{ es: 'Los politicos cuentan por elecciones, por legislaturas, por ministerios. Para ellos empieza el ano cuando se abren las cortes, y se acaba el mundo cuando caen del poder...', ru: 'Политические деятели считают года по выборам или по срокам полномочий законодательных органов, кабинетов министров. Для них год начинается, когда открываются заседания парламента, а мир кончается, когда они теряют власть...' },
			]
		}
	},
	{
		id: 'words',
		title: 'Значение слов и выражений',
		swipeable: false,
		content: {
			type: 'grammar',
			explanation: 'el siglo — век, столетие\nla edad — возраст; исторический период\n\nНазвания месяцев:\nenero — январь, julio — июль\nfebrero — февраль, agosto — август\nmarzo — март, septiembre — сентябрь\nabril — апрель, octubre — октябрь\nmayo — май, noviembre — ноябрь\njunio — июнь, diciembre — декабрь\n\nВыражения:\nciento entre veinte — раздели сто на двадцать\n¿a cuantos estamos? — какое сегодня число?',
			pairs: [
				{ es: 'el siglo', ru: 'век, столетие' },
				{ es: 'la edad', ru: 'век человека' },
				{ es: 'Vivimos en el siglo veintiuno.', ru: 'Мы живем в XXI веке.' },
				{ es: '¿Que edad tienes?', ru: 'Сколько тебе лет?' },
				{ es: 'enero / febrero / marzo / abril / mayo / junio', ru: 'январь / февраль / март / апрель / май / июнь' },
				{ es: 'julio / agosto / septiembre / octubre / noviembre / diciembre', ru: 'июль / август / сентябрь / октябрь / ноябрь / декабрь' },
				{ es: 'ciento entre veinte', ru: 'раздели сто на двадцать' },
				{ es: '¿a cuantos estamos?', ru: 'какое сегодня число?' },
			]
		}
	},
	{
		id: 'prepositions',
		title: 'Предлоги a, de, en, para',
		swipeable: false,
		content: {
			type: 'grammar',
			explanation: 'a = в, на, к, по, у\n• a casa — домой (устойчивый оборот)\n• a las dos — в два часа (время)\n• a la espanola — по-испански\n• a 10 pesetas el metro — по 10 песет за метр (цена)\n• признак дательного падежа\n• признак винительного падежа (лицо)\n• орудие действия\n• a + инфинитив = si (условие)\n• al + инфинитив = деепричастие / «когда»\n\nde = от, из, с\n• родительный падеж\n• принадлежность\n\nen = в, на\n• место (где? куда?)\n\npara = для, чтобы, к\n• para + инфинитив — чтобы\n• estar para + инфинитив — быть готовым',
			pairs: [
				{ es: 'a casa', ru: 'домой' },
				{ es: 'a las dos', ru: 'в два часа' },
				{ es: 'a instancias de (mi amigo)', ru: 'по настоянию (моего друга)' },
				{ es: 'a la espanola', ru: 'по-испански' },
				{ es: 'a 10 pesetas el metro', ru: 'по 10 песет метр' },
				{ es: 'Doy el libro a mi maestro.', ru: 'Я даю книгу учителю.' },
				{ es: 'Veo a Juana.', ru: 'Я вижу Хуану.' },
				{ es: 'Los vencieron a hierro.', ru: 'Победили мечом.' },
				{ es: 'A ser esto verdad, te diria...', ru: 'Если бы это была правда, я бы тебе сказала...' },
				{ es: 'Al entrar en el cuarto vi a Juan.', ru: 'Войдя в комнату, я увидел Хуана.' },
				{ es: 'Lo recibi de Juan.', ru: 'Я получил это от Хуана.' },
				{ es: 'Sali de casa.', ru: 'Я вышел из дому.' },
				{ es: 'La nina de los ojos negros.', ru: 'Черноглазая девочка.' },
				{ es: 'Esta alli de criada.', ru: 'Она там работает служанкой.' },
				{ es: 'El libro de Juan.', ru: 'Книга Хуана.' },
				{ es: 'Estoy en casa.', ru: 'Я дома.' },
				{ es: 'Entro en casa.', ru: 'Я вхожу в дом.' },
				{ es: 'De dia en dia.', ru: 'День ото дня; с каждым днём.' },
				{ es: 'para ganar', ru: 'чтобы заработать' },
				{ es: 'para Juan', ru: 'для Хуана' },
				{ es: 'estoy para ir', ru: 'я готов пойти' },
			]
		}
	},
	{
		id: 'numbers',
		title: 'Числительные 100 — 1 000 000',
		swipeable: false,
		content: {
			type: 'grammar',
			explanation: 'Количественные:\n101 — ciento y uno\n200 — doscientos / doscientas\n300 — trescientos, -as\n400 — cuatrocientos, -as\n500 — quinientos, -as\n600 — seiscientos, -as\n700 — setecientos, -as\n800 — ochocientos, -as\n900 — novecientos, -as\n1 000 — mil\n1 000 000 — un millon (de)\n\nВажно:\n• mil не имеет множественного числа\n• миллиард = mil millones\n• 200–900 согласуются в роде: doscientos hombres / doscientas mujeres\n\nПорядковые (от 200):\n200-й ducentesimo · 300-й trecentesimo · 500-й quingentesimo · 1000-й milesimo\n\n• primero → primer, tercero → tercer (перед муж. сущ.)\n• В датах и столетиях только primero порядковое, остальные количественные',
			pairs: [
				{ es: 'un millon (de)', ru: '1 миллион' },
				{ es: 'tres millones (de)', ru: '3 миллиона' },
				{ es: 'mil millones', ru: 'миллиард (тысяча миллионов)' },
				{ es: 'doscientos hombres', ru: 'двести мужчин' },
				{ es: 'doscientas mujeres', ru: 'двести женщин' },
				{ es: 'primero', ru: 'первый' },
				{ es: 'el primero de junio', ru: 'первое июня' },
				{ es: 'el dos de junio', ru: 'второе июня' },
				{ es: 'el siglo primero y el siglo dos de nuestra era', ru: 'первый и второй век нашей эры' },
				{ es: 'el primer piso', ru: 'первый этаж' },
				{ es: 'el tercer piso', ru: 'третий этаж' },
				{ es: 'el quinto mes', ru: 'пятый месяц' },
				{ es: 'la quinta pagina', ru: 'пятая страница' },
				{ es: 'los primeros alumnos', ru: 'первые ученики' },
			]
		}
	},
	{
		id: 'vocab',
		title: 'Словарь урока',
		swipeable: false,
		content: {
			type: 'vocab',
			words: [
				{ es: 'la division', ru: 'деление; разделение; распределение' },
				{ es: 'ayudar', ru: 'помогать' },
				{ es: 'la tarea', ru: 'работа, дело; задача; задание' },
				{ es: 'por', ru: 'по, через; из, из-за, в, на' },
				{ es: 'tres por dos', ru: 'трижды два' },
				{ es: 'mas', ru: 'плюс' },
				{ es: 'entre', ru: 'разделить на' },
				{ es: 'igual', ru: 'одинаковый, равный; равняется' },
				{ es: 'el historiador', ru: 'историк' },
				{ es: 'dividir', ru: 'делить, разделить' },
				{ es: 'la edad', ru: 'возраст; век' },
				{ es: 'la civilizacion', ru: 'цивилизация' },
				{ es: 'el astronomo', ru: 'астроном' },
				{ es: 'el siglo', ru: 'столетие, век' },
				{ es: 'el minuto', ru: 'минута' },
				{ es: 'el segundo', ru: 'секунда' },
				{ es: 'el militar', ru: 'военный' },
				{ es: 'la campana', ru: 'кампания' },
				{ es: 'el actor', ru: 'актёр' },
				{ es: 'el cantante', ru: 'певец' },
				{ es: 'las elecciones', ru: 'выборы' },
				{ es: 'la legislatura', ru: 'срок полномочий законодательного органа' },
				{ es: 'caer', ru: 'падать; терять' },
				{ es: 'el ministerio', ru: 'министерство; кабинет министров' },
			]
		}
	}
];
