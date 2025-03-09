import moment from 'moment';

export const formatPhone = (phone: string) => {
  if (!phone || phone === 'null') return undefined;
  if (!phone || phone === 'null') return '';
  return `+250${phone?.slice(-9)}`;
};

export const formatDate = (
  date: string | Date | undefined,
  format: string = 'YYYY-MM-DD'
) => {
  if (!date) return '';
  return moment(date).format(format);
};

export const convertDecimalToPercentage = (number: number | string) => {
  if (!number) return '';
  return Number(Number(number).toFixed(2)) * 100;
};

// CAPITALIZE STRING
export const capitalizeString = (string: string | undefined | null) => {
  if (!string) return '';
  const isCamelCase = /^[a-z]+([A-Z][a-z]*)*$/.test(string);
  if (isCamelCase) return capitalizeCamelCase(string);
  if (string.includes('@')) return string;
  const words = string?.toLowerCase()?.split('_');
  const capitalizedWords =
    words && words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords && capitalizedWords.join(' ');
};

// CAPITALIZE CAMEL CASE
export function capitalizeCamelCase(string: string) {
  return string
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function (str) {
      return str.toUpperCase();
    })
    .trim();
}

// FORMAT NUMBERS
export const formatNumbers = (number?: number | string) => {
  if (!number) return '';
  return new Intl.NumberFormat().format(Number(number));
};

// FORMAT CURRENCY
export const formatCurrency = (
  amount?: number | string,
  currency: string = 'USD'
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(Number(amount));
};

export function filterObject(
  obj: Record<string, string | number | undefined>
): Record<string, string | number | undefined> {
  const cleanedObj: Record<string, string | number | undefined> = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== undefined && value !== '') {
      cleanedObj[key] = value;
    }
  }

  return cleanedObj;
}

// MASK PHONE DIGITS
export const maskPhoneDigits = (phone: string) => {
  return `${phone?.slice(0, 3)}X XXX ${phone?.slice(-3)}`;
};

// GET STATUS BACKGROUND COLOR
export const getStatusBgColor = (status: string | undefined) => {
  if (!status) return 'bg-gray-700';
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-700 text-center';
    case 'APPROVED':
    case 'ACTIVE':
    case 'PAYMENT_CONFIRMED':
      return 'bg-green-700 text-center';
    case 'REJECTED':
    case 'INACTIVE':
    case 'CANCELLED':
      return 'bg-red-700 text-center';
    case 'PROCESSING':
      return 'bg-primary text-center';
    case 'COMPLETED':
      return 'bg-green-700 text-center';
    default:
      return 'bg-gray-700 text-center';
  }
};

// REMOVE DUPLICATES FROM ARRAY
export const removeArrayDuplicates = (array: object[]) => {
  return [...new Set(array)];
};

// FIND COUNTRY NAME BY CODE
export const findCountryNameByCode = (
  code: string,
  countries: {
    name: string;
    code: string;
    dial_code: string;
  }[]
) => {
  return countries.find((country) => country?.code === code)?.name;
};

// FORMAT EXPIRES IN DATE
export const formatExpiresIn = (date: string | Date | undefined) => {
  if (!date) return '';
  return moment(date).fromNow();
};

export const formatTime = (time: string | Date | undefined) => {
  if (!time) return '';
  return moment(time, 'HH:mm:ss').format('HH:mm A');
};

export function truncateString(str: string, length: number, ending = '...') {
  if (str.length > length) {
    return str.slice(0, length - ending.length) + ending;
  }
  return str;
}
export const getStringAbbreviation = (string?: string) => {
  if (!string) return '';
  return capitalizeString(string)
    .split(' ')
    .map((word) => word[0])
    .join('')
    ?.toUpperCase();
};
