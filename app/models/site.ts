import type {
    Address,
    Email,
    Link,
    SocialLink
} from '~/models/common'

export interface Site {
    title:        string;
    shortName:    string;
    tagLine:      string;
    url:          string;
    established:  number;
    copyright:    number;
    address:      Address;
    emails:       Email[];
    links:        Link[];
    social_links: SocialLink[];
    footer_links: Link[];
}
