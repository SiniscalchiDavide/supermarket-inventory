import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinguaService {

  // Signal per gestire la lingua corrente (default 'it')
  linguaAttuale = signal<'it' | 'en' | 'zh' | 'tl'>('it');

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
      reg_errore_termini: 'Devi accettare i termini per continuare'
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
      reg_errore_termini: 'You must accept the terms to continue'
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
      reg_errore_termini: '您必须接受条款才能继续'
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
      reg_errore_termini: 'Kailangan mong tanggapin ang terms para magpatuloy'
    }
  };

  constructor() { }

  // Funzione per cambiare lingua
  cambiaLingua(nuovaLingua: 'it' | 'en' | 'zh' | 'tl') {
    this.linguaAttuale.set(nuovaLingua);
  }

  // Funzione per ottenere il testo tradotto basato sulla chiave
  getTesto(chiave: string): string {
    const lingua = this.linguaAttuale();
    return this.traduzioni[lingua][chiave] || chiave;
  }
}