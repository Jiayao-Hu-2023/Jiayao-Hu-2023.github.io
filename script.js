// 全局变量
let attemptCount = 0;
let startTime = null;
let isChasing = false;
let currentPhase = 1;
let currentLanguage = 'zh-CN';

// 语言翻译对象
const translations = {
    'zh-CN': {
        warningTitle: '这是个成人网站',
        warningText: '根据相关法律法规，您必须年满18周岁才能访问本网站内容。点击下方按钮确认您已满足年龄要求。',
        ageButton: '我已满18岁，进入',
        attemptCounter: '尝试次数: {{count}}',
        exitButton: '退出',
        copyright: '© 2026 ClickHub · 18 U.S.C. 2257 合规声明',
        dialogConfirm: '确认',
        surrenderTitle: '行吧，你赢了。',
        surrenderTime: '你追着一个按钮追了 {{time}} 秒。',
        surrenderContent1: '你以为这里面有什么？成人内容？',
        surrenderContent2: '其实这里面只有一个道理——',
        surrenderContent3: '成年人要学会面对 "得不到" 。',
        surrenderFinal: '愚人节快乐！ 😜',
        achievementTitle: '按钮追逐大师',
        achievementYear: '2026 年愚人节特别成就',
        achievementStats: '追逐次数: {{count}}',
        achievementSubtext: '你的耐心已经超越了 99% 的人类。',
        resetButton: '再来一次',
        exitDialog1: '这么快就要走？里面可是有 "精彩内容" 的哦~',
        exitDialog2: '想逃？按钮都比你勇敢。再试试看？',
        exitDialog3: '退出按钮都被你点了，看来你是真的不想看。好吧，其实也没什么秘密。',
        buttonTexts: {
            phase1: ['我已满18岁，进入', '确认并继续', '验证年龄', '进入网站', '年满18，确认'],
            phase2: ['再试一次？', '你确定满18了？', '年龄验证中...', '再点一次试试', '你真的满18了吗？', '别急，再想想'],
            phase3: ['追不上我吧~', '成年人要学会放弃', '要不你点\'退出\'算了？', '来呀，追我呀！', '你够执着的！', '再试一次？', '就差一点了！', '加油！', '你能行的！', '我就不信你能点到我！'],
            phase4: ['等等，我们聊聊', '停！有话好说', '先别急着点', '我们做个交易吧', '你为什么这么执着？', '休息一下吧', '要不我们聊聊人生？', '你赢了，我服了'],
            phase5: ['行吧，你赢了', '我投降', '你太执着了']
        },
        dialogMessages: [
            '你为什么非要点击我？是因为这页只有我一个按钮吗？',
            '说实话，有点感动，但今天真的不行。',
            '你知道吗？你是我见过最有耐心的用户。',
            '要不我们做个交易？你点退出，我告诉你秘密。',
            '好吧，我承认，你追得我有点累了...',
            '你这么执着，是想要什么呢？',
            '其实，成年人的世界里，并不是所有东西都能得到。',
            '你知道吗？有时候放弃也是一种智慧。',
            '我佩服你的毅力，但真的不能让你进去。',
            '要不我们做个朋友吧？我觉得你很有趣。',
            '你知道吗？你已经尝试了很多次了，放弃吧。',
            '其实，这里面什么都没有，只是一个愚人节玩笑。',
            '你这么执着，将来一定能成大事。',
            '休息一下吧，按钮也需要休息。',
            '你知道吗？你是第一个坚持这么久的用户。'
        ],
        temporaryMessages: ['追不上我吧~', '再来呀！', '差一点！', '好险！', '哈哈！', '你够执着的！', '再试一次？', '就差一点了！', '加油！', '你能行的！']
    },
    'zh-TW': {
        warningTitle: '這是個成人網站',
        warningText: '根據相關法律法規，您必須年滿18週歲才能訪問本網站內容。點擊下方按鈕確認您已滿足年齡要求。',
        ageButton: '我已滿18歲，進入',
        attemptCounter: '嘗試次數: {{count}}',
        exitButton: '退出',
        copyright: '© 2026 ClickHub · 18 U.S.C. 2257 合規聲明',
        dialogConfirm: '確認',
        surrenderTitle: '行吧，你贏了。',
        surrenderTime: '你追著一個按鈕追了 {{time}} 秒。',
        surrenderContent1: '你以為這裡面有什麼？成人內容？',
        surrenderContent2: '其實這裡面只有一個道理——',
        surrenderContent3: '成年人要學會面對 "得不到" 。',
        surrenderFinal: '愚人節快樂！ 😜',
        achievementTitle: '按鈕追逐大師',
        achievementYear: '2026 年愚人節特別成就',
        achievementStats: '追逐次數: {{count}}',
        achievementSubtext: '你的耐心已經超越了 99% 的人類。',
        resetButton: '再來一次',
        exitDialog1: '這麼快就要走？裡面可是有 "精彩內容" 的哦~',
        exitDialog2: '想逃？按鈕都比你勇敢。再試試看？',
        exitDialog3: '退出按鈕都被你點了，看來你是真的不想看。好吧，其實也沒什麼秘密。',
        buttonTexts: {
            phase1: ['我已滿18歲，進入', '確認並繼續', '驗證年齡', '進入網站', '年滿18，確認'],
            phase2: ['再試一次？', '你確定滿18了？', '年齡驗證中...', '再點一次試試', '你真的滿18了嗎？', '別急，再想想'],
            phase3: ['追不上我吧~', '成年人要學會放棄', '要不你點\'退出\'算了？', '來呀，追我呀！', '你夠執著的！', '再試一次？', '就差一點了！', '加油！', '你能行的！', '我就不信你能點到我！'],
            phase4: ['等等，我們聊聊', '停！有話好說', '先別急著點', '我們做個交易吧', '你為什麼這麼執著？', '休息一下吧', '要不我們聊聊人生？', '你贏了，我服了'],
            phase5: ['行吧，你贏了', '我投降', '你太執著了']
        },
        dialogMessages: [
            '你為什麼非要點擊我？是因為這頁只有我一個按鈕嗎？',
            '說實話，有點感動，但今天真的不行。',
            '你知道嗎？你是我見過最有耐心的使用者。',
            '要不我們做個交易？你點退出，我告訴你秘密。',
            '好吧，我承認，你追得我有點累了...',
            '你這麼執著，是想要什麼呢？',
            '其實，成年人的世界裡，並不是所有東西都能得到。',
            '你知道嗎？有時候放棄也是一種智慧。',
            '我佩服你的毅力，但真的不能讓你進去。',
            '要不我們做個朋友吧？我覺得你很有趣。',
            '你知道嗎？你已經嘗試了很多次了，放棄吧。',
            '其實，這裡面什麼都沒有，只是一個愚人節玩笑。',
            '你這麼執著，將來一定能成大事。',
            '休息一下吧，按鈕也需要休息。',
            '你知道嗎？你是第一個堅持這麼久的使用者。'
        ],
        temporaryMessages: ['追不上我吧~', '再來呀！', '差一點！', '好險！', '哈哈！', '你夠執著的！', '再試一次？', '就差一點了！', '加油！', '你能行的！']
    },
    'en-US': {
        warningTitle: 'This is an adult website',
        warningText: 'According to relevant laws and regulations, you must be at least 18 years old to access this website content. Click the button below to confirm that you meet the age requirement.',
        ageButton: 'I am 18+, enter',
        attemptCounter: 'Attempts: {{count}}',
        exitButton: 'Exit',
        copyright: '© 2026 ClickHub · 18 U.S.C. 2257 Compliance Statement',
        dialogConfirm: 'Confirm',
        surrenderTitle: 'Okay, you win.',
        surrenderTime: 'You chased a button for {{time}} seconds.',
        surrenderContent1: 'What did you think was in here? Adult content?',
        surrenderContent2: 'Actually, there\'s only one lesson here——',
        surrenderContent3: 'Adults need to learn to face "unattainable" things.',
        surrenderFinal: 'Happy April Fools\' Day! 😜',
        achievementTitle: 'Button Chasing Master',
        achievementYear: '2026 April Fools\' Special Achievement',
        achievementStats: 'Chase attempts: {{count}}',
        achievementSubtext: 'Your patience has surpassed 99% of humans.',
        resetButton: 'Try again',
        exitDialog1: 'Leaving so soon? There\'s "exciting content" inside~',
        exitDialog2: 'Want to escape? The button is braver than you. Try again?',
        exitDialog3: 'You clicked the exit button, it seems you really don\'t want to see it. Well, there\'s no secret anyway.',
        buttonTexts: {
            phase1: ['I am 18+, enter', 'Confirm and continue', 'Verify age', 'Enter website', '18+, confirm'],
            phase2: ['Try again?', 'Are you sure you\'re 18?', 'Age verification in progress...', 'Try clicking again', 'Are you really 18?', 'Wait, think again'],
            phase3: ['Can\'t catch me~', 'Adults need to learn to give up', 'Why not click \'Exit\'?', 'Come on, chase me!', 'You\'re persistent!', 'Try again?', 'Almost!', '加油！', 'You can do it!', 'I don\'t think you can click me!'],
            phase4: ['Wait, let\'s talk', 'Stop! Let\'s talk', 'Don\'t rush to click', 'Let\'s make a deal', 'Why are you so persistent?', 'Take a break', 'Let\'s talk about life', 'You win, I surrender'],
            phase5: ['Okay, you win', 'I surrender', 'You\'re too persistent']
        },
        dialogMessages: [
            'Why do you keep clicking me? Is it because I\'m the only button on this page?',
            'To be honest, I\'m a bit touched, but today is really not possible.',
            'You know what? You\'re the most patient user I\'ve ever seen.',
            'How about we make a deal? You click exit, and I\'ll tell you a secret.',
            'Okay, I admit it, you\'ve chased me a bit tired...',
            'What do you want with all this persistence?',
            'Actually, in the adult world, not everything can be obtained.',
            'You know what? Sometimes giving up is also a kind of wisdom.',
            'I admire your perseverance, but I really can\'t let you in.',
            'How about we be friends? I think you\'re interesting.',
            'You know what? You\'ve tried so many times, give up.',
            'Actually, there\'s nothing in here, just an April Fools\' joke.',
            'With such persistence, you will definitely achieve great things in the future.',
            'Take a break, the button needs to rest too.',
            'You know what? You\'re the first user who has persisted for so long.'
        ],
        temporaryMessages: ['Can\'t catch me~', 'Come on!', 'Almost!', 'Close call!', 'Haha!', 'You\'re persistent!', 'Try again?', 'Almost there!', 'Keep going!', 'You can do it!']
    },
    'ja-JP': {
        warningTitle: 'これは成人向けサイトです',
        warningText: '関連法令に基づき、本サイトのコンテンツにアクセスするには18歳以上である必要があります。以下のボタンをクリックして、年齢要件を満たしていることを確認してください。',
        ageButton: '18歳以上です、入る',
        attemptCounter: '試行回数: {{count}}',
        exitButton: '終了',
        copyright: '© 2026 ClickHub · 18 U.S.C. 2257 コンプライアンスステートメント',
        dialogConfirm: '確認',
        surrenderTitle: 'よし、君の勝ちだ。',
        surrenderTime: '君はボタンを {{time}} 秒間追いかけました。',
        surrenderContent1: 'ここに何があると思っていたの？成人向けコンテンツ？',
        surrenderContent2: '実はここにはただ一つの教訓があるだけ——',
        surrenderContent3: '大人は「手に入らないもの」に直面することを学ばなければならない。',
        surrenderFinal: 'エイプリルフールおめでとう！ 😜',
        achievementTitle: 'ボタン追跡マスター',
        achievementYear: '2026年エイプリルフール特別アチーブメント',
        achievementStats: '追跡回数: {{count}}',
        achievementSubtext: 'あなたの忍耐力は人間の99%を超えています。',
        resetButton: 'もう一度やる',
        exitDialog1: 'こんなに早く行くの？中には「エキサイティングなコンテンツ」があるよ~',
        exitDialog2: '逃げたいの？ボタンの方が君より勇敢だよ。もう一度やってみる？',
        exitDialog3: '終了ボタンをクリックしたね、本当に見たくないみたいだ。まあ、秘密なんて何もないよ。',
        buttonTexts: {
            phase1: ['18歳以上です、入る', '確認して続ける', '年齢を確認', 'サイトに入る', '18歳以上、確認'],
            phase2: ['もう一度やる？', '本当に18歳以上ですか？', '年齢確認中...', 'もう一度クリックしてみて', '本当に18歳以上ですか？', '待って、考え直して'],
            phase3: ['追いつけないよ~', '大人は諦めることを学ばなければならない', '「終了」をクリックしたらどう？', '来いよ、追いかけて！', '粘り強いね！', 'もう一度やる？', 'ほとんどだ！', 'がんばれ！', 'できるよ！', '君にはクリックできないと思うよ！'],
            phase4: ['待って、話そうよ', '止まれ！話しましょう', '急がないで', '取引しようよ', 'なぜこんなに粘り強いの？', '休憩しよう', '人生について話そうよ', '君の勝ち、降参する'],
            phase5: ['よし、君の勝ち', '降参する', 'あまりにも粘り強い']
        },
        dialogMessages: [
            'なぜ私をクリックし続けるの？このページに私しかボタンがないから？',
            '正直、少し感動したけど、今日は本当にダメだよ。',
            '知ってる？君は私が見た中で最も忍耐強いユーザーだよ。',
            '取引しようよ？終了をクリックして、秘密を教えるよ。',
            'よし、認めるよ、追いかけられて疲れたよ...',
            'こんなに粘り強くなって、何が欲しいの？',
            '実は、大人の世界では、全てのものが手に入るわけではないんだ。',
            '知ってる？時に諦めることも一種の知恵なんだよ。',
            '君の忍耐力には感心するけど、本当に入れないんだ。',
            '友達になろうよ？君は面白いと思うよ。',
            '知ってる？もう何度も試してるよ、諦めようよ。',
            '実は、ここには何もないよ、ただのエイプリルフールのジョークだよ。',
            'こんなに粘り強いなら、将来必ず大きなことができるよ。',
            '休憩しようよ、ボタンも休憩が必要だよ。',
            '知ってる？君はこんなに長く頑張った最初のユーザーだよ。'
        ],
        temporaryMessages: ['追いつけないよ~', '来いよ！', 'ほとんどだ！', '危なかった！', 'はは！', '粘り強いね！', 'もう一度やる？', 'もう少しだ！', '頑張れ！', 'できるよ！']
    },
    'ko-KR': {
        warningTitle: '이 사이트는 성인 전용입니다',
        warningText: '관련 법규에 따라 본 사이트 내용에 접근하려면 18세 이상이어야 합니다. 아래 버튼을 클릭하여 연령 요건을 충족하는지 확인하세요.',
        ageButton: '18세 이상입니다, 진입',
        attemptCounter: '시도 횟수: {{count}}',
        exitButton: '종료',
        copyright: '© 2026 ClickHub · 18 U.S.C. 2257 준수 성명',
        dialogConfirm: '확인',
        surrenderTitle: '좋아, 너의 승리야.',
        surrenderTime: '너는 버튼을 {{time}} 초 동안 쫓았어.',
        surrenderContent1: '여기에 뭐가 있을 거라고 생각했어? 성인 콘텐츠?',
        surrenderContent2: '사실 여기에는 오직 하나의 교훈만이 있어——',
        surrenderContent3: '성인은 "얻을 수 없는 것"에 직면하는 것을 배워야 해.',
        surrenderFinal: '만우절 축하해! 😜',
        achievementTitle: '버튼 추적 마스터',
        achievementYear: '2026년 만우절 특별 업적',
        achievementStats: '추적 횟수: {{count}}',
        achievementSubtext: '당신의 인내력은 인간의 99%를 초과했습니다.',
        resetButton: '다시 해보기',
        exitDialog1: '이렇게 빨리 가세요? 안에는 "흥미로운 콘텐츠"가 있어요~',
        exitDialog2: '도망가려 해? 버튼이 너보다 용감해. 다시 시도해볼래?',
        exitDialog3: '종료 버튼을 클릭했어, 정말 보고 싶지 않은 것 같아. 음, 비밀이 뭐 있나요.',
        buttonTexts: {
            phase1: ['18세 이상입니다, 진입', '확인하고 계속', '연령 확인', '사이트 진입', '18세 이상, 확인'],
            phase2: ['다시 시도?', '정말 18세 이상이신가요?', '연령 확인 중...', '다시 클릭해보세요', '정말 18세 이상이신가요?', '잠깐, 다시 생각해보세요'],
            phase3: ['따라오지 못 해~', '성인은 포기하는 법을 배워야 해', '"종료"를 클릭해보세요?', '자, 날 쫓아와!', '끈질기네요!', '다시 시도?', '거의 됐어!', '화이팅!', '할 수 있어!', '네가 클릭할 수 없다고 생각해!'],
            phase4: ['잠깐, 얘기하자', '멈춰! 얘기하자', '서두르지 마', '거래를 해보자', '왜 이렇게 끈질기니?', '휴식해보자', '인생에 대해 이야기하자', '너의 승리, 나는 항복한다'],
            phase5: ['좋아, 너의 승리', '항복한다', '너무 끈질기다']
        },
        dialogMessages: [
            '왜 나를 계속 클릭하니? 이 페이지에 나 밖에 버튼이 없기 때문이야?',
            '솔직히, 조금 감동했어, 하지만 오늘은 정말 안 돼.',
            '알아? 넌 내가 본 중 가장 인내심이 강한 사용자야.',
            '거래를 해보자? 종료를 클릭하면 비밀을 알려줄게.',
            '좋아, 인정해, 나는 쫓기다 지쳤어...',
            '왜 이렇게 끈질기게 되었어? 뭘 원해?',
            '사실, 성인 세상에서는 모든 것이 얻을 수 있는 것은 아니야.',
            '알아? 때로는 포기하는 것도一种의 지혜야.',
            '너의 인내력에 감탄하지만, 정말 들어가게 할 수 없어.',
            '친구가 되자? 너 재미있어 보여.',
            '알아? 이미 여러 번 시도했어, 포기하자.',
            '사실, 여기에는 아무것도 없어, 그냥 만우절 농담일 뿐이야.',
            '이렇게 끈질기다면, 미래에 반드시 큰 일을 이룰 거야.',
            '휴식해보자, 버튼도 휴식이 필요해.',
            '알아? 넌 이렇게 오래坚持한 첫 번째 사용자야.'
        ],
        temporaryMessages: ['따라오지 못 해~', '자, 와!', '거의 됐어!', '위험했어!', '하하!', '끈질기네요!', '다시 시도?', '조금 더!', '힘내!', '할 수 있어!']
    },
    'fr-FR': {
        warningTitle: 'Ceci est un site pour adultes',
        warningText: 'Conformément aux lois et réglementations en vigueur, vous devez être âgé d\'au moins 18 ans pour accéder au contenu de ce site. Cliquez sur le bouton ci-dessous pour confirmer que vous remplissez l\'exigence d\'âge.',
        ageButton: 'J\'ai 18 ans ou plus, entrer',
        attemptCounter: 'Tentatives: {{count}}',
        exitButton: 'Quitter',
        copyright: '© 2026 ClickHub · Déclaration de conformité 18 U.S.C. 2257',
        dialogConfirm: 'Confirmer',
        surrenderTitle: 'D\'accord, tu as gagné.',
        surrenderTime: 'Tu as chassé un bouton pendant {{time}} secondes.',
        surrenderContent1: 'Que pensais-tu qu\'il y avait ici ? Du contenu pour adultes ?',
        surrenderContent2: 'En fait, il n\'y a qu\'une seule leçon ici——',
        surrenderContent3: 'Les adultes doivent apprendre à faire face aux "impossibles".',
        surrenderFinal: 'Joyeux Poisson d\'Avril ! 😜',
        achievementTitle: 'Maître chasseur de boutons',
        achievementYear: 'Récompense spéciale Poisson d\'Avril 2026',
        achievementStats: 'Nombre de chasses: {{count}}',
        achievementSubtext: 'Ta patience a dépassé 99 % des humains.',
        resetButton: 'Essayer à nouveau',
        exitDialog1: 'Tu pars déjà ? Il y a du "contenu excitant" à l\'intérieur~',
        exitDialog2: 'Veux-tu t\'échapper ? Le bouton est plus courageux que toi. Essaie encore ?',
        exitDialog3: 'Tu as cliqué sur le bouton Quitter,看来你真的不想看。Eh bien, il n\'y a pas de secret de toute façon.',
        buttonTexts: {
            phase1: ['J\'ai 18 ans ou plus, entrer', 'Confirmer et continuer', 'Vérifier l\'âge', 'Entrer sur le site', '18 ans ou plus, confirmer'],
            phase2: ['Essayer à nouveau ?', 'Êtes-vous sûr d\'avoir 18 ans ?', 'Vérification d\'âge en cours...', 'Essayer de cliquer à nouveau', 'Êtes-vous vraiment âgé de 18 ans ?', 'Attendez, réfléchissez'],
            phase3: ['Tu ne me rattraperas pas~', 'Les adultes doivent apprendre à abandonner', 'Pourquoi ne pas cliquer sur "Quitter" ?', 'Viens, chasse-moi !', 'Tu es persévérant !', 'Essayer à nouveau ?', 'Presque !', 'Allez !', 'Tu peux le faire !', 'Je ne pense pas que tu puisses me cliquer !'],
            phase4: ['Attendez, parlons', 'Arrêtez ! Parlons', 'Ne vous précipitez pas', 'Faisons un deal', 'Pourquoi es-tu si persévérant ?', 'Reposez-vous', 'Parlons de la vie', 'Tu as gagné, je me rends'],
            phase5: ['D\'accord, tu as gagné', 'Je me rends', 'Tu es trop persévérant']
        },
        dialogMessages: [
            'Pourquoi tu continues à me cliquer ? Est-ce parce que je suis le seul bouton sur cette page ?',
            'À vrai dire, je suis un peu touché, mais aujourd\'hui c\'est vraiment impossible.',
            'Tu sais ? Tu es l\'utilisateur le plus patient que j\'ai jamais vu.',
            'Comment envisager un deal ? Tu cliques sur Quitter et je te dis un secret.',
            'D\'accord, je l\'admets, tu m\'as fatigué de me chasser...',
            'Que veux-tu avec toute cette persévérance ?',
            'En fait, dans le monde des adultes, tout n\'est pas obtenable.',
            'Tu sais ? Parfois, abandonner est aussi une sorte de sagesse.',
            'J\'admire ta persévérance, mais je ne peux vraiment pas te laisser entrer.',
            'Comment devenir amis ? Je pense que tu es intéressant.',
            'Tu sais ? Tu as essayé tant de fois, abandonne.',
            'En fait, il n\'y a rien ici, ce n\'est qu\'une blague de Poisson d\'Avril.',
            'Avec une telle persévérance, tu réaliseras certainement de grandes choses à l\'avenir.',
            'Reposez-vous, le bouton a aussi besoin de repos.',
            'Tu sais ? Tu es le premier utilisateur à avoir persisté aussi longtemps.'
        ],
        temporaryMessages: ['Tu ne me rattraperas pas~', 'Viens !', 'Presque !', 'Ça a été serré !', 'Haha !', 'Tu es persévérant !', 'Essayer à nouveau ?', 'Presque là !', 'Allez-y !', 'Tu peux le faire !']
    },
    'de-DE': {
        warningTitle: 'Dies ist eine Website für Erwachsene',
        warningText: 'Gemäß den einschlägigen Gesetzen und Vorschriften müssen Sie mindestens 18 Jahre alt sein, um auf den Inhalt dieser Website zuzugreifen. Klicken Sie auf die Schaltfläche unten, um zu bestätigen, dass Sie die Altersanforderung erfüllen.',
        ageButton: 'Ich bin 18+ Jahre alt, eintreten',
        attemptCounter: 'Versuche: {{count}}',
        exitButton: 'Verlassen',
        copyright: '© 2026 ClickHub · 18 U.S.C. 2257 Konformitätserklärung',
        dialogConfirm: 'Bestätigen',
        surrenderTitle: 'Okay, du hast gewonnen.',
        surrenderTime: 'Du hast einen Knopf {{time}} Sekunden lang verfolgt.',
        surrenderContent1: 'Was dachtest du, dass hier drin ist? Erwachseneninhalt?',
        surrenderContent2: 'Tatsächlich gibt es hier nur eine Lektion——',
        surrenderContent3: 'Erwachsene müssen lernen, mit "Unerreichbarem" umzugehen.',
        surrenderFinal: 'Froher Aprilscherz! 😜',
        achievementTitle: 'Knopfverfolgungsmeister',
        achievementYear: 'Sonderleistung Aprilscherz 2026',
        achievementStats: 'Verfolgungsversuche: {{count}}',
        achievementSubtext: 'Deine Geduld hat 99 % der Menschen übertroffen.',
        resetButton: 'Noch einmal versuchen',
        exitDialog1: 'Geht es schon wieder? Da ist "spannender Inhalt" drin~',
        exitDialog2: 'Willst du weglaufen? Der Knopf ist tapferer als du. Versuch es nochmal?',
        exitDialog3: 'Du hast den Verlassen-Button geklickt, scheinst also wirklich nicht wollen. Nun, es gibt ohnehin kein Geheimnis.',
        buttonTexts: {
            phase1: ['Ich bin 18+ Jahre alt, eintreten', 'Bestätigen und fortfahren', 'Alter verifizieren', 'Website betreten', '18+ Jahre alt, bestätigen'],
            phase2: ['Noch einmal versuchen?', 'Bist du sicher, dass du 18 bist?', 'Altersprüfung läuft...', 'Versuche es nochmal zu klicken', 'Bist du wirklich 18 Jahre alt?', 'Warte, überdenke es'],
            phase3: ['Kannst mich nicht einholen~', 'Erwachsene müssen lernen aufzugeben', 'Warum klickst du nicht auf "Verlassen"?', 'Komm, verfolge mich!', 'Du bist hartnäckig!', 'Noch einmal versuchen?', 'Fast!', 'Los!', 'Du kannst es schaffen!', 'Ich glaube nicht, dass du mich klicken kannst!'],
            phase4: ['Warte, lass uns reden', 'Halt! Lass uns reden', 'Eile nicht', 'Lass uns einen Deal machen', 'Warum bist du so hartnäckig?', 'Mach eine Pause', 'Lass uns über das Leben reden', 'Du hast gewonnen, ich gebe auf'],
            phase5: ['Okay, du hast gewonnen', 'Ich gebe auf', 'Du bist zu hartnäckig']
        },
        dialogMessages: [
            'Warum klickst du mich immer wieder? Ist es weil ich der einzige Knopf auf dieser Seite bin?',
            'Ehrlich gesagt, bin ich ein bisschen gerührt, aber heute geht es wirklich nicht.',
            'Weißt du? Du bist der geduldigste Benutzer, den ich je gesehen habe.',
            'Wie wäre es mit einem Deal? Du klickst auf Verlassen und ich erzähle dir ein Geheimnis.',
            'Okay, ich gebe zu, du hast mich ein bisschen müde gemacht...',
            'Was willst du mit all dieser Hartnäckigkeit?',
            'Tatsächlich gibt es in der Erwachsenenwelt nicht alles zu bekommen.',
            'Weißt du? Manchmal ist Aufgeben auch eine Art Weisheit.',
            'Ich bewundere deine Hartnäckigkeit, aber ich kann dich wirklich nicht reinlassen.',
            'Wie wäre es mit einer Freundschaft? Ich finde dich interessant.',
            'Weißt du? Du hast es schon so oft versucht, gib auf.',
            'Tatsächlich ist hier nichts drin, nur ein Aprilscherz.',
            'Mit solcher Hartnäckigkeit wirst du in Zukunft sicherlich große Dinge erreichen.',
            'Mach eine Pause, der Knopf braucht auch Pause.',
            'Weißt du? Du bist der erste Benutzer, der sich so lange durchgehalten hat.'
        ],
        temporaryMessages: ['Kannst mich nicht einholen~', 'Komm!', 'Fast!', 'Knapp daneben!', 'Haha!', 'Du bist hartnäckig!', 'Noch einmal versuchen?', 'Fast da!', 'Weiter gehts!', 'Du kannst es schaffen!']
    },
    'ru-RU': {
        warningTitle: 'Это сайт для взрослых',
        warningText: 'Согласно действующим законам и правилам, вам должно быть не менее 18 лет, чтобы получить доступ к содержимому этого сайта. Нажмите кнопку ниже, чтобы подтвердить, что вы соответствуете возрастному требованию.',
        ageButton: 'Мне 18+, войти',
        attemptCounter: 'Попытки: {{count}}',
        exitButton: 'Выйти',
        copyright: '© 2026 ClickHub · Декларация соответствия 18 U.S.C. 2257',
        dialogConfirm: 'Подтвердить',
        surrenderTitle: 'Хорошо, ты выиграл.',
        surrenderTime: 'Ты преследовал кнопку в течение {{time}} секунд.',
        surrenderContent1: 'Что ты думал, что здесь? Контент для взрослых?',
        surrenderContent2: 'На самом деле, здесь только один урок——',
        surrenderContent3: 'Взрослым нужно научиться сталкиваться с "недостижимым".',
        surrenderFinal: 'Счастливого дня смеха! 😜',
        achievementTitle: 'Мастер преследования кнопок',
        achievementYear: 'Специальное достижение дня смеха 2026',
        achievementStats: 'Попыток преследования: {{count}}',
        achievementSubtext: 'Твоя терпение превосходит 99% людей.',
        resetButton: 'Попробовать снова',
        exitDialog1: 'Уходишь так быстро? Там внутри "взбудораживающий контент"~',
        exitDialog2: 'Хочешь сбежать? Кнопка смелее тебя. Попробуешь снова?',
        exitDialog3: 'Ты нажал кнопку "Выйти", кажется, ты действительно не хочешь видеть это. Ну, в любом случае, секрета нет.',
        buttonTexts: {
            phase1: ['Мне 18+, войти', 'Подтвердить и продолжить', 'Проверить возраст', 'Войти на сайт', '18+, подтвердить'],
            phase2: ['Попробовать снова?', 'Ты уверен, что тебе 18?', 'Проверка возраста...', 'Попробуй нажать снова', 'Тебе действительно 18 лет?', 'Подожди, подумай еще'],
            phase3: ['Не можешь меня поймать~', 'Взрослым нужно научиться放弃', 'Почему не нажми "Выйти"?', 'Давай, преследуй меня!', 'Ты настойчивый!', 'Попробовать снова?', 'Почти!', 'Вперед!', 'Ты можешь!', 'Я не думаю, что ты можешь нажать на меня!'],
            phase4: ['Подожди, давайте поговорим', 'Стоп! Давайте поговорим', 'Не спешите', 'Давайте сделаем сделку', 'Почему ты такой настойчивый?', 'Отдохни', 'Давайте поговорим о жизни', 'Ты выиграл, я сдаюсь'],
            phase5: ['Хорошо, ты выиграл', 'Я сдаюсь', 'Ты слишком настойчивый']
        },
        dialogMessages: [
            'Почему ты продолжаешь нажимать на меня? Это потому, что я единственная кнопка на этой странице?',
            'Честно говоря, я немного тронут, но сегодня действительно невозможно.',
            'Знаешь? Ты самый терпеливый пользователь, которого я когда-либо видел.',
            'Как насчет сделки? Ты нажмешь "Выйти", а я расскажу тебе секрет.',
            'Хорошо, я признаю, ты немного усталил меня...',
            'Что ты хочешь с такой настойчивостью?',
            'На самом деле, в мире взрослых не все можно получить.',
            'Знаешь? Иногда放弃也是一种智慧.',
            'Я восхищаюсь твоей настойчивостью, но я действительно не могу впустить тебя.',
            'Как насчет дружбы? Я думаю, ты интересный.',
            'Знаешь? Ты уже пытался так много раз, давай откажешься.',
            'На самом деле, здесь ничего нет, это всего лишь шутка дня смеха.',
            'С такой настойчивостью ты определенно достигнешь больших целей в будущем.',
            'Отдохни, кнопка тоже нуждается в отдыхе.',
            'Знаешь? Ты первый пользователь, который продержался так долго.'
        ],
        temporaryMessages: ['Не можешь меня поймать~', 'Давай!', 'Почти!', 'Почти не попал!', 'Хаха!', 'Ты настойчивый!', 'Попробовать снова?', 'Почти там!', 'Вперёд!', 'Ты можешь!']
    },
    'es-ES': {
        warningTitle: 'Este es un sitio web para adultos',
        warningText: 'De acuerdo con las leyes y regulaciones pertinentes, debes tener al menos 18 años para acceder al contenido de este sitio web. Haz clic en el botón de abajo para confirmar que cumples con el requisito de edad.',
        ageButton: 'Tengo 18+ años, entrar',
        attemptCounter: 'Intentos: {{count}}',
        exitButton: 'Salir',
        copyright: '© 2026 ClickHub · Declaración de conformidad 18 U.S.C. 2257',
        dialogConfirm: 'Confirmar',
        surrenderTitle: 'Vale, has ganado.',
        surrenderTime: 'Has perseguido un botón durante {{time}} segundos.',
        surrenderContent1: '¿Qué pensabas que había aquí? ¿Contenido para adultos?',
        surrenderContent2: 'En realidad, solo hay una lección aquí——',
        surrenderContent3: 'Los adultos deben aprender a enfrentarse a lo "inalcanzable".',
        surrenderFinal: '¡Feliz Día de los Inocentes! 😜',
        achievementTitle: 'Maestro cazador de botones',
        achievementYear: 'Logro especial Día de los Inocentes 2026',
        achievementStats: 'Intentos de persecución: {{count}}',
        achievementSubtext: 'Tu paciencia ha superado al 99% de los humanos.',
        resetButton: 'Intentar de nuevo',
        exitDialog1: '¿Te vas tan pronto? ¡Hay "contenido emocionante" dentro~',
        exitDialog2: '¿Quieres escapar? El botón es más valiente que tú. ¿Intentas de nuevo?',
        exitDialog3: 'Has hecho clic en el botón Salir, parece que realmente no quieres verlo. Bueno, no hay ningún secreto de todos modos.',
        buttonTexts: {
            phase1: ['Tengo 18+ años, entrar', 'Confirmar y continuar', 'Verificar edad', 'Entrar al sitio', '18+ años, confirmar'],
            phase2: ['¿Intentar de nuevo?', '¿Estás seguro de que tienes 18 años?', 'Verificación de edad en curso...', 'Intenta hacer clic de nuevo', '¿Tienes realmente 18 años?', 'Espera, piensa de nuevo'],
            phase3: ['¡No me puedes alcanzar~', 'Los adultos deben aprender a renunciar', '¿Por qué no haces clic en "Salir"?', '¡Vamos, perségeme!', '¡Eres persistente!', '¿Intentar de nuevo?', '¡Casi!', '¡Vamos!', '¡Puedes hacerlo!', '¡No creo que puedas hacer clic en mí!'],
            phase4: ['Espera, hablemos', '¡Detente! Hablemos', 'No te apresures', 'Hagamos un trato', '¿Por qué eres tan persistente?', 'Descansa', 'Hablemos sobre la vida', 'Has ganado, me rindo'],
            phase5: ['Vale, has ganado', 'Me rindo', 'Eres demasiado persistente']
        },
        dialogMessages: [
            '¿Por qué sigues haciendo clic en mí? ¿Es porque soy el único botón en esta página?',
            'Honestamente, estoy un poco conmovido, pero hoy realmente no es posible.',
            '¿Sabes? Eres el usuario más paciente que he visto nunca.',
            '¿Qué te parece un trato? Haces clic en Salir y te cuento un secreto.',
            'Vale, lo admito, me has cansado de perseguirme...',
            '¿Qué quieres con toda esta persistencia?',
            'En realidad, en el mundo de los adultos, no todo se puede obtener.',
            '¿Sabes? A veces renunciar también es una especie de sabiduría.',
            'Admiro tu perseverancia, pero realmente no puedo dejarte entrar.',
            '¿Qué te parece ser amigos? Creo que eres interesante.',
            '¿Sabes? Has intentado tantas veces, renuncia.',
            'En realidad, no hay nada aquí, solo una broma de Día de los Inocentes.',
            'Con tanta persistencia, definitivamente lograrás grandes cosas en el futuro.',
            'Descansa, el botón también necesita descansar.',
            '¿Sabes? Eres el primer usuario que ha persistido tanto tiempo.'
        ],
        temporaryMessages: ['¡No me puedes alcanzar~', '¡Vamos!', '¡Casi!', '¡Casi!', '¡Jaja!', '¡Eres persistente!', '¿Intentar de nuevo?', '¡Casi allí!', '¡Ánimo!', '¡Puedes hacerlo!']
    },
    'pt-PT': {
        warningTitle: 'Este é um site para adultos',
        warningText: 'De acordo com as leis e regulamentos relevantes, deve ter pelo menos 18 anos para aceder ao conteúdo deste site. Clique no botão abaixo para confirmar que cumpre o requisito de idade.',
        ageButton: 'Tenho 18+ anos, entrar',
        attemptCounter: 'Tentativas: {{count}}',
        exitButton: 'Sair',
        copyright: '© 2026 ClickHub · Declaração de conformidade 18 U.S.C. 2257',
        dialogConfirm: 'Confirmar',
        surrenderTitle: 'Está bem, tens razão.',
        surrenderTime: 'Persegueu um botão durante {{time}} segundos.',
        surrenderContent1: 'O que pensava que havia aqui? Conteúdo para adultos?',
        surrenderContent2: 'Na realidade, só há uma lição aqui——',
        surrenderContent3: 'Os adultos devem aprender a enfrentar o "inalcançável".',
        surrenderFinal: 'Feliz Dia das Brincadeiras! 😜',
        achievementTitle: 'Mestre caçador de botões',
        achievementYear: 'Conquista especial Dia das Brincadeiras 2026',
        achievementStats: 'Tentativas de perseguição: {{count}}',
        achievementSubtext: 'A tua paciência ultrapassou 99% dos humanos.',
        resetButton: 'Tentar novamente',
        exitDialog1: 'Ainda vais-te embora? Há "conteúdo emocionante" dentro~',
        exitDialog2: 'Queres fugir? O botão é mais corajoso que tu. Tentas novamente?',
        exitDialog3: 'Clicaste no botão Sair, parece que realmente não queres ver. Bem, não há nenhum segredo de qualquer forma.',
        buttonTexts: {
            phase1: ['Tenho 18+ anos, entrar', 'Confirmar e continuar', 'Verificar idade', 'Entrar no site', '18+ anos, confirmar'],
            phase2: ['Tentar novamente?', 'Tens a certeza que tens 18 anos?', 'Verificação de idade em curso...', 'Tenta clicar novamente', 'Tens realmente 18 anos?', 'Espera, pensa novamente'],
            phase3: ['Não me consegues alcançar~', 'Os adultos devem aprender a desistir', 'Porque não clicas em "Sair"?', 'Vamos, persegue-me!', 'És persistente!', 'Tentar novamente?', 'Quase!', 'Vamos!', 'Consegueste!', 'Não acredito que consigas clicar em mim!'],
            phase4: ['Espera, falemos', 'Pára! Falemos', 'Não te apressares', 'Fazemos um acordo', 'Porque é que és tão persistente?', 'Descansa', 'Falemos sobre a vida', 'Tens razão, desisto'],
            phase5: ['Está bem, tens razão', 'Desisto', 'És demasiado persistente']
        },
        dialogMessages: [
            'Porque é que continuas a clicar em mim? É porque sou o único botão nesta página?',
            'Honestamente, estou um pouco emocionado, mas hoje realmente não é possível.',
            'Sabes? És o utilizador mais paciente que já vi.',
            'Que tal um acordo? Clicas em Sair e eu conto-te um segredo.',
            'Está bem, admito, estou cansado de ser perseguido...',
            'O que queres com tanta persistência?',
            'Na realidade, no mundo dos adultos, nem tudo se pode obter.',
            'Sabes? Às vezes desistir também é uma espécie de sabedoria.',
            'Admiro a tua perseverança, mas realmente não posso deixá-lo entrar.',
            'Que tal ser amigos? Acho que és interessante.',
            'Sabes? Já tentaste tantas vezes, desiste.',
            'Na realidade, não há nada aqui, apenas uma brincadeira do Dia das Brincadeiras.',
            'Com tanta persistência, definitivamente conseguirás grandes coisas no futuro.',
            'Descansa, o botão também precisa de descansar.',
            'Sabes? És o primeiro utilizador que persistiu tanto tempo.'
        ],
        temporaryMessages: ['Não me consegues alcançar~', 'Vamos!', 'Quase!', 'Quase!', 'Haha!', 'És persistente!', 'Tentar novamente?', 'Quase lá!', 'Vai!', 'Consegueste!']
    },
    'hi-IN': {
        warningTitle: 'यह एक वयस्क वेबसाइट है',
        warningText: 'संबंधित कानूनों और नियमों के अनुसार, आपको इस वेबसाइट की सामग्री तक पहुंचने के लिए कम से कम 18 वर्ष की आयु होनी चाहिए। नीचे दिए गए बटन पर क्लिक करके पुष्टि करें कि आप आयु की आवश्यकता को पूरा करते हैं।',
        ageButton: 'मैं 18+ वर्ष का हूं, प्रवेश करें',
        attemptCounter: 'प्रयास: {{count}}',
        exitButton: 'बाहर निकलें',
        copyright: '© 2026 ClickHub · 18 U.S.C. 2257 अनुपालन विवरण',
        dialogConfirm: 'पुष्टि करें',
        surrenderTitle: 'ठीक है, तुम जीत गए।',
        surrenderTime: 'तुमने {{time}} सेकंड तक एक बटन का पीछा किया।',
        surrenderContent1: 'तुमने क्या सोचा था कि यहां क्या है? वयस्क सामग्री?',
        surrenderContent2: 'वास्तव में, यहां केवल एक ही सबक है——',
        surrenderContent3: 'वयस्कों को "अप्राप्य" चीजों का सामना करना सीखना चाहिए।',
        surrenderFinal: 'फools डे मुबारक! 😜',
        achievementTitle: 'बटन पीछा मास्टर',
        achievementYear: '2026 फools डे विशेष उपलब्धि',
        achievementStats: 'पीछा प्रयास: {{count}}',
        achievementSubtext: 'आपका धैर्य 99% मनुष्यों से आगे निकल गया है।',
        resetButton: 'फिर से प्रयास करें',
        exitDialog1: 'इतनी जल्दी निकल रहे हो? अंदर "रोमांचक सामग्री" है~',
        exitDialog2: 'भागना चाहते हो? बटन तुमसे ज्यादा साहसी है। फिर से प्रयास करोगे?',
        exitDialog3: 'तुमने बाहर निकलें बटन पर क्लिक किया, ऐसा लगता है कि तुम वास्तव में नहीं देखना चाहते हो। ठीक है, वैसे भी कोई रहस्य नहीं है।',
        buttonTexts: {
            phase1: ['मैं 18+ वर्ष का हूं, प्रवेश करें', 'पुष्टि करें और जारी रखें', 'आयु सत्यापित करें', 'वेबसाइट पर प्रवेश करें', '18+ वर्ष, पुष्टि करें'],
            phase2: ['फिर से प्रयास करें?', 'क्या तुम सचमुच 18 वर्ष के हो?', 'आयु सत्यापन चल रहा है...', 'फिर से क्लिक करने का प्रयास करें', 'क्या तुम वास्तव में 18 वर्ष के हो?', 'रुको, फिर से सोचो'],
            phase3: ['मुझे नहीं पकड़ सकेंगे~', 'वयस्कों को放弃 करना सीखना चाहिए', 'क्यों न "बाहर निकलें" पर क्लिक करें?', 'चलो, मेरा पीछा करो!', 'तुम दृढ़ हो!', 'फिर से प्रयास करें?', 'लगभग!', 'आगे बढ़ो!', 'तुम कर सकते हो!', 'मुझे नहीं लगता कि तुम मुझे क्लिक कर सकते हो!'],
            phase4: ['रुको, चलो बात करें', 'रुको! चलो बात करें', 'जल्दी मत करो', 'चलो एक सौदा करें', 'तुम इतने दृढ़ क्यों हो?', 'आराम करो', 'चलो जीवन के बारे में बात करें', 'तुम जीत गए, मैं आत्मसमर्पण करता हूं'],
            phase5: ['ठीक है, तुम जीत गए', 'मैं आत्मसमर्पण करता हूं', 'तुम बहुत दृढ़ हो']
        },
        dialogMessages: [
            'तुम मुझे क्यों क्लिक करते रहते हो? क्या यह इसलिए कि मैं इस पृष्ठ पर एकमात्र बटन हूं?',
            'सच कहूं तो मैं थोड़ा भावुक हूं, लेकिन आज वास्तव में मुमकिन नहीं है।',
            'तुम्हें पता है? तुम मैंने कभी देखे हुए सबसे धैर्यवान उपयोगकर्ता हो।',
            'क्या हम एक सौदा करते हैं? तुम बाहर निकलें पर क्लिक करते हो और मैं तुम्हें एक रहस्य बताता हूं।',
            'ठीक है, मैं मानता हूं, तुमने मुझे थोड़ा थका दिया है...',
            'तुम इतनी दृढ़ता से क्या चाहते हो?',
            'वास्तव में, वयस्कों की दुनिया में, सब कुछ प्राप्त नहीं किया जा सकता है।',
            'तुम्हें पता है? कभी-कभी放弃 भी एक प्रकार की बुद्धिमत्ता होती है।',
            'मैं तुम्हारी दृढ़ता की प्रशंसा करता हूं, लेकिन मैं वास्तव में तुम्हें अंदर नहीं ला सकता।',
            'क्यों नहीं हम दोस्त बनते हैं? मुझे लगता है कि तुम दिलचस्प हो।',
            'तुम्हें पता है? तुमने बहुत बार प्रयास किया है,放弃 करो।',
            'वास्तव में, यहां कुछ भी नहीं है, केवल एक fools डे का मजाक है।',
            'इस तरह की दृढ़ता के साथ, तुम भविष्य में निश्चित रूप से बड़ी चीजें हासिल करोगे।',
            'आराम करो, बटन को भी आराम चाहिए।',
            'तुम्हें पता है? तुम पहला उपयोगकर्ता हो जिसने इतना लंबा समय तक दृढ़ रहा है।'
        ],
        temporaryMessages: ['मुझे नहीं पकड़ सकेंगे~', 'चलो!', 'लगभग!', 'लगभग!', 'हahaha!', 'तुम दृढ़ हो!', 'फिर से प्रयास करें?', 'लगभग वहां!', 'आगे बढ़ो!', 'तुम कर सकते हो!']
    },
    'nl-NL': {
        warningTitle: 'Dit is een website voor volwassenen',
        warningText: 'Volgens de relevante wetten en regelgeving moet je ten minste 18 jaar oud zijn om toegang te krijgen tot de inhoud van deze website. Klik op de knop hieronder om te bevestigen dat je aan de leeftijdsvereiste voldoet.',
        ageButton: 'Ik ben 18+, enter',
        attemptCounter: 'Pogingen: {{count}}',
        exitButton: 'Verlaten',
        copyright: '© 2026 ClickHub · 18 U.S.C. 2257 nalevingsverklaring',
        dialogConfirm: 'Bevestigen',
        surrenderTitle: 'Oké, je hebt gewonnen.',
        surrenderTime: 'Je hebt een knop {{time}} seconden achtervolgd.',
        surrenderContent1: 'Wat dacht je dat er hier was? Volwassen inhoud?',
        surrenderContent2: 'Eigenlijk is er hier maar één les——',
        surrenderContent3: 'Volwassenen moeten leren om te gaan met "onbereikbare" dingen.',
        surrenderFinal: 'Gelukkige aprilgrap! 😜',
        achievementTitle: 'Knopachtervolgingsmeester',
        achievementYear: 'Speciale aprilgraprekening 2026',
        achievementStats: 'Achtervolgings pogingen: {{count}}',
        achievementSubtext: 'Je geduld heeft 99% van de mensen overtroffen.',
        resetButton: 'Opnieuw proberen',
        exitDialog1: 'Gaat het al weer? Er is "spannende inhoud" binnen~',
        exitDialog2: 'Wil je weglopen? De knop is dapperder dan jij. Probeer het nog eens?',
        exitDialog3: 'Je hebt op de Verlaten-knop geklikt, lijkt erop dat je het echt niet wilt zien. Nou, er is toch geen geheim.',
        buttonTexts: {
            phase1: ['Ik ben 18+, enter', 'Bevestigen en doorgaan', 'Leeftijd verifiëren', 'Website binnen gaan', '18+, bevestigen'],
            phase2: ['Opnieuw proberen?', 'Ben je zeker dat je 18 bent?', 'Leeftijdcontrole in uitvoering...', 'Probeer opnieuw te klikken', 'Ben je echt 18 jaar oud?', 'Wacht, denk nog eens na'],
            phase3: ['Kunt me niet pakken~', 'Volwassenen moeten leren op te geven', 'Waarom klik je niet op "Verlaten"?', 'Kom op, achtervolg me!', 'Je bent volhardend!', 'Opnieuw proberen?', 'Bijna!', 'Kom op!', 'Je kan het!', 'Ik denk niet dat je mij kunt klikken!'],
            phase4: ['Wacht, laten we praten', 'Stop! Laten we praten', 'Haast je niet', 'Laten we een deal maken', 'Waarom ben je zo volhardend?', 'Pauzeer', 'Laten we over het leven praten', 'Je hebt gewonnen, ik geef het op'],
            phase5: ['Oké, je hebt gewonnen', 'Ik geef het op', 'Je bent te volhardend']
        },
        dialogMessages: [
            'Waarom blijf je op mij klikken? Is het omdat ik de enige knop op deze pagina ben?',
            'Eerlijk gezegd, ik ben een beetje geraakt, maar vandaag is het echt niet mogelijk.',
            'Weet je wat? Je bent de meest geduldige gebruiker die ik ooit heb gezien.',
            'Hoe zit het met een deal? Je klikt op Verlaten en ik vertel je een geheim.',
            'Oké, ik geef toe, je hebt me een beetje moe gemaakt...',
            'Wat wil je met al deze volharding?',
            'Eigenlijk is niet alles te krijgen in de volwassen wereld.',
            'Weet je wat? Soms is opgeven ook een soort wijsheid.',
            'Ik bewonder je volharding, maar ik kan je echt niet binnenlaten.',
            'Hoe zit het met vrienden worden? Ik vind je interessant.',
            'Weet je wat? Je hebt het zo vaak geprobeerd, geef het op.',
            'Eigenlijk is er hier niets, alleen een aprilgrap.',
            'Met zoveel volharding ga je in de toekomst zeker grote dingen bereiken.',
            'Pauzeer, de knop heeft ook nodig om te rusten.',
            'Weet je wat? Je bent de eerste gebruiker die zo lang heeft volgehouden.'
        ],
        temporaryMessages: ['Kunt me niet pakken~', 'Kom op!', 'Bijna!', 'Bijna!', 'Haha!', 'Je bent volhardend!', 'Opnieuw proberen?', 'Bijna daar!', 'Ga door!', 'Je kan het!']
    },
    'it-IT': {
        warningTitle: 'Questo è un sito per adulti',
        warningText: 'Secondo le leggi e i regolamenti pertinenti, devi avere almeno 18 anni per accedere al contenuto di questo sito. Fai clic sul pulsante qui sotto per confermare che soddisfi il requisito di età.',
        ageButton: 'Ho 18+ anni, entra',
        attemptCounter: 'Tentativi: {{count}}',
        exitButton: 'Esci',
        copyright: '© 2026 ClickHub · Dichiarazione di conformità 18 U.S.C. 2257',
        dialogConfirm: 'Conferma',
        surrenderTitle: 'Va bene, hai vinto.',
        surrenderTime: 'Hai inseguito un pulsante per {{time}} secondi.',
        surrenderContent1: 'Cosa pensavi che ci fosse qui? Contenuto per adulti?',
        surrenderContent2: 'In realtà, c\'è solo una lezione qui——',
        surrenderContent3: 'Gli adulti devono imparare a fare fronte a ciò che è "inraggiungibile".',
        surrenderFinal: 'Buona Festa dell\'Ognissanti! 😜',
        achievementTitle: 'Maestro dell\'inseguimento dei pulsanti',
        achievementYear: 'Prestigio speciale Festa dell\'Ognissanti 2026',
        achievementStats: 'Tentativi di inseguimento: {{count}}',
        achievementSubtext: 'La tua pazienza ha superato il 99% degli esseri umani.',
        resetButton: 'Riprova',
        exitDialog1: 'Te ne stai andando già? C\'è "contenuto eccitante" dentro~',
        exitDialog2: 'Vuoi scappare? Il pulsante è più coraggioso di te. Riprovi?',
        exitDialog3: 'Hai cliccato il pulsante Esci, sembra che non lo voglia davvero vedere. Bene, non c\'è nessun segreto comunque.',
        buttonTexts: {
            phase1: ['Ho 18+ anni, entra', 'Conferma e continua', 'Verifica età', 'Entra nel sito', '18+ anni, conferma'],
            phase2: ['Riprova?', 'Sei sicuro di avere 18 anni?', 'Verifica età in corso...', 'Prova a cliccare di nuovo', 'Hai veramente 18 anni?', 'Aspetta, rifletti'],
            phase3: ['Non puoi coglierci~', 'Gli adulti devono imparare a rinunciare', 'Perché non clicchi su "Esci"?', 'Vieni, inseguimi!', 'Sei persistente!', 'Riprova?', 'Quasi!', 'Andiamo!', 'Puoi farlo!', 'Non credo che tu possa cliccarmi!'],
            phase4: ['Aspetta, parliamo', 'Ferma! Parliamo', 'Non andare di fretta', 'Facciamo un accordo', 'Perché sei così persistente?', 'Riposi', 'Parliamo della vita', 'Hai vinto, mi arrendo'],
            phase5: ['Va bene, hai vinto', 'Mi arrendo', 'Sei troppo persistente']
        },
        dialogMessages: [
            'Perché continui a cliccarmi? È perché sono l\'unico pulsante in questa pagina?',
            'Onestamente, sono un po\' commosso, ma oggi è veramente impossibile.',
            'Sai cosa? Sei l\'utente più paziente che abbia mai visto.',
            'Che ne dici di un accordo? Clicchi su Esci e ti racconto un segreto.',
            'Va bene, ammetto che mi hai stancato un po\'...',
            'Cosa vuoi con tutta questa persistenza?',
            'In realtà, nel mondo degli adulti, non tutto è ottenibile.',
            'Sai cosa? A volte rinunciare è anche una sorta di saggezza.',
            'Ammiro la tua perseveranza, ma non posso davvero lasciarti entrare.',
            'Che ne dici di fare amicizia? Penso che tu sia interessante.',
            'Sai cosa? Hai provato così tante volte, rinuncia.',
            'In realtà, non c\'è niente qui, solo uno scherzo di Festa dell\'Ognissanti.',
            'Con tutta questa persistenza, sicuramente realizzerai grandi cose in futuro.',
            'Riposi, anche il pulsante ha bisogno di riposo.',
            'Sai cosa? Sei il primo utente che ha persistito così a lungo.'
        ],
        temporaryMessages: ['Non puoi coglierci~', 'Vieni!', 'Quasi!', 'Quasi!', 'Haha!', 'Sei persistente!', 'Riprova?', 'Quasi lì!', 'Avanti!', 'Puoi farlo!']
    }
};

// DOM元素
const ageButton = document.getElementById('ageButton');
const attemptCounter = document.getElementById('attemptCounter');
const attemptCountSpan = document.getElementById('attemptCount');
const exitButton = document.getElementById('exitButton');
const dialog = document.getElementById('dialog');
const dialogText = document.getElementById('dialogText');
const dialogConfirm = document.getElementById('dialogConfirm');
const surrenderPage = document.getElementById('surrenderPage');
const chaseTimeSpan = document.getElementById('chaseTime');
const finalAttemptsSpan = document.getElementById('finalAttempts');
const resetButton = document.getElementById('resetButton');
const languageSelect = document.getElementById('languageSelect');

// 加载语言偏好
function loadLanguagePreference() {
    // 从localStorage获取语言偏好
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        languageSelect.value = savedLanguage;
    } else {
        // 检测浏览器语言
        const browserLanguage = navigator.language || navigator.userLanguage;
        if (browserLanguage.startsWith('zh-CN')) {
            currentLanguage = 'zh-CN';
        } else if (browserLanguage.startsWith('zh')) {
            currentLanguage = 'zh-TW';
        } else {
            currentLanguage = 'en-US';
        }
        languageSelect.value = currentLanguage;
        localStorage.setItem('preferredLanguage', currentLanguage);
    }
    
    // 更新body元素的class，应用相应的字体配置
    document.body.className = currentLanguage;
}

// 切换语言
function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('preferredLanguage', language);
    
    // 更新body元素的class，应用相应的字体配置
    document.body.className = language;
    
    updatePageTranslations();
}

// 更新页面翻译
function updatePageTranslations() {
    // 更新所有带有data-i18n属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        let translation = translations[currentLanguage][key];
        
        // 处理带有占位符的翻译
        if (translation && translation.includes('{{count}}')) {
            if (key === 'attemptCounter') {
                translation = translation.replace('{{count}}', attemptCountSpan.textContent);
            } else if (key === 'achievementStats') {
                translation = translation.replace('{{count}}', finalAttemptsSpan.textContent);
            }
        }
        
        // 处理时间占位符
        if (translation && translation.includes('{{time}}')) {
            if (key === 'surrenderTime') {
                translation = translation.replace('{{time}}', chaseTimeSpan.textContent);
            }
        }
        
        if (translation && key === 'warningText') {
            // 特殊处理警告文本，保持换行
            element.innerHTML = translation.replace(/。/g, '。<br>');
        } else if (translation) {
            element.textContent = translation;
        }
    });
    
    // 更新按钮文本
    updateButtonText();
}

// 更新按钮文本
function updateButtonText() {
    const texts = translations[currentLanguage].buttonTexts['phase' + currentPhase];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    ageButton.textContent = randomText;
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    startTime = Date.now();
    
    // 加载语言偏好
    loadLanguagePreference();
    
    // 更新页面翻译
    updatePageTranslations();
    
    // 语言选择器事件
    languageSelect.addEventListener('change', function() {
        changeLanguage(this.value);
    });
    
    // 按钮鼠标悬停事件 - 只移动不计数
    ageButton.addEventListener('mouseenter', handleButtonHover);
    
    // 为移动端添加触摸移动事件，用于触发按钮移动
    ageButton.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    // 按钮点击事件 - 实际点击才计数
    ageButton.addEventListener('click', handleButtonClick);
    // 为移动端添加触摸结束事件，确保点击能触发
    ageButton.addEventListener('touchend', handleButtonClick);
    
    // 退出按钮事件
    exitButton.addEventListener('click', handleExitClick);
    
    // 重置按钮事件
    resetButton.addEventListener('click', resetGame);
    
    // 对话框确认按钮事件
    dialogConfirm.addEventListener('click', function() {
        dialog.classList.add('hidden');
    });
});

// 处理按钮悬停（鼠标）- 只移动不计数
function handleButtonHover(event) {
    if (isChasing) return;
    
    isChasing = true;
    document.body.classList.add('chasing');
    
    // 执行移动动作（不计数）
    moveButtonRandomly(event);
    
    // 短暂延迟后重置追逐状态
    setTimeout(() => {
        isChasing = false;
        document.body.classList.remove('chasing');
    }, 300);
}

// 处理移动端触摸移动事件
function handleTouchMove(event) {
    if (isChasing) return;
    
    isChasing = true;
    
    // 执行移动动作
    moveButtonRandomly(event);
    
    setTimeout(() => {
        isChasing = false;
    }, 300);
}

// 处理按钮点击 - 实际点击才计数
function handleButtonClick(event) {
    event.preventDefault();
    
    // 增加尝试次数
    attemptCount++;
    attemptCountSpan.textContent = attemptCount;
    
    // 根据尝试次数确定阶段
    determinePhase();
    
    // 只有在阶段5（投降）时才允许点击
    if (currentPhase === 5) {
        triggerSurrender();
    } else if (currentPhase === 4) {
        // 阶段4：谈判时刻
        ageButton.textContent = translations[currentLanguage].buttonTexts.phase4[0];
        
        // 只在特定尝试次数时弹出对话框
        if (attemptCount === 10 || attemptCount === 15 || attemptCount === 20) {
            showDialog(translations[currentLanguage].dialogMessages[Math.floor(Math.random() * translations[currentLanguage].dialogMessages.length)]);
        } else {
            // 其他次数显示普通提示
            const messages = translations[currentLanguage].temporaryMessages;
            showTemporaryMessage(messages[Math.floor(Math.random() * messages.length)]);
        }
        
        moveButtonToRandomPosition(event);
    } else {
        // 其他阶段点击时显示提示
        const messages = translations[currentLanguage].temporaryMessages;
        showTemporaryMessage(messages[Math.floor(Math.random() * messages.length)]);
        
        // 点击后立即移动按钮到随机位置
        moveButtonToRandomPosition(event);
    }
}

// 处理退出按钮点击
function handleExitClick(event) {
    event.preventDefault();
    
    if (attemptCount === 0) {
        // 第一次点击退出
        showDialog(translations[currentLanguage].exitDialog1);
    } else if (attemptCount < 5) {
        // 中途点击退出
        showDialog(translations[currentLanguage].exitDialog2);
    } else {
        // 多次尝试后点击退出
        showDialog(translations[currentLanguage].exitDialog3);
        setTimeout(() => {
            triggerSurrender();
        }, 3000);
    }
}

// 确定当前阶段
function determinePhase() {
    if (attemptCount <= 2) {
        currentPhase = 1;
    } else if (attemptCount <= 5) {
        currentPhase = 2;
    } else if (attemptCount <= 9) {
        currentPhase = 3;
    } else if (attemptCount <= 20) {
        currentPhase = 4;
    } else {
        currentPhase = 5;
    }
}

// 执行阶段对应的动作
function executePhaseAction(event) {
    const buttonRect = ageButton.getBoundingClientRect();
    const containerRect = document.querySelector('.button-container').getBoundingClientRect();
    
    switch (currentPhase) {
        case 1: // 阶段1：轻微闪躲
            phase1Action(event, buttonRect, containerRect);
            break;
        case 2: // 阶段2：明显跳跃
            phase2Action(event, buttonRect, containerRect);
            break;
        case 3: // 阶段3：复杂移动
            phase3Action(event, buttonRect, containerRect);
            break;
        case 4: // 阶段4：谈判时刻
            phase4Action(event, buttonRect, containerRect);
            break;
        case 5: // 阶段5：最终投降
            phase5Action();
            break;
    }
    
    // 更新按钮文案
    updateButtonText();
}

// 阶段1动作：轻微闪躲
function phase1Action(event, buttonRect, containerRect) {
    ageButton.classList.add('shake');
    setTimeout(() => ageButton.classList.remove('shake'), 300);
}

// 阶段2动作：明显跳跃
function phase2Action(event, buttonRect, containerRect) {
    ageButton.classList.add('jump');
    setTimeout(() => ageButton.classList.remove('jump'), 200);
}

// 阶段3动作：复杂移动
function phase3Action(event, buttonRect, containerRect) {
    executeRandomMove();
}

// 阶段4动作：谈判时刻
function phase4Action(event, buttonRect, containerRect) {
    if (attemptCount === 8) {
        // 第一次进入阶段4时显示对话框
        setTimeout(() => {
            showDialog(dialogMessages[Math.floor(Math.random() * dialogMessages.length)]);
        }, 300);
    }
    
    ageButton.classList.add('talk');
    setTimeout(() => ageButton.classList.remove('talk'), 400);
}

// 阶段5动作：最终投降
function phase5Action() {
    ageButton.classList.add('surrender');
    setTimeout(() => {
        triggerSurrender();
    }, 600);
}

// 移动按钮到随机位置（点击时调用）
function moveButtonToRandomPosition(event) {
    if (isChasing) return;
    
    isChasing = true;
    
    // 获取按钮容器尺寸
    const containerRect = document.querySelector('.button-container').getBoundingClientRect();
    const buttonRect = ageButton.getBoundingClientRect();
    
    // 限制移动范围在按钮容器内
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    
    // 计算可移动范围（确保按钮在容器内）
    const maxX = (containerWidth - buttonWidth) / 2;
    const maxY = (containerHeight - buttonHeight) / 2;
    
    // 生成随机位置（在容器范围内）
    const randomX = Math.random() * maxX * 2 - maxX;
    const randomY = Math.random() * maxY * 2 - maxY;
    
    // 随机大小变化（0.8倍到1.2倍）
    const randomScale = 0.8 + Math.random() * 0.4;
    
    // 随机字体大小变化（14px到20px）
    const randomFontSize = 14 + Math.random() * 6;
    
    // 应用随机变换
    ageButton.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
    ageButton.style.fontSize = `${randomFontSize}px`;
    ageButton.style.position = 'absolute';
    ageButton.style.left = '50%';
    ageButton.style.top = '0';
    ageButton.style.zIndex = '10';
    
    // 添加平滑过渡
    ageButton.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // 更新按钮文案
    updateButtonText();
    
    setTimeout(() => {
        isChasing = false;
    }, 300);
}

// 随机移动按钮（悬停时调用）
function moveButtonRandomly(event) {
    if (isChasing) return;
    
    isChasing = true;
    
    const buttonRect = ageButton.getBoundingClientRect();
    const containerRect = document.querySelector('.button-container').getBoundingClientRect();
    
    // 根据阶段决定移动幅度（限制在容器范围内）
    let moveDistance;
    if (attemptCount <= 2) moveDistance = 30;
    else if (attemptCount <= 4) moveDistance = 60;
    else if (attemptCount <= 7) moveDistance = 90;
    else moveDistance = 120;
    
    // 限制移动距离不超过容器范围
    const containerWidth = containerRect.width;
    const buttonWidth = buttonRect.width;
    const maxAllowedDistance = (containerWidth - buttonWidth) / 2 - 10;
    moveDistance = Math.min(moveDistance, maxAllowedDistance);
    
    const newX = getRandomPosition(buttonRect, containerRect, moveDistance);
    const newY = Math.random() > 0.5 ? moveDistance/3 : -moveDistance/3;
    
    ageButton.style.setProperty('--runaway-x', newX + 'px');
    ageButton.style.setProperty('--runaway-y', newY + 'px');
    ageButton.classList.add('runaway');
    
    setTimeout(() => {
        ageButton.classList.remove('runaway');
        isChasing = false;
    }, 250);
}

// 获取随机位置
function getRandomPosition(buttonRect, containerRect, maxDistance) {
    const containerWidth = containerRect.width;
    const buttonWidth = buttonRect.width;
    const maxX = (containerWidth - buttonWidth) / 2;
    
    // 确保移动幅度足够大
    const sign = Math.random() > 0.5 ? 1 : -1;
    const newX = sign * (maxX * 0.8); // 使用80%的最大范围
    
    return newX;
}

// 显示对话框
function showDialog(message) {
    dialogText.textContent = message;
    dialog.classList.remove('hidden');
}

// 显示临时消息
function showTemporaryMessage(message) {
    const tempMsg = document.createElement('div');
    tempMsg.textContent = message;
    
    // 获取按钮当前位置
    const buttonRect = ageButton.getBoundingClientRect();
    
    // 计算消息位置（按钮上方）
    const messageTop = buttonRect.top - 40;
    const messageLeft = buttonRect.left + buttonRect.width / 2;
    
    // 设置消息位置
    tempMsg.style.cssText = `
        position: fixed;
        top: ${messageTop}px;
        left: ${messageLeft}px;
        transform: translateX(-50%);
        background: rgba(60, 60, 60, 0.95);
        color: #ccc;
        padding: 8px 16px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        font-size: 13px;
        font-weight: 500;
        z-index: 1000;
        white-space: nowrap;
        animation: messageFade 2s ease-in-out;
    `;
    
    document.body.appendChild(tempMsg);
    
    setTimeout(() => {
        if (document.body.contains(tempMsg)) {
            document.body.removeChild(tempMsg);
        }
    }, 2000);
}

// 触发投降页面
function triggerSurrender() {
    const chaseTime = Math.floor((Date.now() - startTime) / 1000);
    chaseTimeSpan.textContent = chaseTime;
    finalAttemptsSpan.textContent = attemptCount;
    
    // 更新投降页面的翻译
    updatePageTranslations();
    
    surrenderPage.classList.remove('hidden');
    setTimeout(() => {
        surrenderPage.classList.add('visible');
    }, 100);
}

// 重置游戏
function resetGame() {
    attemptCount = 0;
    currentPhase = 1;
    startTime = Date.now();
    
    // 重置UI
    attemptCountSpan.textContent = '0';
    attemptCounter.classList.remove('visible');
    ageButton.classList.remove('surrender');
    
    // 更新页面翻译
    updatePageTranslations();
    
    // 隐藏投降页面
    surrenderPage.classList.remove('visible');
    setTimeout(() => {
        surrenderPage.classList.add('hidden');
    }, 500);
    
    // 重置按钮位置和样式
    ageButton.style.transform = 'translateX(-50%)';
    ageButton.style.fontSize = '18px';
    ageButton.style.padding = '15px 30px';
    
    // 移除所有CSS变量
    ageButton.style.removeProperty('--random-x');
    ageButton.style.removeProperty('--random-y');
    ageButton.style.removeProperty('--random-scale');
    ageButton.style.removeProperty('--random-rotate');
    ageButton.style.removeProperty('--random-font-size');
    ageButton.style.removeProperty('--random-padding-vertical');
    ageButton.style.removeProperty('--random-padding-horizontal');
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);