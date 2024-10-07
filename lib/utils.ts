import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getKanyeEra(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (year === 1977 && month === 6 && day >= 8 || year > 1977 && year < 2002 || (year === 2002 && month < 8)) {
      return "Before The College Dropout";
  } else if (year === 2002 && month === 8 && day >= 18 || year > 2002 && year < 2004 || (year === 2004 && month < 2)) {
      return "The College Dropout";
  } else if (year === 2004 && month === 2 && day >= 10 || year > 2004 && year < 2005 || (year === 2005 && month < 8)) {
      return "Late Registration";
  } else if (year === 2005 && month === 8 && day >= 30 || year > 2005 && year < 2007 || (year === 2007 && month < 9)) {
      return "Graduation";
  } else if (year === 2007 && month === 9 && day >= 11 || year > 2007 && year < 2008 || (year === 2008 && month < 11)) {
      return "808s & Heartbreak";
  } else if (year === 2008 && month === 11 && day >= 24 || year > 2008 && year < 2010 || (year === 2010 && month < 5)) {
      return "Good Ass Job";
  } else if (year === 2010 && month === 5 && day >= 1 || year > 2010 && year < 2010 || (year === 2010 && month < 11)) {
      return "My Beautiful Dark Twisted Fantasy";
  } else if (year === 2010 && month === 11 && day >= 22 || year > 2010 && year < 2011 || (year === 2011 && month < 8)) {
      return "Watch The Throne";
  } else if (year === 2011 && month === 8 && day >= 8 || year > 2011 && year < 2012 || (year === 2012 && month < 9)) {
      return "Cruel Summer";
  } else if (year === 2012 && month === 9 && day >= 14 || year > 2012 && year < 2013 || (year === 2013 && month < 5)) {
      return "Thank God For Drugs";
  } else if (year === 2013 && month === 5 && day >= 16 || year > 2013 && year < 2013 || (year === 2013 && month < 6)) {
      return "Yeezus";
  } else if (year === 2012 && month === 9 && day >= 14 || year === 2013 && month < 1 && day < 10) {
      return "Cruel Winter V1";
  } else if (year === 2013 && month === 6 && day >= 18 || year > 2013 && year < 2014 || (year === 2014 && month < 7)) {
      return "Yeezus 2";
  } else if (year === 2014 && month === 7 && day >= 16 || year > 2014 && year < 2015 || (year === 2015 && month < 6)) {
      return "So Help Me God";
  } else if (year === 2015 && month === 6 && day >= 28 || year > 2015 && year < 2016 || (year === 2016 && month < 1)) {
      return "SWISH";
  } else if (year === 2016 && month === 1 && day >= 27 || year > 2016 && year < 2016 || (year === 2016 && month < 6)) {
      return "The Life Of Pablo";
  } else if (year === 2015 && month === 10 && day >= 1 || year > 2015 && year < 2017 || (year === 2017 && month < 11)) {
      return "Cruel Winter V2";
  } else if (year === 2016 && month === 2 && day >= 16 || year > 2016 && year < 2016 || (year === 2016 && month < 11)) {
      return "TurboGrafx16";
  } else if (year === 2015 && month === 12 && day >= 18 || year > 2015 && year < 2018 || (year === 2018 && month < 5)) {
      return "DAYTONA";
  } else if (year === 2016 && month === 11 && day >= 30 || year > 2016 && year < 2018 || (year === 2018 && month < 5)) {
      return "Hitler (LOVE EVERYONE)";
  } else if (year === 2018 && month === 5 && day >= 21 || year > 2018 && year < 2018 || (year === 2018 && month < 6)) {
      return "ye";
  } else if (year === 2016 && month === 11 && day >= 30 || year > 2016 && year < 2018 || (year === 2018 && month < 6)) {
      return "KIDS SEE GHOSTS";
  } else if (year === 2018 && month === 6 && day >= 27 || year > 2018 && year < 2019) {
      return "Good Ass Job (2018)";
  } else if (year === 2018 && month === 6 && day >= 1 || year > 2018 && year < 2018 || (year === 2018 && month < 11)) {
      return "Yandhi V1";
  } else if (year === 2018 && month === 11 && day >= 13 || year > 2018 && year < 2019 || (year === 2019 && month < 4)) {
      return "Yandhi V2";
  } else if (year === 2019 && month === 4 && day >= 21 || year > 2019 && year < 2019 || (year === 2019 && month < 10)) {
      return "JESUS IS KING";
  } else if (year === 2019 && month === 10 && day >= 25 || year > 2019 && year < 2020 || (year === 2020 && month < 7)) {
      return "JESUS IS LORD";
  } else if (year === 2019 && month === 10 && day >= 25 || year > 2019 && year < 2020 || (year === 2020 && month < 9)) {
      return "JESUS IS KING: The Dr. Dre Version";
  } else if (year === 2020 && month === 7 && day >= 18 || year > 2020 && year < 2021 || (year === 2021 && month < 3)) {
      return "DONDA V1";
  } else if (year === 2021 && month === 3 && day >= 7 || year > 2021 && year < 2021 || (year === 2021 && month < 7)) {
      return "DONDA V2";
  } else if (year === 2021 && month === 7 && day >= 9 || year > 2021 && year < 2021 || (year === 2021 && month < 11)) {
      return "DONDA V3";
  } else if (year === 2021 && month === 11 && day >= 15 || year > 2021 && year < 2022 || (year === 2022 && month < 10)) {
      return "DONDA 2";
  } else if (year === 2022 && month === 4 && day >= 1 || year >= 2022 && year < 2023) {
      return "WAR";
  } else if (year === 2022 && month === 10 && day >= 3 || year > 2022 && year < 2023 || (year === 2023 && month < 11)) {
      return "Y3";
  } else if (year === 2023 && month >= 1 && day >= 1 || year > 2023 && year < 2023 || (year === 2023 && month < 10)) {
      return "Bad Bitch Play Book";
  } else if (year === 2023 && month === 10 && day >= 28 || year > 2023 && year < 2024 || (year === 2024 && month < 2)) {
      return "VULTURES 1";
  } else if (year === 2024 && month === 2 && day >= 10 || year >= 2024) {
      return "VULTURES 2";
  } else if (year === 2024 && month === 9 && day >= 3) {
      return "BULLY";
  } else {
      return "";
  }
}