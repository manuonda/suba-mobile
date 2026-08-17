import type { AppLocale } from "./types";

export type { AppLocale } from "./types";

export interface Messages {
  welcomeTagline: string;
  featureNearTitle: string;
  featureNearDesc: string;
  featureMapTitle: string;
  featureMapDesc: string;
  featureArrivalsTitle: string;
  featureArrivalsDesc: string;
  btnAccess: string;
  btnAccessLoading: string;
  languageLabel: string;
  languageHint: string;
  tabMap: string;
  tabSearch: string;
  tabConfig: string;
  brandTagline: string;
  /** Texto corto en la barra lateral desktop (sin tabs inferiores en móvil). */
  sidebarMapHint: string;
  filterSubtes: string;
  filterBus: string;
  filterStops: string;
  filterAlerts: string;
  configTitle: string;
  configLanguage: string;
  configLanguageHint: string;
  areaOutOfService: string;
  alertOutOfArea: string;
  statusDefaultCity: string;
  linesAll: string;
  alertsEmpty: string;
  alertsEmptySub: string;
  alertsSectionTitle: string;
  alertsRefresh: string;
  /** Mientras se vuelve a pedir el feed de alertas (refetch). */
  alertsRefreshing: string;
  /** Accesibilidad: handle del bottom sheet en móvil */
  sheetDragHandle: string;
  configBack: string;
  configRowLanguage: string;
  configRowTarifas: string;
  configRowAbout: string;
  configAboutTitle: string;
  configAboutTagline: string;
  configAboutVersionLabel: string;
  configTarifasSectionTitle: string;
  configTarifasDisclaimer: string;
  configTarifasOfficialLink: string;
  /** Resumen cuando el idioma no es español */
  configTarifasIntroShort: string;
  configTarifasColServicio: string;
  configTarifasTripsPerMonth: string;
  configTarifasColTarifa: string;
  configTarifasColSubeNoNom: string;
  configTarifasTableNote: string;
  configRowFeedback: string;
  configFeedbackTitle: string;
  configFeedbackHint: string;
  configFeedbackEmailLabel: string;
  configFeedbackMessageLabel: string;
  configFeedbackSubmit: string;
  configFeedbackSending: string;
  configFeedbackSuccess: string;
  configFeedbackError: string;
  configFeedbackSendAnother: string;
  configRowDonate: string;
  configDonateTitle: string;
  configDonateIntro: string;
  configDonateCafecito: string;
  configDonateOtherArgentina: string;
}

export const MESSAGES: Record<AppLocale, Messages> = {
  es: {
    welcomeTagline: "Transporte del AMBA · Buenos Aires",
    featureNearTitle: "Paradas cercanas",
    featureNearDesc: "Colectivos y subtes a tu alrededor",
    featureMapTitle: "Mapa en tiempo real",
    featureMapDesc: "Líneas, estaciones y recorridos del AMBA",
    featureArrivalsTitle: "Próximas llegadas",
    featureArrivalsDesc: "Cuándo llega tu próximo subte",
    btnAccess: "Acceder",
    btnAccessLoading: "Obteniendo ubicación…",
    languageLabel: "Idioma",
    languageHint:
      "Solo cambia textos de la interfaz. Nombres de calles, estaciones y datos en vivo no se traducen.",
    tabMap: "Mapa",
    tabSearch: "Buscar",
    tabConfig: "Config",
    brandTagline: "Transporte AMBA",
    sidebarMapHint: "Listas y ajustes: usá los filtros bajo el mapa (Subtes · Bus · Paradas · Config).",
    filterSubtes: "Subtes",
    filterBus: "Bus",
    filterStops: "Paradas",
    filterAlerts: "Alertas",
    configTitle: "Configuración",
    configLanguage: "Idioma de la aplicación",
    configLanguageHint:
      "Cambiar aquí o en la pantalla de inicio. Los datos de mapa y redes mantienen su idioma original.",
    areaOutOfService:
      "Fuera del área de servicio (AMBA). Mostrando Buenos Aires como referencia.",
    alertOutOfArea:
      "Tu ubicación no está dentro del área de servicio (AMBA). Se mostrará Buenos Aires como referencia para consultar paradas y subtes.",
    statusDefaultCity: "Buenos Aires",
    linesAll: "Todas las líneas",
    alertsEmpty: "Sin alertas activas",
    alertsEmptySub: "El servicio de subtes funciona con normalidad",
    alertsSectionTitle: "Alertas de servicio",
    alertsRefresh: "Actualizar",
    alertsRefreshing: "Obteniendo alertas…",
    sheetDragHandle: "Arrastrar panel: más mapa o más lista",
    configBack: "Volver",
    configRowLanguage: "Idioma",
    configRowTarifas: "Cuadro tarifario",
    configRowAbout: "Acerca de",
    configAboutTitle: "Suba",
    configAboutTagline: "Transporte del AMBA en tiempo real.",
    configAboutVersionLabel: "Versión",
    configTarifasSectionTitle: "Tarifas Subte (referencia)",
    configTarifasDisclaimer:
      "Información referencial. Valores y condiciones vigentes en la fuente oficial (Emova).",
    configTarifasOfficialLink: "Abrir cuadro oficial en Emova",
    configTarifasIntroShort:
      "Tarifas con descuentos por cantidad de viajes mensuales. Consultá el detalle completo en el sitio de Emova.",
    configTarifasColServicio: "Servicio",
    configTarifasTripsPerMonth: "Viajes",
    configTarifasColTarifa: "Tarifa",
    configTarifasColSubeNoNom: "SUBE no nom.",
    configTarifasTableNote: "Importes en pesos argentinos (ARS), referencia.",
    configRowFeedback: "Enviar comentarios",
    configFeedbackTitle: "Comentarios y mejoras",
    configFeedbackHint: "Contanos qué te gustaría mejorar o qué falló.",
    configFeedbackEmailLabel: "Correo (opcional)",
    configFeedbackMessageLabel: "Mensaje",
    configFeedbackSubmit: "Enviar",
    configFeedbackSending: "Enviando…",
    configFeedbackSuccess: "¡Gracias! Tu mensaje fue recibido.",
    configFeedbackError: "No se pudo enviar. Probá de nuevo más tarde.",
    configFeedbackSendAnother: "Enviar otro mensaje",
    configRowDonate: "Apoyar el proyecto",
    configDonateTitle: "Donar",
    configDonateIntro:
      "Si te resulta útil la app, podés colaborar con un café o un aporte. ¡Gracias!",
    configDonateCafecito: "Cafecito",
    configDonateOtherArgentina: "Otra opción (Argentina)",
  },

  en: {
    welcomeTagline: "AMBA transport · Buenos Aires",
    featureNearTitle: "Nearby stops",
    featureNearDesc: "Buses and subte around you",
    featureMapTitle: "Live map",
    featureMapDesc: "Lines, stations and AMBA routes",
    featureArrivalsTitle: "Next arrivals",
    featureArrivalsDesc: "When your next subte arrives",
    btnAccess: "Continue",
    btnAccessLoading: "Getting location…",
    languageLabel: "Language",
    languageHint:
      "Only UI labels change. Street names, stations and live data stay in their original language.",
    tabMap: "Map",
    tabSearch: "Search",
    tabConfig: "Settings",
    brandTagline: "AMBA transport",
    sidebarMapHint: "Lists and settings: use the chips under the map (Subte · Bus · Stops · Settings).",
    filterSubtes: "Subte",
    filterBus: "Bus",
    filterStops: "Stops",
    filterAlerts: "Alerts",
    configTitle: "Settings",
    configLanguage: "App language",
    configLanguageHint:
      "Change here or on the welcome screen. Map and feed data keep their original language.",
    areaOutOfService:
      "Outside the service area (AMBA). Showing Buenos Aires as reference.",
    alertOutOfArea:
      "Your location is outside the service area (AMBA). Buenos Aires will be shown as reference for stops and subte.",
    statusDefaultCity: "Buenos Aires",
    linesAll: "All lines",
    alertsEmpty: "No active alerts",
    alertsEmptySub: "Subte service is running normally",
    alertsSectionTitle: "Service alerts",
    alertsRefresh: "Refresh",
    alertsRefreshing: "Fetching alerts…",
    sheetDragHandle: "Drag panel: more map or more list",
    configBack: "Back",
    configRowLanguage: "Language",
    configRowTarifas: "Fare table",
    configRowAbout: "About",
    configAboutTitle: "Suba",
    configAboutTagline: "Real-time AMBA transport.",
    configAboutVersionLabel: "Version",
    configTarifasSectionTitle: "Subte fares (reference)",
    configTarifasDisclaimer:
      "For reference only. Official rates and conditions are on Emova’s website.",
    configTarifasOfficialLink: "Open official fare table (Emova)",
    configTarifasIntroShort:
      "Fares include volume discounts by monthly trips. See Emova for full details.",
    configTarifasColServicio: "Service",
    configTarifasTripsPerMonth: "Trips",
    configTarifasColTarifa: "Fare",
    configTarifasColSubeNoNom: "Non-nominal SUBE",
    configTarifasTableNote: "Amounts in Argentine pesos (ARS), indicative.",
    configRowFeedback: "Send feedback",
    configFeedbackTitle: "Feedback & improvements",
    configFeedbackHint: "Tell us what you’d like to improve or what went wrong.",
    configFeedbackEmailLabel: "Email (optional)",
    configFeedbackMessageLabel: "Message",
    configFeedbackSubmit: "Send",
    configFeedbackSending: "Sending…",
    configFeedbackSuccess: "Thanks! Your message was received.",
    configFeedbackError: "Could not send. Please try again later.",
    configFeedbackSendAnother: "Send another message",
    configRowDonate: "Support the project",
    configDonateTitle: "Donate",
    configDonateIntro: "If the app is useful to you, you can chip in with a coffee or a tip. Thank you!",
    configDonateCafecito: "Cafecito",
    configDonateOtherArgentina: "Other option (Argentina)",
  },

  "pt-BR": {
    welcomeTagline: "Transporte AMBA · Buenos Aires",
    featureNearTitle: "Paradas próximas",
    featureNearDesc: "Ônibus e subte ao seu redor",
    featureMapTitle: "Mapa en vivo",
    featureMapDesc: "Linhas, estações e rotas do AMBA",
    featureArrivalsTitle: "Próximas chegadas",
    featureArrivalsDesc: "Quando chega seu próximo subte",
    btnAccess: "Entrar",
    btnAccessLoading: "Obtendo localização…",
    languageLabel: "Idioma",
    languageHint:
      "Altera apenas textos da interface. Ruas, estações e dados ao vivo não são traduzidos.",
    tabMap: "Mapa",
    tabSearch: "Buscar",
    tabConfig: "Config",
    brandTagline: "Transporte AMBA",
    sidebarMapHint: "Listas e ajustes: use os filtros abaixo do mapa (Subte · Ônibus · Paradas · Config).",
    filterSubtes: "Subte",
    filterBus: "Ônibus",
    filterStops: "Paradas",
    filterAlerts: "Alertas",
    configTitle: "Configurações",
    configLanguage: "Idioma do app",
    configLanguageHint:
      "Altere aqui ou na tela inicial. Dados do mapa permanecem no idioma original.",
    areaOutOfService:
      "Fora da área de serviço (AMBA). Mostrando Buenos Aires como referência.",
    alertOutOfArea:
      "Sua localização está fora da área de serviço (AMBA). Buenos Aires será mostrada como referência para paradas e subte.",
    statusDefaultCity: "Buenos Aires",
    linesAll: "Todas as linhas",
    alertsEmpty: "Sem alertas ativos",
    alertsEmptySub: "O serviço de subte opera normalmente",
    alertsSectionTitle: "Alertas de serviço",
    alertsRefresh: "Atualizar",
    alertsRefreshing: "Obtendo alertas…",
    sheetDragHandle: "Arrastar painel: mais mapa ou mais lista",
    configBack: "Voltar",
    configRowLanguage: "Idioma",
    configRowTarifas: "Tabela de tarifas",
    configRowAbout: "Sobre",
    configAboutTitle: "Suba",
    configAboutTagline: "Transporte AMBA em tempo real.",
    configAboutVersionLabel: "Versão",
    configTarifasSectionTitle: "Tarifas do Subte (referência)",
    configTarifasDisclaimer:
      "Informação de referência. Valores e condições oficiais no site da Emova.",
    configTarifasOfficialLink: "Abrir tabela oficial na Emova",
    configTarifasIntroShort:
      "Tarifas com desconto por volume de viagens mensais. Veja a Emova para o detalhe completo.",
    configTarifasColServicio: "Serviço",
    configTarifasTripsPerMonth: "Viagens",
    configTarifasColTarifa: "Tarifa",
    configTarifasColSubeNoNom: "SUBE não nominal",
    configTarifasTableNote: "Valores em pesos argentinos (ARS), referência.",
    configRowFeedback: "Enviar comentários",
    configFeedbackTitle: "Comentários e melhorias",
    configFeedbackHint: "Diga o que podemos melhorar ou o que deu errado.",
    configFeedbackEmailLabel: "E-mail (opcional)",
    configFeedbackMessageLabel: "Mensagem",
    configFeedbackSubmit: "Enviar",
    configFeedbackSending: "Enviando…",
    configFeedbackSuccess: "Obrigado! Sua mensagem foi recebida.",
    configFeedbackError: "Não foi possível enviar. Tente de novo mais tarde.",
    configFeedbackSendAnother: "Enviar outra mensagem",
    configRowDonate: "Apoiar o projeto",
    configDonateTitle: "Doar",
    configDonateIntro:
      "Se o app te ajuda, você pode colaborar com um cafézinho ou uma contribuição. Obrigado!",
    configDonateCafecito: "Cafecito",
    configDonateOtherArgentina: "Outra opção (Argentina)",
  },

  pl: {
    welcomeTagline: "Transport AMBA · Buenos Aires",
    featureNearTitle: "Przystanki w pobliżu",
    featureNearDesc: "Autobusy i subte w pobliżu",
    featureMapTitle: "Mapa na żywo",
    featureMapDesc: "Linie, stacje i trasy AMBA",
    featureArrivalsTitle: "Najbliższe przyjazdy",
    featureArrivalsDesc: "Kiedy przyjedzie następny subte",
    btnAccess: "Wejdź",
    btnAccessLoading: "Pobieranie lokalizacji…",
    languageLabel: "Język",
    languageHint:
      "Zmienia tylko etykiety interfejsu. Nazwy ulic, stacji i dane na żywo pozostają w oryginale.",
    tabMap: "Mapa",
    tabSearch: "Szukaj",
    tabConfig: "Ustawienia",
    brandTagline: "Transport AMBA",
    sidebarMapHint: "Listy i ustawienia: przyciski pod mapą (Subte · Autobus · Przystanki · Ustawienia).",
    filterSubtes: "Subte",
    filterBus: "Autobus",
    filterStops: "Przystanki",
    filterAlerts: "Alerty",
    configTitle: "Ustawienia",
    configLanguage: "Język aplikacji",
    configLanguageHint:
      "Zmień tutaj lub na ekranie powitalnym. Dane mapy zachowują język źródłowy.",
    areaOutOfService:
      "Poza obszarem usług (AMBA). Pokazujemy Buenos Aires jako odniesienie.",
    alertOutOfArea:
      "Twoja lokalizacja jest poza obszarem usług (AMBA). Buenos Aires zostanie pokazane jako odniesienie dla przystanków i subte.",
    statusDefaultCity: "Buenos Aires",
    linesAll: "Wszystkie linie",
    alertsEmpty: "Brak aktywnych alertów",
    alertsEmptySub: "Serwis subte działa prawidłowo",
    alertsSectionTitle: "Alerty eksploatacyjne",
    alertsRefresh: "Odśwież",
    alertsRefreshing: "Pobieranie alertów…",
    sheetDragHandle: "Przeciągnij panel: więcej mapy lub listy",
    configBack: "Wstecz",
    configRowLanguage: "Język",
    configRowTarifas: "Tabela taryf",
    configRowAbout: "O aplikacji",
    configAboutTitle: "Suba",
    configAboutTagline: "Transport AMBA w czasie rzeczywistym.",
    configAboutVersionLabel: "Wersja",
    configTarifasSectionTitle: "Taryfy Subte (informacja)",
    configTarifasDisclaimer:
      "Informacja poglądowa. Oficjalne stawki i warunki na stronie Emova.",
    configTarifasOfficialLink: "Otwórz oficjalną tabelę (Emova)",
    configTarifasIntroShort:
      "Opłaty z rabatem za liczbę przejazdów w miesiącu. Szczegóły na stronie Emova.",
    configTarifasColServicio: "Usługa",
    configTarifasTripsPerMonth: "Przejazdy",
    configTarifasColTarifa: "Taryfa",
    configTarifasColSubeNoNom: "SUBE bez imienia",
    configTarifasTableNote: "Kwoty w pesos argentyńskich (ARS), orientacyjnie.",
    configRowFeedback: "Wyślij opinię",
    configFeedbackTitle: "Opinie i ulepszenia",
    configFeedbackHint: "Napisz, co poprawić lub co poszło nie tak.",
    configFeedbackEmailLabel: "E-mail (opcjonalnie)",
    configFeedbackMessageLabel: "Treść",
    configFeedbackSubmit: "Wyślij",
    configFeedbackSending: "Wysyłanie…",
    configFeedbackSuccess: "Dziękujemy! Wiadomość została zapisana.",
    configFeedbackError: "Nie udało się wysłać. Spróbuj później.",
    configFeedbackSendAnother: "Wyślij kolejną wiadomość",
    configRowDonate: "Wesprzyj projekt",
    configDonateTitle: "Wsparcie",
    configDonateIntro:
      "Jeśli aplikacja jest dla Ciebie przydatna, możesz dorzucić się kawą lub datkiem. Dzięki!",
    configDonateCafecito: "Cafecito",
    configDonateOtherArgentina: "Inna opcja (Argentyna)",
  },

  "en-US": {
    welcomeTagline: "AMBA transit · Buenos Aires",
    featureNearTitle: "Nearby stops",
    featureNearDesc: "Buses and subte around you",
    featureMapTitle: "Live map",
    featureMapDesc: "Lines, stations and AMBA routes",
    featureArrivalsTitle: "Next arrivals",
    featureArrivalsDesc: "When your next subte arrives",
    btnAccess: "Get started",
    btnAccessLoading: "Getting location…",
    languageLabel: "Language",
    languageHint:
      "Only UI labels change. Street names, stations and live data stay in their original language.",
    tabMap: "Map",
    tabSearch: "Search",
    tabConfig: "Settings",
    brandTagline: "AMBA transit",
    sidebarMapHint: "Lists and settings: use the chips under the map (Subte · Bus · Stops · Settings).",
    filterSubtes: "Subte",
    filterBus: "Bus",
    filterStops: "Stops",
    filterAlerts: "Alerts",
    configTitle: "Settings",
    configLanguage: "App language",
    configLanguageHint:
      "Change here or on the welcome screen. Map and feed data keep their original language.",
    areaOutOfService:
      "Outside the service area (AMBA). Showing Buenos Aires as reference.",
    alertOutOfArea:
      "Your location is outside the service area (AMBA). Buenos Aires will be shown as reference for stops and subte.",
    statusDefaultCity: "Buenos Aires",
    linesAll: "All lines",
    alertsEmpty: "No active alerts",
    alertsEmptySub: "Subte service is running normally",
    alertsSectionTitle: "Service alerts",
    alertsRefresh: "Refresh",
    alertsRefreshing: "Fetching alerts…",
    sheetDragHandle: "Drag panel: more map or more list",
    configBack: "Back",
    configRowLanguage: "Language",
    configRowTarifas: "Fare table",
    configRowAbout: "About",
    configAboutTitle: "Suba",
    configAboutTagline: "Real-time AMBA transit.",
    configAboutVersionLabel: "Version",
    configTarifasSectionTitle: "Subte fares (reference)",
    configTarifasDisclaimer:
      "For reference only. Official rates and conditions are on Emova’s website.",
    configTarifasOfficialLink: "Open official fare table (Emova)",
    configTarifasIntroShort:
      "Fares include volume discounts by monthly trips. See Emova for full details.",
    configTarifasColServicio: "Service",
    configTarifasTripsPerMonth: "Trips",
    configTarifasColTarifa: "Fare",
    configTarifasColSubeNoNom: "Non-nominal SUBE",
    configTarifasTableNote: "Amounts in Argentine pesos (ARS), indicative.",
    configRowFeedback: "Send feedback",
    configFeedbackTitle: "Feedback & improvements",
    configFeedbackHint: "Tell us what you’d like to improve or what went wrong.",
    configFeedbackEmailLabel: "Email (optional)",
    configFeedbackMessageLabel: "Message",
    configFeedbackSubmit: "Send",
    configFeedbackSending: "Sending…",
    configFeedbackSuccess: "Thanks! Your message was received.",
    configFeedbackError: "Could not send. Please try again later.",
    configFeedbackSendAnother: "Send another message",
    configRowDonate: "Support the project",
    configDonateTitle: "Donate",
    configDonateIntro: "If the app is useful to you, you can chip in with a coffee or a tip. Thank you!",
    configDonateCafecito: "Cafecito",
    configDonateOtherArgentina: "Other option (Argentina)",
  },

  ja: {
    welcomeTagline: "AMBA交通 · ブエノスアイレス",
    featureNearTitle: "近くの停留所",
    featureNearDesc: "周辺のバスとサブテ（地下鉄）",
    featureMapTitle: "リアルタイム地図",
    featureMapDesc: "路線・駅・AMBAの経路",
    featureArrivalsTitle: "次の到着",
    featureArrivalsDesc: "次のサブテの到着まで",
    btnAccess: "開始",
    btnAccessLoading: "位置情報を取得中…",
    languageLabel: "言語",
    languageHint:
      "UIの表記のみ変更されます。道路名・駅名・ライブデータはそのままです。",
    tabMap: "地図",
    tabSearch: "検索",
    tabConfig: "設定",
    brandTagline: "AMBA交通",
    sidebarMapHint: "一覧と設定は、地図下のチップから（サブテ・バス・停留所・設定）。",
    filterSubtes: "サブテ",
    filterBus: "バス",
    filterStops: "停留所",
    filterAlerts: "アラート",
    configTitle: "設定",
    configLanguage: "アプリの言語",
    configLanguageHint:
      "ここまたはウェルカム画面で変更できます。地図データは元の言語のままです。",
    areaOutOfService:
      "サービスエリア（AMBA）外です。参照としてブエノスアイレスを表示します。",
    alertOutOfArea:
      "お位置がサービスエリア（AMBA）外です。停留所・サブテの参照としてブエノスアイレスを表示します。",
    statusDefaultCity: "ブエノスアイレス",
    linesAll: "全路線",
    alertsEmpty: "有効なアラートはありません",
    alertsEmptySub: "サブテは正常に運行しています",
    alertsSectionTitle: "運行情報",
    alertsRefresh: "更新",
    alertsRefreshing: "アラートを取得中…",
    sheetDragHandle: "パネルをドラッグ：地図か一覧を広げる",
    configBack: "戻る",
    configRowLanguage: "言語",
    configRowTarifas: "運賃表",
    configRowAbout: "このアプリについて",
    configAboutTitle: "Suba",
    configAboutTagline: "AMBAの交通をリアルタイムで。",
    configAboutVersionLabel: "バージョン",
    configTarifasSectionTitle: "サブテ運賃（参考）",
    configTarifasDisclaimer:
      "参考情報です。正式な料金・条件はEmovaのサイトをご確認ください。",
    configTarifasOfficialLink: "Emovaの公式運賃表を開く",
    configTarifasIntroShort:
      "月間利用回数に応じた割引があります。詳細はEmovaをご覧ください。",
    configTarifasColServicio: "サービス",
    configTarifasTripsPerMonth: "回数",
    configTarifasColTarifa: "運賃",
    configTarifasColSubeNoNom: "記名なしSUBE",
    configTarifasTableNote: "金額はアルゼンチンペソ（ARS）、参考です。",
    configRowFeedback: "フィードバックを送る",
    configFeedbackTitle: "ご意見・改善",
    configFeedbackHint: "改善してほしい点や不具合をお書きください。",
    configFeedbackEmailLabel: "メール（任意）",
    configFeedbackMessageLabel: "メッセージ",
    configFeedbackSubmit: "送信",
    configFeedbackSending: "送信中…",
    configFeedbackSuccess: "ありがとうございます。送信しました。",
    configFeedbackError: "送信に失敗しました。時間をおいて再度お試しください。",
    configFeedbackSendAnother: "別のメッセージを送る",
    configRowDonate: "プロジェクトを支援",
    configDonateTitle: "寄付",
    configDonateIntro: "アプリが役に立ったら、カフェ代やチップで支援できます。ありがとうございます。",
    configDonateCafecito: "Cafecito",
    configDonateOtherArgentina: "その他（アルゼンチン）",
  },

  zh: {
    welcomeTagline: "AMBA 交通 · 布宜诺斯艾利斯",
    featureNearTitle: "附近站点",
    featureNearDesc: "周边的公交与地铁（Subte）",
    featureMapTitle: "实时地图",
    featureMapDesc: "线路、车站与 AMBA 路线",
    featureArrivalsTitle: "即将到站",
    featureArrivalsDesc: "下一班 Subte 何时到达",
    btnAccess: "进入",
    btnAccessLoading: "正在获取位置…",
    languageLabel: "语言",
    languageHint:
      "仅更改界面文字。街道名、车站名与实时数据不翻译。",
    tabMap: "地图",
    tabSearch: "搜索",
    tabConfig: "设置",
    brandTagline: "AMBA 交通",
    sidebarMapHint: "列表与设置：使用地图下方的选项（地铁 · 公交 · 站点 · 设置）。",
    filterSubtes: "地铁",
    filterBus: "公交",
    filterStops: "站点",
    filterAlerts: "提醒",
    configTitle: "设置",
    configLanguage: "应用语言",
    configLanguageHint:
      "可在此或欢迎页更改。地图数据保持原始语言。",
    areaOutOfService:
      "不在服务区域（AMBA）内。以布宜诺斯艾利斯为参考显示。",
    alertOutOfArea:
      "您的位置不在服务区域（AMBA）内。将以布宜诺斯艾利斯为参考查询站点与 Subte。",
    statusDefaultCity: "布宜诺斯艾利斯",
    linesAll: "全部线路",
    alertsEmpty: "暂无活跃提醒",
    alertsEmptySub: "地铁服务运行正常",
    alertsSectionTitle: "运营提醒",
    alertsRefresh: "刷新",
    alertsRefreshing: "正在获取提醒…",
    sheetDragHandle: "拖动面板：显示更多地图或更多列表",
    configBack: "返回",
    configRowLanguage: "语言",
    configRowTarifas: "票价表",
    configRowAbout: "关于",
    configAboutTitle: "Suba",
    configAboutTagline: "AMBA 实时交通。",
    configAboutVersionLabel: "版本",
    configTarifasSectionTitle: "地铁票价（参考）",
    configTarifasDisclaimer:
      "仅供参考。正式票价与条件以 Emova 官网为准。",
    configTarifasOfficialLink: "在 Emova 打开官方票价表",
    configTarifasIntroShort:
      "按每月乘车次数有阶梯优惠，完整说明见 Emova。",
    configTarifasColServicio: "服务",
    configTarifasTripsPerMonth: "次数",
    configTarifasColTarifa: "票价",
    configTarifasColSubeNoNom: "非记名 SUBE",
    configTarifasTableNote: "金额为阿根廷比索（ARS），仅供参考。",
    configRowFeedback: "发送反馈",
    configFeedbackTitle: "意见与改进",
    configFeedbackHint: "请告诉我们希望改进的地方或遇到的问题。",
    configFeedbackEmailLabel: "邮箱（选填）",
    configFeedbackMessageLabel: "留言",
    configFeedbackSubmit: "发送",
    configFeedbackSending: "发送中…",
    configFeedbackSuccess: "感谢！我们已收到你的留言。",
    configFeedbackError: "发送失败，请稍后重试。",
    configFeedbackSendAnother: "再发一条",
    configRowDonate: "支持项目",
    configDonateTitle: "捐赠",
    configDonateIntro: "如果这款应用对你有帮助，可以通过咖啡或打赏支持我们。谢谢！",
    configDonateCafecito: "Cafecito",
    configDonateOtherArgentina: "其他方式（阿根廷）",
  },
};

export type MessageKey = keyof Messages;
