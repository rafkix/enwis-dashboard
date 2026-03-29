export type TelegramChannel = {
  id: string;
  name: string;
  handle: string;
  url: string;
  description?: string;
  active?: boolean;
};

export const activeTelegramChannels: TelegramChannel[] = [
  {
    id: "cefr-enwis",
    name: "ENWIS CEFR",
    handle: "@cefr_enwis",
    url: "https://t.me/cefr_enwis",
    description: "CEFR testlari va yangiliklar",
    active: true,
  },
  {
    id: "levela",
    name: "LEVELA",
    handle: "@levela_uz",
    url: "https://t.me/levela_uz",
    description: "Ta’lim va platforma yangiliklari",
    active: true,
  },
  {
    id: "speaking",
    name: "ENWIS Speaking",
    handle: "@speaking_enwis",
    url: "https://t.me/speaking_enwis",
    description: "Speaking practice va AI feedback",
    active: false,
  },
  {
    id: "writing",
    name: "ENWIS Writing",
    handle: "@writing_enwis",
    url: "https://t.me/writing_enwis",
    description: "Writing tips va tahlillar",
    active: false,
  },
  {
    id: "ielts",
    name: "ENWIS IELTS",
    handle: "@ielts_enwis",
    url: "https://t.me/ielts_enwis",
    description: "IELTS uchun foydali materiallar",
    active: false,
  },
].filter((channel) => channel.active);
