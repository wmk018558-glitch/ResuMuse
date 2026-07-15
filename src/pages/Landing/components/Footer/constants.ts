export const NAV_GROUPS = [
  { titleKey: "footer:product", items: [
    { title: "Reports", href: "/reports" },
    { title: "Statistics", href: "/statistics" },
    { title: "Dashboards", href: "/dashboards" },
    { title: "Recordings", href: "/recordings" },
  ]},
  { titleKey: "footer:company", items: [
    { title: "About us", href: "/about" },
    { title: "Fundraising", href: "/fundraising" },
    { title: "Investors", href: "/investors" },
    { title: "Contact us", href: "/contact" },
  ]},
] as const;
