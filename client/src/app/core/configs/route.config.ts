import { systemConfig } from './system.config';
export const routeConfig = {
  // public module
  login: { title: 'Login' },
  // /public module

  // dashboard module
  selectService: {
    title: 'Servis Seçimi',
    desc: 'You can select a service here',
    icon: 'icon-paragraph-justify3',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  panel: {
    title: 'Panel',
    desc: 'You can select a service here',
    icon: 'icon-home',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  wallet: {
    title: 'Cüzdan',
    desc: 'You can select a service here',
    icon: 'icon-user-tie',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  business: {
    title: 'Kurumsal',
    desc: 'You can select a service here',
    icon: 'icon-home4',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  reports: {
    title: 'Raporlar',
    desc: 'You can select a service here',
    icon: 'icon-graph',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  merchants: {
    title: 'Bayiler',
    desc: 'You can select a service here',
    icon: 'icon-office',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  settings: {
    title: 'Ayarlar',
    desc: 'You can select a service here',
    icon: 'icon-gear',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  profile: {
    title: 'Profil',
    desc: 'You can select a profile page',
    icon: '',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  // /dashboard module

  // panel user module
  panelUser: {
    title: 'Panel User List',
    desc: 'You can select a profile page',
    icon: 'icon-users',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  create: {
    title: 'Panel User Create',
    desc: 'You can select a profile page',
    icon: 'icon-add',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  panelPermission: {
    title: 'Panel User Permission',
    desc: 'You can select a profile page',
    icon: 'icon-user-lock',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  panelRole: {
    title: 'Panel Role',
    desc: 'You can select a profile page',
    icon: 'icon-users2',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  panelConfirmation: {
    title: 'Panel Confirmation',
    desc: 'You can select a profile page',
    icon: 'icon-user-check',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  // /panel user module

  // wallet module
  customer: {
    title: 'Müşteri',
    desc: 'You can select a service here',
    icon: 'icon-users',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  bankDeposit: {
    title: 'Banka Havale',
    desc: 'You can select a service here',
    icon: 'icon-wallet',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  cardDeposit: {
    title: 'Kart Yükleme',
    desc: 'You can select a service here',
    icon: 'icon-credit-card',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  transfer: {
    title: 'Transfer',
    desc: 'You can select a service here',
    icon: 'icon-transmission',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  requestMoney: {
    title: 'Para İstekleri',
    desc: 'You can select a service here',
    icon: 'icon-cash2',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  invoice: {
    title: 'Fatura',
    desc: 'You can select a service here',
    icon: 'icon-calculator',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  bankWithdraw: {
    title: 'Banka ile Yükleme',
    desc: 'You can select a service here',
    icon: 'icon-library2',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  cardWithdraw: {
    title: 'Kart ile Yükleme',
    desc: 'You can select a service here',
    icon: 'icon-credit-card2',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },

  donation: {
    title: 'Bağış',
    desc: 'You can select a service here',
    icon: 'icon-heart6',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },

  manuelBalance: {
    title: 'Finansal Durum',
    desc: 'You can select a service here',
    icon: 'icon-coins',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },

  // /wallet module

  // business module
  seller: {
    title: 'Bayi Başvuruları',
    desc: 'You can select a service here',
    icon: 'icon-home2',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  // /business module

  // reports module
  fraud: {
    title: 'Fraud',
    desc: 'You can select a service here',
    icon: 'icon-user-cancel',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  accounting: {
    title: 'Kullanıcılar',
    desc: 'You can select a service here',
    icon: 'icon-users',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  // /reports module

  // merchants module
  merchantApplications: {
    title: 'Bayi Başvuruları',
    desc: 'You can select a service here',
    icon: 'icon-office',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  merchantTransactions: {
    title: 'Bayi İşlemleri',
    desc: 'You can select a service here',
    icon: 'icon-sync',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  merchantBank: {
    title: 'Bayi Banka Tanımları',
    desc: 'You can select a service here',
    icon: 'icon-library2',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  // merchants module

  // settings module
  bank: {
    title: 'Banka',
    desc: 'You can select a service here',
    icon: 'icon-library2',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  bankAccounts: {
    title: 'Banka Hesapları',
    desc: 'You can select a service here',
    icon: 'icon-wallet',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  blacklist: {
    title: 'Blacklist',
    desc: 'You can select a service here',
    icon: 'icon-user-cancel',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  campaign: {
    title: 'Kampanya',
    desc: 'You can select a service here',
    icon: 'icon-megaphone',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  limit: {
    title: 'Limit',
    desc: 'You can select a service here',
    icon: 'icon-coins',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  level: {
    title: 'Level',
    desc: 'You can select a service here',
    icon: 'icon-rating3',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  fees: {
    title: 'Komisyon',
    desc: 'You can select a service here',
    icon: 'icon-cash',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  posBank: {
    title: 'Banka Pos',
    desc: 'You can select a service here',
    icon: 'icon-credit-card',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  bankInstallment: {
    title: 'Banka Taksit',
    desc: 'You can select a service here',
    icon: 'icon-pie-chart5',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  commission: {
    title: 'Komisyon',
    desc: 'You can select a service here',
    icon: 'icon-pencil3',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  faq: {
    title: 'Sık Sorulan Sorular',
    desc: 'You can select a service here',
    icon: 'icon-pencil3',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  approvalTransactions: {
    title: 'Onay İşlemleri',
    desc: 'You can select a service here',
    icon: 'icon-pencil3',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  operators: {
    title: 'Operatorler',
    desc: 'You can select a service here',
    icon: 'icon-pencil3',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  },
  roles: {
    title: 'Roller',
    desc: 'You can select a service here',
    icon: 'icon-pencil3',
    permissions: {
      only: ['AUTHORIZED'],
      redirectTo: systemConfig.unauthorizedRedirectTo
    }
  }
  // /settings module
};
