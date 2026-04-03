import type { Section } from '$lib/types';

export const sections: Section[] = [
	{
		id: 'text',
		title: 'Текст: La risa',
		swipeable: true,
		content: {
			type: 'parallel',
			pairs: [
				{ es: '...La alegria destierra el estado morboso de las almas; la alegria, riente, expresiva, de sonoras alas, se mueve en un ambiente sano y vivificador.', ru: '...Радость изгоняет болезненное состояние души; радость, смеющаяся, выразительная, на звонких крыльях, движется в здоровой и живительной атмосфере.' },
				{ es: 'Su trueno jovial, su carcajada, es como las descargas electricas, que purifican la atmosfera.', ru: 'Её весёлый гром, её хохот — как электрические разряды, которые очищают атмосферу.' },
				{ es: 'Y en este siglo de crisis intelectuales, de agitacion moral, de decaimientos, de enfermedades del alma, la risa ha podido ser torre de asilo, lugar de salvamento, para los que se allegan a sus dominios y se acogen bajo sus banderas...', ru: 'И в этот век умственных кризисов, морального волнения, упадка, болезней души, смех мог быть башней-убежищем, местом спасения для тех, кто стремится в его владения и укрывается под его знамёнами...' },
				{ es: '¡Bendigamos la risa!', ru: 'Да славится смех!' },
				{ es: '¡Bendigamos la risa, porque ella libra al mundo de la noche!', ru: 'Да славится смех, ибо он освобождает мир от ночи!' },
				{ es: '¡Bendigamosla, porque ella es la luz de la aurora, el carmin del sol, el trino del pajaro!..', ru: 'Да славится он, ибо он — свет утренней зари, багрянец солнца, трель птицы!..' },
				{ es: '¡Bendigamosla, porque ella esta en el ala de la mariposa, en el caliz del clavel lleno de rocio!..', ru: 'Да славится он, ибо он — на крыле бабочки, в чашечке гвоздики, полной росы!..' },
				{ es: '¡Bendigamosla, porque ella es la salvacion, la lanza y el escudo!...', ru: 'Да славится он, ибо он — спасение, копьё и щит!...' },
			]
		}
	},
	{
		id: 'vocab',
		title: 'Словарь',
		swipeable: false,
		content: {
			type: 'vocab',
			words: [
				{ es: 'la risa', ru: 'смех' },
				{ es: 'desterrar', ru: 'изгонять, отгонять от себя' },
				{ es: 'el estado', ru: 'состояние; положение' },
				{ es: 'morboso, -a', ru: 'больной; болезненный' },
				{ es: 'expresivo, -a', ru: 'выразительный, экспрессивный' },
				{ es: 'sonoro, -a', ru: 'звонкий, гулкий' },
				{ es: 'el ala', ru: 'крыло' },
				{ es: 'moverse', ru: 'двигаться' },
				{ es: 'el ambiente', ru: 'обстановка, среда, атмосфера' },
				{ es: 'sano, -a', ru: 'здоровый, целый, невредимый' },
				{ es: 'vivificador, -a', ru: 'живительный' },
				{ es: 'el trueno', ru: 'гром; грохот' },
				{ es: 'jovial', ru: 'весёлый, жизнерадостный' },
				{ es: 'la carcajada', ru: 'хохот, взрыв смеха' },
				{ es: 'la descarga', ru: 'разряд' },
				{ es: 'electrico, -a', ru: 'электрический' },
				{ es: 'purificar', ru: 'очищать, чистить' },
				{ es: 'el siglo', ru: 'столетие, век' },
				{ es: 'intelectual', ru: 'умственный, интеллектуальный' },
				{ es: 'la agitacion', ru: 'волнение; возбуждение; агитация' },
				{ es: 'moral', ru: 'моральный, нравственный' },
				{ es: 'el decaimiento', ru: 'упадок, разрушение' },
				{ es: 'la enfermedad', ru: 'болезнь, недуг' },
				{ es: 'la torre', ru: 'башня, вышка' },
				{ es: 'el asilo', ru: 'убежище; приют' },
				{ es: 'el salvamento', ru: 'спасение' },
				{ es: 'allegarse', ru: 'тянуться; соединяться; стремиться' },
				{ es: 'el dominio', ru: 'власть, господство' },
				{ es: 'acogerse', ru: 'укрываться' },
				{ es: 'la bandera', ru: 'знамя, флаг' },
				{ es: 'bendecir', ru: 'благословлять, прославлять, славить' },
				{ es: 'librar', ru: 'освобождать; избавлять' },
				{ es: 'la aurora', ru: 'утренняя заря' },
				{ es: 'el trino', ru: 'трель' },
				{ es: 'la mariposa', ru: 'бабочка' },
				{ es: 'el caliz', ru: 'бокал, кубок; чашечка цветка' },
				{ es: 'el rocio', ru: 'роса' },
				{ es: 'la salvacion', ru: 'спасение' },
				{ es: 'la lanza', ru: 'копьё' },
				{ es: 'el escudo', ru: 'щит; герб' },
			]
		}
	},
	{
		id: 'word-order',
		title: 'Порядок слов в предложении',
		swipeable: false,
		content: {
			type: 'grammar',
			explanation: 'В простом предложении порядок слов:\nподлежащее → сказуемое → дополнение\n\nМожно начать дополнением, но тогда оно повторяется местоимением перед глаголом.\n\nПодлежащее после сказуемого:\n• в вопросительных предложениях\n• если предложение начинается наречием\n\nОтрицание no ставится перед глаголом.\n\nВопросительный порядок:\nсказуемое → подлежащее → дополнение',
			pairs: [
				{ es: 'Miguel vio a Maria.', ru: 'Михаил увидел Марию.' },
				{ es: 'A Maria la vio Miguel.', ru: 'Марию увидел Михаил.' },
				{ es: '¿Adonde vas? — pregunta Juan.', ru: 'Куда ты идёшь? — спрашивает Хуан.' },
				{ es: 'En seguida comenzo a cantar Carmen.', ru: 'Сразу начала петь Кармэн.' },
				{ es: 'Miguel no vio a Juana.', ru: 'Михаил не видел Хуаны.' },
				{ es: '¿Vio Miguel a Juana?', ru: 'Видел Михаил Хуану?' },
			]
		}
	},
	{
		id: 'pronouns',
		title: 'Место безударных местоимений',
		swipeable: false,
		content: {
			type: 'grammar',
			explanation: 'Местоимение ПЕРЕД глаголом:\n• во всех временах изъявительного, условного, сослагательного наклонения\n\nМестоимение ПОСЛЕ глагола (слитно):\n• повелительное наклонение\n• gerundio\n• инфинитив\n\nИсключение: если перед глаголом стоит другое слово — местоимение перед глаголом.\n\nВ сложных временах — местоимение перед вспомогательным глаголом.\n\nДва местоимения — всегда рядом (оба перед или оба после глагола). 1-е и 2-е лицо всегда перед 3-м.',
			pairs: [
				{ es: 'Juana te ve, te veia, te vio, te vera, te veria.', ru: 'Хуана тебя видит, видела, увидела, увидит, увидела бы.' },
				{ es: '¡Tomalo!', ru: 'Возьми это!' },
				{ es: '¡Dadle el libro!', ru: 'Дайте ему книгу!' },
				{ es: '¡Quedense aqui!', ru: 'Останьтесь здесь!' },
				{ es: 'Ojala nos lea algo.', ru: 'Хоть бы он нам что-нибудь прочитал.' },
				{ es: 'No le molestes.', ru: 'Не мешай ему.' },
				{ es: 'Deseo que te quedes.', ru: 'Я желаю, чтобы ты остался.' },
				{ es: 'me han comprado', ru: 'мне куплено' },
				{ es: 'habiendome comprado', ru: 'купив мне' },
				{ es: 'te habiamos escrito', ru: 'мы написали тебе' },
				{ es: 'habiendote escrito', ru: 'написав тебе' },
				{ es: '¡Damelo!', ru: 'Дай мне это!' },
				{ es: 'me lo das', ru: 'ты мне это даёшь' },
			]
		}
	},
	{
		id: 'complements',
		title: 'Дополнения и обстоятельства',
		swipeable: false,
		content: {
			type: 'grammar',
			explanation: 'Порядок при нескольких дополнениях:\nподлежащее → сказуемое → прямое доп. → косвенное доп. → обстоятельство\n\nПорядок можно менять в зависимости от того, что подчёркиваем. Но группа «подлежащее — сказуемое — прямое дополнение» всегда тесно связана.',
			pairs: [
				{ es: 'Jose escribio una carta a Miguel ayer.', ru: 'Хосэ написал письмо Михаилу вчера.' },
				{ es: 'Ayer Jose escribio una carta a Miguel.', ru: 'Вчера Хосэ написал письмо Михаилу.' },
				{ es: 'La carta a Miguel la escribio Jose ayer.', ru: 'Письмо Михаилу написал Хосэ вчера.' },
				{ es: 'A Miguel le escribio Jose una carta ayer.', ru: 'Михаилу написал Хосэ письмо вчера.' },
			]
		}
	}
];
