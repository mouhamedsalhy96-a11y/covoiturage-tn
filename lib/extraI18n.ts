
import type { Lang } from "@/lib/i18n";

export const extraMessages: Record<
  Lang,
  {
    inbox: {
      title: string;
      subtitle: string;
      passengerTrips: string;
      driverTrips: string;
      noPassengerTrips: string;
      noDriverTrips: string;
      openConversation: string;
      trip: string;
      rolePassenger: string;
      roleDriver: string;
      messagesCount: string;
    };
    howItWorks: {
      title: string;
      subtitle: string;
      step1Title: string;
      step1Text: string;
      step2Title: string;
      step2Text: string;
      step3Title: string;
      step3Text: string;
      step4Title: string;
      step4Text: string;
    };
    safety: {
      title: string;
      subtitle: string;
      item1Title: string;
      item1Text: string;
      item2Title: string;
      item2Text: string;
      item3Title: string;
      item3Text: string;
      item4Title: string;
      item4Text: string;
    };
    faq: {
      title: string;
      subtitle: string;
      q1: string;
      a1: string;
      q2: string;
      a2: string;
      q3: string;
      a3: string;
      q4: string;
      a4: string;
    };
    contact: {
      title: string;
      subtitle: string;
      emailTitle: string;
      emailText: string;
      supportTitle: string;
      supportText: string;
      noteTitle: string;
      noteText: string;
    };
  }
> = {
  fr: {
    inbox: {
      title: "Messages",
      subtitle:
        "Retrouvez tous les trajets liés à vos conversations passager et conducteur.",
      passengerTrips: "Conversations passager",
      driverTrips: "Conversations conducteur",
      noPassengerTrips: "Aucun trajet réservé avec conversation pour le moment.",
      noDriverTrips: "Aucun trajet conducteur avec conversation pour le moment.",
      openConversation: "Ouvrir la conversation",
      trip: "Trajet",
      rolePassenger: "Rôle : passager",
      roleDriver: "Rôle : conducteur",
      messagesCount: "Messages",
    },
    howItWorks: {
      title: "Comment ça marche",
      subtitle:
        "CovoiturageTN suit un parcours simple : recherche, réservation, communication et paiement local.",
      step1Title: "1. Rechercher un trajet",
      step1Text:
        "Le passager parcourt les trajets disponibles et compare les détails avant de réserver.",
      step2Title: "2. Réserver une place",
      step2Text:
        "La réservation est liée au compte connecté pour un suivi clair dans le tableau de bord.",
      step3Title: "3. Communiquer",
      step3Text:
        "Les conversations sont liées aux trajets pour faciliter l’organisation du départ.",
      step4Title: "4. Payer localement",
      step4Text:
        "Le paiement à la livraison reste la méthode locale la plus réaliste pour le lancement.",
    },
    safety: {
      title: "Sécurité",
      subtitle:
        "Le projet privilégie la clarté des trajets, la visibilité des conducteurs et une communication simple avant déplacement.",
      item1Title: "Détails visibles avant réservation",
      item1Text:
        "Le trajet, les bagages, le point de départ et les remarques sont affichés avant validation.",
      item2Title: "Profils conducteurs",
      item2Text:
        "Les profils conducteurs affichent notes, ville et avis pour renforcer la confiance.",
      item3Title: "Messagerie liée au trajet",
      item3Text:
        "La communication dans l’application limite la confusion et garde les échanges dans le bon contexte.",
      item4Title: "Paiement local réaliste",
      item4Text:
        "Le paiement à la livraison réduit la friction pour un usage local plus naturel.",
    },
    faq: {
      title: "FAQ",
      subtitle: "Questions fréquentes sur l’utilisation de la plateforme.",
      q1: "Comment réserver un trajet ?",
      a1: "Ouvrez un trajet, choisissez le nombre de places, puis continuez vers le paiement.",
      q2: "Comment payer ?",
      a2: "Le mode principal local est le paiement à la livraison (Cash on Delivery).",
      q3: "Puis-je envoyer des messages au conducteur ?",
      a3: "Oui. Une conversation liée au trajet devient disponible une fois le trajet réservé.",
      q4: "Comment suivre mes réservations ?",
      a4: "Toutes vos réservations apparaissent dans la section Tableau de bord > Mes réservations.",
    },
    contact: {
      title: "Contact",
      subtitle:
        "Cette application est encore en phase locale de construction avant publication.",
      emailTitle: "Email de contact",
      emailText: "Ajoutez ici votre email de support plus tard si nécessaire.",
      supportTitle: "Support local",
      supportText:
        "Pour l’instant, cette version sert à tester les flux, l’interface et le parcours utilisateur.",
      noteTitle: "Note",
      noteText:
        "La publication n’a pas encore commencé. Cette étape se concentre uniquement sur la finition locale.",
    },
  },

  ar: {
    inbox: {
      title: "الرسائل",
      subtitle:
        "اعرض جميع الرحلات المرتبطة بمحادثاتك كراكب أو كسائق.",
      passengerTrips: "محادثات الراكب",
      driverTrips: "محادثات السائق",
      noPassengerTrips: "لا توجد رحلات محجوزة مع محادثات حالياً.",
      noDriverTrips: "لا توجد رحلات سائق مع محادثات حالياً.",
      openConversation: "افتح المحادثة",
      trip: "الرحلة",
      rolePassenger: "الدور: راكب",
      roleDriver: "الدور: سائق",
      messagesCount: "الرسائل",
    },
    howItWorks: {
      title: "كيف يعمل",
      subtitle:
        "يتبع CovoiturageTN مساراً بسيطاً: البحث، الحجز، التواصل، ثم الدفع المحلي.",
      step1Title: "1. ابحث عن رحلة",
      step1Text:
        "يتصفح الراكب الرحلات المتاحة ويقارن التفاصيل قبل الحجز.",
      step2Title: "2. احجز مقعداً",
      step2Text:
        "يرتبط الحجز بالحساب المسجل حتى يظهر بوضوح داخل لوحة التحكم.",
      step3Title: "3. تواصل",
      step3Text:
        "المحادثات مرتبطة بالرحلات لتسهيل تنظيم نقطة الانطلاق.",
      step4Title: "4. ادفع محلياً",
      step4Text:
        "يبقى الدفع عند التسليم هو الخيار المحلي الأكثر واقعية عند الإطلاق.",
    },
    safety: {
      title: "السلامة",
      subtitle:
        "يركز المشروع على وضوح الرحلات وإظهار ملفات السائقين وسهولة التواصل قبل التنقل.",
      item1Title: "تفاصيل واضحة قبل الحجز",
      item1Text:
        "تظهر بيانات الرحلة والأمتعة ونقطة الانطلاق والملاحظات قبل التأكيد.",
      item2Title: "ملفات السائقين",
      item2Text:
        "تعرض ملفات السائقين التقييمات والمدينة والآراء لتعزيز الثقة.",
      item3Title: "مراسلة مرتبطة بالرحلة",
      item3Text:
        "التواصل داخل التطبيق يقلل الالتباس ويحفظ الرسائل في سياق الرحلة الصحيح.",
      item4Title: "دفع محلي واقعي",
      item4Text:
        "الدفع عند التسليم يقلل الاحتكاك ويجعل الاستخدام المحلي أكثر طبيعية.",
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "الأسئلة المتكررة حول استخدام المنصة.",
      q1: "كيف أحجز رحلة؟",
      a1: "افتح صفحة الرحلة، اختر عدد المقاعد، ثم تابع إلى الدفع.",
      q2: "كيف أدفع؟",
      a2: "الخيار المحلي الرئيسي حالياً هو الدفع عند التسليم.",
      q3: "هل يمكنني مراسلة السائق؟",
      a3: "نعم. تصبح المحادثة المرتبطة بالرحلة متاحة بعد حجز الرحلة.",
      q4: "كيف أتابع حجوزاتي؟",
      a4: "كل حجوزاتك تظهر في لوحة التحكم > حجوزاتي.",
    },
    contact: {
      title: "اتصل بنا",
      subtitle:
        "هذا التطبيق لا يزال في مرحلة البناء المحلي قبل النشر.",
      emailTitle: "بريد التواصل",
      emailText: "يمكنك إضافة بريد الدعم لاحقاً عند الحاجة.",
      supportTitle: "الدعم المحلي",
      supportText:
        "حالياً تُستخدم هذه النسخة لاختبار التدفقات والواجهة وتجربة المستخدم.",
      noteTitle: "ملاحظة",
      noteText:
        "لم يبدأ النشر بعد. هذه المرحلة مخصصة فقط للإنهاء المحلي.",
    },
  },

  en: {
    inbox: {
      title: "Messages",
      subtitle:
        "See all trips linked to your passenger and driver conversations.",
      passengerTrips: "Passenger conversations",
      driverTrips: "Driver conversations",
      noPassengerTrips: "No booked trips with conversations yet.",
      noDriverTrips: "No driver trips with conversations yet.",
      openConversation: "Open Conversation",
      trip: "Trip",
      rolePassenger: "Role: passenger",
      roleDriver: "Role: driver",
      messagesCount: "Messages",
    },
    howItWorks: {
      title: "How It Works",
      subtitle:
        "CovoiturageTN follows a simple flow: search, booking, communication, and local payment.",
      step1Title: "1. Search a trip",
      step1Text:
        "Passengers browse available trips and compare details before booking.",
      step2Title: "2. Reserve a seat",
      step2Text:
        "The booking is linked to the logged-in account so tracking stays clear in the dashboard.",
      step3Title: "3. Communicate",
      step3Text:
        "Trip-linked conversations make pickup and updates easier to organize.",
      step4Title: "4. Pay locally",
      step4Text:
        "Cash on Delivery remains the most realistic local payment method for launch.",
    },
    safety: {
      title: "Safety",
      subtitle:
        "The project focuses on clear trip details, visible driver trust, and simple communication before travel.",
      item1Title: "Details visible before booking",
      item1Text:
        "Trip details, luggage rules, pickup point, and notes appear before confirmation.",
      item2Title: "Driver profiles",
      item2Text:
        "Driver profiles show ratings, city, and reviews to improve trust.",
      item3Title: "Trip-linked messaging",
      item3Text:
        "In-app communication reduces confusion and keeps messages in the correct trip context.",
      item4Title: "Realistic local payment",
      item4Text:
        "Cash on Delivery reduces friction and matches a more natural local flow.",
    },
    faq: {
      title: "FAQ",
      subtitle: "Frequently asked questions about using the platform.",
      q1: "How do I book a trip?",
      a1: "Open a trip, choose the number of seats, then continue to checkout.",
      q2: "How do I pay?",
      a2: "The main local payment path is Cash on Delivery.",
      q3: "Can I message the driver?",
      a3: "Yes. A trip-linked conversation becomes available after the trip is booked.",
      q4: "How do I track my bookings?",
      a4: "All bookings appear inside Dashboard > My Bookings.",
    },
    contact: {
      title: "Contact",
      subtitle:
        "This app is still in local-building mode before publishing.",
      emailTitle: "Contact email",
      emailText: "You can add your support email here later if needed.",
      supportTitle: "Local support",
      supportText:
        "For now, this version is mainly used to test flows, interface, and user experience.",
      noteTitle: "Note",
      noteText:
        "Publishing has not started yet. This stage is only focused on local finishing.",
    },
  },
};
