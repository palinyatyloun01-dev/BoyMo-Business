
export const PIZZA_SIZES = [
  { id: '6', name: '6 ນິ້ວ' },
  { id: '7', name: '7 ນິ້ວ' },
  { id: '9', name: '9 ນິ້ວ' },
  { id: '10', name: '10 ນິ້ວ' },
];

export const PIZZA_TOPPINGS = [
  { id: 'regular', name: 'ທຳມະດາ' },
  { id: 'seafood', name: 'ທະເລ' },
];

export const PIZZA_PRICES: { [key: string]: { [key: string]: number } } = {
  '6': { regular: 65000, seafood: 79000 },
  '7': { regular: 85000, seafood: 99000 },
  '9': { regular: 129000, seafood: 139000 },
  '10': { regular: 149000, seafood: 159000 },
};

export const EXTRA_CHEESE_PRICE = 15000;

export const PIZZA_FLAVORS = [
  'ລວມມິດຊາລາຍ', 'ຮັອດດ໋ອກຊີສ', 'ເຂົ້າໂພດຫວານ', 'ປູອັດ+ຊີສ', 'ເບຄ້ອນເດິລຸກ', 'ຜັກໂຂມໝາກເຂືອເທດ',
  'ຕົ້ມຍຳກຸ້ງ', 'ກຸ້ງເດິລຸກ', 'ແຮມຊີສ', 'ປູອັດ', 'ຮັອດດ໋ອກ', 'ດັບເບີ້ນຊີສ',
  'ເບຄ່ອນຊີສ', 'ຮາວາອ້ຽນ', 'ຊີຟູດລວມສະໄປຣຊີ່', 'ລວມໝາກໄມ້',
];

export const OTHER_INCOME_CATEGORIES = ['ເງິນເດືອນ', 'ໄດ້ຮັບຈາກແມ່', 'ອື່ນໆ'];

export const EXPENSE_CATEGORIES = [
  'ເຕົາອົບສະແຕນເລດ', 'ວັດຖຸດິບ', 'ແປ້ງພິຊຊ່າສຳເລັດຮູບ', 'ຊອສຕ່າງໆ', 'ຊີສ',
  'ເຫຼັກຕັດພິຊຊ່າ', 'ເຈ້ຍຮອງພິຊຊ່າ', 'ສາລ່າຍ', 'ອາລິກາໂນ', 'ຖາດຮອງແຕ່ງໜ້າພິຊຊ່າ',
  'ປູອັດເບນໂຕະ', 'ກຸ້ງ', 'ໝາກນັດ', 'ໝາກເພັດໃຫຍ່', 'ໝາກເລັ່ນ', 'ຮັອດດ໋ອກ',
  'ແຮມໝູ+ໄກ່', 'ນ້ຳມັນລົດ', 'ປາມຶກວົງ', 'ປາມຶກລາຍ', 'ອັນຂູດຊີສ', 'ແນວຊ້ອນພິຊຊ່າ',
  'ຄ່າເຊົ່າຮ້ານ', 'ຄ່ານໍ້າປະປາ-ຄ່າໄຟຟ້າ', 'ອື່ນໆ',
];

export const STORE_STATUSES = [
  { id: 'open', label: 'ເປີດ' },
  { id: 'closed', label: 'ປິດ' },
  { id: 'renovating', label: 'ປັບປຸງ' },
  { id: 'holiday', label: 'ພັກວັນບຸນ' },
];

export const LANGUAGES = [
    { code: 'lo', name: 'ລາວ', flag: '🇱🇦' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
];

export const LOGO_OPTIONS = [
  { id: 'Pizza', name: 'ພິຊຊ່າ' },
  { id: 'Sandwich', name: 'ແຊນວິດ' },
  { id: 'IceCream', name: 'ກະແລ້ມ' },
];
