import { dev, building } from "$app/environment";
import { toast } from "@zerodevx/svelte-toast";

export const definitions = {
    "original_id": {
        "column": "id",
        "type": "number"
    },
    "name": {
        "column": "Название",
        "type": "string"
    },
    "name_eng": {
        "column": "Название (in english)",
        "type": "string"
    },
    "active": {
        "column": "Активный",
        "type": "string"
    },
    "short_description": {
        "column": "Краткое описание",
        "type": "string"
    },
    "detailed_description": {
        "column": "Детальное описание",
        "type": "string"
    },
    "short_description_eng": {
        "column": "Краткое описание (in english)",
        "type": "string"
    },
    "detailed_description_eng": {
        "column": "Детальное описание (in english)",
        "type": "string"
    },
    "municipal_district": {
        "column": "МО",
        "type": "string"
    },
    "federation_subject": {
        "column": "Субъект федерации",
        "type": "string"
    },
    "significance": {
        "column": "Значимость",
        "type": "string"
    },
    "locality": {
        "column": "Населённый пункт",
        "type": "string"
    },
    "locality_eng": {
        "column": "Населённый пункт (in english)",
        "type": "string"
    },
    "address": {
        "column": "Адрес",
        "type": "string"
    },
    "address_eng": {
        "column": "Адрес (in english)",
        "type": "string"
    },
    "oktmo": {
        "column": "ОКТМО",
        "type": "string"
    },
    "ftp": {
        "column": "ФЦП (федеральная целевая программа)",
        "type": "string"
    },
    "activities": {
        "column": "Действия с объектом",
        "type": "string"
    },
    "activity_start_date": {
        "column": "Дата начала строительства / реконструкции",
        "type": "string"
    },
    "activity_completion_date": {
        "column": "Дата завершения строительства / реконструкции",
        "type": "string"
    },
    "funding_amount": {
        "column": "Общий объём финансирования",
        "type": "number"
    },
    "federal_budget_financing": {
        "column": "Финансирование из федерального бюджета",
        "type": "number"
    },
    "federal_budget_financing_spent": {
        "column": "Финансирование из федерального бюджета (из них освоено)",
        "type": "number"
    },
    "subject_budget_financing": {
        "column": "Финансирование из бюджета субъекта федерации",
        "type": "number"
    },
    "subject_budget_financing_spent": {
        "column": "Финансирование из бюджета субъекта федерации (из них освоено)",
        "type": "number"
    },
    "municipal_budget_financing": {
        "column": "Финансирование из бюджета муниципального образования",
        "type": "number"
    },
    "municipal_budget_financing_spent": {
        "column": "Финансирование из бюджета муниципального образования (из них освоено)",
        "type": "string"
    },
    "extrabudgetary_budget_financing": {
        "column": "Финансирование из внебюджетных источников",
        "type": "number"
    },
    "extrabudgetary_budget_financing_spent": {
        "column": "Финансирование из внебюджетных источников (из них освоено)",
        "type": "number"
    },
    "is_key": {
        "column": "Ключевой или нет?",
        "type": "string"
    },
    "supervising_body": {
        "column": "Курирующий орган",
        "type": "string"
    },
    "supervising_body_eng": {
        "column": "Курирующий орган (in english)",
        "type": "string"
    },
    "supervising_body_address": {
        "column": "Адрес курирующего органа",
        "type": "string"
    },
    "supervising_body_address_eng": {
        "column": "Адрес курирующего органа (in english)",
        "type": "string"
    },
    "supervising_body_phone": {
        "column": "Телефон курирующего органа",
        "type": "string"
    },
    "contact_phone": {
        "column": "Контактный телефон объекта",
        "type": "string"
    },
    "working_hours_mon-fri": {
        "column": "Режим работы Пн.-Пт.",
        "type": "string"
    },
    "working_hours_sat": {
        "column": "Режим работы Сб.",
        "type": "string"
    },
    "working_hours_sun": {
        "column": "Режим работы Вс.",
        "type": "string"
    },
    "area": {
        "column": "Площадь",
        "type": "number"
    },
    "email": {
        "column": "E-mail",
        "type": "string"
    },
    "url": {
        "column": "URL сайта",
        "type": "string"
    },
    "is_entered_in_register": {
        "column": "Внесён в реестр?",
        "type": "string"
    },
    "sports_type": {
        "column": "Тип спортивного комплекса",
        "type": "string"
    },
    "competitions": {
        "column": "Какие соревнования проводятся?",
        "type": "string"
    },
    "sports": {
        "column": "Виды спорта",
        "type": "string"
    },
    "yandex_object_x_coord": {
        "column": "Яндекс координата объекта X",
        "type": "number"
    },
    "yandex_object_y_coord": {
        "column": "Яндекс координата объекта Y",
        "type": "number"
    },
    "yandex_map scale": {
        "column": "Маштаб Яндекс-карты",
        "type": "number"
    },
    "yandex_center_x_coord": {
        "column": "Яндекс координата центра X",
        "type": "number"
    },
    "yandex_center_y_coord": {
        "column": "Яндекс координата центра Y",
        "type": "number"
    },
    "mini_x_coord": {
        "column": "Мини координата X",
        "type": "number"
    },
    "mini_y_coord": {
        "column": "Мини координата Y",
        "type": "number"
    },
    "master_plan": {
        "column": "Генеральный план",
        "type": "number"
    },
    "additional_plans": {
        "column": "Дополнительные планы",
        "type": "number"
    },
    "photos": {
        "column": "Фото",
        "type": "number"
    },
    "gallery_url": {
        "column": "URL фото галереи объекта",
        "type": "string"
    },
    "videos": {
        "column": "Видео",
        "type": "number"
    },
    "panoramas": {
        "column": "Панорамы",
        "type": "number"
    },
    "webcasts": {
        "column": "Web-трансляции",
        "type": "number"
    },
    "other_materials": {
        "column": "Прочие материалы",
        "type": "number"
    }
} as const;
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
export type Definitions = DeepWriteable<typeof definitions>;

export function load_script(src: string): Promise<void> {
    const elem = document.createElement("script");
    elem.async = true;
    elem.src = src;
    document.head.appendChild(elem);
    return new Promise((res, rej) => {
        elem.onerror = rej;
        elem.onload = () => res();
    });
}

export function add_toast(
    input: unknown,
    type: "success" | "info" | "error" | "warning",
    duration = 0,
) {
    console.info("toast", { type, text: input });
    let text = "";
    if (input instanceof Error) {
        text = input.message;
    } else if (typeof input == "string") {
        text = input;
    } else {
        try {
            text = JSON.stringify(input);
        } catch (error) {
            text = input + "";
        }
    }
    const id = toast.push({
        msg: text.replace(/\n/g, "<br>"),
        theme: {
            success: {
                "--toastBorder": "2px solid #16A34A;",
                "--toastBarBackground": "#16A34A;",
                "--toastBackground": "#b1e0c3e6;",
            },
            info: {
                "--toastBorder": "2px solid #0284C7;",
                "--toastBarBackground": "#0284C7;",
                "--toastBackground": "#abd6ece6;",
            },
            error: {
                "--toastBorder": "2px solid #E11D48;",
                "--toastBarBackground": "#E11D48;",
                "--toastBackground": "#f5b4c2e6;",
            },
            warning: {
                "--toastBorder": "2px solid #CA8A04;",
                "--toastBarBackground": "#CA8A04;",
                "--toastBackground": "#edd8abe6;",
            },
        }[type],
        duration: duration || 60000,
        reversed: true,
        ...(duration == 0 ? { initial: 0, next: 0 } : {}),
    });
    return {
        remove() {
            toast.pop(id);
        },
    };
}

export const prod = !dev && !building;
