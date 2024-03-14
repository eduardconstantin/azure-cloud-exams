import { CookieConsentConfig } from "vanilla-cookieconsent";

const getConfig = () => {
  const config: CookieConsentConfig = {
    // root: 'body',
    // autoShow: true,
    disablePageInteraction: true,
    // hideFromBots: true,
    // mode: 'opt-in',
    // revision: 0,

    cookie: {
      name: "ace_cookie",
      // domain: location.hostname,
      // path: '/',
      // sameSite: "Lax",
      // expiresAfterDays: 365,
    },

    /**
     * Callback functions
     */
    // onFirstConsent: ({ cookie }) => {
    //   console.log('onFirstConsent fired', cookie);
    // },

    //onConsent: ({ cookie }) => {
    //console.log("onConsent fired!", cookie);
    //},

    //onChange: ({ changedCategories, changedServices }) => {
    //console.log("onChange fired!", changedCategories, changedServices);
    //},

    // onModalReady: ({ modalName }) => {
    //   console.log('ready:', modalName);
    // },

    // onModalShow: ({ modalName }) => {
    //   console.log('visible:', modalName);
    // },

    // onModalHide: ({ modalName }) => {
    //   console.log('hidden:', modalName);
    // },

    guiOptions: {
      consentModal: {
        layout: "cloud inline",
        position: "bottom center",
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: true,
        flipButtons: false,
      },
    },
    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              name: /^(_ga_|_gid)/,
            },
          ],
        },
      },
    },
    language: {
      default: "en",
      autoDetect: "browser",
      translations: {
        en: {
          consentModal: {
            title: "We use cookies!",
            description:
              "Hello, this website uses essential cookies to ensure its proper functioning and tracking cookies to understand how you interact with it. The latter is only set after permission.",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            showPreferencesBtn: "Manage preferences",
          },
          preferencesModal: {
            title: "Manage cookie preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Save preferences",
            closeIconLabel: "Close modal",
            serviceCounterLabel: "Service|Services",
            sections: [
              {
                title: "Cookie Usage",
                description:
                  "We use cookies to ensure basic website functionality and to improve your online experience. You can choose to opt in or out of each category whenever you want.",
              },
              {
                title:
                  'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                linkedCategory: "necessary",
              },
              {
                title: "Analytics Cookies",
                description:
                  "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
                linkedCategory: "analytics",
                cookieTable: {
                  headers: {
                    name: "Name",
                    domain: "Service",
                    description: "Description",
                    expiration: "Expiration",
                  },
                  body: [
                    {
                      name: "_ga",
                      domain: "Google Analytics",
                      description:
                        'Cookie set by <a href="#das">Google Analytics</a>.',
                      expiration: "Expires after 12 days",
                    },
                  ],
                },
              },
              {
                title: "More information",
                description:
                  "For any queries in relation to our policy on cookies and your choices, please contact us.",
              },
            ],
          },
        },
      },
    },
  };

  return config;
};

export default getConfig;
