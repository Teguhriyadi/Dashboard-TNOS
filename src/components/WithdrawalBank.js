export const WithdrawalBank = (props) => {
  let bankCode = parseInt(props.bankCode);
  let bank = "";

  if (bankCode === 1) {
    bank = "PT. BANK RAKYAT INDONESIA (PERSERO), Tbk -- BRI";
  } else if (bankCode === 2) {
    bank = "PT. BANK MANDIRI (PERSERO), Tbk";
  } else if (bankCode === 3) {
    bank = "PT. BANK NEGARA INDONESIA (PERSERO), Tbk -- BNI";
  } else if (bankCode === 4) {
    bank = "PT. BANK TABUNGAN NEGARA (PERSERO), Tbk -- BTN";
  } else if (bankCode === 5) {
    bank = "PT. BANK DANAMON INDONESIA, Tbk";
  } else if (bankCode === 6) {
    bank = "PT. BANK PERMATA, Tbk";
  } else if (bankCode === 7) {
    bank = "PT. BANK CENTRAL ASIA, Tbk -- BCA";
  } else if (bankCode === 8) {
    bank = "PT. BANK MAYBANK  INDONESIA, Tbk";
  } else if (bankCode === 9) {
    bank = "PT. PAN INDONESIA BANK, Tbk";
  } else if (bankCode === 10) {
    bank = "PT. BANK CIMB NIAGA, Tbk";
  } else if (bankCode === 11) {
    bank = "PT. BANK UOB INDONESIA";
  } else if (bankCode === 12) {
    bank = "PT. BANK OCBC NISP, Tbk";
  } else if (bankCode === 13) {
    bank = "PT. BANK ARTHA GRAHA INTERNASIONAL, Tbk";
  } else if (bankCode === 14) {
    bank = "PT. BANK BUMI ARTA, Tbk";
  } else if (bankCode === 15) {
    bank = "PT. BANK HSBC INDONESIA";
  } else if (bankCode === 16) {
    bank = "PT. BANK JTRUST INDONESIA, Tbk";
  } else if (bankCode === 17) {
    bank = "PT. BANK MAYAPADA INTERNATIONAL, Tbk";
  } else if (bankCode === 18) {
    bank = "PT. BANK OF INDIA INDONESIA, Tbk";
  } else if (bankCode === 19) {
    bank = "PT. BANK MUAMALAT INDONESIA, Tbk";
  } else if (bankCode === 20) {
    bank = "PT. BANK MESTIKA DHARMA, Tbk";
  } else if (bankCode === 21) {
    bank = "PT. BANK SHINHAN INDONESIA";
  } else if (bankCode === 22) {
    bank = "PT. BANK SINARMAS, Tbk";
  } else if (bankCode === 23) {
    bank = "PT. BANK MASPION INDONESIA, Tbk";
  } else if (bankCode === 24) {
    bank = "PT. BANK GANESHA, Tbk";
  } else if (bankCode === 25) {
    bank = "PT. BANK ICBC INDONESIA";
  } else if (bankCode === 26) {
    bank = "PT. BANK QNB INDONESIA, Tbk";
  } else if (bankCode === 27) {
    bank = "PT. BANK WOORI SAUDARA INDONESIA 1906, Tbk";
  } else if (bankCode === 28) {
    bank = "PT. BANK MEGA, Tbk";
  } else if (bankCode === 29) {
    bank = "PT. BANK BNI SYARIAH";
  } else if (bankCode === 30) {
    bank = "PT. BANK BUKOPIN, Tbk";
  } else if (bankCode === 31) {
    bank = "PT. BANK SYARIAH MANDIRI -- MANDIRI SYARIAH";
  } else if (bankCode === 32) {
    bank = "PT. BANK KEB HANA INDONESIA";
  } else if (bankCode === 33) {
    bank = "PT. BANK MNC INTERNASIONAL, Tbk";
  } else if (bankCode === 34) {
    bank = "PT. BANK RAKYAT INDONESIA AGRONIAGA, Tbk -- BRI AGRONIAGA";
  } else if (bankCode === 35) {
    bank = "PT. BANK SBI INDONESIA";
  } else if (bankCode === 36) {
    bank = "PT. BANK MEGA SYARIAH";
  } else if (bankCode === 37) {
    bank = "PT. BANK INDEX SELINDO";
  } else if (bankCode === 38) {
    bank = "PT. BANK MAYORA";
  } else if (bankCode === 39) {
    bank = "PT. BANK CHINA CONSTRUCTION BANK INDONESIA, Tbk";
  } else if (bankCode === 40) {
    bank = "PT. BANK DBS INDONESIA";
  } else if (bankCode === 41) {
    bank = "PT. BANK RESONA PERDANIA";
  } else if (bankCode === 41) {
    bank = "PT. BANK MIZUHO INDONESIA";
  } else if (bankCode === 43) {
    bank = "PT. BANK CAPITAL INDONESIA, Tbk";
  } else if (bankCode === 44) {
    bank = "PT. BANK BNP PARIBAS INDONESIA";
  } else if (bankCode === 45) {
    bank = "PT. BANK ANZ INDONESIA";
  } else if (bankCode === 46) {
    bank = "PT. BANK RABOBANK INTERNATIONAL INDONESIA";
  } else if (bankCode === 47) {
    bank = "PT. BANK IBK INDONESIA, Tbk";
  } else if (bankCode === 48) {
    bank = "PT. BANK NET INDONESIA SYARIAH";
  } else if (bankCode === 49) {
    bank = "PT. BANK CTBC INDONESIA";
  } else if (bankCode === 50) {
    bank = "PT. BANK COMMONWEALTH";
  } else if (bankCode === 51) {
    bank = "PT. BANK BTPN, Tbk";
  } else if (bankCode === 52) {
    bank = "PT. BANK VICTORIA SYARIAH";
  } else if (bankCode === 53) {
    bank = "PT. BANK BRI SYARIAH, Tbk";
  } else if (bankCode === 54) {
    bank = "PT. BANK JABAR BANTEN SYARIAH";
  } else if (bankCode === 55) {
    bank = "PT. BANK BISNIS INTERNASIONAL";
  } else if (bankCode === 56) {
    bank = "PT. BANK JASA JAKARTA";
  } else if (bankCode === 57) {
    bank = "PT. BANK YUDHA BHAKTI, Tbk";
  } else if (bankCode === 58) {
    bank = "PT. BANK MITRANIAGA, Tbk";
  } else if (bankCode === 59) {
    bank = "PT. BANK ROYAL INDONESIA";
  } else if (bankCode === 60) {
    bank = "PT. BANK NATIONAL NOBU, Tbk";
  } else if (bankCode === 61) {
    bank = "PT. BANK INA PERDANA, Tbk";
  } else if (bankCode === 62) {
    bank = "PT. BANK PANIN DUBAI SYARIAH, Tbk";
  } else if (bankCode === 63) {
    bank = "PT. PRIMA MASTER BANK";
  } else if (bankCode === 64) {
    bank = "PT. BANK SYARIAH BUKOPIN";
  } else if (bankCode === 65) {
    bank = "PT. BANK SAHABAT SAMPOERNA";
  } else if (bankCode === 66) {
    bank = "PT. BANK DINAR INDONESIA, Tbk";
  } else if (bankCode === 67) {
    bank = "PT. BANK AMAR INDONESIA";
  } else if (bankCode === 68) {
    bank = "PT. BANK KESEJAHTERAAN EKONOMI";
  } else if (bankCode === 69) {
    bank = "PT. BANK BCA SYARIAH";
  } else if (bankCode === 70) {
    bank = "PT. BANK ARTOS INDONESIA";
  } else if (bankCode === 71) {
    bank = "PT. BANK TABUNGAN PENSIUNAN NASIONAL SYARIAH, Tbk -- BTPN SYARIAH";
  } else if (bankCode === 72) {
    bank = "PT. BANK MULTIARTA SENTOSA";
  } else if (bankCode === 73) {
    bank = "PT. BANK FAMA INTERNASIONAL";
  } else if (bankCode === 74) {
    bank = "PT. BANK MANDIRI TASPEN";
  } else if (bankCode === 75) {
    bank = "PT. BANK VICTORIA INTERNATIONAL, Tbk";
  } else if (bankCode === 76) {
    bank = "PT. BANK HARDA INTERNASIONAL";
  } else if (bankCode === 77) {
    bank = "PT. BPD JAWA BARAT DAN BANTEN, Tbk";
  } else if (bankCode === 78) {
    bank = "PT. BPD DKI";
  } else if (bankCode === 79) {
    bank = "PT. BPD DAERAH ISTIMEWA YOGYAKARTA";
  } else if (bankCode === 80) {
    bank = "PT. BPD JAWA TENGAH";
  } else if (bankCode === 81) {
    bank = "PT. BPD JAWA TIMUR, Tbk";
  } else if (bankCode === 82) {
    bank = "PT. BPD JAMBI";
  } else if (bankCode === 83) {
    bank = "PT. BANK ACEH SYARIAH";
  } else if (bankCode === 84) {
    bank = "PT. BPD SUMATERA UTARA";
  } else if (bankCode === 85) {
    bank = "PT. BPD SUMATERA BARAT";
  } else if (bankCode === 86) {
    bank = "PT. BPD RIAU KEPRI";
  } else if (bankCode === 87) {
    bank = "PT. BPD SUMATERA SELATAN DAN BANGKA BELITUNG";
  } else if (bankCode === 88) {
    bank = "PT. BPD LAMPUNG";
  } else if (bankCode === 89) {
    bank = "PT. BPD KALIMANTAN SELATAN";
  } else if (bankCode === 90) {
    bank = "PT. BPD KALIMANTAN BARAT";
  } else if (bankCode === 91) {
    bank = "PT. BPD KALIMANTAN TIMUR DAN KALIMANTAN UTARA";
  } else if (bankCode === 92) {
    bank = "PT. BPD KALIMANTAN TENGAH";
  } else if (bankCode === 93) {
    bank = "PT. BPD SULAWESI SELATAN DAN SULAWESI BARAT";
  } else if (bankCode === 94) {
    bank = "PT. BPD SULAWESI UTARA DAN  GORONTALO";
  } else if (bankCode === 95) {
    bank = "PT. BANK NTB SYARIAH";
  } else if (bankCode === 96) {
    bank = "PT. BPD BALI";
  } else if (bankCode === 97) {
    bank = "PT. BPD NUSA TENGGARA TIMUR";
  } else if (bankCode === 98) {
    bank = "PT. BPD MALUKU DAN MALUKU UTARA";
  } else if (bankCode === 99) {
    bank = "PT. BPD PAPUA";
  } else if (bankCode === 100) {
    bank = "PT. BPD BENGKULU";
  } else if (bankCode === 101) {
    bank = "PT. BPD SULAWESI TENGAH";
  } else if (bankCode === 102) {
    bank = "PT. BPD SULAWESI TENGGARA";
  } else if (bankCode === 103) {
    bank = "PT. BPD BANTEN, Tbk";
  } else if (bankCode === 104) {
    bank = "CITIBANK, N.A.";
  } else if (bankCode === 105) {
    bank = "JP MORGAN CHASE BANK, NA";
  } else if (bankCode === 106) {
    bank = "BANK OF AMERICA, N.A";
  } else if (bankCode === 107) {
    bank = "BANGKOK BANK PCL";
  } else if (bankCode === 108) {
    bank = "MUFG BANK, LTD";
  } else if (bankCode === 109) {
    bank = "STANDARD CHARTERED BANK";
  } else if (bankCode === 110) {
    bank = "DEUTSCHE BANK AG";
  } else if (bankCode === 111) {
    bank = "BANK OF CHINA (HONG KONG) LIMITED";
  } else if (bankCode === 112) {
    bank = "PT. BANK NUSANTARA PARAHYANGAN Tbk *)";
  } else if (bankCode === 113) {
    bank = "PT. BANK OKE INDONESIA **)";
  } else if (bankCode === 114) {
    bank = "BANK Anda";
  } else if (bankCode === 115) {
    bank = "BANK Andara";
  } else if (bankCode === 116) {
    bank = "BANK BPD Aceh";
  } else if (bankCode === 117) {
    bank = "BANK BRI Agroniaga";
  } else if (bankCode === 118) {
    bank = "BANK BTN Syariah";
  } else if (bankCode === 119) {
    bank = "BANK Danamon Syariah";
  } else if (bankCode === 120) {
    bank = "BANK DKI Syariah";
  } else if (bankCode === 121) {
    bank = "BANK Ekonomi Raharja";
  } else if (bankCode === 122) {
    bank = "BANK Kalbar Syariah";
  } else if (bankCode === 123) {
    bank = "BANK Kalsel Syariah";
  } else if (bankCode === 124) {
    bank = "BANK Kaltim Syariah";
  } else if (bankCode === 125) {
    bank = "BANK Nagari";
  } else if (bankCode === 126) {
    bank = "BANK Nagari Syariah";
  } else if (bankCode === 127) {
    bank = "BANK NTB";
  } else if (bankCode === 128) {
    bank = "BANK Permata Syariah";
  } else if (bankCode === 129) {
    bank = "BANK Pundi Indonesia";
  } else if (bankCode === 130) {
    bank = "BANK Riau Kepri Syariah";
  } else if (bankCode === 131) {
    bank = "BANK Sumitomo Mitsui Indonesia";
  } else if (bankCode === 132) {
    bank = "BANK Sumsel Babel Syariah";
  } else if (bankCode === 133) {
    bank = "BANK Sumut Syariah";
  } else if (bankCode === 134) {
    bank = "BANK Windu Kentjana International";
  } else if (bankCode === 135) {
    bank = "BII Syariah";
  } else if (bankCode === 136) {
    bank = "CIMB Niaga Syariah";
  } else if (bankCode === 137) {
    bank = "OCBC NISP Syariah";
  } else if (bankCode === 138) {
    bank = "Panin Bank Syariah";
  } else if (bankCode === 139) {
    bank = "The Bank of Tokyo-Mitsubishi UFJ";
  }

  return bank;
};
