const I18N = (function() {
    const SUPPORTED_LANGUAGES = ['zh-Hans', 'zh-Hant', 'en'];
    const DEFAULT_LANGUAGE = 'en';
    
    let currentLanguage = DEFAULT_LANGUAGE;
    let translations = {};
    
    const TRANSLATIONS_DATA = {
        'zh-Hans': {
            "header": {
                "logo": {
                    "text": "CYBER",
                    "accent": "LOTTO"
                },
                "asset": {
                    "label": "资产",
                    "unit": "点"
                }
            },
            "lottery": {
                "red_pool": {
                    "title": "红球区",
                    "selected": "已选"
                },
                "blue_pool": {
                    "title": "蓝球区",
                    "selected": "已选"
                }
            },
            "bet_controls": {
                "preview": {
                    "red_label": "红球:",
                    "blue_label": "蓝球:"
                },
                "multiplier": {
                    "label": "倍数:"
                },
                "info": {
                    "notes": "注数:",
                    "cost": "花费:"
                },
                "buttons": {
                    "clear": "清空",
                    "random": "机选",
                    "order": "生成订单"
                }
            },
            "draw": {
                "title": "第",
                "title_suffix": "期",
                "status": "摇奖进行中...",
                "red_machine": "红球机",
                "blue_machine": "蓝球机",
                "result": {
                    "red_label": "红球结果",
                    "blue_label": "蓝球结果"
                },
                "progress": {
                    "red": "红球第 {current}/{total} 个，距离下一个球还有 {time}s",
                    "blue": "红球摇完，准备摇蓝球..."
                }
            },
            "modal": {
                "close": "关闭",
                "confirm": "确定",
                "cancel": "取消"
            },
            "order": {
                "title": "确认投注",
                "red": "红球:",
                "blue": "蓝球:",
                "multiplier": "倍数:",
                "notes": "注数:",
                "cost": "花费:",
                "confirm": "确认投注"
            },
            "warning": {
                "title": "资产不足",
                "message": "您的资产不足以支付 {cost} 点！请刷新页面重置资产。"
            },
            "result": {
                "title": "开奖结果",
                "your_numbers": "您的号码",
                "winning_numbers": "开奖号码",
                "prize": {
                    "level": "奖项",
                    "count": "中奖注数:",
                    "amount": "奖金:",
                    "unit": "点",
                    "none": "未中奖"
                },
                "button": "返回选号"
            },
            "prizes": {
                "1": "一等奖",
                "2": "二等奖",
                "3": "三等奖",
                "4": "四等奖",
                "5": "五等奖",
                "6": "六等奖",
                "7": "六等奖",
                "8": "六等奖",
                "9": "六等奖",
                "10": "六等奖"
            }
        },
        'zh-Hant': {
            "header": {
                "logo": {
                    "text": "CYBER",
                    "accent": "LOTTO"
                },
                "asset": {
                    "label": "資產",
                    "unit": "點"
                }
            },
            "lottery": {
                "red_pool": {
                    "title": "紅球區",
                    "selected": "已選"
                },
                "blue_pool": {
                    "title": "藍球區",
                    "selected": "已選"
                }
            },
            "bet_controls": {
                "preview": {
                    "red_label": "紅球:",
                    "blue_label": "藍球:"
                },
                "multiplier": {
                    "label": "倍數:"
                },
                "info": {
                    "notes": "注數:",
                    "cost": "花費:"
                },
                "buttons": {
                    "clear": "清空",
                    "random": "機選",
                    "order": "生成訂單"
                }
            },
            "draw": {
                "title": "第",
                "title_suffix": "期",
                "status": "搖獎進行中...",
                "red_machine": "紅球機",
                "blue_machine": "藍球機",
                "result": {
                    "red_label": "紅球結果",
                    "blue_label": "藍球結果"
                },
                "progress": {
                    "red": "紅球第 {current}/{total} 個，距離下一個球還有 {time}s",
                    "blue": "紅球搖完，準備搖藍球..."
                }
            },
            "modal": {
                "close": "關閉",
                "confirm": "確定",
                "cancel": "取消"
            },
            "order": {
                "title": "確認投注",
                "red": "紅球:",
                "blue": "藍球:",
                "multiplier": "倍數:",
                "notes": "注數:",
                "cost": "花費:",
                "confirm": "確認投注"
            },
            "warning": {
                "title": "資產不足",
                "message": "您的資產不足以支付 {cost} 點！請刷新頁面重置資產。"
            },
            "result": {
                "title": "開獎結果",
                "your_numbers": "您的號碼",
                "winning_numbers": "開獎號碼",
                "prize": {
                    "level": "獎項",
                    "count": "中獎注數:",
                    "amount": "獎金:",
                    "unit": "點",
                    "none": "未中獎"
                },
                "button": "返回選號"
            },
            "prizes": {
                "1": "一等獎",
                "2": "二等獎",
                "3": "三等獎",
                "4": "四等獎",
                "5": "五等獎",
                "6": "六等獎",
                "7": "六等獎",
                "8": "六等獎",
                "9": "六等獎",
                "10": "六等獎"
            }
        },
        'en': {
            "header": {
                "logo": {
                    "text": "CYBER",
                    "accent": "LOTTO"
                },
                "asset": {
                    "label": "Property",
                    "unit": "points"
                }
            },
            "lottery": {
                "red_pool": {
                    "title": "Red Balls",
                    "selected": "Selected"
                },
                "blue_pool": {
                    "title": "Blue Balls",
                    "selected": "Selected"
                }
            },
            "bet_controls": {
                "preview": {
                    "red_label": "Red:",
                    "blue_label": "Blue:"
                },
                "multiplier": {
                    "label": "Multiplier:"
                },
                "info": {
                    "notes": "Notes:",
                    "cost": "Cost:"
                },
                "buttons": {
                    "clear": "Clear",
                    "random": "Random",
                    "order": "Generate Order"
                }
            },
            "draw": {
                "title": "Period",
                "title_suffix": "",
                "status": "Drawing in progress...",
                "red_machine": "Red Ball Machine",
                "blue_machine": "Blue Ball Machine",
                "result": {
                    "red_label": "Red Results",
                    "blue_label": "Blue Result"
                },
                "progress": {
                    "red": "Red Ball {current}/{total}, next ball in {time}s",
                    "blue": "Red balls drawn, preparing for blue ball..."
                }
            },
            "modal": {
                "close": "Close",
                "confirm": "Confirm",
                "cancel": "Cancel"
            },
            "order": {
                "title": "Confirm Bet",
                "red": "Red:",
                "blue": "Blue:",
                "multiplier": "Multiplier:",
                "notes": "Notes:",
                "cost": "Cost:",
                "confirm": "Confirm Bet"
            },
            "warning": {
                "title": "Insufficient Property",
                "message": "Your property is insufficient to pay {cost} points! Please refresh the page to reset your property."
            },
            "result": {
                "title": "Draw Result",
                "your_numbers": "Your Numbers",
                "winning_numbers": "Winning Numbers",
                "prize": {
                    "level": "Prize Level",
                    "count": "Winning Notes:",
                    "amount": "Prize:",
                    "unit": "points",
                    "none": "No Prize"
                },
                "button": "Back to Selection"
            },
            "prizes": {
                "1": "First Prize",
                "2": "Second Prize",
                "3": "Third Prize",
                "4": "Fourth Prize",
                "5": "Fifth Prize",
                "6": "Sixth Prize",
                "7": "Sixth Prize",
                "8": "Sixth Prize",
                "9": "Sixth Prize",
                "10": "Sixth Prize"
            }
        }
    };
    
    function detectLanguage() {
        let lang = navigator.language || navigator.userLanguage;
        
        if (lang.startsWith('zh-CN') || lang.startsWith('zh-SG')) {
            return 'zh-Hans';
        } else if (lang.startsWith('zh-TW') || lang.startsWith('zh-HK') || lang.startsWith('zh-MO')) {
            return 'zh-Hant';
        } else if (lang.startsWith('zh')) {
            return 'zh-Hans';
        } else if (lang.startsWith('en')) {
            return 'en';
        }
        
        return DEFAULT_LANGUAGE;
    }
    
    function loadTranslations(lang) {
        if (TRANSLATIONS_DATA[lang]) {
            translations = TRANSLATIONS_DATA[lang];
            return true;
        }
        return false;
    }
    
    function getTranslation(key, params = {}) {
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }
        
        if (typeof value === 'string') {
            return interpolate(value, params);
        }
        
        return value;
    }
    
    function interpolate(str, params) {
        return str.replace(/{(\w+)}/g, (match, paramName) => {
            return params[paramName] !== undefined ? params[paramName] : match;
        });
    }
    
    function translateDOM() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getTranslation(key);
            
            if (translation && typeof translation === 'string') {
                element.textContent = translation;
            }
        });
    }
    
    function updateHTMLLangAttribute(lang) {
        const htmlElement = document.getElementById('htmlRoot');
        if (htmlElement) {
            htmlElement.lang = lang;
        }
    }
    
    function updateBodyLangClass(lang) {
        document.body.classList.remove('lang-en', 'lang-zh-hans', 'lang-zh-hant');
        
        let langClass = '';
        if (lang === 'en') {
            langClass = 'lang-en';
        } else if (lang === 'zh-Hans') {
            langClass = 'lang-zh-hans';
        } else if (lang === 'zh-Hant') {
            langClass = 'lang-zh-hant';
        }
        
        if (langClass) {
            document.body.classList.add(langClass);
        }
    }
    
    function setLanguage(lang) {
        if (!SUPPORTED_LANGUAGES.includes(lang)) {
            console.warn(`Language ${lang} is not supported`);
            return;
        }
        
        const success = loadTranslations(lang);
        if (success) {
            currentLanguage = lang;
            translateDOM();
            updateHTMLLangAttribute(lang);
            updateBodyLangClass(lang);
            
            const selectElement = document.getElementById('languageSelect');
            if (selectElement) {
                selectElement.value = lang;
            }
            
            localStorage.setItem('cyber-lotto-lang', lang);
        }
    }
    
    function getCurrentLanguage() {
        return currentLanguage;
    }
    
    function init() {
        const storedLang = localStorage.getItem('cyber-lotto-lang');
        const detectedLang = storedLang || detectLanguage();
        
        setLanguage(detectedLang);
        
        const selectElement = document.getElementById('languageSelect');
        if (selectElement) {
            selectElement.addEventListener('change', (e) => {
                setLanguage(e.target.value);
            });
        }
    }
    
    return {
        init,
        setLanguage,
        getCurrentLanguage,
        getTranslation,
        translateDOM
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    I18N.init();
});