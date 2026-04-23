
import type { Lang } from "@/lib/i18n";

export const finalMessages: Record<
  Lang,
  {
    timeline: {
      departure: string;
      pickup: string;
      destination: string;
      notes: string;
      pickupFallback: string;
      notesFallback: string;
    };
    driverProfile: {
      pageTitle: string;
      subtitle: string;
      city: string;
      role: string;
      averageRating: string;
      publishedTrips: string;
      reviews: string;
      profileType: string;
      status: string;
      active: string;
      noBio: string;
      passengerReviews: string;
      noReviews: string;
    };
    driverTrips: {
      title: string;
      subtitle: string;
      noTrips: string;
      price: string;
      seats: string;
      bookings: string;
      messages: string;
      viewTrip: string;
      openConversation: string;
      publishAnother: string;
    };
    publishTrip: {
      title: string;
      subtitle: string;
      fromCity: string;
      toCity: string;
      date: string;
      time: string;
      price: string;
      seats: string;
      pickupPoint: string;
      luggage: string;
      notes: string;
      publish: string;
      publishing: string;
      successRedirect: string;
      errorFallback: string;
    };
    cashButton: {
      label: string;
      loading: string;
      failed: string;
    };
  }
> = {
  fr: {
    timeline: {
      departure: "Ville de départ",
      pickup: "Point de départ",
      destination: "Destination",
      notes: "Notes du trajet",
      pickupFallback: "Le point de départ sera confirmé par le conducteur.",
      notesFallback: "Aucune note supplémentaire n’a été fournie.",
    },
    driverProfile: {
      pageTitle: "Profil conducteur",
      subtitle:
        "Consultez les informations conducteur, l’activité des trajets et les avis passagers.",
      city: "Ville",
      role: "Rôle",
      averageRating: "Note moyenne",
      publishedTrips: "Trajets publiés",
      reviews: "Avis",
      profileType: "Type de profil",
      status: "Statut",
      active: "Actif",
      noBio: "Aucune bio conducteur disponible pour le moment.",
      passengerReviews: "Avis passagers",
      noReviews: "Aucun avis pour le moment.",
    },
    driverTrips: {
      title: "Mes trajets",
      subtitle:
        "Consultez les trajets que vous avez publiés, ainsi que les réservations et messages liés.",
      noTrips: "Aucun trajet publié pour le moment.",
      price: "Prix",
      seats: "Places",
      bookings: "Réservations",
      messages: "Messages",
      viewTrip: "Voir le trajet",
      openConversation: "Ouvrir la conversation",
      publishAnother: "Publier un autre trajet",
    },
    publishTrip: {
      title: "Publier un trajet",
      subtitle:
        "Créez un nouveau trajet avec les informations essentielles pour les passagers.",
      fromCity: "Ville de départ",
      toCity: "Ville d’arrivée",
      date: "Date",
      time: "Heure",
      price: "Prix",
      seats: "Places",
      pickupPoint: "Point de départ",
      luggage: "Bagages",
      notes: "Notes",
      publish: "Publier le trajet",
      publishing: "Publication...",
      successRedirect: "/driver/trips",
      errorFallback: "Échec de la publication du trajet.",
    },
    cashButton: {
      label: "Marquer comme encaissé",
      loading: "Mise à jour...",
      failed: "Échec de la mise à jour du statut d’encaissement.",
    },
  },

  ar: {
    timeline: {
      departure: "مدينة الانطلاق",
      pickup: "نقطة الانطلاق",
      destination: "الوجهة",
      notes: "ملاحظات الرحلة",
      pickupFallback: "سيتم تأكيد نقطة الانطلاق من قبل السائق.",
      notesFallback: "لا توجد ملاحظات إضافية.",
    },
    driverProfile: {
      pageTitle: "ملف السائق",
      subtitle:
        "اعرض معلومات السائق ونشاط الرحلات وآراء الركاب.",
      city: "المدينة",
      role: "الدور",
      averageRating: "متوسط التقييم",
      publishedTrips: "الرحلات المنشورة",
      reviews: "الآراء",
      profileType: "نوع الملف",
      status: "الحالة",
      active: "نشط",
      noBio: "لا توجد نبذة عن السائق حالياً.",
      passengerReviews: "آراء الركاب",
      noReviews: "لا توجد آراء حالياً.",
    },
    driverTrips: {
      title: "رحلاتي",
      subtitle:
        "راجع الرحلات التي قمت بنشرها والحجوزات والرسائل المرتبطة بها.",
      noTrips: "لا توجد رحلات منشورة حالياً.",
      price: "السعر",
      seats: "المقاعد",
      bookings: "الحجوزات",
      messages: "الرسائل",
      viewTrip: "عرض الرحلة",
      openConversation: "افتح المحادثة",
      publishAnother: "انشر رحلة أخرى",
    },
    publishTrip: {
      title: "نشر رحلة",
      subtitle:
        "أنشئ رحلة جديدة مع المعلومات الأساسية التي يحتاجها الركاب.",
      fromCity: "مدينة الانطلاق",
      toCity: "مدينة الوصول",
      date: "التاريخ",
      time: "الوقت",
      price: "السعر",
      seats: "المقاعد",
      pickupPoint: "نقطة الانطلاق",
      luggage: "الأمتعة",
      notes: "ملاحظات",
      publish: "انشر الرحلة",
      publishing: "جارٍ النشر...",
      successRedirect: "/driver/trips",
      errorFallback: "فشل نشر الرحلة.",
    },
    cashButton: {
      label: "تحديد كمحصل",
      loading: "جارٍ التحديث...",
      failed: "فشل تحديث حالة التحصيل.",
    },
  },

  en: {
    timeline: {
      departure: "Departure city",
      pickup: "Pickup point",
      destination: "Destination",
      notes: "Trip notes",
      pickupFallback: "Pickup point will be confirmed by the driver.",
      notesFallback: "No additional trip notes were provided.",
    },
    driverProfile: {
      pageTitle: "Driver Profile",
      subtitle:
        "View driver information, trip activity, and passenger reviews.",
      city: "City",
      role: "Role",
      averageRating: "Average rating",
      publishedTrips: "Published trips",
      reviews: "Reviews",
      profileType: "Profile type",
      status: "Status",
      active: "Active",
      noBio: "No driver bio available yet.",
      passengerReviews: "Passenger Reviews",
      noReviews: "No reviews yet.",
    },
    driverTrips: {
      title: "My Trips",
      subtitle:
        "Review the trips you published, along with linked bookings and messages.",
      noTrips: "No trips published yet.",
      price: "Price",
      seats: "Seats",
      bookings: "Bookings",
      messages: "Messages",
      viewTrip: "View Trip",
      openConversation: "Open Conversation",
      publishAnother: "Publish Another Trip",
    },
    publishTrip: {
      title: "Publish Trip",
      subtitle:
        "Create a new trip with the essential details passengers need.",
      fromCity: "From city",
      toCity: "To city",
      date: "Date",
      time: "Time",
      price: "Price",
      seats: "Seats",
      pickupPoint: "Pickup point",
      luggage: "Luggage",
      notes: "Notes",
      publish: "Publish Trip",
      publishing: "Publishing...",
      successRedirect: "/driver/trips",
      errorFallback: "Failed to publish trip.",
    },
    cashButton: {
      label: "Mark Cash Collected",
      loading: "Updating...",
      failed: "Failed to update cash collection status.",
    },
  },
};
