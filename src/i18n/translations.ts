import { SupportedLanguage, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    region: 'UK / USA / Global',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    region: 'West Africa / Europe',
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文 (简体)',
    flag: '🇨🇳',
    region: 'Guangzhou / Yiwu / Asia',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    region: 'Spain / Latin America',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇦🇪',
    region: 'Dubai / UAE / Middle East',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    region: 'Germany / Central Europe',
  },
];

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Top Bar & Header
    'topbar.rc': 'Licensed International Freight Forwarder',
    'topbar.lagos': 'Lagos',
    'topbar.london': 'London',
    'topbar.currency': 'CURRENCY',
    'topbar.language': 'LANGUAGE',
    'topbar.login': 'Staff & Client Login',
    'topbar.portal': 'Customer Portal',
    'topbar.ops': 'Operations Desk',
    'topbar.admin': 'Super Admin',
    'topbar.signout': 'Sign out',

    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.vehicles': 'Vehicle Sourcing',
    'nav.tracking': 'Track Shipment',
    'nav.quote': 'Get Quote',
    'nav.about': 'About Us',
    'nav.resources': 'Resources & FAQ',
    'nav.contact': 'Contact Desk',
    'nav.calculator': 'Freight Calculator',

    // Hero
    'hero.badge': 'UK • NIGERIA • USA • CHINA CARGO CORRIDORS',
    'hero.title1': 'MOVE YOUR BUSINESS',
    'hero.title2': 'BEYOND BORDERS.',
    'hero.desc': 'Reliable air, sea and road freight solutions connecting businesses and individuals to global markets. Specialized in Form M & PAAR documentation, port logistics, and direct vehicle auto trade.',
    'hero.btnQuote': 'Get a Shipping Quote',
    'hero.btnTrack': 'Track Shipment',
    'hero.btnCalc': 'Instant Calculator',
    'hero.cac': 'CAC Corporate Registered',
    'hero.hubs': 'Direct Physical Hubs',
    'hero.paar': 'Customs Brokerage',

    // Quick Tracker
    'tracker.title': 'Quick Shipment Tracker',
    'tracker.sub': 'Instant lookup with real-time status',
    'tracker.refLabel': 'Tracking Reference',
    'tracker.btn': 'Locate Shipment',
    'tracker.demoLabel': 'Quick Demo Shipments:',

    // Shipping Cost Calculator
    'calc.tag': 'REAL-TIME FREIGHT ESTIMATOR',
    'calc.title': 'Shipping Cost Calculator',
    'calc.desc': 'Accurate door-to-port and door-to-door cost projections based on chargeable weight, dimensional factors, and certified corridor carrier tariffs.',
    'calc.modeAirPriority': 'Air Priority (3-5 Days)',
    'calc.modeAirStd': 'Air Cargo (5-7 Days)',
    'calc.modeOceanFcl': 'Ocean FCL (Full Container)',
    'calc.modeOceanLcl': 'Ocean LCL (Consolidation / CBM)',
    'calc.modeDoor': 'Door-to-Door Courier',
    'calc.modeRoRo': 'Auto RoRo Vehicle',

    'calc.origin': 'Origin Hub',
    'calc.destination': 'Destination Port / Hub',
    'calc.category': 'Cargo Classification',
    'calc.actualWeight': 'Actual Gross Weight',
    'calc.dimensions': 'Dimensions (L × W × H)',
    'calc.length': 'Length',
    'calc.width': 'Width',
    'calc.height': 'Height',
    'calc.unitMetric': 'Metric (kg / cm)',
    'calc.unitImperial': 'Imperial (lbs / in)',
    'calc.presets': 'Standard Box Presets',
    'calc.presetSmall': 'Small Carton (30×20×15)',
    'calc.presetMed': 'Medium Box (50×40×30)',
    'calc.presetLarge': 'Master Crate (80×60×50)',
    'calc.presetPallet': 'Euro Pallet (120×80×120)',

    'calc.volumetricWeight': 'Volumetric Weight',
    'calc.chargeableWeight': 'Chargeable Weight',
    'calc.cbm': 'Total Volume (CBM)',
    'calc.chargeableExplainer': 'Airlines and ocean freight operators charge based on whichever is higher: actual scale weight or dimensional volume.',

    'calc.breakdownTitle': 'Cost & Tariff Breakdown',
    'calc.freightBase': 'Freight Carrier Base Charge',
    'calc.fuelSurcharge': 'Fuel & Airport / Port Surcharge',
    'calc.handlingFee': 'Terminal Handling & Scanning',
    'calc.customsDoc': 'Customs Entry & Form M Support',
    'calc.totalEstimate': 'Total Estimated Freight Cost',
    'calc.transitWindow': 'Estimated Transit Window',
    'calc.disclaimer': 'Estimates reflect standard general cargo tariffs and current spot exchange rates. Final billing may adjust for specialized hazardous materials, inspection flags, or seasonal carrier surcharges.',
    'calc.btnApplyQuote': 'Lock In Quote & Book Cargo',
    'calc.btnWhatsApp': 'Send Calculation to WhatsApp Desk',
    'calc.copied': 'Calculation copied to clipboard!',
    'calc.includeCustoms': 'Include Nigeria Customs Clearance & PAAR prep',

    // Services
    'services.heading': 'END-TO-END FREIGHT CAPABILITIES',
    'services.sub': 'Licensed international cargo transport, bonded terminal handling, and commercial automotive logistics.',

    // Common
    'common.viewAll': 'View Details',
    'common.currency': 'Currency',
    'common.search': 'Search',
    'common.apply': 'Apply',
  },

  fr: {
    // Top Bar & Header
    'topbar.rc': 'Transitaire Maritime & Aérien International Agréé',
    'topbar.lagos': 'Lagos',
    'topbar.london': 'Londres',
    'topbar.currency': 'DEVISE',
    'topbar.language': 'LANGUE',
    'topbar.login': 'Connexion Personnel & Client',
    'topbar.portal': 'Espace Client',
    'topbar.ops': 'Bureau des Opérations',
    'topbar.admin': 'Super Administrateur',
    'topbar.signout': 'Se déconnecter',

    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.vehicles': 'Import Véhicules',
    'nav.tracking': 'Suivi de Cargaison',
    'nav.quote': 'Devis d\'Expédition',
    'nav.about': 'À Propos',
    'nav.resources': 'Ressources & FAQ',
    'nav.contact': 'Contact',
    'nav.calculator': 'Calculateur de Fret',

    // Hero
    'hero.badge': 'CORRIDORS DE FRET UK • NIGÉRIA • USA • CHINE',
    'hero.title1': 'DÉVELOPPEZ VOS AFFAIRES',
    'hero.title2': 'AU-DELÀ DES FRONTIÈRES.',
    'hero.desc': 'Solutions de fret aérien, maritime et routier de premier ordre reliant les entreprises aux marchés mondiaux. Spécialistes des procédures douanières Form M & PAAR et du négoce automobile.',
    'hero.btnQuote': 'Obtenir un Devis de Fret',
    'hero.btnTrack': 'Suivre un Colis',
    'hero.btnCalc': 'Calculateur Instantané',
    'hero.cac': 'Enregistré au Registre du Commerce (CAC)',
    'hero.hubs': 'Bureaux Physiques Directs',
    'hero.paar': 'Dédouanement Agréé',

    // Quick Tracker
    'tracker.title': 'Suivi Express de Cargaison',
    'tracker.sub': 'Recherche instantanée avec statut en temps réel',
    'tracker.refLabel': 'Référence de Suivi',
    'tracker.btn': 'Localiser le Colis',
    'tracker.demoLabel': 'Expéditions de démonstration :',

    // Shipping Cost Calculator
    'calc.tag': 'ESTIMATEUR DE FRET EN TEMPS RÉEL',
    'calc.title': 'Calculateur de Coût d\'Expédition',
    'calc.desc': 'Projections précises de fret porte-à-port et porte-à-porte basées sur le poids taxable, les dimensions et les grilles tarifaires des transporteurs partenaires.',
    'calc.modeAirPriority': 'Aérien Express (3-5 Jours)',
    'calc.modeAirStd': 'Aérien Standard (5-7 Jours)',
    'calc.modeOceanFcl': 'Maritime FCL (Conteneur Complet)',
    'calc.modeOceanLcl': 'Maritime LCL (Groupage / CBM)',
    'calc.modeDoor': 'Courrier Porte-à-Porte',
    'calc.modeRoRo': 'Véhicules RoRo',

    'calc.origin': 'Plateforme de Départ',
    'calc.destination': 'Port / Hub de Destination',
    'calc.category': 'Type de Marchandise',
    'calc.actualWeight': 'Poids Réel Brut',
    'calc.dimensions': 'Dimensions (L × l × H)',
    'calc.length': 'Longueur',
    'calc.width': 'Largeur',
    'calc.height': 'Hauteur',
    'calc.unitMetric': 'Métrique (kg / cm)',
    'calc.unitImperial': 'Impérial (lbs / in)',
    'calc.presets': 'Dimensions Standards',
    'calc.presetSmall': 'Petit Carton (30×20×15)',
    'calc.presetMed': 'Carton Moyen (50×40×30)',
    'calc.presetLarge': 'Caisse Master (80×60×50)',
    'calc.presetPallet': 'Palette Europe (120×80×120)',

    'calc.volumetricWeight': 'Poids Volumétrique',
    'calc.chargeableWeight': 'Poids Taxable Facturable',
    'calc.cbm': 'Volume Total (CBM / m³)',
    'calc.chargeableExplainer': 'Les compagnies aériennes et maritimes facturent sur la base de la valeur la plus élevée : poids réel ou poids volumétrique.',

    'calc.breakdownTitle': 'Détail Tarifaire et Frais',
    'calc.freightBase': 'Tarif de Base Transporteur',
    'calc.fuelSurcharge': 'Surcharge Carburant & Sûreté',
    'calc.handlingFee': 'Manutention Terminale & Scanner',
    'calc.customsDoc': 'Assistance Form M & Dédouanement',
    'calc.totalEstimate': 'Estimation Totale du Fret',
    'calc.transitWindow': 'Délai Moyen d\'Acheminement',
    'calc.disclaimer': 'Les estimations reflètent les tarifs de fret général et les taux de change actuels. La facture définitive peut varier selon les matières spéciales ou formalités sanitaires.',
    'calc.btnApplyQuote': 'Confirmer & Réserver le Fret',
    'calc.btnWhatsApp': 'Envoyer l\'Estimation sur WhatsApp',
    'calc.copied': 'Calcul copié dans le presse-papiers !',
    'calc.includeCustoms': 'Inclure le dédouanement nigérian & rapport PAAR',

    // Services
    'services.heading': 'CAPACITÉS LOGISTIQUES GLOBALES',
    'services.sub': 'Transport international de marchandises, manutention portuaire sécurisée et logistique automobile.',

    // Common
    'common.viewAll': 'Voir Détails',
    'common.currency': 'Devise',
    'common.search': 'Rechercher',
    'common.apply': 'Appliquer',
  },

  zh: {
    // Top Bar & Header
    'topbar.rc': '尼日利亚政府注册持牌国际货运代理企业',
    'topbar.lagos': '拉各斯',
    'topbar.london': '伦敦',
    'topbar.currency': '币种',
    'topbar.language': '语言',
    'topbar.login': '员工与客户登录',
    'topbar.portal': '客户中心',
    'topbar.ops': '调度操作台',
    'topbar.admin': '超级管理总控',
    'topbar.signout': '退出登录',

    // Navigation
    'nav.home': '首页',
    'nav.services': '核心业务',
    'nav.vehicles': '车辆代采海运',
    'nav.tracking': '货物轨迹追踪',
    'nav.quote': '获取精准报价',
    'nav.about': '关于我们',
    'nav.resources': '清关指南与问答',
    'nav.contact': '联系我们',
    'nav.calculator': '运费即时计算器',

    // Hero
    'hero.badge': '英国 • 尼日利亚 • 美国 • 中国 货运核心干线',
    'hero.title1': '助力企业跨越国界',
    'hero.title2': '货通全球商贸。',
    'hero.desc': '专业可靠的空运、海运及多式联运专线，连接中国及欧美至西非主要港口与内陆。专精尼日利亚 Form M 与 PAAR 清关批文、保税仓储及整车进口贸易。',
    'hero.btnQuote': '立即测算获取报价',
    'hero.btnTrack': '查询货物单号',
    'hero.btnCalc': '实时运费计算器',
    'hero.cac': '尼日利亚 CAC 企业注册',
    'hero.hubs': '中英尼直营物流网点',
    'hero.paar': '专业清关报关代理',

    // Quick Tracker
    'tracker.title': '快速运单追踪',
    'tracker.sub': '实时节点同步与全流程轨迹查看',
    'tracker.refLabel': '运单号 / 提单号',
    'tracker.btn': '立即查询',
    'tracker.demoLabel': '示例测试单号：',

    // Shipping Cost Calculator
    'calc.tag': '实时跨境运费智能核算',
    'calc.title': '国际运费实时计算器',
    'calc.desc': '基于实际重量、材积重、货物属性及航运公会实时挂牌价，快速计算门到港及双清到门预估成本。',
    'calc.modeAirPriority': '特快航空空运 (3-5天)',
    'calc.modeAirStd': '标准航空货运 (5-7天)',
    'calc.modeOceanFcl': '海运整柜 FCL (20GP/40HQ)',
    'calc.modeOceanLcl': '海运拼箱 LCL (按立方CBM)',
    'calc.modeDoor': '双清包税门到门快递',
    'calc.modeRoRo': '滚装滚卸 (汽车整车)',

    'calc.origin': '始发口岸 / 城市',
    'calc.destination': '目的港口 / 城市',
    'calc.category': '货物种类属性',
    'calc.actualWeight': '实际称重毛重',
    'calc.dimensions': '外包装尺寸 (长 × 宽 × 高)',
    'calc.length': '长',
    'calc.width': '宽',
    'calc.height': '高',
    'calc.unitMetric': '公制单位 (kg / cm)',
    'calc.unitImperial': '英制单位 (lbs / in)',
    'calc.presets': '常用箱型快速选择',
    'calc.presetSmall': '小型纸箱 (30×20×15)',
    'calc.presetMed': '中型标准箱 (50×40×30)',
    'calc.presetLarge': '重型主板箱 (80×60×50)',
    'calc.presetPallet': '标准托盘 (120×80×120)',

    'calc.volumetricWeight': '材积重量 (Volumetric Weight)',
    'calc.chargeableWeight': '计费重量 (Chargeable Weight)',
    'calc.cbm': '总方数 (CBM 立方米)',
    'calc.chargeableExplainer': '国际空运与海运按照行业惯例取【实际称重】与【体积折算重量】中较大者作为计费重量。',

    'calc.breakdownTitle': '费用明细核算清单',
    'calc.freightBase': '国际航线基础运费',
    'calc.fuelSurcharge': '燃油与航空港口安检附加费',
    'calc.handlingFee': '码头装卸仓储与过机扫描费',
    'calc.customsDoc': 'Form M 与 PAAR 清关单证协助费',
    'calc.totalEstimate': '预估总运费合计',
    'calc.transitWindow': '预计航程时效',
    'calc.disclaimer': '测算金额基于普通商业货物与即时汇率，实际运费可能因危险品类别、海关验关费或船司旺季附加费略有微调。',
    'calc.btnApplyQuote': '带入数据并提交正式订舱',
    'calc.btnWhatsApp': '通过微信/WhatsApp发送核算单',
    'calc.copied': '费用明细已成功复制到剪贴板！',
    'calc.includeCustoms': '包含尼日利亚进口海关清关与PAAR认证辅导',

    // Services
    'services.heading': '全链路国际物流服务',
    'services.sub': '空运头程、集装箱海运、阿帕帕港区清关、保税拖车运输及高端车辆采购。',

    // Common
    'common.viewAll': '查看详情',
    'common.currency': '币种',
    'common.search': '搜索',
    'common.apply': '应用',
  },

  es: {
    // Top Bar & Header
    'topbar.rc': 'Agente de Carga Internacional Autorizado',
    'topbar.lagos': 'Lagos',
    'topbar.london': 'Londres',
    'topbar.currency': 'MONEDA',
    'topbar.language': 'IDIOMA',
    'topbar.login': 'Acceso Personal y Clientes',
    'topbar.portal': 'Portal del Cliente',
    'topbar.ops': 'Mesa de Operaciones',
    'topbar.admin': 'Super Administrador',
    'topbar.signout': 'Cerrar sesión',

    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.vehicles': 'Importación de Autos',
    'nav.tracking': 'Rastrear Envío',
    'nav.quote': 'Cotizar Envío',
    'nav.about': 'Nosotros',
    'nav.resources': 'Recursos y FAQ',
    'nav.contact': 'Contacto',
    'nav.calculator': 'Calculadora de Flete',

    // Hero
    'hero.badge': 'CORREDORES DE CARGA REINO UNIDO • NIGERIA • EE.UU. • CHINA',
    'hero.title1': 'LLEVE SU NEGOCIO',
    'hero.title2': 'MÁS ALLÁ DE LAS FRONTERAS.',
    'hero.desc': 'Soluciones integrales de flete aéreo, marítimo y terrestre que conectan a empresas y particulares con los mercados globales. Expertos en trámites aduaneros Form M, PAAR y comercio automotriz.',
    'hero.btnQuote': 'Cotizar Flete Marítimo/Aéreo',
    'hero.btnTrack': 'Rastrear Carga',
    'hero.btnCalc': 'Calculadora en Vivo',
    'hero.cac': 'Empresa Registrada en CAC',
    'hero.hubs': 'Oficinas Físicas Propias',
    'hero.paar': 'Gestión Aduanera Certificada',

    // Quick Tracker
    'tracker.title': 'Rastreador Rápido de Envíos',
    'tracker.sub': 'Consulta en tiempo real con estado actualizado',
    'tracker.refLabel': 'Número de Seguimiento',
    'tracker.btn': 'Localizar Carga',
    'tracker.demoLabel': 'Envíos de prueba:',

    // Shipping Cost Calculator
    'calc.tag': 'ESTIMADOR DE FLETES EN TIEMPO REAL',
    'calc.title': 'Calculadora de Costos de Envío',
    'calc.desc': 'Cálculos transparentes puerta a puerto y puerta a puerta según peso facturable, dimensiones y tarifas certificadas de aerolíneas y navieras.',
    'calc.modeAirPriority': 'Aéreo Exprés (3-5 Días)',
    'calc.modeAirStd': 'Aéreo Estándar (5-7 Días)',
    'calc.modeOceanFcl': 'Marítimo FCL (Contenedor Completo)',
    'calc.modeOceanLcl': 'Marítimo LCL (Grupaje / CBM)',
    'calc.modeDoor': 'Puerta a Puerta con Aduana',
    'calc.modeRoRo': 'Vehículos RoRo',

    'calc.origin': 'Punto de Origen',
    'calc.destination': 'Puerto / Centro de Destino',
    'calc.category': 'Clasificación de Mercancía',
    'calc.actualWeight': 'Peso Bruto Real',
    'calc.dimensions': 'Dimensiones (Largo × Ancho × Alto)',
    'calc.length': 'Largo',
    'calc.width': 'Ancho',
    'calc.height': 'Alto',
    'calc.unitMetric': 'Métrico (kg / cm)',
    'calc.unitImperial': 'Imperial (lbs / in)',
    'calc.presets': 'Medidas Habituales',
    'calc.presetSmall': 'Caja Pequeña (30×20×15)',
    'calc.presetMed': 'Caja Estándar (50×40×30)',
    'calc.presetLarge': 'Caja Grande Master (80×60×50)',
    'calc.presetPallet': 'Pallet Europeo (120×80×120)',

    'calc.volumetricWeight': 'Peso Volumétrico',
    'calc.chargeableWeight': 'Peso Facturable (Chargeable)',
    'calc.cbm': 'Volumen Total (CBM / m³)',
    'calc.chargeableExplainer': 'Las aerolíneas y navieras facturan tomando el valor más alto entre el peso real de báscula y el peso volumétrico.',

    'calc.breakdownTitle': 'Desglose Detallado de Costos',
    'calc.freightBase': 'Tarifa Base de Flete Internacional',
    'calc.fuelSurcharge': 'Recargo por Combustible y Seguridad',
    'calc.handlingFee': 'Manipulación Terminal y Escáner',
    'calc.customsDoc': 'Asesoría Form M y Documentación',
    'calc.totalEstimate': 'Costo Total Estimado del Envío',
    'calc.transitWindow': 'Tiempo Estimado de Tránsito',
    'calc.disclaimer': 'Precios estimados basados en carga general y tipos de cambio vigentes. Pueden aplicar recargos por mercancías peligrosas o inspecciones especiales.',
    'calc.btnApplyQuote': 'Confirmar Datos y Reservar Flete',
    'calc.btnWhatsApp': 'Enviar Cotización a WhatsApp',
    'calc.copied': '¡Detalles de la cotización copiados!',
    'calc.includeCustoms': 'Incluir desaduanaje en Nigeria y reporte PAAR',

    // Services
    'services.heading': 'SERVICIOS LOGÍSTICOS INTEGRALES',
    'services.sub': 'Transporte internacional de carga, almacenaje portuario y logística para vehículos.',

    // Common
    'common.viewAll': 'Ver Detalles',
    'common.currency': 'Moneda',
    'common.search': 'Buscar',
    'common.apply': 'Aplicar',
  },

  ar: {
    // Top Bar & Header
    'topbar.rc': 'وكيل شحن بحري وجوي دولي معتمد ومسجل',
    'topbar.lagos': 'لاغوس',
    'topbar.london': 'لندن',
    'topbar.currency': 'العملة',
    'topbar.language': 'اللغة',
    'topbar.login': 'تسجيل دخول الموظفين والعملاء',
    'topbar.portal': 'بوابة العملاء',
    'topbar.ops': 'مكتب العمليات اللوجستية',
    'topbar.admin': 'الإدارة العامة العليا',
    'topbar.signout': 'تسجيل الخروج',

    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'خدماتنا',
    'nav.vehicles': 'استيراد وشحن السيارات',
    'nav.tracking': 'تتبع الشحنات',
    'nav.quote': 'طلب تسعيرة شحن',
    'nav.about': 'من نحن',
    'nav.resources': 'دليل الجمارك والأسئلة الشائعة',
    'nav.contact': 'اتصل بنا',
    'nav.calculator': 'حاسبة أسعار الشحن',

    // Hero
    'hero.badge': 'خطوط شحن مباشرة بين بريطانيا • نيجيريا • أمريكا • الصين • دبي',
    'hero.title1': 'انطلق بأعمالك وتجارتك',
    'hero.title2': 'عبر كل الحدود العالمية.',
    'hero.desc': 'حلول شحن جوي وبحري وبري موثوقة تربط الشركات والأفراد بالأسواق العالمية. متخصصون في التخليص الجمركي (Form M & PAAR) وتجارة وتوريد السيارات.',
    'hero.btnQuote': 'احصل على عرض سعر فوري',
    'hero.btnTrack': 'تتبع الشحنة الآن',
    'hero.btnCalc': 'حاسبة التكلفة المباشرة',
    'hero.cac': 'شركة مسجلة رسمياً لدى CAC',
    'hero.hubs': 'مكاتب ومستودعات مباشرة',
    'hero.paar': 'تخليص جمركي معتمد',

    // Quick Tracker
    'tracker.title': 'تتبع سريع للشحنة',
    'tracker.sub': 'بحث فوري مع تحديث مباشر للمحطات',
    'tracker.refLabel': 'رقم التتبع أو بوليصة الشحن',
    'tracker.btn': 'تحديد موقع الشحنة',
    'tracker.demoLabel': 'شحنات تجريبية:',

    // Shipping Cost Calculator
    'calc.tag': 'حاسبة أسعار الشحن المباشرة',
    'calc.title': 'حاسبة تكلفة الشحن والجمارك',
    'calc.desc': 'تقديرات دقيقة من الباب إلى الميناء أو من الباب إلى الباب بناءً على الوزن الحجمي، الأبعاد، وأسعار الناقلين المعتمدة.',
    'calc.modeAirPriority': 'شحن جوي سريع (3-5 أيام)',
    'calc.modeAirStd': 'شحن جوي اقتصادي (5-7 أيام)',
    'calc.modeOceanFcl': 'شحن بحري حاوية كاملة (FCL)',
    'calc.modeOceanLcl': 'شحن بحري جزئي (LCL بالـ CBM)',
    'calc.modeDoor': 'خدمة البريد من الباب للباب',
    'calc.modeRoRo': 'شحن السيارات (RoRo)',

    'calc.origin': 'بلد / ميناء الإقلاع',
    'calc.destination': 'بلد / ميناء الوصول',
    'calc.category': 'تصنيف البضاعة',
    'calc.actualWeight': 'الوزن الفعلي الإجمالي',
    'calc.dimensions': 'الأبعاد (الطول × العرض × الارتفاع)',
    'calc.length': 'الطول',
    'calc.width': 'العرض',
    'calc.height': 'الارتفاع',
    'calc.unitMetric': 'متري (كجم / سم)',
    'calc.unitImperial': 'إمبراطوري (باوند / بوصة)',
    'calc.presets': 'أحجام قياسية جاهزة',
    'calc.presetSmall': 'صندوق صغير (30×20×15)',
    'calc.presetMed': 'كرتون متوسط (50×40×30)',
    'calc.presetLarge': 'صندوق خشب كبير (80×60×50)',
    'calc.presetPallet': 'طبلية أوروبية (120×80×120)',

    'calc.volumetricWeight': 'الوزن الحجمي التقديري',
    'calc.chargeableWeight': 'الوزن الخاضع للرسوم (الأعلى)',
    'calc.cbm': 'الحجم الإجمالي بالمتر المكعب (CBM)',
    'calc.chargeableExplainer': 'تعتمد خطوط الطيران والملاحة البحرية الوزن الأعلى بين الوزن الفعلي بالميزان والوزن الحجمي في حساب التكلفة.',

    'calc.breakdownTitle': 'تفاصيل الرسوم والتكاليف',
    'calc.freightBase': 'أجرة الشحن الأساسية للناقل',
    'calc.fuelSurcharge': 'رسوم الوقود والأمان في المطار / الميناء',
    'calc.handlingFee': 'رسوم المناولة والتفريغ والفحص',
    'calc.customsDoc': 'إعداد وثائق Form M والتخليص الجمركي',
    'calc.totalEstimate': 'إجمالي تكلفة الشحن التقديرية',
    'calc.transitWindow': 'المدة التقديرية للوصول',
    'calc.disclaimer': 'الأسعار مبنية على البضائع العامة العادية وأسعار الصرف اللحظية. قد تطبق رسوم إضافية على المواد الخطرة أو الفحص الخاص.',
    'calc.btnApplyQuote': 'تأكيد الحساب ومتابعة الحجز',
    'calc.btnWhatsApp': 'إرسال الحسبة إلى واتساب المبيعات',
    'calc.copied': 'تم نسخ تفاصيل التكلفة بنجاح!',
    'calc.includeCustoms': 'تشمل التخليص الجمركي في نيجيريا وإصدار تقرير PAAR',

    // Services
    'services.heading': 'خدمات لوجستية متكاملة',
    'services.sub': 'شحن بضائع دولي، تخزين ومناولة في الموانئ، وحلول متقدمة لشحن وتجارة السيارات.',

    // Common
    'common.viewAll': 'عرض التفاصيل',
    'common.currency': 'العملة',
    'common.search': 'بحث',
    'common.apply': 'تطبيق',
  },

  de: {
    // Top Bar & Header
    'topbar.rc': 'Zertifizierter Internationaler Spediteur & Frachtführer',
    'topbar.lagos': 'Lagos',
    'topbar.london': 'London',
    'topbar.currency': 'WÄHRUNG',
    'topbar.language': 'SPRACHE',
    'topbar.login': 'Mitarbeiter & Kunden-Login',
    'topbar.portal': 'Kundenportal',
    'topbar.ops': 'Disposition & Betrieb',
    'topbar.admin': 'Super-Administrator',
    'topbar.signout': 'Abmelden',

    // Navigation
    'nav.home': 'Startseite',
    'nav.services': 'Dienstleistungen',
    'nav.vehicles': 'Fahrzeugbeschaffung',
    'nav.tracking': 'Sendungsverfolgung',
    'nav.quote': 'Frachtangebot',
    'nav.about': 'Über uns',
    'nav.resources': 'Ressourcen & FAQ',
    'nav.contact': 'Kontakt',
    'nav.calculator': 'Frachtkostenrechner',

    // Hero
    'hero.badge': 'FRACHTKORRIDORE UK • NIGERIA • USA • CHINA',
    'hero.title1': 'BRINGEN SIE IHR UNTERNEHMEN',
    'hero.title2': 'ÜBER ALLE GRENZEN HINAUS.',
    'hero.desc': 'Zuverlässige Luft-, See- und Straßengütertransporte für Unternehmen und Privatkunden. Spezialisiert auf nigerianische Form M- und PAAR-Zollabfertigung sowie Automobilhandel.',
    'hero.btnQuote': 'Frachtangebot anfordern',
    'hero.btnTrack': 'Sendung verfolgen',
    'hero.btnCalc': 'Echtzeit-Rechner',
    'hero.cac': 'CAC-Unternehmensregistrierung',
    'hero.hubs': 'Eigene Standorte vor Ort',
    'hero.paar': 'Zollabfertigung & Brokerage',

    // Quick Tracker
    'tracker.title': 'Schnell-Sendungsverfolgung',
    'tracker.sub': 'Echtzeit-Statusabfrage aller Meilensteine',
    'tracker.refLabel': 'Tracking-Referenznummer',
    'tracker.btn': 'Sendung lokalisieren',
    'tracker.demoLabel': 'Beispiel-Sendungen:',

    // Shipping Cost Calculator
    'calc.tag': 'ECHTZEIT-FRACHTKOSTENRECHNER',
    'calc.title': 'Versandkosten- & Zollkalkulator',
    'calc.desc': 'Genaue Frachtschätzungen von Tür zu Hafen oder Haus zu Haus, berechnet nach Volumengewicht, Maßen und aktuellen Linientarifen.',
    'calc.modeAirPriority': 'Luftfracht Express (3-5 Tage)',
    'calc.modeAirStd': 'Luftfracht Standard (5-7 Tage)',
    'calc.modeOceanFcl': 'Seefracht FCL (Vollcontainer)',
    'calc.modeOceanLcl': 'Seefracht LCL (Stückgut / CBM)',
    'calc.modeDoor': 'Tür-zu-Tür Kurierdienst',
    'calc.modeRoRo': 'Fahrzeugtransport (RoRo)',

    'calc.origin': 'Abgangshafen / Ort',
    'calc.destination': 'Zielhafen / Hub',
    'calc.category': 'Frachtklassifizierung',
    'calc.actualWeight': 'Tatsächliches Bruttogewicht',
    'calc.dimensions': 'Abmessungen (L × B × H)',
    'calc.length': 'Länge',
    'calc.width': 'Breite',
    'calc.height': 'Höhe',
    'calc.unitMetric': 'Metrisch (kg / cm)',
    'calc.unitImperial': 'Imperial (lbs / in)',
    'calc.presets': 'Standard-Kartonagen',
    'calc.presetSmall': 'Kleiner Karton (30×20×15)',
    'calc.presetMed': 'Standard-Karton (50×40×30)',
    'calc.presetLarge': 'Große Masterbox (80×60×50)',
    'calc.presetPallet': 'Europalette (120×80×120)',

    'calc.volumetricWeight': 'Volumengewicht',
    'calc.chargeableWeight': 'Frachtpflichtiges Gewicht',
    'calc.cbm': 'Gesamtvolumen (CBM / m³)',
    'calc.chargeableExplainer': 'Fluggesellschaften und Reedereien berechnen den jeweils höheren Wert aus Wiegegewicht und Volumengewicht.',

    'calc.breakdownTitle': 'Kosten- und Tarifaufstellung',
    'calc.freightBase': 'Basisfrachtrate des Frachtführers',
    'calc.fuelSurcharge': 'Treibstoff- & Hafensicherheitszuschlag',
    'calc.handlingFee': 'Terminalabfertigung & Röntgenscan',
    'calc.customsDoc': 'Zolldokumentation & Form M Unterstützung',
    'calc.totalEstimate': 'Geschätzte Gesamtkosten',
    'calc.transitWindow': 'Geschätzte Laufzeit',
    'calc.disclaimer': 'Schätzungen basieren auf Stückgut und aktuellen Wechselkursen. Finale Abrechnung kann je nach Gefahrgutstatus oder behördlicher Beschau abweichen.',
    'calc.btnApplyQuote': 'In Buchung übernehmen',
    'calc.btnWhatsApp': 'Berechnung per WhatsApp senden',
    'calc.copied': 'Berechnungsübersicht in die Zwischenablage kopiert!',
    'calc.includeCustoms': 'Inklusive Zollabwicklung Nigeria & PAAR-Zertifikat',

    // Services
    'services.heading': 'UMFASSENDE FRACHTLÖSUNGEN',
    'services.sub': 'Internationaler Güterverkehr, sichere Hafenterminalabwicklung und Fahrzeughandelslogistik.',

    // Common
    'common.viewAll': 'Details ansehen',
    'common.currency': 'Währung',
    'common.search': 'Suchen',
    'common.apply': 'Anwenden',
  },
};

export const getTranslation = (key: string, lang: SupportedLanguage = 'en', fallback?: string): string => {
  const langDict = translations[lang] || translations.en;
  if (langDict && langDict[key]) {
    return langDict[key];
  }
  if (translations.en && translations.en[key]) {
    return translations.en[key];
  }
  return fallback || key;
};
