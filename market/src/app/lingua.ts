import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LinguaService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Signal per gestire la lingua corrente (default 'it')
  linguaAttuale = signal<'it' | 'en' | 'zh' | 'tl'>(this.caricaLingua());

  // Dizionario completo delle traduzioni
  private traduzioni: any = {
    'it': {
      // Navbar
      nav_home: 'Home',
      nav_categorie: 'Categorie',
      nav_contatti: 'Contatti',
      nav_accedi: 'Accedi',
      nav_registrati: 'Registrati',
      // Home
      home_benvenuto: 'Benvenuti su MARKET',
      home_offerte: 'Scopri le migliori offerte',
      home_nuovi_arrivi: 'Nuova Collezione',
      home_bestseller: 'I più venduti',
      home_carica_altro: 'Carica Altro',
      home_desc_cat: 'Una breve descrizione accattivante per questa categoria.',
      // Login
      login_titolo: 'Accedi al tuo profilo',
      login_utente: 'Nome utente o Email',
      login_pass: 'Password',
      login_bottone: 'Entra',
      login_no_account: 'Non hai un account?',
      // Registrazione
      reg_titolo: 'Crea un Account',
      reg_sottotitolo: 'Inserisci i tuoi dati per iniziare',
      reg_nome: 'Nome',
      reg_cognome: 'Cognome',
      reg_paese: 'Paese di provenienza',
      reg_nascita: 'Data di nascita',
      reg_genere: 'Genere',
      reg_maschio: 'Maschio',
      reg_femmina: 'Femmina',
      reg_altro: 'Altro',
      reg_conferma_pass: 'Conferma Password',
      reg_termini: 'Accetta i termini e le condizioni',
      reg_bottone: 'Registrati',
      reg_gia_account: 'Hai già un account?',
      reg_errore_termini: 'Devi accettare i termini per continuare',
      // Pagina Food
      food_title: 'Gourmet Market',
      food_subtitle: 'La migliore selezione di prodotti per la tua tavola.',
      food_section: 'Il nostro assortimento Food',
      // Pagina Beauty
      beauty_title: 'Beauty & Care Store',
      beauty_subtitle: 'Scopri la tua bellezza con i nostri prodotti premium.',
      beauty_section: 'Reparto Beauty & Care',
      // Prodotti Food - Dispensa
      prod_pasta: 'Pasta Integrale 500g',
      prod_pasta_desc: 'Trafilata al bronzo, 100% grano italiano.',
      prod_riso: 'Riso Basmati',
      prod_riso_desc: 'Chicchi lunghi e profumati, ideale per contorni.',
      prod_passata: 'Passata di Pomodoro',
      prod_passata_desc: 'Pomodoro San Marzano, densa e dolce.',
      // Prodotti Food - Fresco
      prod_yogurt: 'Yogurt Greco Bianco',
      prod_yogurt_desc: 'Senza grassi, ricco di proteine.',
      prod_mozzarella: 'Mozzarella di Bufala',
      prod_mozzarella_desc: 'Freschissima, da latte di bufala campana.',
      // Prodotti Food - Snack
      prod_biscotti: 'Biscotti alla Nocciola',
      prod_biscotti_desc: 'Con granella di nocciole tostate.',
      prod_cioccolato: 'Cioccolato Fondente 85%',
      prod_cioccolato_desc: 'Cacao pregiato, gusto intenso.',
      // Prodotti Food - Bevande
      prod_succo: 'Succo di Mela Bio',
      prod_succo_desc: '100% mela, senza zuccheri aggiunti.',
      prod_matcha: 'Tè Verde Matcha',
      prod_matcha_desc: 'In polvere, ricco di antiossidanti.',
      // Prodotti Beauty - Skincare
      prod_gel: 'Gel Detergente Purificante',
      prod_gel_desc: 'Rimuove le impurità e detergente profondo.',
      prod_tonico: 'Tonico Illuminante AHA',
      prod_tonico_desc: 'Esfolia delicatamente e illumina.',
      // Prodotti Beauty - Haircare
      prod_shampoo: 'Shampoo Protettivo Colore',
      prod_shampoo_desc: 'Mantiene la brillantezza del colore.',
      // Prodotti Beauty - Make-up
      prod_fondotinta: 'Fondotinta Fluido Idratante',
      prod_fondotinta_desc: 'Coprenza media con effetto naturale.',
      // Prodotti Beauty - Men's Grooming
      prod_olio_barba: 'Olio Barba Ammorbidente',
      prod_olio_barba_desc: 'Idrata la pelle sottostante.'
    },
    'en': {
      nav_home: 'Home',
      nav_categorie: 'Categories',
      nav_contatti: 'Contacts',
      nav_accedi: 'Login',
      nav_registrati: 'Register',
      home_benvenuto: 'Welcome to MARKET',
      home_offerte: 'Discover the best offers',
      home_nuovi_arrivi: 'New Arrivals',
      home_bestseller: 'Bestsellers',
      home_carica_altro: 'Load More',
      home_desc_cat: 'A brief attractive description for this category.',
      login_titolo: 'Login to your profile',
      login_utente: 'Username or Email',
      login_pass: 'Password',
      login_bottone: 'Login',
      login_no_account: "Don't have an account?",
      reg_titolo: 'Create an Account',
      reg_sottotitolo: 'Enter your details to start',
      reg_nome: 'First Name',
      reg_cognome: 'Last Name',
      reg_paese: 'Country of Origin',
      reg_nascita: 'Date of Birth',
      reg_genere: 'Gender',
      reg_maschio: 'Male',
      reg_femmina: 'Female',
      reg_altro: 'Other',
      reg_conferma_pass: 'Confirm Password',
      reg_termini: 'I accept the terms and conditions',
      reg_bottone: 'Sign Up',
      reg_gia_account: 'Already have an account?',
      reg_errore_termini: 'You must accept the terms to continue',
      // Food Page
      food_title: 'Gourmet Market',
      food_subtitle: 'The best selection of products for your table.',
      food_section: 'Our Food Assortment',
      // Beauty Page
      beauty_title: 'Beauty & Care Store',
      beauty_subtitle: 'Discover your beauty with our premium products.',
      beauty_section: 'Beauty & Care Department',
      // Food Products - Pantry
      prod_pasta: 'Whole Wheat Pasta 500g',
      prod_pasta_desc: 'Bronze drawn, 100% Italian wheat.',
      prod_riso: 'Basmati Rice',
      prod_riso_desc: 'Long and fragrant grains, ideal for side dishes.',
      prod_passata: 'Tomato Sauce',
      prod_passata_desc: 'San Marzano tomato, dense and sweet.',
      // Food Products - Fresh
      prod_yogurt: 'White Greek Yogurt',
      prod_yogurt_desc: 'Fat-free, rich in proteins.',
      prod_mozzarella: 'Buffalo Mozzarella',
      prod_mozzarella_desc: 'Very fresh, from Campania buffalo milk.',
      // Food Products - Snacks
      prod_biscotti: 'Hazelnut Biscuits',
      prod_biscotti_desc: 'With roasted hazelnut granules.',
      prod_cioccolato: 'Dark Chocolate 85%',
      prod_cioccolato_desc: 'Premium cocoa, intense taste.',
      // Food Products - Beverages
      prod_succo: 'Bio Apple Juice',
      prod_succo_desc: '100% apple, no added sugars.',
      prod_matcha: 'Matcha Green Tea',
      prod_matcha_desc: 'Powder form, rich in antioxidants.',
      // Beauty Products - Skincare
      prod_gel: 'Purifying Cleansing Gel',
      prod_gel_desc: 'Removes impurities and deep cleanse.',
      prod_tonico: 'Illuminating AHA Tonic',
      prod_tonico_desc: 'Gently exfoliates and illuminates.',
      // Beauty Products - Haircare
      prod_shampoo: 'Color Protective Shampoo',
      prod_shampoo_desc: 'Maintains color brilliance.',
      // Beauty Products - Make-up
      prod_fondotinta: 'Hydrating Fluid Foundation',
      prod_fondotinta_desc: 'Medium coverage with natural effect.',
      // Beauty Products - Men's Grooming
      prod_olio_barba: 'Beard Softening Oil',
      prod_olio_barba_desc: 'Hydrates the underlying skin.'
    },
    'zh': {
      nav_home: '首页',
      nav_categorie: '类别',
      nav_contatti: '联系我们',
      nav_accedi: '登录',
      nav_registrati: '注册',
      home_benvenuto: '欢迎来到市场',
      home_offerte: '发现最佳优惠',
      home_nuovi_arrivi: '新品上市',
      home_bestseller: '畅销产品',
      home_carica_altro: '加载更多',
      home_desc_cat: '该类别的简短精彩描述。',
      login_titolo: '登录您的个人资料',
      login_utente: '用户名或电子邮件',
      login_pass: '密码',
      login_bottone: '登录',
      login_no_account: '没有账号？',
      reg_titolo: '创建账户',
      reg_sottotitolo: '输入您的详细信息以开始',
      reg_nome: '名字',
      reg_cognome: '姓氏',
      reg_paese: '国籍',
      reg_nascita: '出生日期',
      reg_genere: '性别',
      reg_maschio: '男',
      reg_femmina: '女',
      reg_altro: '其他',
      reg_conferma_pass: '确认密码',
      reg_termini: '我接受条款和条件',
      reg_bottone: '立即注册',
      reg_gia_account: '已有账号？',
      reg_errore_termini: '您必须接受条款才能继续',
      // 食品页面
      food_title: '美食市场',
      food_subtitle: '为您的餐桌精选最佳产品。',
      food_section: '我们的食品分类',
      // 美容页面
      beauty_title: '美容护理专卖店',
      beauty_subtitle: '通过我们的高级产品发现您的美丽。',
      beauty_section: '美容护理部门',
      // 食品产品 - 食品储藏室
      prod_pasta: '全麦面食 500克',
      prod_pasta_desc: '铜模制作，100% 意大利小麦。',
      prod_riso: '印度香米',
      prod_riso_desc: '长粒香米，理想的配菜。',
      prod_passata: '番茄酱',
      prod_passata_desc: '圣马扎诺番茄，浓郁香甜。',
      // 食品产品 - 新鲜
      prod_yogurt: '白色希腊酸奶',
      prod_yogurt_desc: '无脂肪，富含蛋白质。',
      prod_mozzarella: '水牛莫菲拉芝士',
      prod_mozzarella_desc: '新鲜无比，来自坎帕尼亚水牛奶。',
      // 食品产品 - 零食
      prod_biscotti: '榛子饼干',
      prod_biscotti_desc: '烘烤榛子粒。',
      prod_cioccolato: '85% 黑巧克力',
      prod_cioccolato_desc: '优质可可，浓郁口味。',
      // 食品产品 - 饮料
      prod_succo: '有机苹果汁',
      prod_succo_desc: '100% 苹果，无添加糖。',
      prod_matcha: '抹茶绿茶',
      prod_matcha_desc: '粉末形式，富含抗氧化物。',
      // 美容产品 - 护肤
      prod_gel: '净化洁面啫喱',
      prod_gel_desc: '去除杂质和深层清洁。',
      prod_tonico: '亮肤 AHA 爽肤水',
      prod_tonico_desc: '温和去角质并亮肤。',
      // 美容产品 - 护发
      prod_shampoo: '护色洗发水',
      prod_shampoo_desc: '保持色泽闪亮。',
      // 美容产品 - 彩妆
      prod_fondotinta: '保湿液体粉底',
      prod_fondotinta_desc: '中等遮瑕力，自然效果。',
      // 美容产品 - 男士护理
      prod_olio_barba: '胡须柔软油',
      prod_olio_barba_desc: '滋润肌肤。'
    },
    'tl': {
      nav_home: 'Home',
      nav_categorie: 'Mga Kategorya',
      nav_contatti: 'Kontak',
      nav_accedi: 'Mag-login',
      nav_registrati: 'Mag-register',
      home_benvenuto: 'Maligayang pagdating sa MARKET',
      home_offerte: 'Tuklasin ang pinakamagandang alok',
      home_nuovi_arrivi: 'Mga Bagong Dating',
      home_bestseller: 'Pinakamabenta',
      home_carica_altro: 'Mag-load pa',
      home_desc_cat: 'Isang maikling paglalarawan para sa kategoryang ito.',
      login_titolo: 'Mag-login sa iyong profile',
      login_utente: 'Username o Email',
      login_pass: 'Password',
      login_bottone: 'Pumasok',
      login_no_account: 'Wala ka pang account?',
      reg_titolo: 'Gumawa ng Account',
      reg_sottotitolo: 'Ilagay ang iyong detalye para magsimula',
      reg_nome: 'Pangalan',
      reg_cognome: 'Apelyido',
      reg_paese: 'Bansang pinagmulan',
      reg_nascita: 'Petsa ng Kapanganakan',
      reg_genere: 'Kasarian',
      reg_maschio: 'Lalaki',
      reg_femmina: 'Babae',
      reg_altro: 'Iba pa',
      reg_conferma_pass: 'I-kumpirma ang Password',
      reg_termini: 'Tinatanggap ko ang mga terms at conditions',
      reg_bottone: 'Mag-sign Up',
      reg_gia_account: 'May account ka na ba?',
      reg_errore_termini: 'Kailangan mong tanggapin ang terms para magpatuloy',
      // Food Page
      food_title: 'Gourmet Market',
      food_subtitle: 'Ang pinakamahusay na pagpili ng produkto para sa iyong mesa.',
      food_section: 'Ang aming Food Assortment',
      // Beauty Page
      beauty_title: 'Beauty & Care Store',
      beauty_subtitle: 'Tuklasin ang iyong kagandahan gamit ang aming premium na produkto.',
      beauty_section: 'Beauty & Care Department',
      // Food Products - Pantry
      prod_pasta: 'Whole Wheat Pasta 500g',
      prod_pasta_desc: 'Bronze drawn, 100% Italian na wheat.',
      prod_riso: 'Basmati Rice',
      prod_riso_desc: 'Mahabang at aromadong butil, perpekto para sa side dishes.',
      prod_passata: 'Tomato Sauce',
      prod_passata_desc: 'San Marzano tomato, dense at matamis.',
      // Food Products - Fresh
      prod_yogurt: 'White Greek Yogurt',
      prod_yogurt_desc: 'Walang taba, mayaman sa proteins.',
      prod_mozzarella: 'Buffalo Mozzarella',
      prod_mozzarella_desc: 'Napakasariwa, mula sa Campania buffalo milk.',
      // Food Products - Snacks
      prod_biscotti: 'Hazelnut Biscuits',
      prod_biscotti_desc: 'May toasted hazelnut granules.',
      prod_cioccolato: 'Dark Chocolate 85%',
      prod_cioccolato_desc: 'Premium cocoa, matinding lasa.',
      // Food Products - Beverages
      prod_succo: 'Bio Apple Juice',
      prod_succo_desc: '100% apple, walang dagdag na asukal.',
      prod_matcha: 'Matcha Green Tea',
      prod_matcha_desc: 'Powder form, mayaman sa antioxidants.',
      // Beauty Products - Skincare
      prod_gel: 'Purifying Cleansing Gel',
      prod_gel_desc: 'Nag-aalis ng mga dumi at malalim na paglilinis.',
      prod_tonico: 'Illuminating AHA Tonic',
      prod_tonico_desc: 'Malambot na nag-exfoliate at nag-liwanag.',
      // Beauty Products - Haircare
      prod_shampoo: 'Color Protective Shampoo',
      prod_shampoo_desc: 'Pinapanatili ang kulay na kinang.',
      // Beauty Products - Make-up
      prod_fondotinta: 'Hydrating Fluid Foundation',
      prod_fondotinta_desc: 'Medium coverage na may natural na epekto.',
      // Beauty Products - Men's Grooming
      prod_olio_barba: 'Beard Softening Oil',
      prod_olio_barba_desc: 'Nag-hydrate ng pinakamalalim na balat.'
    }
  };

  constructor() {
    // Carica la lingua salvata al primo accesso (solo in browser)
    if (this.isBrowser) {
      const linguaSalvata = localStorage.getItem('lingua') as 'it' | 'en' | 'zh' | 'tl' | null;
      if (linguaSalvata) {
        this.linguaAttuale.set(linguaSalvata);
      }
    }
  }

  private caricaLingua(): 'it' | 'en' | 'zh' | 'tl' {
    if (this.isBrowser) {
      const lingua = localStorage.getItem('lingua');
      return (lingua as any) || 'it';
    }
    return 'it';
  }

  // Funzione per cambiare lingua
  cambiaLingua(nuovaLingua: 'it' | 'en' | 'zh' | 'tl') {
    this.linguaAttuale.set(nuovaLingua);
    if (this.isBrowser) {
      localStorage.setItem('lingua', nuovaLingua);
    }
  }

  linguaCorrente(): 'it' | 'en' | 'zh' | 'tl' {
    return this.linguaAttuale();
  }

  // Funzione per ottenere il testo tradotto basato sulla chiave
  getTesto(chiave: string): string {
    const lingua = this.linguaAttuale();
    return this.traduzioni[lingua][chiave] || chiave;
  }
}