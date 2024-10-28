import { ref } from 'vue'

import type {
    Address,
    Email,
    Link,
    SocialLink
} from '~/models/common'

import type { Site } from '~/models/site'

export function useSiteData() {
    const address = ref<Address> ({
        street1: "202 N Cedar Ave STE #1,",
        street2: null,
        city: "Owatonna",
        state: "MN",
        postal_code: "55060"
    });
    const emails = ref<Email[]> ([
        {
            display_name: "Support",
            account: "support",
            domain: "findlocalhaunts.com"
        }
    ])
    const links = ref<Link[]> ([
        {
            title: "home",
            to: "/#hero",
            external: true,
            icon: null,
            displayText: "Home",
        },
        {
            title: "about-us",
            to: "/#about",
            external: true,
            icon: null,
            displayText: "About Us",
        },
        {
            title: "Contact",
            to: "/#contact",
            external: true,
            icon: null,
            displayText: "Contact",
        }
    ])
    const social_links = ref<SocialLink[]> ([
        {
            component: "FacebookSvg",
            label: "facebook",
            color: "filter-white",
            bg_color: "facebook",
            icon: "fa-brands fa-facebook",
            display_title: "Facebook",
            href: "https://www.facebook.com/findlocalhaunts/"
        },
        {
            component: "XSvg",
            label: "x",
            color: "filter-black",
            bg_color: "x",
            icon: "fa-brands fa-x-twitter",
            display_title: "X",
            href: "https://x.com/findlocalhaunts/"
        },
        {
            component: "InstagramSvg",
            label: "instagram",
            color: "filter-white",
            bg_color: "instagram",
            icon: "fa-brands fa-instagram",
            display_title: "Instagram",
            href: "https://instagram.com/findlocalhaunts/"
        },
        {
            component: "TiktokSvg",
            label: "tiktok",
            color: "filter-white",
            bg_color: "tiktok",
            icon: "fa-brands fa-tiktok",
            display_title: "Tiktok",
            href: "https://www.tiktok.com/@findlocalhaunts?lang=en"
        }
    ])
    const footer_links = ref<Link[]> ([
        {
            title: "privacy policy",
            to: "/privacy",
            external: true,
            icon: null,
            displayText: "Privacy Policy",
        },
        {
            title: "terms & conditions",
            to: "/terms",
            external: true,
            icon: null,
            displayText: "Terms & Conditions",
        },
    ])

    const site = ref<Site>({
        title: "Find Local Haunts",
        shortName: "Find Local Haunts",
        tagLine: "Search, Find, Fear.",
        url: "https://findlocalhaunts.com/",
        established: 2008,
        copyright: 2008,
        address: address.value,
        emails: emails.value,
        links: links.value,
        social_links: social_links.value,
        footer_links: footer_links.value,
    });

    const getEmailByAccount = (account: string) => computed(() => {
        return emails.value.find(email => email.account === account) || null;
    });

    return {
        address,
        emails,
        links,
        social_links,
        site,
        getEmailByAccount
    }
}
