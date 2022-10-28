export const menuConfig = [
  {
    fullPath: '/select-service',
    routeConfig: 'selectService'
  },
  {
    fullPath: '/panel',
    routeConfig: 'panel',
    children: [
      {
        fullPath: '/panel/panel-user',
        routeConfig: 'panelUser'
      },
      {
        fullPath: '/panel/panel-permission',
        routeConfig: 'panelPermission'
      },
      {
        fullPath: '/panel/panel-role',
        routeConfig: 'panelRole'
      },
      {
        fullPath: '/panel/panel-confirmation',
        routeConfig: 'panelConfirmation'
      }
    ]
  },
  {
    fullPath: '/wallet',
    routeConfig: 'wallet',
    children: [
      {
        fullPath: '/wallet/customer',
        routeConfig: 'customer'
      },
      {
        fullPath: '/wallet/bank-deposit',
        routeConfig: 'bankDeposit'
      },
      {
        fullPath: '/wallet/card-deposit',
        routeConfig: 'cardDeposit'
      },
      {
        fullPath: '/wallet/transfer',
        routeConfig: 'transfer'
      },
      {
        fullPath: '/wallet/request-money',
        routeConfig: 'requestMoney'
      },
      {
        fullPath: '/wallet/bank-withdraw',
        routeConfig: 'bankWithdraw'
      },
      {
        fullPath: '/wallet/card-withdraw',
        routeConfig: 'cardWithdraw'
      },
      {
        fullPath: '/wallet/invoice',
        routeConfig: 'invoice'
      },
      {
        fullPath: '/wallet/donation',
        routeConfig: 'donation'
      },
      {
        fullPath: '/wallet/manuel-balance',
        routeConfig: 'manuelBalance'
      }
    ]
  },
  // {
  //   fullPath: '/business',
  //   routeConfig: 'business',
  //   children: [
  //     {
  //       fullPath: '/business/seller',
  //       routeConfig: 'seller'
  //     }
  //   ]
  // },
  {
    fullPath: '/reports',
    routeConfig: 'reports',
    children: [
      {
        fullPath: '/reports/accounting',
        routeConfig: 'accounting'
      },
      {
        fullPath: '/reports/fraud',
        routeConfig: 'fraud'
      }
    ]
  },
  {
    fullPath: '/merchants',
    routeConfig: 'merchants',
    children: [
      {
        fullPath: '/merchants/merchant-applications',
        routeConfig: 'merchantApplications'
      },
      {
        fullPath: '/merchants/merchant-transactions',
        routeConfig: 'merchantTransactions'
      },
      {
        fullPath: '/merchants/merchant-bank',
        routeConfig: 'merchantBank'
      }
    ]
  },
  {
    fullPath: '/settings',
    routeConfig: 'settings',
    children: [
      {
        fullPath: '/settings/bank',
        routeConfig: 'bank'
      },
      {
        fullPath: '/settings/bank-accounts',
        routeConfig: 'bankAccounts'
      },
      {
        fullPath: '/settings/blacklist',
        routeConfig: 'blacklist'
      },
      {
        fullPath: '/settings/campaign',
        routeConfig: 'campaign'
      },
      {
        fullPath: '/settings/limit',
        routeConfig: 'limit'
      },
      {
        fullPath: '/settings/level',
        routeConfig: 'level'
      },
      {
        fullPath: '/settings/fees',
        routeConfig: 'fees'
      },
      {
        fullPath: '/settings/fraud',
        routeConfig: 'fraud'
      },
      {
        fullPath: '/settings/pos-bank',
        routeConfig: 'posBank'
      },
      {
        fullPath: '/settings/bank-installment',
        routeConfig: 'bankInstallment'
      }
    ]
  }
];
